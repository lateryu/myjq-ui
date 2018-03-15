/**
 * Loading插件
 */
define(['superClass'], function(require, exports, module) {
	var SuperClass = require('superClass');
	var Loading = SuperClass.extend({
		init: function(options) {
			this._super(options);
		},
		open: function() {
			$(this.options.target).show();
		},
		close: function() {
			$(this.options.target).hide();
		},
		_createDom: function() {
			var opts = this.options;
			$(opts.target).append('<div class="loading" style="'+opts.style+'"><i class="'+
				opts.iconCls+'"></i><p class="'+opts.textCls+'">'+opts.loadingText+'</p></div>');
		}
	});

	module.exports = Loading;
	(function() {
		$.fn.loading = function(options, param) {
			if (typeof options == 'string') {
				var method = $.fn.loading.methods[options];
				if (method) {
					return method(this, param);
				}
			}
			options = $.extend($.fn.loading.defaults, options || {});
			return this.each(function() {
				var cacheObj, _this = $(this);
				options.target = _this;
				cacheObj = _this.data('loading');
				return cacheObj ? cacheObj : _this.data('loading', new Loading(options));
			});
		};

		$.fn.loading.defaults = {
			loadingText: 'Loading...',			// loading加载的文本
			textCls: 'loading-text',			// 文本样式
			iconCls: 'loading-icon',			// loading加载的icon
			style: '',							// 内联样式
			target: document.body				// 目标对象，默认body
		};

		$.fn.loading.methods = {
			// 打开loading
			open: function(jq) {
				jq.data('loading').open();
			},
			// 关闭loading
			close: function(jq) {
				jq.data('loading').close();
			}
		};
	})(jQuery);
});