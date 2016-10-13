define(function (require) {
  require('socket');
  require('swipe');
  var cards = require('cards');
  //$.noConflict();
  var jQ = jQuery;
  var css_string = '.card,.one-comment,img{height:auto;width:100%}#brief,#nav,#nav li,#naved_container,.bc-purple{position:relative}#img_gallery_cover #slider,#nav>div img,img{vertical-align:middle}#maybe_pushed_down.hidden,#video_wrapper.hidden,.replies-list.hidden{visibility:hidden}img{max-height:100%}.unselectable{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#the_page_of_live_casting{-webkit-tap-highlight-color:transparent;padding-bottom:.375rem}#the_page_of_live_casting.disable-scroll{overflow:hidden!important;padding:0!important}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes rotateIn{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate3d(0,0,1,-200deg);transform:rotate3d(0,0,1,-200deg);opacity:0}100%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateIn{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate3d(0,0,1,-200deg);transform:rotate3d(0,0,1,-200deg);opacity:0}100%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:none;transform:none;opacity:1}}.rotateIn{-webkit-animation-name:rotateIn;animation-name:rotateIn}.video-only-casting #what_people_said{display:block}.video-only-casting #nav_tabs,.with-video #brief{display:none}.video-only-casting #comments_container{display:block!important}#brief.hidden,#nav>div.hidden,#nav>ul.hidden,#the_page_of_live_casting .container.hidden{display:none}#maybe_pushed_down{padding-top:.375rem}.bc-purple{border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;background-color:#f4f7ff}#comments_container,#nav,.card,.one-comment{background-color:#fff}#brief{color:#20317d;font-size:.6875rem;line-height:1.125rem;font-weight:400;padding:.0625rem .78125rem}.pic-and-text-only-casting #brief{padding:1.0625rem .78125rem}#comments_container{border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}#cards_container{background-color:#f5f7ff}#cards_container.transparent .card{opacity:0}.card,.one-comment{color:#373737;overflow:hidden;padding:.5625rem;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:0 3px 3px 0 rgba(225,234,255,.5);-moz-box-shadow:0 3px 3px 0 rgba(225,234,255,.5);box-shadow:0 3px 3px 0 rgba(225,234,255,.5);margin-bottom:.40625rem;-webkit-transition:opacity .1s ease-in;-moz-transition:opacity .1s ease-in;-ms-transition:opacity .1s ease-in;-o-transition:opacity .1s ease-in;transition:opacity .1s ease-in}.one-comment{padding:.5625rem 0;margin-bottom:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;border-bottom:1px solid #E6E6E6}.one-comment:last-of-type{border-bottom:none}.card .header,.one-comment .header{text-align:left;margin-bottom:.5625rem;height:1.75rem;line-height:1.75rem;font-size:.71875rem}.one-comment .header{font-size:.625rem;text-align:left}.card .card-text,.one-comment .card-text{font-size:.75rem;line-height:1.109375rem;word-wrap:break-word}.one-comment .card-text{padding-left:2.125rem;font-size:.71875rem;text-align:left}.card .imgs,.one-comment .imgs{width:100%;max-height:4.6875rem;overflow:hidden}.card .imgs .img,.one-comment .imgs .img{margin:0 1% 0 auto;max-width:33%;height:4.6875rem;opacity:1;-webkit-transition:opacity 150ms ease-in;-moz-transition:opacity 150ms ease-in;-ms-transition:opacity 150ms ease-in;-o-transition:opacity 150ms ease-in;transition:opacity 150ms ease-in}.card .imgs .img:last-of-type,.one-comment .imgs .img:last-of-type{margin-right:0}.card .imgs .img.hidden{opacity:0}.card .avatar,.one-comment .avatar{width:1.75rem;height:1.75rem;margin-right:.375rem;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%}.card .timstamp,.one-comment .timstamp{float:right;color:#a3a3a3;font-size:.4375rem}#nav,#nav>div,#nav>ul{width:100%;height:2.1875rem}#nav>div{color:#474747;font-size:.71875rem;line-height:2.1875rem;padding:0 .625rem}#nav>div img{display:inline-block;height:1rem;margin-right:.3rem;width:auto}#nav li,#nav li span{display:inline-block;height:2.1875rem;line-height:2.1875rem}#nav{margin-top:.40625rem;border-bottom:1px solid #e6e6e6;margin-bottom:.375rem;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:0 -2px 10px 3px #E1EAFF;-moz-box-shadow:0 -2px 10px 3px #E1EAFF;box-shadow:0 -2px 10px 3px #E1EAFF}.pic-and-text-only-casting #nav{margin-top:0}#nav li{width:50%;float:left}#nav li span{font-size:.71875rem;text-align:center;position:absolute;color:#373737;border-bottom:.09375rem solid transparent;-webkit-transition:all .2s ease-in;-moz-transition:all .2s ease-in;-ms-transition:all .2s ease-in;-o-transition:all .2s ease-in;transition:all .2s ease-in;left:20%;width:60%}#the_page_of_live_casting.pic-and-text-only-casting #video_wrapper.hidden,#what_people_said{display:none}#nav li.active span{border-bottom:.09375rem solid #ff2726;color:#ff2726}#nav li span .counts-of-comments,#what_people_said .counts-of-comments{font-size:.53125rem;font-style:normal;margin-left:.35rem;line-height:2.1875rem;vertical-align:middle}#the_page_of_live_casting.with-video #maybe_fixed_position{width:100%;position:fixed;top:0;left:0;padding-top:.375rem;z-index:100;padding-left:.3125rem;padding-right:.3125rem;background-color:#f4f7ff}#maybe_fixed_position{position:relative;top:0}#video_wrapper{position:relative;margin:0 auto;width:100%;max-width:100%;height:auto}#the_page_of_live_casting.inside-app #video_wrapper{display:none!important}#video_wrapper video{width:100%;max-width:100%;height:100%;max-height:100%;background-color:#000;position:relative;z-index:100}#video_wrapper #tip_cover{width:100%;height:100%;position:absolute;top:0;left:0;bottom:0;right:0;background-color:#000;color:#fff;text-align:center;z-index:0}#video_wrapper #tip_cover.reveal{z-index:200}#video_wrapper .controls-bar{position:absolute;bottom:0;width:100%;left:0;right:0;height:2rem;background-color:rgba(0,0,0,.4);z-index:101}#video_wrapper .controls-bar .counts-of-viewers{border:1px solid #fff;line-height:.8125rem;font-size:.71875rem;color:#fff;height:1rem;padding:0 .25rem;position:absolute;top:.5rem;right:.75rem}#video_wrapper .controls-bar .counts-of-viewers.hidden,#video_wrapper .controls-bar.hidden{display:none}#video_wrapper .enter-fullscreen-button{position:absolute;background:url(http://wapcdn.thecover.cn/wap/1.0.0/img/fullscreen_video_btn.png) no-repeat;background-size:contain;width:1.34375rem;height:1.40625rem;top:.296875rem;left:.75rem;display:none!important}video::-webkit-media-controls{display:none!important}video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}#video_wrapper .play-button{position:absolute;z-index:101;top:50%;left:50%;width:78px;height:78px;background:url(http://wapcdn.thecover.cn/wap/1.0.0/img/play_video.png) center center no-repeat;border:none;box-shadow:none;margin-top:-39px;margin-left:-39px}#video_wrapper .play-button.hidden{display:none}.page-live-casting .tc-talkitem{padding-left:2.7rem}.replies-list{padding:0 .5625rem}#img_gallery_cover{display:none;position:fixed;background-color:#000;z-index:1000;top:0;bottom:0;left:0;right:0;width:100%}#img_gallery_cover.reveal{display:block;overflow:hidden}#img_gallery_cover #slider{width:100%;max-width:100%;max-height:100%;position:absolute;top:50%}#img_gallery_cover #slider .a-single-image-wrapper{background-color:#000;background-repeat:no-repeat;background-position:center;-webkit-background-size:contain;background-size:contain}.index-of-images{color:#fff;text-align:center;font-size:.75rem;line-height:.75rem;width:100%;position:absolute;top:.75rem;left:0}#img_gallery_cover .swipe{overflow:hidden;visibility:hidden;position:relative}#img_gallery_cover .swipe-wrap{overflow:hidden;position:relative;background-color:#000}#img_gallery_cover .swipe>div{float:left;width:100%;position:relative}#the_page_of_live_casting .notalk{font-size:.7rem}#the_page_of_live_casting.inside-app .DownloadApp{display:none!important}';
  var app = (function () {
    var deviceid = COVER.getUrl('deviceid') || 'from_wap';
    var news_id = COVER.getUrl('news_id');
    var app_self = this;
    COVER.juicer_register(juicer);
    var render = function (action, conf, $container) {
      var self = this;
      var $html = jQ('<div></div>');
      var need_sorting = cards.getLocalOrders().equals(conf.orders) == false;
      // console.log('render(', action, ', 需要重新排序=', need_sorting, ', conf: ', JSON.stringify(conf), '$container: ', $container, ')');
      // 增加新段落与恢复段落 逻辑一致
      if (action === 'append' || action === 'restore') {
        cards.appendACard(conf);
        if (need_sorting) {
          cards.reOrderCards(conf.orders);
        }
        $container.addClass('transparent').empty();
        jQ.each(cards.getLocalCards(), function (idx, el) {
          $html.append(cards.generateCardDOM(el))
        });
        return $container.append($html).promise().then(function () {
          $container.removeClass('transparent');
        }).promise();
      } // 移除/删除段落 逻辑一致
      else if (action === 'remove' || action === 'delete') {
        cards.removeACard(conf);
        cards.reOrderCards(conf.orders);
        $container.addClass('transparent').empty();
        jQ.each(cards.getLocalCards(), function (idx, el) {
          $html.append(cards.generateCardDOM(el))
        });
        return $container.append($html).promise().then(function () {
          $container.removeClass('transparent');
        }).promise();
      } // 更新指定的段落
      else if (action === 'update') {
        cards.updateACard(conf);
        if (need_sorting) {
          cards.reOrderCards(conf.orders);
        }
        $container.addClass('transparent').empty();
        jQ.each(cards.getLocalCards(), function (idx, el) {
          $html.append(cards.generateCardDOM(el))
        });
        return $container.append($html).promise().then(function () {
          $container.removeClass('transparent');
        }).promise();
      } // 初始化
      else if (action === 'init') {
        // 初始化--拉取所有信息
        conf.title && (document.title = '封面直播-' + conf.title);
        if (conf.orders && conf.sections) {
          // console.log('传入卡片数据有顺序[]和卡片[]');
          cards.setLocalCards(conf.sections);
          cards.setLocalOrders(conf.orders);
          //debugger;
          $container.addClass('transparent').empty();
          //debugger;
          jQ.each(cards.getLocalCards(), function (idx, el) {
            $html.append(cards.generateCardDOM(el))
          });
          conf.count && jQ('.counts-of-viewers').removeClass('hidden').text(conf.count + '人参与');
          return conf.orders && $container.append($html).removeClass('hidden').removeClass('transparent').promise();
        }
        return $container.removeClass('transparent').promise();
      } // 结束
      else if (action === 'finished') {
        if (need_sorting) {
          cards.reOrderCards(conf.orders);
          $container.addClass('transparent').empty();
          jQ.each(cards.getLocalCards(), function (idx, el) {
            $html.append(cards.generateCardDOM(el))
          });
          return $container.append($html).removeClass('hidden').removeClass('transparent').promise();
        } else {
          return $container.addClass('finished').promise();
        }
      } else if (action === 'update_count') {
        return jQ('.counts-of-viewers').removeClass('hidden').text(conf.count + '人参与').promise();
      } else if (action === 'videoended') {
        return jQ('#video_wrapper').data('video-is-end', 'yes').promise();
      } else if (action === 'new_comment') {
        return renderReplyList('append', conf);
      } else if (action === 'init_comments') {
        return renderReplyList('init', conf);
      } else {
        // console.log(action);
      }
    };
    // 评论模板
    var getCommentsTpl = function () {
      var tpl = [
        '{@each data as item}',
        '<section class="one-comment" id="${item.reply_id}">',
        '  <p class="header">',
        '    <img class="avatar" src="${item.avatar | defavatar}">',
        '    <span class="speaker-name">${item.nickname}</span>',
        '    <span class="timstamp">${item.time}</span>',
        '  </p>',
        '  <div class="card-text">',
        '    ${item.content}',
        '  </div>',
        '</section>',
        '{@/each}'
      ].join('');
      return tpl;
    };
    var sliderTpl = function () {
      var tpl = [
        '{@each data.imgs as image}',
        '<div class="a-single-image-wrapper" style="background-image: url(${image})">',
        //'  <img class="a-single-image" src="${image}">',
         '</div>',
        '{@/each}'
      ].join('');
      return tpl;
    };
    var renderReplyList = function (operation_type, data) {
      // console.log('renderReplyList(', operation_type, ', ', JSON.stringify(data), ')');
      var $comments_container = jQ('#comments_container');
      var tpl = getCommentsTpl();
      data.list.length && $comments_container.data('latest-reply-id', data.list[data.list.length - 1].reply_id);
      jQ('.counts-of-comments').text('(' + data.total + '条)');
      if (data && !data.list.length) {
        //jQ('.replies-list').addClass('hidden');
        if (jQ('body').hasClass('inside-app')) {
          jQ('.replies-list').addClass('notalk').text('还没有人评论过，快去抢沙发吧！');
        } else {
          jQ('.replies-list').addClass('notalk').text('还没有人评论过，快去APP中抢沙发吧！');
        }
      } else {
        //jQ('.replies-list').removeClass('hidden');
      }
      if (operation_type === 'init') {
        return jQ('.replies-list').html(juicer(tpl, {
          data: data.list
        })).promise();
      } else if (operation_type === 'append') {
        return jQ('.replies-list').prepend(juicer(tpl, {
          data: data.list
        })).promise();
      } else {}
    };
    var dispatchMessage = function (action, data, $container) {
      // console.log('dispatchMessage(', 'action: ', action, ', data: ', JSON.stringify(data), ')');
      var parsed_data = data;
      // console.log('localOrders: ', cards.getLocalOrders());
      // console.log('data.orders: ', parsed_data.orders);
      return render(action, parsed_data, $container).then(function () {
        parsed_data.orders && cards.setLocalOrders(parsed_data.orders);
      }).promise();
    };
    return {
      // 获取直播信息
      getCastingInfo: function (data) {
        var timestamp = (new Date().getTime());
        var payload = {
          'deviceid': data.deviceid,
          'timestamp': timestamp,
          'sign': jQ.md5('12345678' + timestamp).toUpperCase(),
          'data': JSON.stringify({
            'news_id': data.news_id
          })
        };
        return COVER.$post(COVER.apis().getCastingInfo, payload);
      },
      // 获取评论信息
      getReplyList: function (data) {
        var $d = jQ.Deferred();
        var timestamp = (new Date().getTime());
        COVER.$post(COVER.apis().getCastingReplyList, {
          'deviceid': data.deviceid,
          'timestamp': timestamp,
          'sign': jQ.md5('12345678' + timestamp).toUpperCase(),
          'data': JSON.stringify({
            'news_id': data.news_id,
            'reply_id': data.reply_id,
            'page_size': data.page_size
          })
        }).then(function (data) {
          // console.log('获取评论信息 return: ', data);
          if (data.list.length === 0) {
            $d.resolve(false);
          } else {
            return $d.resolve(data);
          }
        });
        return $d.promise();
      },
      resetLayout: function () {
        var $upper = jQ('#maybe_fixed_position');
        var $downer = jQ('#maybe_pushed_down');
        // console.log('$upper.height(): ', $upper.height());
        $downer.css({
          'margin-top': $upper.height() + 'px'
        }).removeClass('hidden');
      },
      setUpUI: function (data) {
        // console.log('setUpUI(', JSON.stringify(data), ')');
        var self = this;
        data.title && (document.title = '封面直播-' + data.title);
        data.brief && jQ('#brief').text(data.brief);
        // 移动WAP站是否显示待定
        var need_setUpVideoPlayer = (COVER.device.isWeixin() || COVER.device.isQQ());
        //var need_setUpVideoPlayer = false;
        !need_setUpVideoPlayer && jQ('body').addClass('inside-app');
        // console.log('need_setUpVideoPlayer: ' + need_setUpVideoPlayer);
        if (data.status == 1) {
          // console.log('直播进行中');
          jQ('body').addClass('live-casting');
          if (data.kind > 7) {
            // console.log('有视频播放器');
            jQ('body').addClass('with-video');
            self.setUpVideoPlayer(need_setUpVideoPlayer, data.video_url, data.count).then(function () {
              // console.log('设置视频播放器成功: ');
              need_setUpVideoPlayer && jQ('#video_wrapper').removeClass('hidden');
              self.resetLayout();
              self.revealBody();
            }, function ($maybe_fixed_position) {
              // console.log('设置视频播放器失败: ', $maybe_fixed_position);
              self.resetLayout();
              need_setUpVideoPlayer && jQ('#video_wrapper').removeClass('hidden');
            });
          }
          if (data.kind == 7) {
            // console.log('纯图文直播');
            jQ('body').addClass('pic-and-text-only-casting');
          }
          if (data.kind == 8) {
            // console.log('纯视频直播');
            jQ('body').addClass('video-only-casting');
            self.revealBody();
          }
          self.bindEvents(jQ('#naved_container'), io.connect(data.socket_url), data.join_key);
        } else {
          // 直播结束
          // console.log('直播结束');
          jQ('body').addClass('dead-casting');
          // console.log('data.kind: ', data.kind);
          if (data.kind > 7) {
            // 假视频容器
            // console.log('假视频容器');
            jQ('body').addClass('with-video');
            jQ('#maybe_pushed_down').css({
              'margin-top': self.setUpFakeVideoPlayer(need_setUpVideoPlayer, jQ('body').width()).h + 'px'
            }).promise().then(function () {
              jQ('#maybe_pushed_down').removeClass('hidden');
              jQ('#video_wrapper').removeClass('hidden');
            });
            self.revealBody();
          }
          if (data.kind == 7) {
            jQ('body').addClass('pic-and-text-only-casting');
          }
          if (data.kind == 8) {
            // console.log('纯视频直播');
            jQ('body').addClass('video-only-casting');
          } else {
            // console.log('有图文');
            self.bindEvents(jQ('#naved_container'), false);
            dispatchMessage('init', data, jQ('#cards_container')).then(function () {
              jQ('#maybe_pushed_down').removeClass('hidden');
            });
          }
          // console.log('获取评论列表');
          self.getReplyList({
            'deviceid': deviceid,
            'news_id': news_id,
            'reply_id': jQ('#comments_container').data('latest-reply-id'),
            'page_size': 100
          }).then(function (result) {
            renderReplyList('init', result);
          });
        }
      },
      setUpVideoPlayer: function (need_setUpVideoPlayer, src, count) {
        // console.log('设置播放器(', src, count, ')');
        var d = jQ.Deferred();
        if (!need_setUpVideoPlayer) {
          d.resolve();
          return d.promise();
        }
        var reload_limits = 3;
        var $same_height = jQ('.same-height');
        var $big_wrapper = jQ('#maybe_fixed_position');
        var $video_wrapper = jQ('#video_wrapper');
        var $fake_video_wrapper = jQ('#fake_video_wrapper');
        var $video = $video_wrapper.find('video').prop('src', src);
        var $tip = $video_wrapper.find('#tip_cover');
        var $play_btn = $video_wrapper.find('.play-button');
        var $control_bar = $video_wrapper.find('.controls-bar');
        var $enterFullScreen_btn = $video_wrapper.find('.enter-fullscreen-button');
        var error_timeout = function (v) {
          setTimeout(function () {
            if (reload_limits-- <= 0) {
              clearTimeout(error_timeout);
              $tip.addClass('reveal');
            } else {
              v.load();
            }
          }, 3000);
        };
        var v = $video.get(0);
        var fixed_height = jQ('body').width() * 9 / 16;
        v.play();
        $same_height.height(fixed_height + 'px');
        $tip.css({
          'line-height': fixed_height + 'px'
        });
        $video.one('loadedmetadata', function () {});
        $video.one('canplaythrough canplay', function () {
          d.resolve($big_wrapper);
          $play_btn.removeClass('hidden').promise().then(function () {
            $play_btn.addClass('rotateIn animated');
          });
        });
        $video.on('error ended', function () {
          // console.log('video on error ended');
          error_timeout(v);
          d.reject($big_wrapper);
          if (!$big_wrapper.hasClass('hidden')) {
            //jQ('#maybe_pushed_down').css({
            //  'margin-top': $big_wrapper.height() + 'px'
            //})
          }
          if ($video_wrapper.data('video-is-end') === 'yes') {
            reload_limits = 0;
            $tip.css({
              'line-height': fixed_height + 'px'
            }).text('视频直播已完结').addClass('reveal');
          }
        });
        $video.on('pause', function () {
          // console.log('video onpause');
          $video_wrapper.addClass('pause');
          $control_bar.removeClass('hidden');
          $play_btn.removeClass('hidden').promise().then(function () {
            $play_btn.addClass('rotateIn animated');
          });
        });
        // $video.on('ended', function () {
        // });
        $video.on('click', function () {
          // console.log('$video onclick');
          if (v.paused) {
            v.play();
            $video_wrapper.removeClass('pause');
            $control_bar.addClass('hidden');
          } else {
            v.pause();
            $play_btn.addClass('rotateIn animated');
            $control_bar.removeClass('hidden');
          }
        });
        $play_btn.on('click', function () {
          if (v.paused) {
            v.play();
            jQ(this).addClass('hidden');
            $video_wrapper.removeClass('pause');
            $control_bar.addClass('hidden');
          } else {
            v.pause();
            $play_btn.removeClass('hidden').promise().then(function () {
              $play_btn.addClass('rotateIn animated');
              $control_bar.removeClass('hidden');
            });
          }
        });
        //$enterFullScreen_btn.on('click', function () {
        //  if (v.requestFullscreen) {
        //    v.requestFullscreen();
        //  } else if (v.msRequestFullscreen) {
        //    v.msRequestFullscreen();
        //  } else if (v.mozRequestFullScreen) {
        //    v.mozRequestFullScreen();
        //  } else if (v.webkitRequestFullscreen) {
        //    v.webkitRequestFullscreen();
        //  }
        //});
        $tip.on('click', function () {
          jQ(this).removeClass('reveal');
          v.load();
        });
        return d.promise();
      },
      setUpFakeVideoPlayer: function (need_setUpVideoPlayer, w) {
        var $big_wrapper = jQ('#maybe_fixed_position');
        if (!need_setUpVideoPlayer) {
          return {
            'w': $big_wrapper.width(),
            'h': $big_wrapper.height()
          }
        }
        var fixed_height = w * 9 / 16;
        var $same_height = jQ('.same-height');
        var $tip = jQ('#tip_cover');
        $same_height.height(fixed_height + 'px');
        $tip.css({
          'line-height': fixed_height + 'px'
        }).text('视频直播已完结').addClass('reveal');
        // jQ('#fake_video_wrapper').height((w * 9 / 16) + 'px').removeClass('hidden');
        return {
          'w': $big_wrapper.width(),
          'h': $big_wrapper.height()
        }
      },
      revealBody: function () {
        jQ('body').removeClass('hidden').removeClass('transparent');
      },
      isElementInViewport_Vertical: function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.bottom <= this.wH);
      },
      bindEvents: function ($naved_container, socket, join_key) {
        var self = this;
        var dispatchMsg = dispatchMessage;
        var connected = false;
        var joined = false;
        var $cards_container = $naved_container.find('#cards_container');
        var $comments_container = $naved_container.find('#comments_container');
        if (socket) {
          // 所有web socket事件的回调 & 测试数据
          socket.on('connect', function () {
            // console.log('socket on connect');
            connected = true;
            socket.emit('join', join_key);
          });
          // init
          socket.on('init', function (data) {
            // console.log('on init: ', JSON.stringify(data));
            joined = true;
            dispatchMsg('init', data, $cards_container).then(function () {
              self.revealBody();
              jQ('#maybe_pushed_down').removeClass('hidden');
            });
          });
          // append
          socket.on('append', function (data) {
            // console.log('on append: ', JSON.stringify(data));
            dispatchMsg('append', data, $cards_container);
          });
          // restore
          socket.on('restore', function (data) {
            // console.log('on restore: ', JSON.stringify(data));
            dispatchMsg('restore', data, $cards_container);
          });
          // update
          socket.on('update', function (data) {
            // console.log('on update: ', JSON.stringify(data));
            dispatchMsg('update', data, $cards_container);
          });
          // remove
          socket.on('remove', function (data) {
            // console.log('on remove: ', JSON.stringify(data));
            dispatchMsg('remove', data, $cards_container);
            helpers.generateATrashItem(data);
          });
          // delete
          socket.on('delete', function (data) {
            // console.log('on delete: ', JSON.stringify(data));
            dispatchMsg('delete', data, $cards_container);
            helpers.removeATrashItem(data);
          });
          // finish
          socket.on('finished', function (data) {
            // console.log('on finished: ', JSON.stringify(data));
            dispatchMsg('finished', data, $cards_container).then(function () {
              socket.disconnect();
            });
          });
          // 更新参与直播人数
          socket.on('update_count', function (data) {
            // console.log('on update_count: ', JSON.stringify(data));
            dispatchMsg('update_count', data, $cards_container);
          });
          // 视频直播结束
          socket.on('videoended', function (data) {
            // console.log('on videoended: ', JSON.stringify(data));
            dispatchMsg('videoended', data, $cards_container);
          });
          // 初始化拉取评论
          socket.on('init_comments', function (data) {
            // console.log('on init_comments: ', JSON.stringify(data));
            dispatchMsg('init_comments', data, $cards_container);
          });
          // 收到的新评论
          socket.on('new_comment', function (data) {
            // console.log('on new_comment: ', JSON.stringify(data));
            dispatchMsg('new_comment', data, $cards_container);
          });
        } else {
          self.revealBody();
        }
        // 界面控件事件绑定
        jQ('.DownloadApp').on('click', function () {
          COVER.downloadApp();
        });
        jQ('#nav').on('click', 'li', function (evt) {
          evt.preventDefault();
          jQ(this).addClass('active');
          jQ(this).siblings('li').removeClass('active');
          if (jQ(this).prop('id') === 'tab_livecast') {
            $cards_container.removeClass('hidden');
            $comments_container.addClass('hidden');
          } else {
            $cards_container.addClass('hidden');
            $comments_container.removeClass('hidden');
          }
        });
        //jQ('#tab_comments').on('click', function () {
        //  if (jQ(this).data('init') !== false) {
        //    // return self.initTalk();
        //  }
        //});
        $cards_container.on('click', '.card .img', function (evt) {
          evt.preventDefault();
          self.openGallery(jQ(this).data('index'), jQ(this).closest('.imgs').data('imgs'));
        });
      },
      //
      openGallery: function (idx, imgs) {
        var self = this;
        var $gallery = jQ('#img_gallery_cover').addClass('reveal').on('click', function (e) {
          if (jQ(e.target).hasClass('swipe')) {
            return false;
          }
          self.closeGallery();
        });
        var text = jQ('.index-of-images').text((idx + 1) + ' / ' + imgs.length);
        self.renderSlider(idx, imgs);
        jQ('body').addClass('disable-scroll');
      },
      //
      closeGallery: function () {
        jQ('body').removeClass('disable-scroll');
        jQ('#img_gallery_cover .swipe-wrap').empty();
        return jQ('#img_gallery_cover').removeClass('reveal');
      },
      // Slider
      renderSlider: function (idx, imgs) {
        var self = this;
        var h = jQ(window).width() / 11 * 8;
        var html = juicer(sliderTpl(), {
          data: {
            'idx': idx,
            'imgs': imgs
          }
        });
        jQ('#slider').height(h).css({
          'margin-top': (-1 * h / 2) + 'px'
        });
        jQ('#img_gallery_cover .swipe-wrap').html(html).height(h);
        jQ('#img_gallery_cover .a-single-image-wrapper').height(h);
        self.getSlider(idx, imgs);
      },
      // banner逻辑控制
      getSlider: function (idx, imgs) {
        window.mySwipe = Swipe(document.getElementById('slider'), {
          startSlide: idx,
          speed: 150,
          auto: false,
          continuous: false,
          disableScroll: true,
          stopPropagation: true,
          callback: function (index, elem) {
            jQ('.index-of-images').text((index + 1) + ' / ' + imgs.length);
          },
          transitionEnd: function (index, elem) {}
        });
      },
      init: function () {
        jQ('html').css({
          fontSize: (parseInt(jQ('html').css('font-size')) * (72 / 64)) + 'px'
        });
        var self = this;
        jQ('#startload').show();
        jQ('#inserted_via_script').text(css_string);
        self.getCastingInfo({
          'deviceid': deviceid,
          'news_id': news_id
        }).then(function (data) {
          jQ('#startload').hide();
          var sharedata = {
            'title': data.kind && (data.kind >= 11 ? ('VR: [' + data.title + ']') : ('直播: [' + data.title + ']')) || '封面新闻-因人而异',
            'link': window.location.href,
            'imgUrl': data.thumbnail || 'http://wapcdn.thecover.cn/wap/1.0.0/img/share_logo.png',
            'desc': data.brief || '封面新闻-因人而异'
          };
          if (COVER.device.isWeixin()) {
            COVER.openapi.weixin.wx_share(sharedata);
          }
          //console.log('sharedata: ', sharedata);
          self.setUpUI(data);
        }, function () {});
      }
    }
  })();
  app.init();
});