// basic
// seajs 配置
seajs.config({
  base: "./js",
  alias: {
    "swipe": "http://wapcdn.thecover.cn/wap/1.0.0/js/swipe.js",
    "jweixin": "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
    "cards": "http://wapcdn.thecover.cn/wap/1.0.0/js/cards.js",
    "jquery": "http://wapcdn.thecover.cn/wap/1.0.0/js/jquery_with_md5.js",
    "socket": "http://wapcdn.thecover.cn/wap/1.0.0/js/socket.io.js",
    "coverapp": "http://wapcdn.thecover.cn/wap/1.0.0/js/COVERAPP.js?v=1.4.0"
  }
});
var COVER = {
  version: '1.6.0', // 版本
  debug: true,
  // httpUrl: 'http://api.thecover.cn', // 生产接口请求地址
  httpUrl: 'http://121.41.11.40', // 测试接口请求地址
  // livecast_api_base: 'http://livecast.thecover.cn', // 生产直播Ajax接口请求地址
  livecast_api_base: 'http://121.199.34.238:8082', // 测试直播Ajax接口请求地址
  // socketUrl: 'http://livecast.thecover.cn:9092', // 生产直播WebSocket接口地址
  socketUrl: 'http://121.199.34.238:9092', // 测试直播WebSocket接口地址
  DownloadApp: 'downloadApp.html',
  DOWNLOAD_APP_JS: 'https://api.thecover.cn/download.js',
  APP_SCHEME_URL: 'cover://cn.thecover.www/open',
  WEXIN_APP_DOWNLOAD_ADDRESS: "http://a.app.qq.com/o/simple.jsp?pkgname=cn.thecover.www.covermedia", // 微下载地址
  apis: function () {
    var self = this;
    var vno = '?vno=1.2.0&';
    return {
      // 通用
      'getAllChannels': self.httpUrl + '/wap/getAllChannels' + vno, // 请求所有频道信息
      'getList': self.httpUrl + '/wap/getList' + vno, // 查看频道下面新闻
      'getBarNews': self.httpUrl + '/wap/getBarNews' + vno, // 获取首页幻灯片信息
      'getReplayCount': self.httpUrl + '/wap/getReplayCount' + vno, // 获取回复的数量
      //'getReplayInfo': self.httpUrl + '/wap/getReplayInfo' + vno , // 获取回复的信息
      'getWeChatConf': self.httpUrl + '/weixin/getConf' + vno, // 获取微信配置
      // 新接口
      'getFmDaily': self.httpUrl + '/wap/getFmDaily' + vno, // 获取今日封面日报
      'getReplyList': self.httpUrl + '/wap/getReplyList' + vno, // 获取评论列表
      'newsDetail': self.httpUrl + '/wap/getDetail' + vno, // 查看新闻详情
      'getDynamic': self.httpUrl + '/wap/getDynamic' + vno, // 请求新闻详情底部信息
      'getSubject': self.httpUrl + '/wap/getSubject' + vno, // 获取专题列表
      'getRecommendNews': self.httpUrl + '/wap/getRecommendNews' + vno, // 获取推荐频道列表 -- Uber
      // 直播
      'getCastingInfo': self.livecast_api_base + '/api/dataOfLivecasting.json' + vno, // 直播信息(直播初始化)
      'getCastingReplyList': self.livecast_api_base + '/api/comments.json', // 评论信息(直播初始化)
      // 快速分享
      'fetchWeChatConf': self.httpUrl + '/wap/weixin/getAllConf', // 快速分享
      'getWikiProfile': self.httpUrl + '/wap/getWikiProfile' // 快速分享
    };
  },
  // 获取文件名
  fileName: function () {
    var url = window.location.pathname.split('.html')[0].split('/').pop();
    var fileName = this.isEmpty(url) ? 'index' : url;
    return fileName;
  },
  // 判断是否为空
  isEmpty: function (obj) {
    if (obj === '' || obj == null || obj == undefined) {
      return true;
    }
    return false;
  },
  // 获取url参数值
  getUrl: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  // 跳转
  skip: function (url, data) {
    this.amload.load();
    if (!this.isEmpty(data)) {
      localStorage._temp = JSON.stringify(data) || '';
    }
    window.location.href = url;
  },
  // 临时缓存
  cache: function () {
    var temp = localStorage.getItem("_temp") || '';
    localStorage.removeItem("_temp");
    if (this.isEmpty(temp)) {
      return '';
    } else {
      return JSON.parse(temp);
    }
  },
  // 加载动画
  amload: {
    // 显示加载 @depend NProgress
    start: function () {
      NProgress.start();
    },
    // 关闭加载 @depend NProgress
    done: function () {
      NProgress.done();
    },
    // 跳转动画 @depend zepto
    load: function () {
      jQuery('body').append('<div class="tc-load-icon"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsKQGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBpZm9udDsgc3JjOiB1cmwoImh0dHA6Ly9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCJodHRwOi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCJodHRwOi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnR0ZiIpIGZvcm1hdCgidHJ1ZXR5cGUiKSwgdXJsKCJodHRwOi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4xOTUzMTI1LCAwLjE5NTMxMjUpIj48cGF0aCBkPSJNNTEyIDE5Mm0tMTI4IDBhNjQgNjQgMCAxIDAgMjU2IDAgNjQgNjQgMCAxIDAtMjU2IDBaTTE5MiA1MTJtLTk2IDBhNDggNDggMCAxIDAgMTkyIDAgNDggNDggMCAxIDAtMTkyIDBaTTczNiAyODhtLTE2IDBhOCA4IDAgMSAwIDMyIDAgOCA4IDAgMSAwLTMyIDBaTTM2MC4yIDIxNS4yYy0zOS44LTQwLjItMTA0LjQtNDAuMi0xNDQuMiAwLTM5LjggNDAuMi0zOS44IDEwNS40IDAgMTQ1LjYgMzkuOCA0MC4yIDEwNC40IDQwLjIgMTQ0LjIgMEM0MDAgMzIwLjYgNDAwIDI1NS40IDM2MC4yIDIxNS4yek04MzIgNTEybS0zMiAwYTE2IDE2IDAgMSAwIDY0IDAgMTYgMTYgMCAxIDAtNjQgMFpNNzM4IDczOG0tNDggMGEyNCAyNCAwIDEgMCA5NiAwIDI0IDI0IDAgMSAwLTk2IDBaTTUxMiA4MzJtLTY0IDBhMzIgMzIgMCAxIDAgMTI4IDAgMzIgMzIgMCAxIDAtMTI4IDBaTTI4OCA3MzZtLTgwIDBhNDAgNDAgMCAxIDAgMTYwIDAgNDAgNDAgMCAxIDAtMTYwIDBaIiBmaWxsPSIjZWNmMGYxIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="></div>');
    }
  },
  // 错误提示 @depend zepto
  errorMsg: function (msg) {
    var msg = msg || '未知错误';
    jQuery('body').append('<div class="tc-error-msg"><div class="tc-error-msgbody">' + msg + '</div></div>');
    setTimeout(function () {
      jQuery('.tc-error-msg').remove();
    }, 5000);
  },
  // ajax 请求 @depend zepto
  ajax: function (url, data, callback) {
    this.amload.start();
    var self = this;
    data.version = this.version;
    jQuery.ajax({
      type: 'GET',
      url: url,
      data: data,
      dataType: 'json',
      timeout: 30000,
      success: function (s) {
        if (typeof s == "string") {
          var s = JSON.parse(s);
        }
        self.amload.done();
        if (s.status == 0) {
          callback(s);
        } else {
          self.errorMsg(s.msg);
        }
      },
      error: function (xhr, type) {
        self.amload.done();
        self.errorMsg('网络请求失败~');
      }
    });
  },
  $post: function (url, data) {
    var $d = jQuery.Deferred();
    this.amload.start();
    var self = this;
    jQuery.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType: 'json',
      success: function (result) {
        if (parseInt(result.status) === 0) {
          $d.resolve(result.data);
        } else {
          $d.reject(result.status);
        }
      },
      error: function (xhr, type) {
        $d.reject(self.errorMsg('网络请求失败~~~'));
      },
      complete: function (xhr) {
        self.amload.done();
      }
    });
    return $d.promise();
  },
  $getScript: function (url) {
    var $d = jQuery.Deferred();
    jQuery.getScript(url).done(function (data, textStatus, jqxhr) {
      $d.resolve(data);
    }).fail();
    return $d.promise();
  },
  $testGET: function (url, data) {
    var $d = jQuery.Deferred();
    this.amload.start();
    var self = this;
    jQuery.ajax({
      type: 'GET',
      url: url,
      data: data,
      dataType: 'json',
      success: function (result) {
        if (result.status == 0) {
          $d.resolve(result.data);
        } else {
          $d.reject(self.errorMsg('网络请求失败~'));
        }
      },
      error: function (xhr, type) {
        $d.reject(self.errorMsg('网络请求失败~'));
      },
      complete: function (xhr) {
        self.amload.done();
      }
    });
    return $d.promise();
  },
  jumpToExternalLink: function (arg) {
    arg = arg.toString();
    // console.log(arg);
    if (!arg) {
      return 'javascript:void(0)';
    }
    var self = this;
    var flag = parseInt(arg.split('_')[0]);
    var id = parseInt(arg.split('_')[1]);
    if (flag === 10 || flag === 14) {
      return self.$post(self.apis().newsDetail, 'data=' + JSON.stringify({
            news_id: id
          })).then(function (data) {
        console.log(data.external_url);
        return location.href = data.external_url;
      })
    } else {
      return 'javascript:void(0)';
    }
  },
  juicer_register: function (obj) {
    var self = this;
    var linklist = ['news_details.html', 'video_details.html', 'subject.html', 'live_casting.html'];
    // trim string
    obj.register('Trimming', function (txt) {
      return jQuery.trim(txt);
    });
    // 来源缺省值
    obj.register('source', function (source) {
      if (self.isEmpty(source)) {
        return '封面新闻';
      } else {
        return source;
      }
    });
    // 阅读人数格式化
    obj.register('view_count', function (num) {
      if (parseInt(num) < 10000) {
        return parseInt(num);
      } else {
        return ((parseInt(num) / 10000).toFixed(1)) + '万';
      }
    });
    // 新闻图集
    obj.register('imgs', function (imgs) {
      var imglist = '',
        img = imgs.split(';');
      for (var i = 0; i < 3; i++) {
        imglist += '<img src="' + img[i] + '">';
      }
      return imglist;
    });
    // 标签小图标
    obj.register('LabelImg', function (label) {
      // 标签。1：专题，2：热点，3：图集，4：视频,用户客户单决定展示一些小的标签，比如是一个标题啊，是一个热门信息啊， 6:直播中， 7：直播结束， 8：VR, 9:活动， 10：推广
      return 'http://webcdn.thecover.cn/wap/1.2.4/img/label_' + ['', 'subject', '', 'gallery', 'video', '', 'livecasting', 'livecasting', 'vr', 'activity', 'adv', 'local', 'ontop'][label] + '.png';
    });
    // 标签小文本
    obj.register('LabelTxt', function (label) {
      return ['', '专题', '热点', '图集', '视频', '', '直播中', '直播结束', 'VR', '活动', '广告', '本地', '置顶'][label];
    });
    // 字符串截取
    obj.register('infosubstr', function (value, num) {
      return value.substr(0, num);
    });
    // 链接
    obj.register('Link', function (id, flag) {
      //flag	0：无图，1：单图，2：多图，3：图集，4：视频(标示该新闻中有视频),5, 专题(专栏), 用于客户端标志详情页如何跳转 7:图文直播。 8：视频直播，9：视频图文直播， 10：外链，11：VR视频，12VR图片，13:专题(不可订阅) ，14:外链活动 ,15:封面号
      var type = parseInt(flag);
      if (type === 10 || type === 14) {
        return 'javascript:void(0)';
      } else if (type >= 7 && type <= 9) {
        return (linklist[3] + '?news_id=' + id);
      } else if (type === 4 || type === 11) {
        return linklist[1] + '?id=' + id;
      } else if (type === 5 || type === 13) {
        return linklist[2] + '?id=' + id;
      } else {
        return linklist[0] + '?id=' + id;
      }
    });
    // 时间戳格式化分钟
    obj.register('SecToMin', function (totalSec) {
      if (!totalSec) {
        return '';
      }
      var hours = parseInt(totalSec / 3600) % 24;
      var minutes = parseInt(totalSec / 60) % 60;
      var seconds = totalSec % 60;
      if (hours > 0) {
        return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      } else {
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      }
    });
    // 默认用户头像
    obj.register('defavatar', function (v) {
      if (COVER.isEmpty(v)) {
        return 'http://wapcdn.thecover.cn/wap/1.0.0/img/default_avatar.jpg';
      }
      return v;
    });
  },
  // 解码url格式
  decodeUri: function (str) {
    var arr = str.toString().split("+");
    var returnStr = "";
    jQuery.each(arr, function (i, val) {
      returnStr = returnStr + " " + val;
    });
    returnStr = returnStr.substring(1);
    return decodeURIComponent(returnStr);
  },
  // 过滤数据
  safehtml: function (str) {
    return str.replace(/<\/h*[^>]*>/gi, '</p>') // 去掉H*开始标签
      .replace(/<h[^>]*>/gi, '<p>') // 去掉H*结束标签
      .replace(/<a[^>]*>/gi, '<a>') // 去掉a标签中的链接等数据
      .replace(/style="[\s\S]*?"/gi, '') // 去掉style
      .replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi, ''); // 去掉javascript
  },
  // 设备判断
  device: {
    // userAgent
    UA: function () {
      return navigator.userAgent;
    },
    // 判断是否是ios
    isIOS: function () {
      var ua = this.UA();
      if (/iphone/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua)) {
        return true;
      }
      return false;
    },
    // 判断是否是android
    isAndroid: function () {
      var ua = this.UA();
      if (/android/i.test(ua)) {
        return true;
      }
      return false;
    },
    // 判断是否是微信
    isWeixin: function () {
      var ua = this.UA();
      if (/MicroMessenger/i.test(ua)) {
        return true;
      }
      return false;
    },
    // 判断是否是手Q
    isQQ: function () {
      var ua = this.UA();
      if (/qq/i.test(ua)) {
        return true;
      }
      return false;
    }
  },
  // 返回顶部
  backTop: function () {
    var $backtop = jQuery('.tc-back-top');
    var $window = jQuery(window);
    var wH = $window.height();
    if (!COVER.isEmpty($backtop)) {
      $backtop.on('click', function () {
        return jQuery('html, body').animate({
          scrollTop: "0px"
        })
      });
    }
    jQuery(window).on('scroll', function () {
      $window.scrollTop() > wH ? $backtop.addClass('reveal') : $backtop.removeClass('reveal')
    });
  },
  // 返回上一步
  backPrev: function () {
    var history = window.history.go(-1);
    if (this.isEmpty(history)) {
      var backurl = localStorage.getItem('_backurl');
      if (this.isEmpty(backurl)) {
        this.skip('index.html');
      } else {
        this.skip(backurl);
      }
    }
  },
  //  "2014-11-05 15:40:01"
  'convert_time': function (str) {
    if (!str) {
      return '遥远的过去';
    }
    var trimmed_str = str.trim();
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var cur_time = new Date(Date.now() - tzoffset);
    var formatted_str = trimmed_str.split(' ')[0] + 'T' + trimmed_str.split(' ')[1] + '.000Z';
    var tmp_date_is = new Date(formatted_str);
    if (cur_time.getYear() !== tmp_date_is.getYear()) {
      return (cur_time.getYear() - tmp_date_is.getYear()) + '年前';
    } else if (cur_time.getMonth() !== tmp_date_is.getMonth()) {
      return (cur_time.getMonth() - tmp_date_is.getMonth()) + '月前';
    } else if (cur_time.getDate() !== tmp_date_is.getDate()) {
      if ((cur_time.getDate() - tmp_date_is.getDate()) == 1) {
        return '昨天';
      } else {
        return (cur_time.getDate() - tmp_date_is.getDate()) + '天前';
      }
    } else if (cur_time.getHours() !== tmp_date_is.getHours()) {
      return (cur_time.getHours() - tmp_date_is.getHours()) + '小时前';
    } else if (cur_time.getMinutes() !== tmp_date_is.getMinutes()) {
      return (cur_time.getMinutes() - tmp_date_is.getMinutes()) + '分钟前';
    } else if (cur_time.getSeconds() !== tmp_date_is.getSeconds()) {
      return (cur_time.getSeconds() - tmp_date_is.getSeconds()) + '秒前';
    } else {
      return '刚刚';
    }
  },
  //
  'time_tag': function (tag_type, str) {
    var utc_date = new Date(str);
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var d = new Date(utc_date - tzoffset);
    if (tag_type === 'news_detail_subtitle') {
      return (d.toISOString().split('T')[0] + ' ' + d.toISOString().split('T')[1].split('.')[0].split(':')[0] + ':' + d.toISOString().split('T')[1].split('.')[0].split(':')[1]);
    }
  },
  // 在评论内容中渲染自定义表情
  'renderReplyContent': function (str) {
    var cdn_url_base = 'https://wapcdn.thecover.cn/wap/1.6.0/img/';
    var key_arr = [{
      '困': cdn_url_base + 'emotion_kun.png'
    }, {
      '笑cry': cdn_url_base + 'emotion_xiaocry.png'
    }, {
      '卖萌': cdn_url_base + 'emotion_maimeng.png'
    }, {
      '发怒': cdn_url_base + 'emotion_fanu.png'
    }, {
      '可怜': cdn_url_base + 'emotion_kelian.png'
    }, {
      '呕吐': cdn_url_base + 'emotion_outu.png'
    }, {
      '坏笑': cdn_url_base + 'emotion_huaixiao.png'
    }, {
      '大笑': cdn_url_base + 'emotion_daxiao.png'
    }, {
      '害羞': cdn_url_base + 'emotion_haixiu.png'
    }, {
      '尴尬': cdn_url_base + 'emotion_ganga.png'
    }, {
      '得意': cdn_url_base + 'emotion_deyi.png'
    }, {
      '微笑': cdn_url_base + 'emotion_weixiao.png'
    }, {
      '流汗': cdn_url_base + 'emotion_liuhan.png'
    }, {
      '流泪': cdn_url_base + 'emotion_liulei.png'
    }, {
      '爱心': cdn_url_base + 'emotion_aixin.png'
    }, {
      '生气': cdn_url_base + 'emotion_shengqi.png'
    }, {
      '白眼': cdn_url_base + 'emotion_baiyan.png'
    }, {
      '耍酷': cdn_url_base + 'emotion_shuaku.png'
    }, {
      '花痴': cdn_url_base + 'emotion_huachi.png'
    }, {
      '鼻血': cdn_url_base + 'emotion_bixue.png'
    }];

    for (var i = 0; i < key_arr.length; i++) {
      //var key = Object.keys(key_arr[i])[0];
      //var regexp = new RegExp('\\[' + key + '\\]', 'gi');
      //var replacer = key_arr[i][key];
      //console.log(new RegExp('\\[' + Object.keys(key_arr[i])[0] + '\\]', 'gi'));
      str = str.replace((new RegExp('\\[' + Object.keys(key_arr[i])[0] + '\\]', 'gi')), ('<img src="' + key_arr[i][Object.keys(key_arr[i])[0]] + '" class="custom-emoji-in-replys">'));
    }
    //console.log('L507: ', str);
    return str;
  },
  // 初始化事件
  initEvent: function () {
    try {
      var self = this;
      // 关闭底部下载事件
      var $close = document.getElementById('foot-close-btn');
      if (!self.isEmpty($close)) {
        $close.onclick = function () {
          document.getElementById('foot-download').style.display = 'none';
          document.querySelector('body').style.paddingBottom = '0';
        };
      }
      // 适配屏幕字体大小
      var swidth = document.body.clientWidth;
      swidth > 720 ? swidth = 720 : swidth = swidth;
      var prop = (swidth / 320) * 16;
      document.querySelector('html').style.fontSize = prop + 'px';
      // 跳转页面动画 @depend zepto
      jQuery('body').on('click', 'a', function () {
        localStorage.setItem('_backurl', window.location.href);
        //setTimeout("COVER.amload.load()", 1000);
      });
      // 加载百度统计
      this.openapi.baidutongji();
    } catch (e) {
      console.error(e);
    }
  },

  // 下载链接地址替换
  downloadUrl: function (newsid, newsflag) {
    var uLink = "cover://cn.thecover.www/open";
    var _this = this;
    if(this.device.isIOS()){
      uLink = "https://wapcdn.thecover.cn/UniversalLinks/index.html?version=" + new Date().getTime();
      if(!_this.isEmpty(newsid) && !_this.isEmpty(newsflag)){
        uLink = uLink +'&to=news&id='+ newsid +'&flag=' + newsflag;
      }
    } else {
      if(!_this.isEmpty(newsid) && !_this.isEmpty(newsflag)){
        uLink = 'cover://cn.thecover.www/news?id='+ newsid + '&flag=' + newsflag;
      }
    }

    $('.DownloadApp').attr('href', uLink);

    $('body').on('click', '.DownloadApp', function(){
      var lt = $(this).data('lt') || '';
      setTimeout(function(){
        _this.downloadApp(lt, newsid, newsflag);
      }, 300);

    });


  },
  // 页脚下载按钮
  // newsid 新闻id
  // newsflag 新闻flag
  downloadApp: function (lt, newsid, newsflag) {
    var self = this;
    var page_type = self.fileName();
    var ua = self.device.UA();
    var $cover = jQuery('<div class="open" id="open"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/download_open_20160503.png"></div>');
    var deviceType = 'android';
    if(this.device.isIOS()){
      deviceType = 'ios';
    }
    // ios下载
    function openIosApp() {
      if(!self.isEmpty(newsid) && !self.isEmpty(newsflag)){
        window.location = 'https://wapcdn.thecover.cn/UniversalLinks/index.html?version='+ new Date().getTime() +'&to=news&id='+ newsid +'&flag=' + newsflag;
      } else {
        window.location = "https://wapcdn.thecover.cn/UniversalLinks/index.html?version=" + new Date().getTime();
      }
    }
    // android下载
    function downloadapk(url) {
      window.location.href = url;
      setTimeout(function () {
        if(!self.isEmpty(newsid) && !self.isEmpty(newsflag)){
          window.location = 'cover://cn.thecover.www/news?id='+newsid+'&flag='+newsflag;
          return false;
        }
        window.location = "cover://cn.thecover.www/open";
      }, 30);
    }

    self.$getScript(self.DOWNLOAD_APP_JS).then(function () {
      var loca = '';
      if(!self.isEmpty(lt)){
        loca = "_" + lt;
      }
      _hmt && _hmt.push(['_trackEvent', 'download_from_' + deviceType + '_' + page_type + loca, 'click', ua]);
      if (self.device.isWeixin()) {
        if (self.device.isIOS()) {
          if(!self.isEmpty(newsid) && !self.isEmpty(newsflag)){
            window.location = 'https://wapcdn.thecover.cn/UniversalLinks/index.html?version='+ new Date().getTime() +'&to=news&id='+ newsid +'&flag=' + newsflag;
            return false;
          }
          window.location = self.WEXIN_APP_DOWNLOAD_ADDRESS;
        } else {
          if (jQuery('#open').length > 0) {
            jQuery('#open').addClass('open');
          } else {
            $cover.appendTo('body').promise().then(function () {
              jQuery('#open').on('click', function () {
                jQuery(this).removeClass('open');
              })
            });
          }
        }
      } else {
        if (self.device.isIOS()) {
          openIosApp();
        } else {
          downloadapk(window.download_url);
        }
      }
    });
  },
  // 补充JS原型
  polyfill: function () {
    // 快速检查两个数组是否相同
    if (Array.prototype.equals) {
      console.warn("Overriding existing Array.prototype.equals");
    }
    Array.prototype.equals = function (array) {
      if (!array) {
        return false;
      }
      if (this.length != array.length) {
        return false;
      }
      for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].equals(array[i])) {
            return false;
          }
        } else if (this[i] != array[i]) {
          return false;
        }
      }
      return true;
    };
    Array.prototype.shuffle = function () {
      var copy = [],
        n = this.length,
        i;
      // While there remain elements to shuffle…
      while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * this.length);
        // If not already shuffled, move it to the new array.
        if (i in this) {
          copy.push(this[i]);
          delete this[i];
          n--;
        }
      }
      return copy;
    };
    Object.defineProperty(Array.prototype, "equals", {
      enumerable: false
    });
    Object.defineProperty(Array.prototype, "shuffle", {
      enumerable: false
    });
  },
  // 第三方api
  openapi: {
    // 微信相关
    weixin: {
      // 微信配置
      wx_conf: function (obj, callback) {
        var self = this;
        var url = window.location.href.split('#')[0];
        // COVER.ajax(COVER.apis().getWeChatConf, {
        COVER.ajax('http://api.thecover.cn/wap/weixin/getConf', {
          url: url
        }, function (data) {
          var D = data.data;
          wx.config({
            debug: false,
            appId: D.appId,
            timestamp: D.timestamp,
            nonceStr: D.nonceStr,
            signature: D.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ]
          });
          self[callback](obj);
        });
      },
      // 微信分享
      wx_share: function (obj) {
        this.wx_conf(obj, 'wx_onshare');
      },
      wx_onshare: function (obj) {
        wx.ready(function () {
          // 分享到朋友圈
          wx.onMenuShareTimeline(obj);
          // 分享给朋友
          wx.onMenuShareAppMessage(obj);
          // 分享到QQ
          wx.onMenuShareQQ(obj);
          // 分享到腾讯微博
          wx.onMenuShareWeibo(obj);
          // 分享到QQ空间
          wx.onMenuShareQZone(obj);
        });
      }
    },
    // 手Q相关
    mqq: {
      // 分享
      setShareInfo: function (obj) {
        obj.image_url = obj.imgUrl;
        obj.share_url = obj.link;
        obj.callback = obj.success;
        mqq.setShareInfo(obj);
      }
    },
    // QQ空间相关
    qzone: {
      share: function (obj) {
        //给QQ好友分享内容
        mqq.invoke("share", "toQQ", obj, obj.success);
        //分享内容到QQ空间
        mqq.invoke("share", "toQQ", obj, obj.success);
      }
    },
    // 百度统计
    baidutongji: function () {
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.async = true;
        hm.src = "http://hm.baidu.com/hm.js?12f5131445b8a8af25894ba83a896d9a";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
  }
};
COVER.polyfill();
COVER.initEvent();
var UesJsUrl = './js/';
if (COVER.debug == false) {
  UesJsUrl = 'http://wapcdn.thecover.cn/wap/1.0.0/js/';
}
// 加载入口
seajs.use(UesJsUrl + COVER.fileName() + '.js?v=' + COVER.version);