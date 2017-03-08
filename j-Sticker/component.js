COMPONENT('sticker', function() {

	var self = this;
	var ca = self.attr('data-class-off');
	var cb = self.attr('data-class-on');
	var enabled = false;
	var is = false;
	var top = 0;

	self.readonly();

	self.init = function() {
		window.$stickercounter = 0;
		$(window).on('scroll', function() {
			if (window.$stickercounter < 20)
				clearTimeout(window.$sticker);
			else
				return;
			window.$stickercounter++;
			window.$sticker = setTimeout(function() {
				window.$stickercounter = 0;
				var y = $(window).scrollTop();
				FIND('sticker', true).forEach(function(m) {
					m.toggle(y);
				});
			}, 30);
		});
	};

	self.toggle = function(y, init) {
		var el = self.element;

		if (!enabled)
			top = el.offset().top;

		is = y >= top;
		if (is) {
			if (enabled && !init)
				return;
			ca && el.removeClass(ca);
			cb && el.addClass(cb);
			enabled = true;
			return self;
		}

		if (!enabled && !init)
			return self;
		cb && el.removeClass(cb);
		ca && el.addClass(ca);
		enabled = false;
		top = 0;
		return self;
	};

	self.make = function() {
		self.toggle($(window).scrollTop(), true);
	};
});