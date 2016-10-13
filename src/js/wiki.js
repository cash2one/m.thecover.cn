define(function (require) {

	require('coverapp');

	var app = {

		init: function(){
			var wikiId = COVER.getUrl('wikiid');
			var Type = COVER.getUrl('type');
			this.getData(wikiId, Type);

			// 如果是APP里面展示，显示返回按钮
			if(COVERAPP.Attribute.isApp()){
				$('.actionTitle').show();
				$('#box-BackBtn').show();
			}

			$('.actionBack').on('click', function(){
				COVERAPP.Method.Back();
			});
		},

		getData: function(id, type){
			var self = this;
			var wikiData = {
				"wikiid": id,
				"type": type
			};

			COVER.$post(COVER.apis().getWikiProfile, {
				data: JSON.stringify(wikiData)
			}).then(function(data){
				try{
					var image = new Image();
				    image.src = data.main.img_list[0];
				    image.onload =function(){
				    	self.render(data, image);
				    }

				    image.onerror = function(){
				    	self.render(data);
				    }
				}
				catch(e){
					self.render(data);
				}

				self.event();

			});
		},

		event: function(){

			var isShow = true, isShowYc = true;

			$('body').on('click', '.wiki-opendown', function(){
				if(isShow){
					$(this).css({
						'-webkit-transform': 'rotate(180deg)',
						'-moz-transform': 'rotate(180deg)',
						'transform': 'rotate(180deg)'
					});
					$('.wiki-hide').show();
					isShow = false;
				} else {
					$(this).css({
						'-webkit-transform': 'rotate(0deg)',
						'-moz-transform': 'rotate(0deg)',
						'transform': 'rotate(0deg)'
					});
					$('.wiki-hide').hide();
					isShow = true;
				}
			});

			$('body').on('click', '.wiki-rio-down', function(){
				if(isShowYc){
					$(this).css({
						'-webkit-transform': 'rotate(180deg)',
						'-moz-transform': 'rotate(180deg)',
						'transform': 'rotate(180deg)'
					});
					// $('.wiki-ychide').show();
					isShowYc = false;
				} else {
					$(this).css({
						'-webkit-transform': 'rotate(0deg)',
						'-moz-transform': 'rotate(0deg)',
						'transform': 'rotate(0deg)'
					});
					// $('.wiki-hide').hide();
					isShowYc = true;
				}
			});

			if(COVERAPP.Attribute.isApp()){

				$('body').on('click', '.wiki-imgAlbum', function(){
					var img = $(this).data('img');

					COVERAPP.UI.previewImage({
						current: 0,
						urls: img
					});
					
				});

			}

		},

		render: function(data, image){
			var image = image;
			var headTpl = this.headerTpl();
			var bascTpl = this.bascTpl();
			var sectionTpl = this.sectionTpl();
			var showSize = 5;  // 基本信息默认显示数量

			juicer.register('json', function(val){
				return JSON.stringify(val);
			});

			juicer.register('getKey', function(val){
				for(var x in val){
					return x;
				}
			});

			juicer.register('getValue', function(val){
				for(var x in val){
					return val[x];
				}
			});

			juicer.register('isShow', function(val, idx){
				idx++;
				if(parseInt(val) <= ++showSize){
					return 'wiki-show';
				} else {
					if(idx > showSize){
						return 'wiki-hide';
					}
					return 'wiki-show';
				}
			});

			juicer.register('showBtn', function(val){
				if(showSize > parseInt(val)){
					return 'wiki-hide';
				}
				return '';
			});

			juicer.register('toPercen', function(val){
				return parseInt(val * 100);
			});

			// 计算图片宽高，图片高大于宽则使用毛玻璃效果
			var isImg = true;  // 是否有图片
			var imageSrc = '';
			var imgLength = 0;
			// 判断是否有图片或者图片地址失效
			// 如果图片地址失效，则不显示头部图片
			if(COVER.isEmpty(image)){
				isImg = false;
				// 没有图片，改变呈现样式
				$('.actionTitle').css({
					background: '#363636',
					height: '3.0rem',
				});
				if(COVERAPP.Attribute.isAndroid()){
					$('.actionTitle').css({
						'padding-top': 0
					});
					$('body').css('padding-top', '3.0rem');
				} else {
					$('body').css('padding-top', '3.6rem');
				}

				if(!COVERAPP.Attribute.isApp()){
					$('body').css('padding-top', '0');
				}
				
			} else {
				var imgWidth = image.width;
				var imgHeight = image.height;
				var isBlur = false;  // 是否使用毛玻璃
				if(imgHeight / imgWidth  > 1){
					isBlur = true;
				}
				imageSrc = image.src;
			}

			try{
				imgLength = data.main.img_list.length;
			}
			catch(e){
				console.log(e);
			}

			var predict = data.predict;
			var isPredict = false;
			var predictSize = 0;


			if(!COVER.isEmpty(predict)){
				isPredict = true;
				predictSize = predict.predicts.length;
			}

			var header = juicer(headTpl, {
				main: data.main,
				image: imageSrc,
				imgsize: imgLength,
				isPredict: isPredict,
				predict: predict,
				predictSize: predictSize,
				isImg: isImg,
				isBlur: isBlur
			});
			$('body').append(header);

			var paragraphs = data.paragraphs;
			for(var i = 0; i < paragraphs.length; i++){
				var isBasc = false;
				var bascInfo = '';
				var valuse = paragraphs[i].values;
				// 判断数据是否是基本资料类型
				for(var j = 0; j < valuse.length; j++){
					for(var x in valuse[j]){
						if(typeof valuse[j][x] === 'object'){
							isBasc = true;
							bascInfo = valuse[j];
						} else {
							isBasc = false;
						}
					}
				}

				if(isBasc){
					// 接口变动，对象转数组
					var bi = [], z = 0, bascTitle = '';
					for(var key in bascInfo){
						bascTitle = key;
						for(var title in bascInfo[key]){
							bi[z] = {
								title: title,
								name: bascInfo[key][title]
							}
							z++;
						}
					}
					var basc = juicer(bascTpl, {
						list: bi,
						title: bascTitle,
						size: bi.length
					});
					$('body').append(basc);
				} else {
					var section = juicer(sectionTpl, {
						list: valuse
					});
					$('body').append(section);
				}

			}

		},

		// header模板
		headerTpl: function(){
			var tpl = [
				'<header class="wiki-head">',
				'{@if isImg == true}',
			    '    <div class="wiki-imgAlbum" data-img="${main.img_list | json}">',
			    '		{@if isBlur == true}',
			    '        	<div class="wiki-imgContent wiki-blur" style="background: url(${image}) no-repeat top center; background-size: cover;"></div>',
			    '        	<div class="wiki-imgsize"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/alumsize.png">${imgsize}图</div>',
			    '        	<div class="wiki-imgver"><img src="${image}"></div>',
			    '		{@/if}',
			    '		{@if isBlur == false}',
			    '        	<div class="wiki-imgContent" style="background: url(${image}) no-repeat top center; background-size: cover;"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/alumsize.png" style="width: 100%; height: 100%; opacity: 0;"></div>',
			    '        	<div class="wiki-imgsize"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/alumsize.png">${imgsize}图</div>',
			    '		{@/if}',
			    '    </div>',
			    '{@/if}',
			    '    <div class="wiki-head-body">',
			    '        <div class="wiki-head-title">',
			    '            ${main.name}',
			    '        </div>',
			    '{@if isPredict == true}',
			    '        <div class="wiki-rio-body">',
			    '            <div class="wiki-rio-titlebg">',
			    '                <div class="wiki-rio-tbglf"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/RioOlympicTitle.png" alt=""></div>',
			    '                <div class="wiki-rio-tbgrg"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/RioOlympicCup.png" alt=""></div>',
			    '            </div>',
			    '            <div class="wiki-rio-title">',
			    '                ${predict.item}<br><span>${predict.team}</span>',
			    '            </div>',
			    '            <div class="wiki-rio-table">',
			    '                <div class="wiki-rio-item wiki-rio-itemh">',
			    '                    <div class="wiki-rio-small">ta的运动小项</div>',
			    '                    <div class="wiki-rio-place">名次预测</div>',
			    '                    <div class="wiki-rio-prob">夺冠几率</div>',
			    '                </div>',
			    '{@each predict.predicts as item, index}',
			    '                <div class="wiki-rio-item">',
			    '                    <div class="wiki-rio-small">${item.sub_item}</div>',
			    '                    <div class="wiki-rio-place">',
			    '                        <div class="wiki-rio-count">${item.placing}</div>',
			    '                    </div>',
			    '                    <div class="wiki-rio-prob">',
			    '                        <div class="wiki-rio-progress">',
			    '                            <div class="wiki-rio-bar"><div style="width: ${item.chance_win | toPercen}%;"></div></div>',
			    '                            ${item.chance_win | toPercen}<span>%</span>',
			    '                        </div>',
			    '                    </div>',
			    '                </div>',
			    '{@/each}',
			    /*'{@if predictSize > 1}',
			    '                <div class="wiki-rio-down">',
			    '                    <img src="http://wapcdn.thecover.cn/wap/1.0.0/img/RioDown.png">',
			    '                </div>',
			    '{@/if}',*/
			    '            </div>',
			    '        </div>',
			    '{@/if}',
			    '{@if main.brief != "" && main.brief != undefined && main.brief != null}',
			    '        <div class="wiki-head-desc">',
			    '            <p>${main.brief}</p>',
			    '        </div>',
			    '{@/if}',
			    '    </div>',
			    '</header>',
			].join('');
			return tpl;
		},

		bascTpl: function(){
			var tpl = [
				'<section class="wiki-section">',
			    '    <article class="wiki-content">',
			    '        <div class="wiki-title">${title}</div>',
			    '        <div class="wiki-info">',
			    '            <div class="wiki-bascinfo">',
			    '                <ul>',
			    '{@each list as item, index}',
			    '                    <li class="${size, index | isShow}">',
			    '                        <div class="wiki-bascname">${item.title}</div>',
			    '                        <div class="wiki-basctext">${item.name}</div>',
			    '                    </li>',
			    '{@/each}',
			    '                </ul>',
			    '                <div class="wiki-opendown ${size | showBtn}"><img src="http://wapcdn.thecover.cn/wap/1.0.0/img/open_down.png"></div>',
			    '            </div>',
			    '        </div>',
			    '    </article>',
			    '</section>'
			].join('');
			return tpl;
		},

		sectionTpl: function(){
			var tpl = [
			    '<section class="wiki-section">',
			    '{@each list as item}',
			    '{@if item.length <= 0 || typeof item == "object"}',
			    '    <article class="wiki-content">',
			    '        <div class="wiki-title">$${item | getKey}</div>',
			    '        <div class="wiki-info">',
			    '            $${item | getValue}',
			    '        </div>',
			    '    </article>',
			    '{@/if}',
			    '{@/each}',
			    '</section>',
			].join('');
			return tpl;
		}

	}

	app.init();

	
});