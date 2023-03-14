COMPONENT('range', function(self, config, cls) {

	var cls2 = '.' + cls;
	var content = '';

	self.nocompile();

	self.validate = function(value) {
		return !config.required || config.disabled ? true : value != 0;
	};

	self.configure = function(key, value, init, prev) {
		if (init)
			return;
		var redraw = false;
		switch (key) {
			case 'step':
			case 'max':
			case 'min':
				var input = self.find('input');
				if (value)
					input.prop(key, value);
				else
					input.removeProp(key);
				break;

			case 'icon':
				if (value && prev)
					self.find('i').rclass().aclass('ti ti-' + value);
				else
					redraw = true;
				break;

			case 'required':
				self.find(cls2 +'-label').tclass(cls + '-label-required', value);
				break;

			case 'type':
				self.type = value;
				break;

			case 'label':
				redraw = true;
				break;
		}

		if (redraw) {
			self.redraw();
			self.refresh();
		}
	};

	self.redraw = function() {

		var label = config.label || content;
		var html = '';

		if (label)
			html = ('<div class="' + cls + '-label{1}">{2}{0}:</div>').format(label, config.required ? (' ' + cls + '-label-required') : '', (config.icon ? '<i class="ti ti-{0}"></i>'.format(config.icon) : ''));

		var attrs = [];

		config.step && attrs.attr('step', config.step);

		if (config.max || config.max === 0)
			attrs.attr('max', config.max);
		if (config.min || config.min === 0)
			attrs.attr('min', config.min);

		self.html('{0}<input type="range" data-jc-bind=""{1} />'.format(html, attrs.length ? ' ' + attrs.join(' ') : ''));
	};

	self.make = function() {
		self.type = config.type;
		content = self.html();
		self.aclass(cls);
		self.redraw();
	};
});