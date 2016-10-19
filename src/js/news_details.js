define(function (require) {
  var id = COVER.getUrl('id');
  var newsFlag = '';
  if (COVER.isEmpty(id)) {
    COVER.skip('index.html');
    return false;
  }
  var app = {
    init: function () {
      var self = this;
      COVER.juicer_register(juicer);
      self.setDimensions();
      $('#startload').show();
      COVER.$post(COVER.apis().newsDetail, 'data=' + JSON.stringify({
            news_id: id
          })).then(function (data) {
        var infotype = 'news'; // 资源类型
        var D = data;
        if (COVER.isEmpty(D)) {
          COVER.skip('404.html');
        }
        newsFlag = D.flag;
        COVER.downloadUrl(id, newsFlag);
        var sharedata = {
          'title': D.news_title + ' | 封面新闻' || '封面新闻-因人而异',
          'link': window.location.href,
          'imgUrl': D.share_img || 'http://wapcdn.thecover.cn/wap/1.0.0/img/share_logo.png',
          'desc': D.brief || '封面新闻-因人而异'
        };
        if (COVER.device.isWeixin()) {
          COVER.openapi.weixin.wx_share(sharedata);
        }
        if (D.kind == 4 && !COVER.isEmpty(D.video_url)) {
          $('#video').attr('poster', D.img_video);
          $('#video').attr('src', D.video_url);
          $('.tc-video').show();
          infotype = 'video';
        }
        (parseInt(D.flag) === 11) && (D.img_video.trim().length > 0) && $('<img>').prop('src', D.img_video).appendTo('#img_video') && $('#img_video').removeClass('hidden');
        $('.article h1').text(D.news_title || '');
        $('.details-source').text(D.source || '封面新闻');
        $('.details-time').text(D.happen_time && COVER.time_tag('news_detail_subtitle', D.happen_time) || '');
        $('.details').html(D.content || '');
        // 有相关新闻，才显示相关新闻栏
        var related = D.related_list;
        if (!COVER.isEmpty(related) && related.length > 0) {
          self.initRelated(related, infotype);
        }
        $('#startload').hide();
        $('body').css({
          'padding-bottom': ($(window).width() * 0.125410) + 'px'
        });
        $('body').removeClass('transparent');
      }, function (err_code) {
        // console.log(JSON.stringify(err_code));
        if (parseInt(err_code) === 432 || parseInt(err_code) === 500) {
          $('html').append($('<div class="layer-no-such-ariticle"></div>'));
        } else {
          return COVER.errorMsg('网络请求失败~~');
        }
      });
      this.getDynamic();
      this.initTalk();
    },
    getReplyList: function () {
      var payload = 'data=' + JSON.stringify({
            "news_id": id,
            "page": 1,
            "page_size": 20
          });
      // console.log(payload);
      return COVER.$post(COVER.apis().getReplyList, payload);
    },
    setDimensions: function () {
      var img_w = $('#list_of_news').width() * 0.4;
      var img_h = parseInt(img_w / 4 * 3);
      var single_big_img_h = parseInt($('#list_of_news').width() / 16 * 9);
      var banner_h = parseInt($(window).width() / 16 * 9);
      var text = [
        '.is-single-img .cover-of-single-imgs {border-left-width: ',
        (img_w / 10) + 'px;}',
        '.is-single-img:nth-child(2n+1) .cover-of-single-imgs {border-bottom-width: ',
        (img_h) + 'px;}',
        '.is-single-img:nth-child(2n) .cover-of-single-imgs {border-top-width: ',
        (img_h) + 'px;}',
        '.is-single-img .small-image-img {height: ',
        (img_h) + 'px;}',
        '#list_of_news .news-items.is-single-big-img .thumbnail-wrapper {height: ',
        (single_big_img_h) + 'px;}',
        '#list_of_news .news-items.is-video .thumbnail-wrapper {height: ',
        (single_big_img_h) + 'px;}',
        '#bannerbox, #banner, .swipe-a {height: ',
        (banner_h) + 'px;}'
      ].join('');
      $('#inserted_via_script').text(text);
    },
    // 新闻详情底部信息
    getDynamic: function () {
      var newsid = {
        news_id: id
      };
      COVER.$post(COVER.apis().getDynamic, {
        data: JSON.stringify(newsid)
      }).then(function (ret) {
        if (!COVER.isEmpty(ret)) {
          $('.details-media-headimg').attr('src', ret.head_img);
          $('.dmc-title').text(ret.subject_name);
          $('.dmc-desc').text(ret.subject_desc);
          $('.details-media').css('display', 'inline-block');
          $('.details-media-content, .details-media-headimg').on('click', function () {
            var url = 'http://m.thecover.cn/subject.html?' + 'id=' + ret.subject_id + '&' + 'channel_type=' + ret.channel_type;
            return location.href = url;
          });
        }
      });
    },
    initTalk: function () {
      var self = this;
      self.getReplyList().then(function (data) {
        // console.log('getReplyList() => ', data);
        $('.news-talk').show();
        if (data.total > 0) {
          jQuery.each(data.list, function (idx, val) {
            return val.content = COVER.renderReplyContent(val.content);
          });
          $('.news-list ul').html(juicer(self.talkTpl(), data));
        } else {
          $('.news-list').addClass('notalk').html('<img src="https://wapcdn.thecover.cn/wap/2.0.0/img/sofa.png">');
        }
      });
    },
    initRelated: function (data, infotype) {
      // console.log(data);
      var self = this;
      var tpl = self.relatedTpl();
      var related_block = juicer(tpl, {
        data: data
      });
      $('#list_of_news').append(related_block).promise().then(function () {
        $('.thumbnail').css('height', $('.thumbnail').width() / 16 * 9 + 'px');
      });
    },
    relatedTpl: function () {
      var tpl = [
        '{@each data as item}',
        // '  {@if item.flag == 1}',
        '  {@if item.flag}',
        '    <section class="news-items is-single-img">',
        '      {@if item.subject_id}',
        '        <a href="${item.subject_id, item.flag | Link}">',
        '      {@else}',
        '        <a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')">',
        '      {@/if}',
        '        <div class="small-image">',
        '          <img src="${item.img_url}" class="small-image-img">',
        '          <div class="cover-of-single-imgs"></div>',
        '        </div>',
        '        <div class="small-image-title">',
        '          <h3>${item.news_title}</h3>',
        '          <div class="news-items-meta">',
        '            <div class="news-items-meta-prop">',
        '              <ul>',
        '                <li class="tc-list-source">',
        '                  {@if item.label}',
        '                    <img src="${item.label | LabelImg}">',
        '                  {@/if}',
        '                  ${item.source | source}',
        '                </li>',
        '              </ul>',
        '            </div>',
        '            <div class="tc-list-imgread">',
        '              <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '                ${item.review_count | view_count}',
        '            </div>',
        '          </div>',
        '        </div>',
        '      </a>',
        '    </section>',
        '  {@/if}',
        '{@/each}'
      ].join('');
      return tpl;
    },
    // 评论模板
    talkTpl: function () {
      var tpl = [
        '{@each list as item}',
        '<li>',
        '    <div class="tc-portrait"><img src="${item.avatar | defavatar}" alt=""></div>',
        '    <div class="tc-talkitem">',
        '        <div class="tc-talkname">${item.nickname} <br><span>${item.showTime}</span></div>',
        '        <p>$${item.content}</p>',
        '    </div>',
        '</li>',
        '{@/each}'
      ].join('');
      return tpl;
    }
  };
  app.init();
});