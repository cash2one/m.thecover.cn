define(function (require) {
  var jQ = jQuery;
  var app = {
    css_string: '#page_daily .bottom-cover,#page_daily .cover-img,#page_daily .link-to-article-position:before{background-repeat:no-repeat;background-size:cover;background-position:center}#page_daily .cover-img{font-size:1.3333rem;text-align:center;color:#fff;height:100%;position:relative}#page_daily .bottom-cover{position:absolute;left:0;bottom:0;width:100%;height:10%;background-image:url(http://wapcdn.thecover.cn/wap/1.3.0/img/cover_daily.png);z-index:10}.cover-img>p{position:relative;top:12%}#page_daily #daily_timestamp_date{font-size:1.416rem}#page_daily #daily_timestamp_weekday{font-size:.8333rem}#page_daily #links_wrapper{width:100%;padding:1.875rem 2.4rem .2rem}#page_daily a.link-to-article{position:relative;display:block;width:100%;height:auto;padding-top:1.2rem;padding-bottom:1.2rem;text-decoration:none;-webkit-box-shadow:0 1px 1px -1px rgba(160,160,160,.9);-moz-box-shadow:0 1px 1px -1px rgba(160,160,160,.9);box-shadow:0 1px 1px -1px rgba(160,160,160,.9)}#page_daily a.link-to-article:first-of-type{padding-top:0}#page_daily .link-to-article-position:before{position:absolute;left:-1.25rem;top:.354rem;line-height:1.438rem;content:"";display:inline-block;width:.73rem;height:.73rem;background-image:url(http://wapcdn.thecover.cn/wap/1.0.0/img/icn_pointer.png)}#page_daily .link-to-article section{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#page_daily .link-to-article-position{position:relative;font-size:.73rem;line-height:1.438rem;font-weight:700;color:#111112}#page_daily .link-to-article-title{font-size:1rem;line-height:1.6875rem;color:#474747}#page_daily .link-to-article-brief{font-size:.65rem;line-height:1.5rem;color:#757575;padding-top:.4875rem;font-weight:400;max-height:3.5rem;overflow:hidden}span.position{margin-left:1em}',
    init: function () {
      var self = this;
      COVER.juicer_register(juicer);
      var wW = jQ(window).width();
      jQ('#inserted_via_script').text(self.css_string);
      jQ('#cover_img_wrapper').css({
        'width': '100%',
        'height': (wW / 72 * 97) + 'px'
      });
      /*jQ('.DownloadApp').on('click', function () {
        COVER.downloadApp();
      });*/
      jQ('#startload').show();
      self.getDailyData({}).then(function (data) {
        var sharedata = {
          'title': data.title || (data.date.split('-')[1] + '月' + data.date.split('-')[2] + '日') + '|封面日报',
          'link': window.location.href,
          'imgUrl': data.share_img || 'http://wapcdn.thecover.cn/wap/1.0.0/img/share_logo.png',
          'desc': data.list[0].brief || '封面新闻-因人而异'
        };
        jQ('#startload').hide();
        if (COVER.device.isWeixin()) {
          COVER.openapi.weixin.wx_share(sharedata);
        }
        self.renderTemplates(data).done(function () {
          COVER.downloadUrl();
          jQ('.limited-max-width.transparent').removeClass('transparent');
          jQ('.btn-download-app').on('click', function () {
            COVER.downloadApp();
          });
        })
      });
    },
    getDailyData: function (data) {
      var payload = {
        'fm_token': COVER.getUrl('fm_token') || 'from_wap',
        'data': JSON.stringify(data)
      };
      return COVER.$post(COVER.apis().getFmDaily, payload);
    },
    renderTemplates: function (data) {
      var self = this;
      return jQ.when(jQ('#cover_img_wrapper').html(juicer(self.tpl_cover_image(), data)).promise(), jQ('#links_wrapper').html(juicer(self.tpl_links(), data)).promise());
    },
    tpl_cover_image: function () {
      return [
        '<div class="cover-img" style="background-image: url(${img_url});">',
        '  <div class="bottom-cover"></div>',
        '</div>'
      ].join('');
    },
    tpl_links: function () {
      return [
        '{@each list as item}',
        '<a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')" class="link-to-article">',
        '  <section>',
        '    <p class="link-to-article-position"><span>${item.daily_label}</span></p>',
        '    <p class="link-to-article-title">${item.title}</p>',
        '    <p class="link-to-article-brief">${item.brief}</p>',
        '  </section>',
        '</a>',
        '{@/each}',
        '<a href="downloadApp.html" class="DownloadApp"><div class="btn-download-app">打开封面新闻,查看更多精彩</div></a>'
      ].join('');
    }
  };
  app.init();
});