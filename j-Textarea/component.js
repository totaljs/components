COMPONENT('textarea', 'scrollbar:true', function(self, config, cls) {

	var cls2 = '.' + cls;
	var input, placeholder, content = null;

	self.nocompile && self.nocompile();

	// jComponent +v20
	self.autobind20 && self.autobind20();

	self.validate = function(value) {
		if (config.disabled || !config.required || config.readonly)
			return true;
		if (value == null)
			value = '';
		else
			value = value.toString();
		return value.length > 0;
	};

	self.configure = function(key, value, init) {
		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'readonly':
				self.find('textarea').prop('readonly', value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('textarea').prop('disabled', value);
				self.reset();
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				self.tclass(cls + '-required', value);
				break;
			case 'placeholder':
				placeholder.html(value || '');
				break;
			case 'maxlength':
				input.prop('maxlength', value || 1000);
				break;
			case 'label':
				redraw = true;
				break;
			case 'autofocus':
				input.focus();
				break;
			case 'monospace':
				self.tclass(cls + '-monospace', value);
				break;
			case 'icon':
				redraw = true;
				break;
			case 'format':
				self.format = value;
				self.refresh();
				break;
			case 'height':
				self.find('textarea').css('height', (value > 0 ? value + 'px' : value));
				break;
		}

		redraw && setTimeout2('redraw' + self.id, function() {
			self.redraw();
			self.refresh();
		}, 100);
	};

	self.redraw = function() {

		var attrs = [];
		var builder = [];
		var placeholderelement = '';

		self.tclass('ui-disabled', !!config.disabled);
		self.tclass(cls + '-monospace', !!config.monospace);
		self.tclass(cls + '-required', !!config.required);

		config.placeholder && (placeholderelement = '<div class="{0}-placeholder">{1}</div>'.format(cls, config.placeholder));
		config.maxlength && attrs.attr('maxlength', config.maxlength);
		config.error && attrs.attr('error');
		attrs.attr('data-jc-bind', '');
		config.height && attrs.attr('style', 'height:{0}px'.format(config.height));
		config.autofocus === 'true' && attrs.attr('autofocus');
		config.disabled && attrs.attr('disabled');
		config.readonly && attrs.attr('readonly');
		builder.push('{1}<textarea {0}></textarea>'.format(attrs.join(' '), placeholderelement));

		var label = config.label || content;

		if (!label.length) {
			config.error && builder.push('<div class="{0}-helper"><i class="ti ti-warning" aria-hidden="true"></i> {1}</div>'.format(cls, config.error));
			self.aclass(cls + ' ' + cls + '-container');
			self.html(builder.join(''));
		} else {
			var html = builder.join('');
			builder = [];
			builder.push('<div class="' + cls + '-label">');
			config.icon && builder.push('<i class="ti ti-{0}"></i>'.format(config.icon));
			builder.push(label);
			builder.push(':</div><div class="{0}">{1}</div>'.format(cls, html));
			config.error && builder.push('<div class="{0}-helper"><i class="ti ti-warning" aria-hidden="true"></i> {1}</div>'.format(cls, config.error));
			self.html(builder.join(''));
			self.rclass(cls);
			self.aclass(cls + '-container');
		}

		input = self.find('textarea');
		placeholder = self.find(cls2 + '-placeholder');

		if (!config.scrollbar)
			self.aclass(cls + '-noscrollbar');

	};

	self.make = function() {
		content = self.html();
		self.type = config.type;
		self.format = config.format;
		self.redraw();

		self.event('click', cls2 + '-placeholder', function() {
			if (!config.disabled) {
				placeholder.aclass('hidden');
				input.focus();
			}
		});

		self.event('focus', 'textarea', function() {
			placeholder.aclass('hidden');
		});

		self.event('blur', 'textarea', function() {
			if (!self.get() && config.placeholder)
				placeholder.rclass('hidden');
		});
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
		config.error && self.find( cls2 + '-helper').tclass(cls + '-helper-show', invalid);
	};

	self.setter2 = function(value) {

		if (!config.placeholder)
			return;

		if (value)
			placeholder.aclass('hidden');
		else
			placeholder.rclass('hidden');
	};
});