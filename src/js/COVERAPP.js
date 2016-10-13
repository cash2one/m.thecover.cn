window.COVERAPP_CallBack = function(){
	
};

var COVERAPP = {
	// 基础属性类
	Attribute: {
		// userAgent
		UA: navigator.userAgent,

		// version
		version: '1.4.0',

		// 判断是否为app
		isApp: function(){
			var ua = this.UA;
	    	if (/TheCover/i.test(ua)) {
	      		return true;
	    	}
	        return false;
		},

		// 判断是否是ios
		isIOS: function(){
			var ua = this.UA;
		    if (/ios/i.test(ua) || /iphone/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua)) {
		       return true;
		    }
		    return false;
		},

		// 判断是否是android
	    isAndroid: function () {
	    	var ua = this.UA;
	    	if (/android/i.test(ua)) {
	      		return true;
	    	}
	        return false;
	    },

	    // 获取客户端版本号
	    appVersion: function(){
	    	var ua = this.UA;
	    	var version = ua.split('(TheCover_')[1].split('_')[0];
	    	return version;
	    },

	    // 获取系统类型
	    systemType: function(){
	    	var ua = this.UA;
	    	var sys = ua.split('(TheCover_')[1].split('_')[1];
	    	return sys;
	    },

	    // 设备标识
	    deviceId: function(){
	    	var ua = this.UA;
	    	var id = ua.split('(TheCover_')[1].split('_')[2];
	    	return id;
	    },

	    // 版本比较
	    vercp: function(version){
	    	var appvs = this.appVersion.split('.'), vs = version.split('.');

	    	if(appvs[0] < vs[0]){
	    		return 'old';
	    	}

	    	if(appvs[0] > vs[0]){
	    		return 'new';
	    	}

	    	if(appvs[0] == vs[0] && appvs[1] < vs[1]){
	    		return 'old';
	    	}

	    	if(appvs[0] == vs[0] && appvs[1] > vs[1]){
	    		return 'new';
	    	}

	    	if(appvs[0] == vs[0] && appvs[1] == vs[1] && appvs[2] < vs[2]){
	    		return 'old';
	    	}

	    	if(appvs[0] == vs[0] && appvs[1] == vs[1] && appvs[2] > vs[2]){
	    		return 'new';
	    	}

	    	if(appvs[0] == vs[0] && appvs[1] == vs[1] && appvs[2] == vs[2]){
	    		return 'new';
	    	}

	    }

	},

	// 界面类
	UI: {
		// 对话框组
		Dialog: function(obj){
			COVERAPP_CallBack = obj.callback;
			obj.callback = 'COVERAPP_CallBack';
			if(COVERAPP.Attribute.isIOS()){
				window.webkit.messageHandlers.Dialog.postMessage(obj);
				return false;
			}

			if(COVERAPP.Attribute.isAndroid()){
				AndroidBridging.dialog(JSON.stringify(obj));
				return false;
			}
			
		},

		// alert
		alert: function(msg){
			this.Dialog({
				title: '',
	    		msg: msg,
	    		buttons: ['确定'],
	    		callback: function(ret){
	    			
	    		}
			});
		},

		// 图集预览
		previewImage: function(obj){
			if(COVERAPP.Attribute.isIOS()){
				window.webkit.messageHandlers.PreviewImage.postMessage(obj);
				return false;
			}

			if(COVERAPP.Attribute.isAndroid()){
				AndroidBridging.previewImage(JSON.stringify(obj));
				return false;
			}
		}
	},

	// 功能方法类
	Method: {
		// 分享
		Share: function(obj){
			COVERAPP_CallBack = obj.callback;
			obj.callback = 'COVERAPP_CallBack';
			if(COVERAPP.Attribute.isIOS()){
				window.webkit.messageHandlers.Share.postMessage(obj);
				return false;
			}

			if(COVERAPP.Attribute.isAndroid()){
				AndroidBridging.share(JSON.stringify(obj));
				return false;
			}
			
		},

		// 打开登录
		OpenLogin: function(obj){
			COVERAPP_CallBack = obj.callback;
			obj.callback = 'COVERAPP_CallBack';
			console.log('ui.OpenLogin');
			if(COVERAPP.Attribute.isIOS()){
				window.webkit.messageHandlers.Login.postMessage(obj);
				return false;
			}

			if(COVERAPP.Attribute.isAndroid()){
				console.log('denglu');
				AndroidBridging.login(JSON.stringify(obj));
				return false;
			}
			
		},

		// 获取用户信息
		GetUser: function(obj){
			COVERAPP_CallBack = obj.callback;
			obj.callback = 'COVERAPP_CallBack';
			if(COVERAPP.Attribute.isIOS()){
				window.webkit.messageHandlers.User.postMessage(obj);
				return false;
			}

			if(COVERAPP.Attribute.isAndroid()){
				AndroidBridging.user(JSON.stringify(obj));
				return false;
			}

		},

		// 返回
		Back: function(){
			if(COVERAPP.Attribute.isIOS()){
				window.webkit.messageHandlers.Back.postMessage('');
				return false;
			}

			if(COVERAPP.Attribute.isAndroid()){
				AndroidBridging.back();
				return false;
			}

		}

	}
};