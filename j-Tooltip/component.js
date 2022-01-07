COMPONENT('tooltip', function(self, config, cls) {

	var is = false;
	var can = true;
	var prev;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.enable = function() {
		can = true;
	};

	var prevcleaner = function() {
		prev = null;
	};

	self.hideforce = function() {
		prev = self.opt.element[0];
		self.aclass('hidden');
		self.rclass(cls + '-visible');
		is = false;
		setTimeout2(self.ID + 'prev', prevcleaner, 1000);
	};

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.on('scroll + resize + reflow + resize2', function() {
			self.hide(true);
			can = false;
			setTimeout2(self.ID + 'can', self.enable, 1000);
		});

		$(document).on('click', function() {
			self.hide(true);
		});
	};

	self.hide = function(force) {
		is && setTimeout2(self.ID, self.hideforce, force ? 1 : 200);
	};

	self.show = function(opt) {

		if (!can)
			return;

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (prev === tmp)
			return;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		clearTimeout2(self.ID);

		self.target = tmp;
		self.opt = opt;
		self.html('<div class="' + cls + '-body">' + opt.html + '</div>');

		var b = self.find('.' + cls + '-body');
		b.rclass2(cls + '-arrow-');
		b.aclass(cls + '-arrow-' + opt.align);

		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else {
			self.rclass('hidden');
			self.aclass(cls + '-visible', 100);
			is = true;
		}

		var target = $(opt.element);
		var w = self.width();
		var h = self.height();
		var offset = target.offset();

		switch (opt.align) {
			case 'left':
			case 'right':
				css.top = offset.top + (opt.center ? (h / 2 >> 0) : 0);
				css.left = opt.align === 'left' ? (offset.left - w - 10) : (offset.left + target.innerWidth() + 10);
				break;
			default:
				css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
				css.top = opt.align === 'bottom' ? (offset.top + target.innerHeight() + 10) : (offset.top - h - 10);
				break;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		opt.timeout && setTimeout2(self.ID, self.hide, opt.timeout - 200);
		self.element.css(css);
	};

});