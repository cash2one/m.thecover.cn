define(function (require) {
  var jQ = jQuery;
  var isData = true, // 是否有数据
      subject_id = parseInt(COVER.getUrl('id')),
      channel_type = parseInt(COVER.getUrl('channel_type')),
      page = 1, // 页码
      page_size = 15;
  // 验证id、type是否为数值
  // console.log('channel_type): ', channel_type);
  if (isNaN(subject_id)) {
    COVER.errorMsg('参数错误！');
    COVER.skip('index.html');
    return false;
  }
  var app = {
    init: function () {
      var self = this;
      COVER.juicer_register(juicer);
      self.setDimensions();
      self.render().done(function () {
        COVER.downloadUrl();
        jQ('.transparent').removeClass('transparent');
        self.bindEvents();
      });
      COVER.backTop();
    },
    setDimensions: function () {
      var img_w = jQ('#list_of_news').width() * 0.4;
      var img_h = parseInt(img_w / 4 * 3);
      var single_big_img_h = parseInt(jQ('#list_of_news').width() / 16 * 9);
      var banner_h = parseInt(jQ(window).width() * 0.75);
      console.log('setDimensions(): ', img_h);
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
      jQ('#inserted_via_script').text(text);
    },
    bindEvents: function () {
      var self = this;
      COVER.downloadUrl();

      // 监听是否滑动到底部
      jQ(window).scroll(function () {
        if (page <= 3) {
          var scrollTop = jQ(this).scrollTop(),
              scrollHeight = jQ(document).height(),
              windowHeight = jQ(this).height();
          if (scrollTop + windowHeight == scrollHeight && isData == true) {
            self.render();
          }
        } else {
          if (isData == true) {
            jQ('.load-more').text('点击或上拉加载更多').show();
            jQ('.tc-footer').show();
          }
        }
      });
      // 点击加载更多
      jQ('body').on('click', '.load-more', function () {
        jQ(this).text('正在加载更多的数据');
        self.render();
      });
      jQ('img').on('error', function () {
        jQ(this).attr('src', "http://wapcdn.thecover.cn/wap/1.0.0/img/default_news.jpg");
      });
    },
    getSubjectData: function (data) {
      var payload = 'data=' + JSON.stringify({
            "subject_id": subject_id,
            "channel_type": channel_type,
            "page": page,
            "page_size": page_size
          });
      return COVER.$post(COVER.apis().getSubject, payload);
    },
    // 新闻列表渲染
    render: function () {
      var self = this;
      var tpl = this.tpl_list();
      return self.getSubjectData().then(function (data) {
        if (!COVER.isEmpty(data.subject_name)) {
          jQ('.tc-head-back span').text(data.subject_name);
        }
        if (data.list.length == 0) {
          jQ('.load-more').text('已经全部加载完毕').show();
          isData = false;
        }
        page++;
        data.channel_type = parseInt(data.channel_type);
        if (data.channel_type === 10) {
          data.class_name = 'zhuanlan fengmianhao';
          jQ('#cover_img_wrapper').addClass('zhuanlan fengmianhao');
          console.log(jQ('.cover-img.zhuanlan').height() + jQ('#subject_name').height());
        } else if (data.channel_type === 13) {
          data.class_name = 'zhuanti';
          jQ('#cover_img_wrapper').addClass('zhuanti');
        } else {
          // data.channel_type === 5
          data.class_name = 'zhuanlan';
          jQ('#cover_img_wrapper').addClass('zhuanlan');
        }
        if(data.subject_desc && data.subject_desc.trim().length > 0) {
          data.has_content = '';
        } else {
          data.has_content = 'hidden';
        }
        console.log(data.class_name);
        data.big_img_height = (data.class_name === 'zhuanlan') ? (jQ(window).width() / 1242 * 698) + 'px' : (jQ(window).width() / 1242 * 698) + 'px';
        data.head_img_height = ((jQ(window).width() / 216 * 203) * 0.25) + 'px';
        var html = juicer(tpl, data);
        if (jQ('#cover_img_wrapper').hasClass('zhuanti')) {
          return jQ.when(jQ('#list_of_news').append(html).promise(), jQ('#cover_img_wrapper').html(juicer(self.tpl_cover_image_zhuanTi(), data)).promise());
        } else {
          return jQ.when(jQ('#list_of_news').append(html).promise(), jQ('#cover_img_wrapper').html(juicer(self.tpl_cover_image_zhuanLan(), data)).promise());
        }
      });
    },
    tpl_cover_image_zhuanTi: function () {
      console.log('tpl_cover_image_zhuanTi')
      return [
        '<div class="cover-img ${class_name}" style="height:${big_img_height};background-image:url(${big_img});">',
        '  <div class="layer"></div>',
        '  <p id="subject_name">',
        '    ${subject_name}',
        '  </p>',
        '  <div class="bottom-cover"></div>',
        '</div>',
        '<div id="subject_desc" class="${has_content}">',
        '  ${subject_desc}',
        '</div>'
      ].join('');
    },
    tpl_cover_image_zhuanLan: function () {
      console.log('tpl_cover_image_zhuanLan')
      return [
        '<div class="cover-img ${class_name}" style="height:${big_img_height};background-image:url(${big_img});">',
        '  <div class="layer"></div>',
        '  <div class="bottom-cover"></div>',
        '  <div class="little-thumb" style="background-image:url(${big_img});"></div>',
        '</div>',
        '<p id="subject_name">',
        '  ${subject_name}',
        '</p>',
        '<div id="subject_desc" class="${has_content}">',
        '${subject_desc}',
        '</div>',
        '<div class="im-intresting">',
        ' <img src="http://wapcdn.thecover.cn/wap/2.0.0/img/icn_subscribe.png">',
        '</div>'
      ].join('');
    },
    // 新闻模板
    tpl_list: function () {
      var tpl = [
        '{@each list as item}',
        // 单图
        '{@if item.kind == 1}',
        '<section class="news-items is-single-img">',
        '    <a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')">',
        '    <div class="small-image">',
        '      <img src="${item.img_url}" class="small-image-img">',
        '             <div class="cover-of-single-imgs"></div>',
        '            </div>',
        '    <div class="small-image-title">',
        '                <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '                        <ul>',
        '            <li class="tc-list-source">',
        '              {@if item.label}',
        '                <img src="${item.label | LabelImg}">',
        '                            {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '                        </ul>',
        '                    </div>',
        '                    <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '          ${item.review_count | view_count}',
        '                    </div>',
        '                </div>',
        '        </div>',
        '    </a>',
        '</section>',
        '{@/if}',
        // 视频
        '{@if item.kind == 4}',
        '<section class="news-items is-video">',
        '    <a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')">',
        '           {@if item.img_url}',
        '      <div class="thumbnail-wrapper" style="background-image: url(${item.img_url})">',
        '        <div class="btn-play"></div>',
        '        <span class="txt-video-duration">${item.video_time | SecToMin}</span>',
        '      </div>',
        '           {@else}',
        '      <div class="thumbnail-wrapper" style="background-image: url(http://wapcdn.thecover.cn/wap/1.0.0/img/default_news.jpg)">',
        '            <div class="btn-play"></div>',
        '            <span class="txt-video-duration">${item.video_time | SecToMin}</span>',
        '        </div>',
        '    {@/if}',
        '    <div class="big-image-title">',
        '                <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '                        <ul>',
        '                            <li class="tc-list-source">',
        '{@if item.label}',
        ' <img src="${item.label | LabelImg}">',
        '{@/if}',
        '    ${item.source | source}',
        '  </li>',
        '                        </ul>',
        '                    </div>',
        '                    <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量"> ',
        '          ${item.review_count | view_count}',
        '                    </div>',
        '                </div>',
        '            </div>',
        '    </a>',
        '</section>',
        '{@/if}',
        // 单大图
        '{@if item.kind == 15 | item.kind == 7 | item.kind == 8 | item.kind == 9 | item.kind == 11 | item.kind == 12| item.kind == 16| item.kind == 17}',
        '<section class="news-items is-single-big-img">',
        '  {@if item.subject_id}',
        '  <a href="${item.subject_id, item.flag | Link}">',
        '  {@else}',
        '    <a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')">',
        '  {@/if}',
        '    {@if item.img_url}',
        '      <div class="thumbnail-wrapper" style="background-image: url(${item.img_url})"></div>',
        '    {@else}',
        '      <div class="thumbnail-wrapper" style="background-image: url(http://wapcdn.thecover.cn/wap/1.0.0/img/default_news.jpg)"></div>',
        '    {@/if}',
        '    <div class="big-image-title">',
        '                <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '                        <ul>',
        '                            <li class="tc-list-source">',
        '                               {@if item.label}',
        '                                <img src="${item.label | LabelImg}">',
        '                               {@/if}',
        '    ${item.source | source}',
        '  </li>',
        '                        </ul>',
        '                    </div>',
        '                    <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '          ${item.review_count | view_count}',
        '                    </div>',
        '                </div>',
        '            </div>',
        '    </a>',
        '</section>',
        '{@/if}',
        // 2：多图，3：图集
        '{@if item.kind == 2 || item.kind == 3}',
        '<section class="news-items">',
        '    <a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')">',
        '    <div class="small-image tc-list-atlasitem">',
        '            <h3>${item.news_title}</h3>',
        '            <div class="tc-list-atlas">',
        '                ${item.imgsUrl | imgs}',
        '            </div>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '                    <ul>',
        '                        {@if item.kind == 3}',
        '                        <li class="tc-list-atlastag tc-list-tag">图集</li>',
        '                        {@/if}',
        '              <li class="tc-list-source">',
        '            {@if item.label}',
        '              <img src="${item.label | LabelImg}">',
        '            {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '                    </ul>',
        '                </div>',
        '                <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '          ${item.review_count | view_count}',
        '                </div>',
        '            </div>',
        '        </div>',
        '    </a>',
        '</section>',
        '{@/if}',
        '{@if item.kind == 0}', // 无图
        '<section class="news-items no-img">',
        '    <a href="${item.news_id, item.flag | Link}" onclick="COVER.jumpToExternalLink(\'${item.flag + ("_") + item.news_id}\')">',
        '    <div class="no-image-title">',
        '            <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '                    <ul>',
        '            <li class="tc-list-source">',
        '              {@if item.label}',
        '                <img src="${item.label | LabelImg}">',
        '              {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '                    </ul>',
        '                </div>',
        '                <div class="tc-list-imgread">',
        '                    <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量"> ${item.review_count | view_count}',
        '                </div>',
        '            </div>',
        '        </div>',
        '    </a>',
        '</section>',
        '{@/if}',
        '{@/each}'
      ].join('');
      return tpl;
    }
  };
  app.init();
});