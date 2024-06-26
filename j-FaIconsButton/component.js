COMPONENT('faiconsbutton', 'default:#FFFFFF;align:left;position:top;empty:1', function(self, config) {

	var cls = 'ui-faiconsbutton';
	var icon;

	self.nocompile();

	self.make = function() {

		self.aclass(cls);

		self.dom.innerHTML && self.element.wrapInner('<div class="{0}-label"></div>'.format(cls));
		self.append('<div class="{0}-button"><span class="{0}-arrow"><i class="fa fa-angle-down"></i></span><div class="{0}-icon"></div></div>'.format(cls));

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
			opt.empty = config.empty;
			opt.callback = function(icon) {
				self.set(icon);
				self.change(true);
			};
			SETTER('faicons/show', opt);
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
		icon.html(value ? '<i class="{0}"></i>'.format(value) : '');
	};
});