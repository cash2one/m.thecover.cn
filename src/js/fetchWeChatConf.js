var WECHAT = {
  'api': 'http://api.thecover.cn/wap/weixin/getAllConf',
  getUrl: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  'getPageType': function () {
    return location.pathname.substring(1).split('.')[0];
  },
  'nativeGet': function (addr, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = JSON.parse(xmlhttp.responseText);
        if (result.status == 0) {
          callback(result.data);
        }
      }
    };
    xmlhttp.open("GET", addr, true);
    xmlhttp.send();
  },
  'share': function (data) {
    var self = this;
    console.log(JSON.stringify(data));
    wx && wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    });
    wx && wx.ready(function () {
      // 分享到朋友圈
      wx.onMenuShareTimeline(data);
      // 分享给朋友
      wx.onMenuShareAppMessage(data);
      // 分享到QQ
      wx.onMenuShareQQ(data);
      // 分享到腾讯微博
      wx.onMenuShareWeibo(data);
      // 分享到QQ空间
      wx.onMenuShareQZone(data);
    });
  },
  isWeChat: function () {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  },
  'run': function () {
    var self = this;
    if (self.isWeChat()) {
      //document.write('<scr'+'ipt type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></sc'+'ript>');
    } else {
      return;
    }
    var addr = self.api + '?data=' + JSON.stringify({
          "url": location.href.split('#')[0],
          "type": self.getPageType(),
          "id": self.getUrl('id')
        });
    self.nativeGet(addr, self.share);
  }
};
WECHAT.run();