COMPONENT('inputtags', 'dirkey:name;dirvalue:id;after:\\:', function(self, config) {

	var cls = 'ui-inputtags';
	var cls2 = '.' + cls;
	var input, placeholder, dirsource, binded, customvalidator, tags, skip = false;

	self.init = function() {
		Thelpers.ui_inputtags_icon = function(val) {
			return val.charAt(0) === '!' ? ('<span class="ui-inputtags-icon-custom">' + val.substring(1) + '</span>') : ('<i class="fa fa-' + val + '"></i>');
		};
		W.ui_inputtags_template = Tangular.compile(('{{ if label }}<div class="{0}-label">{{ if icon }}<i class="fa fa-{{ icon }}"></i>{{ fi }}{{ label }}{{ after }}</div>{{ fi }}<div class="{0}-control{{ if dirsource }} {0}-dropdown{{ fi }}{{ if licon }} {0}-licon{{ fi }}{{ if ricon }} {0}-ricon{{ fi }}">{{ if ricon }}<div class="{0}-icon-right">{{ ricon | ui_inputtags_icon }}</div>{{ fi }}{{ if licon }}<div class="{0}-icon-left{{ if liconclick }} {0}-click{{ fi }}">{{ licon | ui_inputtags_icon }}</div>{{ fi }}<div class="{0}-input{{ if align === 1 || align === \'center\' }} center{{ else if align === 2 || align === \'right\' }} right{{ fi }}">{{ if placeholder && !innerlabel }}<div class="{0}-placeholder">{{ placeholder }}</div>{{ fi }}<div class="{0}-tags"><span class="{0}-editable" contenteditable="true"></span></div></div></div>{{ if error }}<div class="{0}-error hidden"><i class="fa fa-warning"></i> {{ error }}</div>{{ fi }}').format(cls));
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

		self.event('focus', cls2 + '-editable', function() {
			self.aclass(cls + '-focused');
			config.autocomplete && EXEC(config.autocomplete, self, input.parent());

			if (config.autosource) {
				var opt = {};
				opt.element = self.element;
				opt.search = GET(config.autosource);
				opt.callback = function(value, el) {
					input.empty();
					self.appendval(typeof(value) === 'string' ? value : value[config.autovalue]);
					self.check();
				};
				SETTER('autocomplete', 'show', opt);
			}

		});

		self.event('blur', cls2 + '-editable', function() {
			self.rclass(cls + '-focused');
		});

		self.event('click', '.fa-times', function(e) {
			var index = $(this).parent().index();
			self.removetag(index);
			e.stopPropagation();
			e.preventDefault();
		});

		self.event('click', cls2 + '-tag', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		self.findvalue = function(arr, val) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] && (arr[i] === val || arr[i][config.value] === val))
					return arr[i];
			}
		};

		self.event('click', cls2 + '-control', function() {

			if (!config.dirsource || config.disabled)
				return;

			var opt = {};
			opt.element = self.find(cls2 + '-control');
			opt.items = dirsource;
			opt.offsetY = -1;
			opt.placeholder = config.dirplaceholder;
			opt.render = config.dirrender ? GET(config.dirrender) : null;
			opt.custom = !!config.dircustom;
			opt.offsetWidth = 2;
			opt.minwidth = config.dirminwidth || 200;
			opt.maxwidth = config.dirmaxwidth;
			opt.key = config.dirkey || config.key;
			opt.empty = config.dirempty;

			if (config.dirvalue) {
				var val = self.get() || EMPTYARRAY;
				opt.exclude = function(item) {
					return item ? typeof(item) === 'string' ? self.findvalue(val, item) : self.findvalue(val, item[config.dirvalue]) : false;
				};
			}

			opt.callback = function(item, el, custom) {

				// empty
				if (item == null)
					return;

				var val = custom || typeof(item) === 'string' ? item : item[config.dirvalue || config.value];
				if (custom && typeof(config.dircustom) === 'string') {
					var fn = GET(config.dircustom);
					fn(val, function(val) {
						self.appendval(val, true);
					});
				} else if (!custom)
					self.appendval(val);
			};

			SETTER('directory', 'show', opt);
		});

		self.event('click', cls2 + '-placeholder,' + cls2 + '-label,' + cls2 + '-input', function(e) {
			if (!config.disabled) {
				if (config.dirsource) {
					e.preventDefault();
					e.stopPropagation();
					self.element.find(cls2 + '-control').trigger('click');
				} else
					input.focus();
			}
		});

		self.event('click', cls2 + '-icon-left,' + cls2 + '-icon-right', function(e) {

			if (config.disabled)
				return;

			var el = $(this);
			var left = el.hclass(cls + '-icon-left');

			if (config.dirsource && left && config.liconclick) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (left && config.liconclick)
				EXEC(config.liconclick, self, el);
			else if (config.riconclick)
				EXEC(config.riconclick, self, el);

		});
	};

	self.curpos = function(pos) {
		var el = input[0];
		if (el.createTextRange) {
			var range = el.createTextRange();
			range.move('character', pos);
			range.select();
		} else if (el.selectionStart) {
			el.focus();
			el.setSelectionRange(pos, pos);
		}
	};

	self.validate = function(value) {

		if (!config.required || config.disabled)
			return true;

		if (config.dirsource)
			return !!value;

		if (customvalidator)
			return customvalidator(value);

		if (value == null)
			value = EMPTYARRAY;

		return value.length > 0;
	};

	self.offset = function() {
		var offset = self.element.offset();
		var control = self.find(cls2 + '-control');
		var width = control.width() + 2;
		return { left: offset.left, top: control.offset().top + control.height(), width: width };
	};

	self.setter = function(value) {
		if (skip)
			skip = false;
		else
			self.bindvalue();
	};

	self.appendval = function(value, custom) {

		var cur = self.get() || EMPTYARRAY;
		var is = false;

		if (cur.indexOf(value) !== -1)
			return;

		if (!self.checkvalue(value))
			return;

		if (config.dirsource) {
			if (custom) {
				is = true;
				self.appendtag(value);
			} else {
				var item = dirsource.findItem(config.dirvalue, value);
				if (item) {
					is = true;
					self.appendtag(item[config.dirkey]);
				}
			}
		} else {
			is = true;
			self.appendtag(value);
		}

		if (is) {
			skip = true;
			self.push(value);
		}

	};

	self.appendtag = function(text) {
		input.before('<span class="{0}-tag"><i class="fa fa-times"></i>{1}</span>'.format(cls, Thelpers.encode(text)));
	};

	self.removetag = function(index) {
		skip = true;
		tags.find('span').eq(index).remove();
		self.get().splice(index, 1);
		self.update(true);
		self.change(true);
		self.check();
	};

	self.checkvalue = function(val) {
		return config.check ? GET(config.check)(val) : true;
	};

	self.check = function() {

		var is = !!input[0].innerHTML || (self.get() || EMPTYARRAY).length > 0;

		if (binded === is)
			return;

		binded = is;
		placeholder && placeholder.tclass('hidden', is);
		self.tclass(cls + '-binded', is);

		if (config.type === 'search')
			self.find(cls2 + '-icon-right').find('i').tclass(config.ricon, !is).tclass('fa-times', is);
	};

	self.bindvalue = function() {

		var value = self.get() || EMPTYARRAY;

		if (dirsource) {

			var arr = [];
			var item;

			for (var i = 0; i < dirsource.length; i++) {
				item = dirsource[i];
				if (typeof(item) === 'string') {
					if (value.indexOf(item) === -1)
						continue;
					arr.push(item);
				} else if (value.indexOf(item[config.dirvalue || config.value]) != -1)
					arr.push(item[config.dirkey || config.key]);
			}

			if (value && item == null && config.dircustom)
				arr.push(value);

			tags.find(cls2 + '-tag').remove();

			for (var i = 0; i < arr.length; i++)
				self.appendtag(arr[i]);
		} else {
			for (var i = 0; i < value.length; i++)
				self.appendtag(value[i]);
		}

		input.empty();
		self.check();
	};

	self.redraw = function() {

		if (!config.ricon) {
			if (config.dirsource)
				config.ricon = 'angle-down';
		}

		self.html(W.ui_inputtags_template(config));
		input = self.find(cls2 + '-editable');
		tags = self.find(cls2 + '-tags');
		placeholder = self.find(cls2 + '-placeholder');

		input.on('paste', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var text = e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain');
			text && document.execCommand('insertText', false, text);
		});

		input.on('keydown', function(e) {
			var el;
			if (e.which === 13) {
				e.preventDefault();
				e.stopPropagation();
				el = $(this);
				setTimeout(function() {
					var val = el.text();
					val && self.appendval(val);
					el.html('');
				}, 100);
			} else if (e.which === 8) {
				if (!this.innerHTML) {
					var prev = $(this).prev();
					prev.length && self.removetag(prev.index());
				}
			}
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'dirsource':
				input.prop('contenteditable', !value);
				self.datasource(value, function(path, value) {
					dirsource = value || EMPTYARRAY;
					self.bindvalue();
				});
				break;
			case 'disabled':
				self.tclass('ui-disabled', value == true);
				input.attr('contenteditable', !value);
				self.reset();
				break;
			case 'required':
				self.tclass(cls + '-required', value == true);
				self.reset();
				break;
			case 'validate':
				customvalidator = value ? (/\(|=|>|<|\+|-|\)/).test(value) ? FN('value=>' + value) : (function(path) { return function(value) { return GET(path)(value); }; })(value) : null;
				break;
			case 'innerlabel':
				self.tclass(cls + '-inner', value);
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
			}
		}

		return value;
	});

	self.parser(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					value = value.toLowerCase();
					break;
				case 'upper':
					value = value.toUpperCase();
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