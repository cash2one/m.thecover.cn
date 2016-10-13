// 管理卡片
define(function (require, exports, module) {

  $.noConflict();
  var cards = (function (LS) {
    return {
      //
      'initLocalOrders': function () {
        this.setLocalOrders([]);
        return this.getLocalOrders();
      },
      'getLocalOrders': function () {
        return JSON.parse(LS.getItem('orders')) ? JSON.parse(LS.getItem('orders')) : [];
      },
      'setLocalOrders': function (arr) {
        LS.setItem('orders', JSON.stringify(arr));
        return this.getLocalOrders();
      },
      //
      'initLocalCards': function () {
        this.setLocalOrders([]);
        return this.getLocalCards();
      },
      'getLocalCards': function () {
        return JSON.parse(LS.getItem('cards')) ? JSON.parse(LS.getItem('cards')) : [];
      },
      'setLocalCards': function (arr) {
        LS.setItem('cards', JSON.stringify(arr));
        return this.getLocalCards();
      },
      'appendACard': function (card) {
        var cards = this.getLocalCards();
        cards.push(card);
        return this.setLocalCards(cards);
      },
      'updateACard': function (card) {
        var cards = this.getLocalCards();
        var temp_arr = [];
        jQuery.each(cards, function (idx, el) {
          if (el.id !== card.id) {
            //console.log('el: ', el, 'card: ', card)
            temp_arr.push(el);
          } else {
            temp_arr.push(card);
          }
        });
        return this.setLocalCards(temp_arr);
      },
      'removeACard': function (id) {
        var cards = this.getLocalCards();
        var temp_arr = [];
        jQuery.each(cards, function (idx, el) {
          if (el.id !== id) {
            temp_arr.push(el);
          }
        });
        return this.setLocalCards(temp_arr);
      },
      'reOrderCards': function (order) {
        var cards = this.getLocalCards();
        var result_cards = this.sortCardByOrders(cards, order);
        return this.setLocalCards(result_cards);
      },
      // 把LS中维护的卡片JSON按照指定顺序排序
      'sortCardByOrders': function (cards, order) {
        var result_cards = [];
        jQuery.each(order, function (idx, el) {
          jQuery.each(cards, function (i, card) {
            if (card.id == el) {
              return result_cards.push(card);
            }
          })
        });
        return result_cards;
      },
      // render
      'render': function (action, conf, $container) {
        var self = this;
        var $html = jQuery('<div class="dir-wrapper"></div>');
        var need_sorting = self.getLocalOrders().equals(conf.orders) == false;
        //console.log('cards.js.render(', action, ', 需要重新排序=', need_sorting, ', conf: ', JSON.stringify(conf), '$container: ', $container, ')');
        // 增加新段落与恢复段落 逻辑一致
        if (action === 'append' || action === 'restore') {
          self.appendACard(conf);
          if (need_sorting) {
            self.reOrderself(conf.orders);
          }
          $container.addClass('hidden').empty();
          jQuery.each(self.getLocalself(), function (idx, el) {
            $html.append(self.generateCardDOM(el))
          });
          return $container.append($html).promise().then(function () {
            $container.removeClass('hidden');
          }).promise();
        } // 移除/删除段落 逻辑一致
        else if (action === 'remove' || action === 'delete') {
          self.removeACard(conf);
          self.reOrderself(conf.orders);
          $container.addClass('hidden').empty();
          jQuery.each(self.getLocalself(), function (idx, el) {
            $html.append(self.generateCardDOM(el))
          });
          return $container.append($html).promise().then(function () {
            $container.removeClass('hidden');
          }).promise();
        } // 更新指定的段落
        else if (action === 'update') {
          self.updateACard(conf);
          if (need_sorting) {
            self.reOrderself(conf.orders);
          }
          $container.addClass('hidden').empty();
          jQuery.each(self.getLocalself(), function (idx, el) {
            $html.append(self.generateCardDOM(el))
          });
          return $container.append($html).promise().then(function () {
            $container.removeClass('hidden');
          }).promise();
        } // 初始化
        else if (action === 'init') {
          // 初始化--拉取所有信息
          jQuery('#title').text(conf.title);
          //      console.log(conf.orders)
          if (conf.orders && conf.sections) {
            //console.log('if')
            self.setLocalself(conf.sections);
            self.setLocalOrders(conf.orders);
            $container.addClass('hidden').empty();
            jQuery.each(self.getLocalself(), function (idx, el) {
              $html.append(self.generateCardDOM(el))
            });
            return conf.orders && $container.append($html).removeClass('hidden').promise();
          }
          return $container.removeClass('hidden').promise();
        } // 结束
        else if ((action === 'finished')) {
          //console.log('finished: ', 'new order: ', conf.orders);
          //console.log('finished: ', 'local order: ', self.getLocalOrders());
          if (need_sorting) {
            self.reOrderself(conf.orders);
            $container.addClass('hidden').empty();
            jQuery.each(self.getLocalself(), function (idx, el) {
              $html.append(self.generateCardDOM(el))
            });
            return $container.append($html).removeClass('hidden').promise();
          } else {
            return $container.addClass('finished').promise();
          }
        } else {
          console.log(action);
        }
      },
      // 卡片模版
      'generateCardDOM': function (conf) {
        var default_avatar = 'http://wapcdn.thecover.cn/wap/1.1.0/img/avatar_livecasting.png';
        var formatTime = function (timestamp) {
          return (new Date(timestamp).getHours()) + ':' + (new Date(timestamp).getMinutes() < 10 ? '0' + new Date(timestamp).getMinutes() : new Date(timestamp).getMinutes())
        };
        //console.log('generateCardDOM(', JSON.stringify(conf), ')');
        var $card = jQuery('<section class="card"><p class="header"><img class="avatar"><span class="speaker-name">' + (conf.speaker_name) + '</span>' + '<span class="timstamp">' + formatTime(conf.timstamp) + '</span></p> ' + '</section>').prop('id', 'card_' + conf.id).data('order', conf.order);
        conf.avatar && $card.find('.avatar').prop('src', conf.avatar) || $card.find('.avatar').prop('src', default_avatar);
        jQuery('<div class="card-text"></div>').html((conf.content.html)).appendTo($card);
        !jQuery.isEmptyObject(conf.content.img) && jQuery('<div class="imgs tc-list-atlas"></div>').data('imgs', conf.content.img).appendTo($card) && jQuery.each(conf.content.img, function (idx, src) {
          if (idx < 3) {
            var $img = jQuery('<img class="img hidden">').prop('src', src).on('load', function () {
              jQuery(this).removeClass('hidden');
            });
            $img.data('index', idx);
            $card.find('.imgs').append($img);
          }
        });
        //console.log($card);
        return $card;
      }
    }
  })(window.localStorage);
  module.exports = cards;
});