define(function (require) {
  var urlId = COVER.getUrl('id') || 9, // 取得id
      urlType = COVER.getUrl('type') || 1, // 取得type
      isData = true, // 是否有数据
      last_news_id = '',
      page = 1; // 页码
  // 验证id、type是否为数值
  if (isNaN(urlId) || isNaN(urlType)) {
    COVER.errorMsg('参数错误！');
    COVER.skip('index.html');
    return false;
  }
  require('jquery');
  require('swipe');
  var jQ = jQuery;
  var app = {
    init: function () {
      var self = this;
      COVER.juicer_register(juicer);
      self.setDimensions();
      self.initTpl().then(function() {
        jQ('.transparent').removeClass('transparent');
      });
      self.share();
      COVER.backTop();
      jQ('.DownloadApp').on('click', function () {
        COVER.downloadApp();
      });

      // 监听是否滑动到底部
      jQ(window).scroll(function () {
        if (page <= 3) {
          var scrollTop = jQ(this).scrollTop(),
              scrollHeight = jQ(document).height(),
              windowHeight = jQ(this).height();
          if (scrollTop + windowHeight == scrollHeight && isData == true) {
            self.SectionRender();
          }
        } else {
          if (isData == true) {
            jQ('.load-more').text('点击或上拉加载更多');
            jQ('.tc-footer').show();
            jQ('.tc-back-top').css('bottom', '7.0rem');
          }
        }
      });
      // 点击加载更多
      jQ('body').on('click', '.load-more', function () {
        jQ(this).text('正在加载更多的数据');
        self.SectionRender();
      });
      jQ('img').on('error', function () {
        jQ(this).attr('src', "http://wapcdn.thecover.cn/wap/1.0.0/img/default_news.jpg");
      });
    },
    initTpl: function () {
      if (urlId == 9) {
        this.BannerRender();
      }
      return this.SectionRender();
    },
    setDimensions: function () {
      var img_w = jQ('#list_of_news').width() / 2;
      var img_h = parseInt(img_w / 4 * 3);
      var single_big_img_h = parseInt(jQ('#list_of_news').width() / 16 * 9);
      var banner_h = parseInt(jQ(window).width() * 0.75);
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
    // banner渲染
    BannerRender: function () {
      var self = this;
      COVER.$post(COVER.apis().getBarNews, {}).then(function (data) {
        console.log('getBarNews() => ', data);
        jQ('#bannerbox').html(juicer(self.bannerTpl(), data)).promise().then(function() {
          return self.banner();
        });
      });
    },
    // 新闻列表渲染
    SectionRender: function () {
      var tpl = this.tpl_list();
      // 如果是视频频道
      if (urlType == 3) {
        tpl = this.videoTpl();
      }
      var payload = {
        'third_id': COVER.getUrl('UUID'),
        'data': JSON.stringify({
          'page_size': 50
        })
      };
      if (last_news_id) {
        payload = {
          'third_id': COVER.getUrl('UUID'),
          'data': JSON.stringify({
            'page_size': 50,
            'news_id': last_news_id
          })
        };
      }
      return COVER.$post(COVER.apis().getRecommendNews, payload).then(function (data) {
        var dleng = data.list.length;
        if (dleng == 0) {
          jQ('.tc-footer').show();
          jQ('.load-more').text('已经全部加载完毕').show();
          jQ('.tc-back-top').css('bottom', '7.0rem');
          isData = false;
          return false;
        }
        page++;
        last_news_id = data.last_news_id;
        jQ('.load-more').text('加载更多...');
        return jQ('#list_of_news').append(juicer(tpl, data)).promise();
      });
    },
    // banner逻辑控制
    banner: function () {
      var $dot = jQ('.swipe-dot ul li');
      $dot.eq(0).addClass('no');
      window.mySwipe = Swipe(document.getElementById('banner'), {
        startSlide: 0,
        speed: 400,
        auto: 5000,
        continuous: true,
        disableScroll: false,
        stopPropagation: true,
        callback: function (index, elem) {
          for (var i = 0; i < $dot.length; i++) {
            $dot.eq(i).removeClass('no');
          }
          $dot.eq(index).addClass('no');
        }
      });
    },
    share: function () {
      var sharedata = {
        'title': '封面新闻-因人而异',
        'link': window.location.href,
        'imgUrl': 'http://wapcdn.thecover.cn/wap/1.0.0/img/share_logo.png',
        'desc': '封面新闻-因人而异'
      };
    },
    // 新闻模板
    tpl_list: function () {
      var tpl = [
        '{@each list as item}',
        // 单图
        '{@if item.kind == 1}',
        '<section class="news-items is-single-img">',
        '  <a href="${item.news_id, item.flag | Link}">',
        '    <div class="small-image">',
        '      <img src="${item.img_url}" class="small-image-img">',
        '      <div class="cover-of-single-imgs"></div>',
        '    </div>',
        '    <div class="small-image-title">',
        '      <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '          <ul>',
        '            <li class="tc-list-source">',
        '              {@if item.label}',
        '                <img src="${item.label | LabelImg}">',
        '              {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '          </ul>',
        '        </div>',
        '        <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '          ${item.review_count | view_count}',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </a>',
        '</section>',
        '{@/if}',
        // 视频
        '{@if item.kind == 4}',
        '<section class="news-items is-video">',
        '  <a href="${item.news_id, item.flag | Link}">',
        '    {@if item.img_url}',
        '      <div class="thumbnail-wrapper" style="background-image: url(${item.img_url})">',
        '        <div class="btn-play"></div>',
        '        <span class="txt-video-duration">${item.video_time | SecToMin}</span>',
        '      </div>',
        '    {@else}',
        '      <div class="thumbnail-wrapper" style="background-image: url(http://wapcdn.thecover.cn/wap/1.0.0/img/default_news.jpg)">',
        '        <div class="btn-play"></div>',
        '        <span class="txt-video-duration">${item.video_time | SecToMin}</span>',
        '      </div>',
        '    {@/if}',
        '    <div class="big-image-title">',
        '      <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '          <ul>',
        '            <li class="tc-list-source">',
        '            {@if item.label}',
        '            <img src="${item.label | LabelImg}">',
        '            {@/if}',
        '            ${item.source | source}',
        '            </li>',
        '          </ul>',
        '        </div>',
        '        <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量"> ',
        '          ${item.review_count | view_count}',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </a>',
        '</section>',
        '{@/if}',
        // 单大图
        '{@if item.kind == 15 | item.kind == 7 | item.kind == 8 | item.kind == 9 | item.kind == 11 | item.kind == 12| item.kind == 16| item.kind == 17}',
        '<section class="news-items is-single-big-img">',
        '  {@if item.subject_id}',
        '  <a href="${item.subject_id, item.flag | Link}">',
        '  {@else}',
        '  <a href="${item.news_id, item.flag | Link}">',
        '  {@/if}',
        '    {@if item.img_url}',
        '      <div class="thumbnail-wrapper" style="background-image: url(${item.img_url})"></div>',
        '    {@else}',
        '      <div class="thumbnail-wrapper" style="background-image: url(http://wapcdn.thecover.cn/wap/1.0.0/img/default_news.jpg)"></div>',
        '    {@/if}',
        '    <div class="big-image-title">',
        '      <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '          <ul>',
        '            <li class="tc-list-source">',
        '              {@if item.label}',
        '                <img src="${item.label | LabelImg}">',
        '              {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '          </ul>',
        '        </div>',
        '        <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '          ${item.review_count | view_count}',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </a>',
        '</section>',
        '{@/if}',
        // 2：多图，3：图集
        '{@if item.kind == 2 || item.kind == 3}',
        '<section class="news-items">',
        '  <a href="${item.news_id, item.flag | Link}">',
        '    <div class="small-image tc-list-atlasitem">',
        '      <h3>${item.news_title}</h3>',
        '      <div class="tc-list-atlas">',
        '        ${item.imgsUrl | imgs}',
        '      </div>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '          <ul>',
        '            {@if item.kind == 3}',
        '              <li class="tc-list-atlastag tc-list-tag">图集</li>',
        '            {@/if}',
        '              <li class="tc-list-source">',
        '            {@if item.label}',
        '              <img src="${item.label | LabelImg}">',
        '            {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '          </ul>',
        '        </div>',
        '        <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量">',
        '          ${item.review_count | view_count}',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </a>',
        '</section>',
        '{@/if}',
        '{@if item.kind == 0}', // 无图
        '<section class="news-items no-img">',
        '  <a href="${item.news_id, item.flag | Link}">',
        '    <div class="no-image-title">',
        '      <h3>${item.news_title}</h3>',
        '      <div class="news-items-meta">',
        '        <div class="news-items-meta-prop">',
        '          <ul>',
        '            <li class="tc-list-source">',
        '              {@if item.label}',
        '                <img src="${item.label | LabelImg}">',
        '              {@/if}',
        '              ${item.source | source}',
        '            </li>',
        '          </ul>',
        '        </div>',
        '        <div class="tc-list-imgread">',
        '          <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png" alt="阅读量"> ${item.review_count | view_count}',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </a>',
        '</section>',
        '{@/if}',
        '{@/each}'
      ].join('');
      return tpl;
    },
    // 视频模板
    videoTpl: function () {
      var tpl = [
        '{@each list as item}',
        '<section class="news-items is-video">',
        '  <a href="${item.news_id, item.flag | Link}">',
        '    <div class="small-image">',
        '      <div class="tc-list-videoitem">',
        '        <img src="${item.img_url}" class="tc-list-videoimg">',
        '        <div class="btn-player"></div>',
        '      </div>',
        '      <div class="big-image-title">',
        '            <h3>${item.news_title}</h3>',
        '            <div class="news-items-meta">',
        '            <div class="news-items-meta-prop">',
        '                <ul>',
        '                    <li class="tc-list-source">${item.source | source}</li>',
        '                </ul>',
        '            </div>',
        '            <div class="tc-list-imgread">',
        '                <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/ege-icon.png">',
        '                ${item.review_count | view_count}',
        '            </div>',
        '            </div>',
        '       </div>',
        '    </div>',
        '    </a>',
        '</section>',
        '{@/each}'
      ].join('');
      return tpl;
    },
    bannerTpl: function () {
      var tpl = [
        '<div id="banner" class="swipe">',
        '  <div class="swipe-wrap">',
        '    {@each banner as item} ',
        '      {@if item.kind != 0}',
        '        <div>',
        '            {@if item.subject_id}',
        '              <a class="swipe-a" href="${item.subject_id, item.flag | Link}" style="background-image:url(${item.img_url})">',
        '            {@else}',
        '              <a class="swipe-a" href="${item.news_id, item.flag | Link}" style="background-image:url(${item.img_url})">',
        '            {@/if}',
        '            <div class="swipe-text">',
        '               {@if item.label}',
        '                 {@if !(item.flag == 5) || !(item.flag !== 13)}',
        '                   <span class="label-txt">${item.label | LabelTxt}</span>',
        '                 {@/if}',
        '               {@/if}',
        '               ${item.news_title | Trimming}',
        '            </div>',
        '          </a>',
        '        </div>',
        '      {@/if} ',
        '    {@/each}',
        '  </div>',
        '  <div class="swipe-dot">',
        '    <ul>',
        '      {@each banner as item}',
        '        {@if item.kind != 0}',
        '          <li></li>',
        '        {@/if}',
        '      {@/each}',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('');
      return tpl;
    }
  };
  app.init();
});