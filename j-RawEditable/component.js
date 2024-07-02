COMPONENT('raweditable', 'formatting:false', function(self, config, cls) {

	var customvalidator;
	var skip = false;
	var filled = false;
	var focused = false;

	// jComponent +v20
	self.autobind20 && self.autobind20();

	self.validate = function(value) {

		if ((!config.required || config.disabled) && !self.forcedvalidation())
			return true;

		if (customvalidator)
			return customvalidator(value);

		if (self.type === 'date')
			return value instanceof Date && !isNaN(value.getTime());

		if (value == null)
			value = '';
		else
			value = value.toString();

		if (config.minlength && value.length < config.minlength)
			return false;

		switch (self.type) {
			case 'email':
				return value.isEmail();
			case 'phone':
				return value.isPhone();
			case 'url':
				return value.isURL();
			case 'zip':
				return (/^\d{5}(?:[-\s]\d{4})?$/).test(value);
			case 'currency':
			case 'number':
				value = value.parseFloat();
				if ((config.minvalue != null && value < config.minvalue) || (config.maxvalue != null && value > config.maxvalue))
					return false;
				return config.minvalue == null ? value > 0 : true;
		}

		return value.length > 0;
	};

	self.formatter(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					return (value + '').toLowerCase();
				case 'upper':
					return (value + '').toUpperCase();
				case 'phone':
					return (value + '').replace(/\s/g, '');
				case 'email':
					return (value + '').toLowerCase();
				case 'date':
					return value.format(config.format || 'yyyy-MM-dd');
				case 'time':
					return value.format(config.format || 'HH:mm');
				case 'number':
					return config.format ? value.format(config.format) : value;
			}
		}

		return value;
	});

	self.readvalue = function() {
		return config.formatting ? self.dom.innerHTML : self.dom.innerHTML.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
	};

	self.onchange = function() {
		self.set(self.readvalue(), 1);
		self.change(true);
	};

	self.parser(function(path, value) {
		if (value) {
			var tmp;
			switch (config.type) {
				case 'date':
					tmp = self.get();
					if (tmp)
						tmp = tmp.format('HH:mm');
					else
						tmp = '';
					return value + (tmp ? (' ' + tmp) : '');
				case 'lower':
				case 'email':
					value = value.toLowerCase();
					break;
				case 'upper':
					value = value.toUpperCase();
					break;
				case 'phone':
					value = value.replace(/\s/g, '');
					break;
				case 'time':
					tmp = value.split(':');
					var dt = self.get();
					if (dt == null)
						dt = new Date();
					dt.setHours(+(tmp[0] || '0'));
					dt.setMinutes(+(tmp[1] || '0'));
					dt.setSeconds(+(tmp[2] || '0'));
					value = dt;
					break;
			}
		}
		return value ? config.spaces === false ? value.replace(/\s/g, '') : value : value;
	});

	var isplaceholder = false;

	self.placeholder = function(show) {
		if (config.placeholder) {
			if (show) {
				if (filled) {
					if (isplaceholder) {
						isplaceholder = false;
						self.rclass(cls + '-placeholder');
					}
				} else {
					if (!isplaceholder) {
						self.aclass(cls + '-placeholder');
						self.html(config.placeholder);
						isplaceholder = true;
					}
				}
			} else {
				if (isplaceholder) {
					isplaceholder = false;
					self.rclass(cls + '-placeholder');
					self.html('');
				}
			}
		}
	};

	self.make = function() {

		self.aclass(cls);
		self.attr('contenteditable', true);

		var $input = self.element;
		var blacklist = { b: 1, i: 1, u: 1 };
		var is = false;

		$input.on('keydown', function(e) {

			// rebind
			skip = true;
			self.getter(self.readvalue(), true);

			if (config.maxlength && e.which > 16 && !e.metaKey && self.element.text().length >= config.maxlength) {
				e.preventDefault();
				return;
			}

			if (!config.formatting && e.metaKey && blacklist[e.key])
				e.preventDefault();

			if (e.which === 13) {
				self.onchange();
				config.enter && self.SEEX(config.enter, self.get(), self);
				$input.blur();
				e.preventDefault();
				return;
			}

			is = true;

		}).on('focus', function() {

			var el = $(this);

			self.placeholder(false);

			if (config.disabled) {
				el.blur();
				return;
			}

			focused = true;
			self.aclass(cls + '-focused');
			config.autocomplete && self.EXEC(config.autocomplete, self, el.parent());

			if (config.autosource) {
				var opt = {};
				opt.element = self.element;
				opt.search = GET(self.makepath(config.autosource));
				opt.callback = function(value) {
					var val = typeof(value) === 'string' ? value : value[config.autovalue];
					if (config.autoexec) {
						self.EXEC(config.autoexec, value, function(val) {
							self.set(val, 2);
							self.change();
							self.bindvalue();
						});
					} else {
						self.set(val, 2);
						self.change();
						self.bindvalue();
					}
				};
				SETTER('autocomplete/show', opt);
			}
		}).on('blur', function() {
			focused = false;

			if (is) {
				skip = false;
				self.onchange();
			} else
				setTimeout(self.placeholder, 10, true);

			self.rclass(cls + '-focused');
		}).on('paste', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var text = (e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain') || '').replace(/\n|\r/g, '').trim();
			text && document.execCommand('insertText', false, text);
		});

	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				self.element.prop('contenteditable', !!value);
				self.reset();
				break;
			case 'readonly':
				self.element.prop('contenteditable', !!value);
				self.reset();
				break;
			case 'required':
				self.tclass(cls + '-required', !!value);
				self.reset();
				break;
			case 'type':
				self.type = value;
				break;
			case 'validate':
				customvalidator = value ? (/\(|=|>|<|\+|-|\)/).test(value) ? FN('value=>' + value) : (function(path) { path = self.makepath(path); return function(value) { return GET(path)(value); }; })(value) : null;
				break;
			case 'monospace':
				self.tclass(cls + '-monospace', !!value);
				break;
		}
	};

	self.preparevalue = function(value) {

		if (self.type === 'number' && (config.minvalue != null || config.maxvalue != null)) {
			var tmp = typeof(value) === 'string' ? +value.replace(',', '.') : value;
			if (config.minvalue > tmp)
				value = config.minvalue;
			if (config.maxvalue < tmp)
				value = config.maxvalue;
		}

		return value;
	};

	self.getterin = self.getter;
	self.getter = function(value, realtime, nobind) {
		filled = !!value;
		self.getterin(self.preparevalue(value), realtime, nobind);
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (value == null)
			value = '';

		value = value + '';
		filled = !!value;

		self.html(config.formatting ? value : value.replace(/\s/g, '&nbsp;'));

		if (!focused)
			self.placeholder(true);
	};

	self.state = function(type) {
		if (type) {
			var invalid = config.required ? self.isInvalid() : self.forcedvalidation() ? self.isInvalid() : false;
			if (invalid === self.$oldstate)
				return;
			self.$oldstate = invalid;
			self.tclass(cls + '-invalid', invalid);
		}
	};

	self.forcedvalidation = function() {

		if (!config.forcevalidation)
			return false;

		if (self.type === 'number')
			return false;

		var val = self.get();
		return (self.type === 'phone' || self.type === 'email') && (val != null && (typeof(val) === 'string' && val.length !== 0));
	};

});