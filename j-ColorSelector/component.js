COMPONENT('colorselector', 'colors:#DA4453,#E9573F,#F6BB42,#8CC152,#37BC9B,#3BAFDA,#4A89DC,#967ADC,#D770AD,#656D7D;empty:true', function(self, config) {

	var selected, list, content, colors = null;

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : colors.indexOf(value) === -1;
	};

	self.configure = function(key, value, init) {
		if (init)
			return;
		var redraw = false;
		switch (key) {
			case 'required':
				self.find('.ui-colorselector-label').tclas('.ui-colorselector-required', value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'colors':
				colors = value.split(',').trim();
				break;
			case 'label':
			case 'icon':
				redraw = true;
				break;
		}

		redraw && setTimeout2('redraw.' + self.id, function() {
			self.redraw();
			self.refresh();
		}, 100);
	};

	self.redraw = function() {
		var builder = [];
		var label = config.label || content;
		label && builder.push('<div class="ui-colorselector-label{1}">{2}{0}</div>'.format(label, config.required ? ' ui-colorselector-required' : '', config.icon ? '<i class="ti ti-{0}"></i>'.format(config.icon) : ''));
		builder.push('<ul class="ui-colorselector">');

		for (var i = 0, length = colors.length; i < length; i++) {
			var color = colors[i];
			color && builder.push('<li data-index="{0}" style="background-color:{1}"></li>'.format(i, color));
		}

		builder.push('</ul>');
		self.html(builder.join(''));
		self.tclass('ui-disabled', config.disabled);
		list = self.find('li');
	};

	self.make = function() {
		colors = config.colors.split(',').trim();
		self.redraw();
		self.event('click', 'li', function() {
			if (config.disabled)
				return;
			var color = colors[+this.getAttribute('data-index')];
			if (!config.required && color === self.get())
				color = '';
			self.change(true);
			self.set(color);
		});
	};

	self.setter = function(value) {
		var index = colors.indexOf(value);
		selected && selected.rclass('selected');
		if (index !== -1) {
			selected = list.eq(index);
			selected.aclass('selected');
		}
	};
});