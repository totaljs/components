COMPONENT('textbox', function(self) {

	var config = self.config;
	var input, container, content = null;

	self.validate = function(value) {

		if (!config.required || input.prop('disabled'))
			return true;

		var type = typeof(value);
		if (type === 'undefined' || type === 'object')
			value = '';
		else
			value = value.toString();

		EMIT('reflow', self.name);

		switch (self.type) {
			case 'email':
				return value.isEmail();
			case 'url':
				return value.isURL();
			case 'currency':
			case 'number':
				return value > 0;
		}

		return config.validation ? self.evaluate(value, config.validation, true) ? true : false : value.length > 0;
	};

	self.make = function() {
		content = self.html();

		self.event('click', '.fa-calendar', function(e) {
			if (self.type === 'calendar') {
				e.preventDefault();
				window.$calendar && window.$calendar.toggle(self.closest('.ui-textbox'), self.find('input').val(), function(date) {
					self.set(date);
				});
			}
		});

		self.event('click', '.fa-caret-up,.fa-caret-down', function() {
			if (config.increment) {
				var el = $(this);
				var inc = el.hasClass('fa-caret-up') ? 1 : -1;
				self.change(true);
				self.inc(inc);
			}
		});

		self.event('click', '.ui-textbox-control-icon', function() {
			if (self.type === 'search') {
				self.$stateremoved = false;
				$(this).removeClass('fa-times').addClass('fa-search');
				self.set('');
			}
		});

		self.redraw();
	};

	self.redraw = function() {

		var attrs = [];
		var builder = [];
		var tmp;

		if (config.type === 'password')
			tmp = 'password';
		else
			tmp = 'text';

		self.type = config.type;
		attrs.attr('type', tmp);
		config.placeholder && attrs.attr('placeholder', config.placeholder);
		config.maxlength && attrs.attr('maxlength', config.maxlength);
		config.keypress != null && attrs.attr('data-jc-keypress', config.keypress);
		config.delay && attrs.attr('data-jc-keypress-delay', config.delay);
		attrs.attr('data-jc-bind', '');

		config.autofill && attrs.attr('name', self.path.replace(/\./g, '_'));
		config.align && attrs.attr('class', 'ui-' + config.align);
		config.autofocus && attrs.attr('autofocus');

		builder.push('<input {0} />'.format(attrs.join(' ')));

		var icon = config.icon;
		var icon2 = config.icon2;

		if (!icon2 && self.type === 'date')
			icon2 = 'calendar';
		else if (self.type === 'search') {
			icon2 = 'search ui-textbox-control-icon';
			self.getter2 = function(value) {
				if (self.$stateremoved && !value)
					return;
				self.$stateremoved = value ? false : true;
				self.find('.ui-textbox-control-icon').toggleClass('fa-times', value ? true : false).toggleClass('fa-search', value ? false : true);
			};
		}

		icon2 && builder.push('<div><span class="fa fa-{0}"></span></div>'.format(icon2));
		config.increment && !icon2 && builder.push('<div><span class="fa fa-caret-up"></span><span class="fa fa-caret-down"></span></div>');

		if (config.label)
			content = config.label;

		if (content.length) {
			var html = builder.join('');
			builder = [];
			builder.push('<div class="ui-textbox-label{0}">'.format(config.required ? ' ui-textbox-label-required' : ''));
			icon && builder.push('<span class="fa fa-{0}"></span> '.format(icon));
			builder.push(content);
			builder.push(':</div><div class="ui-textbox">{0}</div>'.format(html));
			self.html(builder.join(''));
			self.aclass('ui-textbox-container');
			input = self.find('input');
			container = self.find('.ui-textbox');
		} else {
			self.aclass('ui-textbox ui-textbox-container');
			self.html(builder.join(''));
			input = self.find('input');
			container = self.element;
		}
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		switch (key) {
			case 'format':
				self.refresh(true);
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				self.find('.ui-textbox-label').toggleClass('ui-textbox-label-required', value);
				break;
			case 'placeholder':
				input.prop('placeholder', value || '');
				break;
			case 'maxlength':
				input.prop('maxlength', value || 1000);
				break;
			case 'autofill':
				input.prop('name', value ? self.path.replace(/\./g, '_') : '');
				break;
			case 'label':
				content = value;
				self.redraw();
				break;
			case 'type':
				self.type = value;
				if (value === 'password')
					value = 'password';
				else
					self.type = 'text';
				self.redraw();
				break;
			case 'align':
				input.removeClass(input.attr('class')).addClass('ui-' + value || 'left');
				break;
			case 'autofocus':
				input.focus();
				break;
			case 'icon':
			case 'icon2':
			case 'increment':
				self.redraw();
				break;
		}
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = self.isInvalid();
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		container.toggleClass('ui-textbox-invalid', invalid);
	};
});