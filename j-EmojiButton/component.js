COMPONENT('emojibutton', 'default:#FFFFFF;align:left;position:top', function(self, config) {

	var cls = 'ui-emojibutton';
	var icon;

	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<span class="{0}-arrow"><i class="ti ti-angle-down"></i></span><div class="{0}-icon"></div>'.format(cls));
		icon = self.find('.' + cls + '-icon');

		self.event('click', function() {
			if (config.disabled)
				return;
			var opt = {};
			opt.align = config.align;
			opt.position = config.position;
			opt.offsetX = config.offsetX;
			opt.offsetY = config.offsetY;
			opt.element = self.element;
			opt.callback = function(color) {
				self.set(color.toUpperCase());
				self.change(true);
			};
			SETTER('emoji', 'show', opt);
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				break;
		}
	};

	self.setter = function(value) {
		icon.html(value);
	};
});