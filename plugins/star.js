//五角星评分组件
define(['superClass'], function(require, exports, module) {
	var SuperClass = require('superClass');
	var Star = SuperClass.extend({
		init: function(opts) {
			this._super(opts);
		},
		setValue: function(index) {
			var opts = this.options, $span,
				$starInput = $(opts.target).find('.star-input'),
				oldValue = $starInput.val();
			opts.reqParams[opts.name] = index;
			if (!opts.readonly && opts.clickSendAjax) {
				$.ajax({
					url: opts.reqUrl,
					type: opts.type,
					data: opts.reqParams,
					success: function() {
						doSuccess();
					}
				});
			} else {
				doSuccess();
			}

			function doSuccess() {
				$(opts.target).find('span.star').each(function(i) {
					$span = $(this);
					if (i <= index) {
						$span.addClass('on');
					} else {
						$span.removeClass('on');
					}
					$starInput.val(index);
					opts.value = index;
				});
				if (typeof opts.onclick == 'function') {
					opts.onclick.apply(this, [index, oldValue]);
				}
			}
		},
		getValue: function() {
			return this.options.value;
		},
		readonly: function(readonly) {
			this.options.readonly = readonly;
		},
		_createDom: function() {
			var opts = this.options,
				html = '<div class="star-box">' +
							'<div class="star-list">' +
								'<span class="star"></span>' +
								'<span class="star"></span>' +
								'<span class="star"></span>' +
								'<span class="star"></span>' +
								'<span class="star"></span>' +
							'</div>' +
							'<input class="star-input" name="'+opts.name+'" value="'+opts.value+'" type="hidden"/>' +
				       '</div>';
			$(opts.target).html(html);
		},
		_bindEvent: function() {
			var self = this, opts = this.options, index;
			$(opts.target).on('click', '.star-list span', function() {
				if (opts.readonly) return;
				index = $(this).index();
				self.setValue(index);
			});
		}
	});
	(function($) {
		$.fn.star = function (options, param) {
			if (typeof options == 'string') {
				var method = $.fn.star.methods[options];
				if (method) return method(this, param);
			}

			options = $.extend($.fn.star.defaults, options || {});
			return this.each(function () {
				var cacheObj, _this = $(this);
				options.target = _this;
				cacheObj = _this.data('star');
				return cacheObj ? cacheObj : _this.data('star', new Star(options));
			});
		};

		$.fn.star.defaults = {
			name: 'star',									// input的name属性
			readonly: false,								// 是否只读
			clickSendAjax: false,							// 点击是否立即发送ajax
			reqUrl: '',										// 请求url
			reqType: 'post',								// 请求类型
			reqParams: {},									// 请求参数
			value: 0,										// 默认值
			onclick: function(newValue, oldValue) {}		// 点击事件
		};

		$.fn.star.methods = {
			// 设置值
			setValue: function(jq, value) {
				jq.data('star').setValue(value);
			},
			// 获取值
			getValue: function(jq) {
				return jq.data('star').getValue();
			},
			// 设置只读属性
			readonly: function(jq, readonly) {
				jq.data('star').readonly(readonly);
			}
		};
	})(jQuery);
});