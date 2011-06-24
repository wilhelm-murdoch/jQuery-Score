(function($, namespace){
	var methods = {
		init: function(f, options) {
			options = $.extend({
				prefix: null,
				suffix: null,
				value: null,
				class: null,
				trail: 300,
				padding: 20,
				speed: 'slow',
				onScore: function(object, options){},
				target: {
					top: $(this).offset().top,
					left: $(this).offset().left
				}
			}, options);

			var score = $('<span>')
			.html(options.prefix+' '+options.value+' '+options.suffix)
			.addClass(options.class)
			.addClass('score')
			.appendTo(document.body)
			.hide();

			score.css({
				position: 'absolute',
				top: (options.target.top) - options.padding,
				left: (options.target.left + ($(this).outerWidth()/2) - (score.outerWidth()/2))
			})
			.show()
			.animate({
				top: '-='+options.trail
			}, {
				queue: false,
				duration: options.speed
			})
			.fadeOut(options.speed, function() {
				options.onScore(this, options);
				$(this).remove();
			});

			return this;
		}
	};

	$.fn[namespace] = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'function' || !method) {
			return methods.init.apply(this, arguments);
		} else if (typeof method === 'object') {
			return methods.init.apply(this, [null, method]);
		} else {
			$.error('"'+method+'" ain\'t no method I ever heard of. They speak English in "'+method+'"?');
		}
	};
})(jQuery, 'score');