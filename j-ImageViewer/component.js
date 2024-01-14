COMPONENT('imageviewer', 'selector:.img-viewer;container:.img-container;loading:1;unknown:Unknown image', function(self, config, cls) {

	var cls2 = '.' + cls;
	var isclosed = false;
	var isrendering = false;
	var events = {};

	events.keydown = function(e) {
		switch (e.which) {
			case 38:
			case 37: // prev
				self.find('button[name="prev"]').trigger('click');
				break;
			case 32: // next
			case 39:
			case 40:
				self.find('button[name="next"]').trigger('click');
				break;
			case 27: // close
				self.close();
				break;
		}
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			$(W).on('keydown', events.keydown);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			$(W).off('keydown', events.keydown);
		}
	};

	self.readonly();
	self.blind();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.append('<div class="{0}-header"><button name="close"><i class="ti ti-times"></i></button><div><b></b><div class="help"></div></div></div><div class="{0}-loading hidden"><div></div></div><div class="{0}-buttons"><button name="prev"><i class="ti ti-arrow-left"></i></button><button name="next"><i class="ti ti-arrow-right"></i></button></div><div class="{0}-viewer"><div class="{0}-cell"><img /></div></div>'.format(cls));
		self.resize();

		self.on('resize2', self.resize);

		$(document.body).on('click', config.selector, function() {
			var el = $(this);
			isclosed = false;
			self.show(el);
		});

		self.event('click', 'button[name]', function() {
			var t = this;
			if (!t.disabled) {
				if (t.name === 'close')
					self.close();
				else
					self.show($(this.$el));
			}
		});

		self.find('img').on('load', function() {
			isrendering = false;
			self.loading(false);
		});

		self.event('click', cls2 + '-buttons', function(e) {
			if (e.target === this)
				self.close();
		});
	};

	self.close = function() {
		isclosed = true;
		isrendering = false;
		$('html,body').rclass(cls + '-noscroll');
		self.aclass('hidden');
		events.unbind();
	};

	self.loading = function(is) {

		if (!config.loading)
			return;

		var el = self.find(cls2 + '-loading');
		if (is) {
			el.rclass('hidden', is);
			return;
		}

		setTimeout(function() {
			el.aclass('hidden');
		}, 500);
	};

	self.show = function(el) {

		if (isrendering || el == null || isclosed || WIDTH() === 'xs')
			return;

		var parent = el.closest(config.container);
		var arr = parent.find(config.selector).toArray();
		var index = arr.indexOf(el[0]);
		var buttons = self.find(cls2 + '-buttons').find('button');

		buttons[0].disabled = index === 0; // prev
		buttons[1].disabled = index >= arr.length - 1; // next

		if (!buttons[0].disabled)
			buttons[0].$el = arr[index - 1];

		if (!buttons[1].disabled)
			buttons[1].$el = arr[index + 1];

		self.loading(true);
		isrendering = true;

		var image = new Image();
		// image.crossOrigin = 'anonymous';
		image.src = el.attr('data-src') || el.attr('src');
		image.onload = function() {

			var img = this;
			var ratio;

			var w = image.width;
			var h = image.height;
			var tw = WW - 80;
			var th = WH - 140;

			if (w > h) {
				ratio = w / h;

				if (w > tw)
					w = tw;

				h = w / ratio >> 0;

				if (h > th) {
					h = th;
					w = h * ratio >> 0;
				}

			} else {

				ratio = h / w;

				if (h > th)
					h = th;

				w = h / ratio >> 0;

				if (w > tw) {
					w = tw;
					h = w * ratio >> 0;
				}
			}

			if (isclosed)
				return;

			events.bind();
			self.find('img').attr('src', img.src).attr('width', w).attr('height', h);
			self.find('.help').html(img.width + 'x' + img.height + 'px');
			self.find('b').html(el.attr('alt') || el.attr('title') || config.unknown);
			self.rclass('hidden');
			$('html,body').aclass(cls + '-noscroll');
		};
	};

	self.resize = function() {
		var viewer = self.find(cls2 + '-viewer');
		var loading = self.find(cls2 + '-loading');
		var css = {};
		css.height = WH - 45;
		css.width = WW;
		viewer.css(css);
		loading.css(css);
	};

});