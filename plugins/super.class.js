// JavaScript Document
define(['class', 'jquery'], function(require, exports, module) {
	require('class');
	require('jquery');
	var SuperClass = Class.extend({
		options: {},
		init: function(opts) {
			this.options = $.extend(this.options, opts);
			this._createDom();
			this._bindEvent();
		},
		_createDom: function() {},
		_bindEvent: function() {}
	});
	
	module.exports = SuperClass;
});