COMPONENT('input', 'maxlength:200;key:name;value:id;increment:1;after:\\:', function(self, config) {

	var cls = 'ui-input';
	var cls2 = '.' + cls;
	var input, placeholder, datasource, binded, customvalidator;

	self.init = function() {
		Thelpers.ui_input_icon = function(val) {
			return val.charAt(0) === '!' ? ('<span class="ui-input-icon-custom">' + val.substring(1) + '</span>') : ('<i class="fa fa-' + val + '"></i>');
		};
		W.ui_input_template = Tangular.compile('{{ if label }}<div class="{0}-label">{{ if icon }}<i class="fa fa-{{ icon }}"></i>{{ fi }}{{ label }}{{ after }}</div>{{ fi }}<div class="{0}-control{{ if datasource }} ui-input-dropdown{{ fi }}{{ if licon }} {0}-licon{{ fi }}{{ if ricon || type === \'number\' }} {0}-ricon{{ fi }}">{{ if ricon || type === \'number\' }}<div class="{0}-icon-right{{ if type === \'number\' }} ui-input-increment{{ else if riconclick || type === \'date\' || type === \'time\' || type === \'search\' || type === \'password\' }} ui-input-click{{ fi }}">{{ if type === \'number\' }}<i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i>{{ else }}{{ ricon | ui_input_icon }}{{ fi }}</div>{{ fi }}{{ if licon }}<div class="{0}-icon-left{{ if liconclick }} ui-input-click{{ fi }}">{{ licon | ui_input_icon }}</div>{{ fi }}<div class="{0}-input{{ if align === 1 || align === \'center\' }} center{{ else if align === 2 || align === \'right\' }} right{{ fi }}">{{ if placeholder && !innerlabel }}<div class="{0}-placeholder">{{ placeholder }}</div>{{ fi }}<input type="{{ if !datasource && type === \'password\' }}password{{ else }}text{{ fi }}"{{ if autofill }} name="{{ PATH }}"{{ fi }}{{ if datasource }} readonly{{ else }} data-jc-bind=""{{ fi }}{{ if maxlength > 0}} maxlength="{{ maxlength }}"{{ fi }}{{ if autofocus }} autofocus{{ fi }} /></div></div>{{ if error }}<div class="ui-input-error hidden"><i class="fa fa-warning"></i> {{ error }}</div>{{ fi }}'.format(cls));
	};

	self.make = function() {

		if (!config.label)
			config.label = self.html();

		if (isMOBILE && config.autofocus)
			config.autofocus = false;

		config.PATH = self.path.replace(/\./g, '_');

		self.aclass(cls + ' invisible');
		self.rclass('invisible', 100);
		self.redraw();

		self.event('input change', function() {
			self.check();
		});

		self.event('focus', 'input', function() {
			self.aclass(cls + '-focused');
			config.autcomplete && EXEC(config.autcomplete, self, input.parent());
		});

		self.event('keydown', 'input', function(e) {

			if (this.readOnly || config.disabled) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (!config.disabled && e.which === 13 || e.which > 30)
				config.datasource && self.element.find(cls2 + '-control').trigger('click');
		});

		self.event('blur', 'input', function() {
			self.rclass(cls + '-focused');
		});

		self.event('click', cls2 + '-control', function() {

			if (!config.datasource || config.disabled)
				return;

			var opt = {};
			opt.element = self.find(cls2 + '-control');
			opt.items = datasource;
			opt.offsetY = -1;
			opt.render = config.datasourcerender ? GET(config.datasourcerender) : null;
			opt.custom = !!config.datasourcecustom;
			opt.offsetWidth = 2;
			opt.minwidth = config.datasourceminwidth || 200;
			opt.maxwidth = config.datasourcemaxwidth;

			opt.callback = function(item, el, custom) {
				var val = custom || typeof(item) === 'string' ? item : item[config.value];
				if (custom && typeof(config.datasourcecustom) === 'string') {
					var fn = GET(config.datasourcecustom);
					fn(val, function(val) {
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

			SETTER('directory', 'show', opt);
		});

		self.event('click', cls2 + '-placeholder,' + cls2 + '-label', function() {
			if (!config.disabled) {
				if (config.datasource)
					self.element.find(cls2 + '-control').trigger('click');
				else
					input.focus();
			}
		});

		self.event('click', cls2 + '-icon-left,' + cls2 + '-icon-right', function(e) {

			if (config.disabled)
				return;

			var el = $(this);
			var left = el.hclass(cls + '-icon-left');

			if (config.datasource && left && config.liconclick) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (!left && !config.riconclick) {
				if (config.type === 'date') {
					SETTER('calendar', 'toggle', self.element, self.get(), function(date) {
						self.change(true);
						self.set(date);
					});
				} else if (config.type === 'time') {
					SETTER('timepicker', 'toggle', self.element, self.get(), function(date) {
						self.change(true);
						self.set(date);
					});
				} else if (config.type === 'search')
					self.set('');
				else if (config.type === 'password')
					self.password();
				else if (config.type === 'number') {
					var n = $(e.target).hclass('fa-caret-up') ? 1 : -1;
					self.change(true);
					self.inc(config.increment * n);
				}

				return;
			}

			if (left && config.liconclick)
				EXEC(config.liconclick, self, el);
			else if (config.riconclick)
				EXEC(config.riconclick, self, el);

		});
	};

	self.validate = function(value) {

		if (!config.required || config.disabled)
			return true;

		if (config.datasource)
			return !!value;

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
			case 'currency':
			case 'number':

				if (config.minvalue != null && value < config.minvalue)
					return false;

				if (config.maxvalue != null && value > config.maxvalue)
					return false;

				return value > 0;
		}

		return value.length > 0;
	};

	self.offset = function() {
		var offset = self.element.offset();
		var control = self.find(cls2 + '-control');
		var width = control.width() + 2;
		return { left: offset.left, top: control.offset().top + control.height(), width: width };
	};

	self.password = function(show) {
		var visible = show == null ? input.attr('type') === 'text' : show;
		input.attr('type', visible ? 'password' : 'text');
		self.find(cls2 + '-icon-right').find('i').tclass(config.ricon, visible).tclass('fa-eye-slash', !visible);
	};

	self.setterin = self.setter;
	self.setter = function(value, path, type) {
		self.setterin(value, path, type);
		self.bindvalue();
		if (config.type === 'password')
			self.password(true);
	};

	self.check = function() {

		var is = !!input[0].value;

		if (binded === is)
			return;

		binded = is;
		placeholder && placeholder.tclass('hidden', is);
		self.tclass(cls + '-binded', is);
		if (config.type === 'search')
			self.find(cls2 + '-icon-right').find('i').tclass(config.ricon, !is).tclass('fa-times', is);

	};

	self.bindvalue = function() {
		if (datasource) {

			var value = self.get();
			var item;

			for (var i = 0; i < datasource.length; i++) {
				item = datasource[i];
				if (typeof(item) === 'string') {
					if (item === value)
						break;
					item = null;
				} else if (item[config.value] === value) {
					item = item[config.key];
					break;
				} else
					item = null;
			}

			if (value && item == null && config.datasourcecustom)
				item = value;

			input.val(item || '');
		}
		self.check();
	};

	self.redraw = function() {

		if (!config.ricon) {
			if (config.datasource)
				config.ricon = 'angle-down';
			else if (config.type === 'date') {
				config.ricon = 'calendar';
				if (!config.align && !config.innerlabel)
					config.align = 1;
			} else if (config.type === 'time') {
				config.ricon = 'clock-o';
				if (!config.align && !config.innerlabel)
					config.align = 1;
			} else if (config.type === 'search')
				config.ricon = 'search';
			else if (config.type === 'password')
				config.ricon = 'eye';
			else if (config.type === 'number') {
				if (!config.align && !config.innerlabel)
					config.align = 1;
			}
		}

		self.html(W.ui_input_template(config));
		input = self.find('input');
		placeholder = self.find(cls2 + '-placeholder');
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'datasource':
				self.datasource(value, function(path, value) {
					datasource = value;
					self.bindvalue();
				});
				break;
			case 'disabled':
				self.tclass('ui-disabled', value == true);
				input.prop('readonly', value === true);
				break;
			case 'required':
				self.tclass(cls + '-required', value == true);
				break;
			case 'type':
				self.type = value;
				break;
			case 'validate':
				customvalidator = value ? value.indexOf('(') == - 1 ? (function(path) { return function(value) { return GET(path)(value); }})(value) : FN('value => ' + value) : null;
				break;
			case 'innerlabel':
				self.tclass('ui-input-inner', value);
				break;
		}
	};

	self.formatter(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					return value.toString().toLowerCase();
				case 'upper':
					return value.toString().toUpperCase();
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

	self.parser(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'date':
					var tmp = self.get();
					if (tmp)
						tmp = tmp.format('HH:mm');
					else
						tmp = '';
					return value + (tmp ? (' ' + tmp) : '');
				case 'lower':
					value = value.toLowerCase();
					break;
				case 'upper':
					value = value.toUpperCase();
					break;
				case 'time':
					var tmp = value.split(':');
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

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
		config.error && self.find(cls2 + '-error').tclass('hidden', !invalid);
	};
});