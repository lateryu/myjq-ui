// JavaScript Document
define(['superClass'], function(require, exports, module) {
    var SuperClass = require('superClass');
    var LinkButton = SuperClass.extend({
        init: function(options) {
            this._super(options);
        },
        enable: function() {
            $(this.options.target).find('.link-button').removeClass('link-button-disable');
        },
        disable: function() {
            $(this.options.target).find('.link-button').addClass('link-button-disable');
        },
        _bindEvent: function() {
            var self = this;
            $(this.options.target).on('click', '.link-button', function() {
                var _this = $(this), clickEvent;
                if (_this.hasClass('link-button-disable')) return;
                clickEvent = self.options.onclick;
                if (clickEvent && typeof clickEvent == 'function') {
                    clickEvent.call(this);
                }
                if (self.options.toggle) {
                    if (_this.hasClass('link-button-disable')) {
                        _this.removeClass('link-button-disable');
                    } else {
                        _this.addClass('link-button-disable');
                    }
                }
            });
        },
        _createDom: function() {
            var opts = this.options;
            var disableClass = opts.disabled ? 'link-button-disable' : '';
            $(opts.target).append(
                '<div class="link-button '+opts.btnStyle + ' ' +disableClass+'">' +
                    '<i class="'+opts.iconAlign + ' ' +opts.iconCls+'"></i>' +
                    '<span>'+opts.text+'</span>' +
                '</div>');
        }
    });

    module.exports = LinkButton;

    (function() {
        $.fn.linkButton = function(options, param) {
            if (typeof options == 'string') {
                var method = $.fn.linkButton.methods[options];
                if (method) {
                    return method(this, param);
                }
            }
            options = $.extend($.fn.linkButton.defaults, options || {});
            return this.each(function() {
                var cacheObj, _this = $(this);
                options.target = _this;    
                cacheObj = _this.data('linkButton');
                return cacheObj ? cacheObj : _this.data('linkButton', new LinkButton(options));
            });
        };

        $.fn.linkButton.defaults = {
            disabled: false,                // 默认按钮为可用状态
            text: 'linkButton',             // 按钮显示文本
            iconCls: 'link-button-icon',    // 按钮icon样式，如果有
            iconAlign: 'left-icon',         // 按钮位置
            toggle: true,                   // 是否为切换按钮
            btnStyle: 'btn-primary',        // 按钮风格
            onclick: function() {}          // 按钮点击事件
        };

        $.fn.linkButton.methods = {
            // 将按钮置为不可用
            disable: function(jq,pra) {
                jq.data('linkButton').disable();
            },
            // 将按钮置为可用
            enable: function(jq,pra) {
                jq.data('linkButton').enable();
                console.log(pra);

            }
        };
    })(jQuery);
});