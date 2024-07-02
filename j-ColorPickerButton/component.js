COMPONENT('colorpickerbutton', 'default:#FFFFFF;align:left;position:top', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<span class="{0}-arrow"><i class="ti ti-angle-down"></i></span><div class="{0}-color"></div>'.format(cls));
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
			SETTER('colorpicker/show', opt);
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
		self.find(cls2 + '-color').css('background-color', value || config.default);
	};
});