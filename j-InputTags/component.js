COMPONENT('inputtags', 'dirkey:name;dirvalue:id;transform:0;enteronly:1;after:\\:', function(self, config) {

	var cls = 'ui-inputtags';
	var cls2 = '.' + cls;
	var input, placeholder, dirsource, binded, customvalidator, tags, skip = false;

	self.nocompile();
	self.bindvisible(50);

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

		self.event('input change focusout', function(e) {
			self.check();
			if (!config.enteronly && e.type === 'focusout') {
				setTimeout(function() {
					var val = input.text();
					val && self.appendval(val);
					input.html('');
				}, 100);
			}
		});

		self.event('focus', cls2 + '-editable', function() {
			self.aclass(cls + '-focused');
			config.autocomplete && EXEC(config.autocomplete, self, input.parent());
			if (config.autosource) {
				var opt = {};
				opt.element = self.element;
				opt.search = GET(self.makepath(config.autosource));
				opt.callback = function(value) {
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
			opt.render = config.dirrender ? GET(self.makepath(config.dirrender)) : null;
			opt.custom = !!config.dircustom;
			opt.offsetWidth = 2;
			opt.minwidth = config.dirminwidth || 200;
			opt.maxwidth = config.dirmaxwidth;
			opt.key = config.dirkey || config.key;
			opt.empty = config.dirempty;

			if (config.dirvalue && typeof(dirsource) !== 'function') {
				var val = self.get() || EMPTYARRAY;
				opt.exclude = function(item) {
					return item ? typeof(item) === 'string' ? self.findvalue(val, item) : self.findvalue(val, item[config.dirvalue]) : false;
				};
			}

			opt.callback = function(item, el, custom) {

				// empty
				if (item == null || (custom && !opt.custom))
					return;

				var val = custom || (typeof(item) === 'string' ? item : item[config.dirvalue || config.value]);
				if (custom) {
					if (typeof(config.dircustom) === 'string') {
						var fn = GET(self.makepath(config.dircustom));
						fn(val, function(val) {
							self.appendval(val, true);
						});
					} else
						self.appendval(item, true);
				} else if (!custom)
					self.appendval(typeof(dirsource) === 'function' ? item : val);
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
				EXEC(self.makepath(config.liconclick), self, el);
			else if (config.riconclick)
				EXEC(self.makepath(config.riconclick), self, el);

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

	self.setter = function() {
		if (skip)
			skip = false;
		else
			self.bindvalue();
	};

	self.appendval = function(value, custom) {

		var cur = self.get() || EMPTYARRAY;
		var is = false;
		var isfn = false;
		var rawvalue = value;

		if (dirsource && typeof(dirsource) === 'function') {
			isfn = true;
			rawvalue = value[config.dirvalue];
			if (cur.indexOf(rawvalue) !== -1 || !self.checkvalue(rawvalue))
				return;
		} else {
			rawvalue = self.transform(rawvalue);
			if (cur.indexOf(rawvalue) !== -1 || !self.checkvalue(rawvalue))
				return;
		}

		if (config.dirsource) {
			if (custom) {
				is = true;
				self.appendtag(rawvalue);
			} else {
				if (isfn) {
					is = true;
					self.appendtag(value[config.dirkey]);
				} else {
					var item = dirsource.findItem(config.dirvalue, rawvalue);
					if (item) {
						is = true;
						self.appendtag(item[config.dirkey]);
					}
				}
			}
		} else {
			is = true;
			self.appendtag(rawvalue);
		}

		if (is) {
			skip = true;
			self.push(rawvalue);
			self.change(true);
		}

		self.check();
		self.dirinitchecksum = 0;
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
		return config.check ? GET(self.makepath(config.check))(val) : true;
	};

	self.check = function() {

		var is = !!input[0].innerHTML || (self.get() || EMPTYARRAY).length > 0;
		setTimeout(self.resize, 10);

		if (binded === is)
			return;

		binded = is;
		placeholder && placeholder.tclass('hidden', is);
		self.tclass(cls + '-binded', is);

		if (config.type === 'search')
			self.find(cls2 + '-icon-right').find('i').tclass(config.ricon, !is).tclass('fa-times', is);
	};

	self.dirinitchecksum = 0;

	self.bindvalue = function() {

		var value = self.get() || EMPTYARRAY;
		var tmp = HASH(value);

		if (tmp === self.dirinitchecksum)
			return;

		self.dirinitchecksum = tmp;
		tags.find(cls2 + '-tag').remove();

		if (dirsource) {

			if (typeof(dirsource) === 'function') {
				EXEC(self.makepath(config.dirinit), value, function(dirsource) {

					var item;

					for (var i = 0; i < dirsource.length; i++) {
						item = dirsource[i];
						item.name = self.transform(item.name);
						if (value.indexOf(item[config.dirvalue || config.value]) != -1)
							self.appendtag(item[config.dirkey || config.key]);
					}

					input.empty();
					self.check();
				});
				return;
			}

			var arr = [];
			var item;

			for (var i = 0; i < dirsource.length; i++) {
				item = dirsource[i];
				item.name = self.transform(item.name);
				if (typeof(item) === 'string') {
					if (value.indexOf(item) === -1)
						continue;
					arr.push(item);
				} else if (value.indexOf(item[config.dirvalue || config.value]) != -1)
					arr.push(item[config.dirkey || config.key]);
			}

			// if (value && item == null && config.dircustom)
			// arr.push(value);

			for (var i = 0; i < arr.length; i++) {
				item = arr[i];
				item && self.appendtag(item);
			}

		} else {
			for (var i = 0; i < value.length; i++) {
				value[i] = self.transform(value[i]);
				value[i] && self.appendtag(value[i]);
			}
		}

		input.empty();
		self.check();
	};

	self.resize = function() {
		var h = self.find(cls2 + '-input').innerHeight() + 'px';
		self.find('.{0}-icon-right,.{0}-icon-left'.format(cls)).css({ height: h, 'line-height': h });
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
				var tmp = GET(self.makepath(value));
				input.prop('contenteditable', !value);
				if (typeof(tmp) !== 'function') {
					self.datasource(value, function(path, value) {
						dirsource = value || EMPTYARRAY;
						self.bindvalue();
					});
				} else
					dirsource = tmp;
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

	self.transform = function(string) {

		if (typeof string !== 'string')
			return string;

		switch (config.transform) {
			case 1:
				return string.toLowerCase();
			case 2:
				return string.toUpperCase();
			case 3:
				return self.capitalize(string);
		}
		return string;
	};

	self.capitalize = function(string) {
		return string.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};
});