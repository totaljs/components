COMPONENT('input', 'maxlength:200;innerlabel:0;tabindex:0;dirkey:name;dirvalue:id;increment:1;format:auto;autovalue:name;direxclude:false;checkicon:ti ti-check;forcevalidation:1;searchalign:1;height:80;tabs:1;after:\\:;realtime:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var input, placeholder, dirsource, binded, customvalidator, customtransformer, mask, rawvalue, isdirvisible = false, nobindcamouflage = false, focused = false;

	self.nocompile();

	// jComponent +v20
	config.realtime && self.autobind20 && self.autobind20(config.$delay);

	self.init = function() {
		Thelpers.ui_input_icon = function(val) {
			return val.charAt(0) === '!' || val.indexOf(' ') !== -1 ? ('<span class="ui-input-icon-custom">' + (val.charAt(0) === '!' ? val.substring(1) : ('<i class="' + val) + '"></i>') + '</span>') : ('<i class="ti ti-' + val + '"></i>');
		};
		W.ui_input_cache = {};
		W.ui_input_cache.tags = { tags: 1, 'tags-lower': 1, 'tags-upper': 1, 'tags-slug': 1, 'tags-email': 1, 'tags-phone': 1, 'tags-url': 1, 'tags-id': 1 };
		W.ui_input_cache.template = Tangular.compile(('{{ if label }}<div class="{0}-label">{{ if icon }}<i class="{{ icon }}"></i>{{ fi }}{{ label | raw }}{{ after | raw }}</div>{{ fi }}<div class="{0}-control{{ if licon }} {0}-licon{{ fi }}{{ if ricon || (type === \'number\' && increment) }} {0}-ricon{{ fi }}">{{ if ricon || (type === \'number\' && increment) }}<div class="{0}-icon-right{{ if type === \'number\' && increment && !ricon }} {0}-increment{{ else if riconclick || type === \'date\' || type === \'datetime\' || type === \'time\' || (type === \'search\' && searchalign === 1) || type === \'password\' }} {0}-click{{ fi }}">{{ if type === \'number\' && !ricon }}<i class="ti ti-caret-up"></i><i class="ti ti-caret-down"></i>{{ else }}{{ ricon | ui_input_icon }}{{ fi }}</div>{{ fi }}{{ if licon }}<div class="{0}-icon-left{{ if liconclick || (type === \'search\' && searchalign !== 1) }} {0}-click{{ fi }}">{{ licon | ui_input_icon }}</div>{{ fi }}<div class="{0}-input{{ if align === 1 || align === \'center\' }} center{{ else if align === 2 || align === \'right\' }} right{{ fi }}">{{ if placeholder }}<div class="{0}-placeholder">{{ placeholder }}</div>{{ fi }}{{ if tags }}<span class="{0}-value" contenteditable="true" tabindex="{{ tabindex }}"></span>{{ else if dirsource || type === \'icon\' || type === \'emoji\' || type === \'color\' }}<div class="{0}-value" tabindex="{{ tabindex }}"></div>{{ else }}{{ if type === \'multiline\' }}<textarea{{ if realtime }} data-jc-bind=""{{ fi }} style="height:{{ height }}px" tabindex="{{ tabindex }}"></textarea>{{ else }}<input type="{{ if type === \'password\' }}password{{ else }}text{{ fi }}" tabindex="{{ tabindex }}" {{ if autofill }} autocomplete="on" name="{{ NAME }}"{{ else }} name="input' + Date.now() + '" autocomplete="new-password" spellcheck="false" role="combobox" aria-expanded="true" aria-invalid="false" aria-autocomplete="list" aria-expanded="true" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off"{{ fi }}{{ if realtime }} data-jc-bind=""{{ fi }}{{ if maxlength > 0}} maxlength="{{ maxlength }}"{{ fi }}{{ if autofocus }} autofocus{{ fi }} />{{ fi }}{{ fi }}</div></div>{{ if error }}<div class="{0}-error hidden"><i class="ti ti-warning"></i> {{ error }}</div>{{ fi }}').format(cls));
	};

	var dirsourceprepare = function(arr) {

		if (!config.dirfilter)
			return arr;

		var fn = FN(config.dirfilter);
		var output = [];
		for (var m of arr) {
			if (fn(m))
				output.push(m);
		}

		return output;
	};

	var dirsourceread = function() {
		var arr = GET(self.makepath(config.dirsource));
		return dirsourceprepare(arr);
	};

	self.make = function() {

		if (config.innerlabel && config.after)
			config.after = '';

		if (!config.label)
			config.label = self.html();

		if (isMOBILE && config.autofocus)
			config.autofocus = false;

		if (config.placeholder == 0)
			config.placeholder = '0';

		if (config.autofill) {
			if (typeof(config.autofill) === 'string') {
				config.NAME = config.autofill;
			} else {
				var path = self.path.toString();
				var index = path.lastIndexOf('.');
				config.NAME = index === -1 ? path : path.substring(index + 1);
			}
		}

		self.aclass(cls + ' invisible' + (ui_input_cache.tags[config.type] ? (' ' + cls + '-tags') : ''));
		self.rclass('invisible', 100);
		self.redraw();

		self.event('input change', function(e) {

			if (!config.realtime && e.type === 'change')
				self.getter(input.val(), false, false);

			if (nobindcamouflage)
				nobindcamouflage = false;
			else
				self.check();
		});

		self.event('click', cls2 + '-radio', function() {

			if (config.disabled) {
				$(this).blur();
				return;
			}

			self.change(true);
			var index = this.getAttribute('data-index');
			var val = dirsource[index];
			if (val)
				self.set(self.itransform(val.id), 2);
		});

		self.event('click', cls2 + '-checkbox', function() {

			if (config.disabled) {
				$(this).blur();
				return;
			}

			self.change(true);
			var val = self.get();

			if (val === 1)
				val = 0;
			else if (val === 0)
				val = 1;
			else if (val === true)
				val = false;
			else
				val = true;

			self.set(self.itransform(val), 2);
		});

		self.event('focus', 'input,textarea,' + cls2 + '-value', function() {

			if (config.disabled) {
				$(this).blur();
				return;
			}

			focused = true;
			self.camouflage(false);
			self.aclass(cls + '-focused');
			config.autocomplete && self.EXEC(config.autocomplete, self, input.parent());
			if (config.autosource) {
				var opt = {};
				opt.element = self.element;
				var source = GET(self.makepath(config.autosource));
				if (source instanceof Array) {
					opt.search = function(q, next) {
						var arr = [];
						q = q.toSearch();
						for (var m of source) {
							var name = ((typeof(m) === 'string' ? m : m[config.autovalue]) || '');
							if (name && (!q || name.toSearch().includes(q)))
								arr.push({ [config.autovalue]: name });
						}
						next(arr);
					};
				} else
					opt.search = source;
				opt.callback = function(value) {
					var val = typeof(value) === 'string' ? value : value[config.autovalue];
					if (config.autoexec) {
						self.EXEC(config.autoexec, value, function(val) {
							self.set(self.itransform(val), 2);
							self.change();
							self.bindvalue();
						});
					} else {
						val = self.parser(self.itransform(val));
						if (W.ui_input_cache.tags[config.type]) {

							if (!val)
								return;

							let arr = self.get() || [];

							if (!(arr instanceof Array))
								arr = [arr];

							rawvalue.empty();

							if (!arr.includes(val)) {
								self.addtag(val);
								arr.push(val);
								self.bind('@touched @modified', arr);
								self.check();
								setTimeout(() => self.skipadd = false, 500);
							}

						} else {
							self.set(val, 2);
							self.change();
							self.bindvalue();
						}
					}
				};
				SETTER('autocomplete/show', opt);
			} else if (config.mask) {
				setTimeout(function(input) {
					input.selectionStart = input.selectionEnd = 0;
				}, 50, this);
			} else if (config.dirsource && (config.autofocus != false && config.autofocus != 0)) {
				if (!isdirvisible)
					self.find(cls2 + '-control').trigger('click');
			} else if (config.type === 'date' || config.type === 'datetime' || config.type === 'time') {
				setTimeout(function() {
					self.element.find(cls2 + '-icon-right').trigger('click');
				}, 300);
			}
		});

		self.event('paste', 'input,textarea' + (W.ui_input_cache.tags[config.type] ? (',' + cls2 + '-value') : ''), function(e) {

			if (W.ui_input_cache.tags[config.type]) {
				e.preventDefault();
				e.stopPropagation();
				let text = e.originalEvent.clipboardData.getData('text/plain');
				text && document.execCommand('insertText', false, text.replace(/\n/g, '').trim());
			} else if (config.mask) {
				let val = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
				self.set(self.itransform(val.replace(/\s|\t/g, '')));
				e.preventDefault();
			}

			self.check();
		});

		if (W.ui_input_cache.tags[config.type]) {

			self.event('click', function() {
				if (!config.disabled)
					rawvalue.focus();
			});

			self.addtag = function(text) {
				rawvalue.before('<span class="{0}-tag"><i class="ti ti-times {0}-tag-remove"></i>{1}</span>'.format(cls, Thelpers.encode(text)));
			};

			self.event('click', cls2 + '-tag-remove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				let el = $(this).parent();
				let val = el.text();
				el.remove();
				let arr = self.get();
				arr.splice(arr.indexOf(val), 1);
				self.bind('@modified @touched', arr);
				self.check();
				rawvalue.focus();
			});

			rawvalue.on('keydown', function(e) {
				switch (e.which) {
					case 13:
						e.preventDefault();
						e.stopPropagation();
						SETTER('!autocomplete/hide');
						SETTER('!directory/hide');
						setTimeout(function(el) {
							var val = el.text();
							if (val) {
								val = self.parser(self.itransform(val));
								if (!val)
									return;
								let arr = self.get();
								if (!arr)
									arr = [];
								if (!(arr instanceof Array))
									arr = [arr];
								if (!arr.includes(val)) {
									self.addtag(val);
									arr.push(val);
									self.bind('@modified @touched', arr);
								}
							}
							el.html('');
						}, 100, $(this));
						break;
					case 8:
						if (!this.innerHTML) {
							let prev = $(this).prev();
							if (prev.length && prev[0].tagName === 'SPAN') {
								let arr = self.get();
								if (arr) {
									arr.splice(arr.indexOf(prev.text()), 1);
									self.bind('@modified @touched', arr);
									prev.remove();
									self.check();
								}
							}
						}
						break;
				}
			});
		}

		self.event('keydown', 'input,textarea', function(e) {

			var t = this;
			var code = e.which;

			if (t.readOnly || config.readonly || config.disabled) {
				// TAB
				if (e.keyCode !== 9) {
					if (config.dirsource) {
						self.find(cls2 + '-control').trigger('click');
						return;
					}
					e.preventDefault();
					e.stopPropagation();
				}
				return;
			}

			if (config.tabs && t.tagName === 'TEXTAREA' && e.keyCode === 9) {
				t.setRangeText('\t', t.selectionStart, t.selectionEnd, 'end');
				self.check();
				e.preventDefault();
				return;
			}

			if (!config.disabled && config.dirsource && (code === 13 || code > 30)) {
				self.find(cls2 + '-control').trigger('click');
				return;
			}

			if (config.mask) {

				if (e.metaKey) {
					if (code === 8 || code === 127) {
						e.preventDefault();
						e.stopPropagation();
					}
					return;
				}

				if (code === 32) {
					e.preventDefault();
					e.stopPropagation();
					return;
				}

				var beg = e.target.selectionStart;
				var end = e.target.selectionEnd;
				var val = t.value;
				var c;

				if (code === 8 || code === 127) {

					if (beg === end) {
						c = config.mask.substring(beg - 1, beg);
						t.value = val.substring(0, beg - 1) + c + val.substring(beg);
						self.curpos(beg - 1);
					} else {
						for (var i = beg; i <= end; i++) {
							c = config.mask.substring(i - 1, i);
							val = val.substring(0, i - 1) + c + val.substring(i);
						}
						t.value = val;
						self.curpos(beg);
					}

					e.preventDefault();
					return;
				}

				if (code > 40) {

					var cur = String.fromCharCode(code);

					if (mask && mask[beg]) {
						if (!mask[beg].test(cur)) {
							e.preventDefault();
							return;
						}
					}

					c = config.mask.charCodeAt(beg);
					if (c !== 95) {
						beg++;
						while (true) {
							c = config.mask.charCodeAt(beg);
							if (c === 95 || isNaN(c))
								break;
							else
								beg++;
						}
					}

					if (c === 95) {

						val = val.substring(0, beg) + cur + val.substring(beg + 1);
						t.value = val;
						beg++;

						while (beg < config.mask.length) {
							c = config.mask.charCodeAt(beg);
							if (c === 95)
								break;
							else
								beg++;
						}

						self.curpos(beg);
					} else
						self.curpos(beg + 1);

					e.preventDefault();
					e.stopPropagation();
				}
			}

		});

		self.event('blur', 'input,textarea,' + cls2 + '-value', function() {
			focused = false;
			if (M.is20)
				setTimeout(() => self.camouflage(true), 300);
			else
				self.camouflage(true);
			self.rclass(cls + '-focused');
		});

		self.itransform = function(value) {
			if (customtransformer) {
				return customtransformer(value);
			} else if (config.transform) {
				var fn = GET(self.makepath(config.transform));
				if (fn)
					value = fn.call(self, value, config);
			}
			return value;
		};

		self.event('click', cls2 + '-control', function() {

			if (config.disabled || isdirvisible)
				return;

			if (config.type === 'icon') {
				opt = {};
				opt.element = self.element;
				opt.value = self.get();
				opt.empty = true;
				opt.callback = function(val) {
					self.change(true);
					self.set(self.itransform(val), 2);
					self.check();
					rawvalue[0].focus();
				};
				SETTER((self.caniuse('icons') ? 'icons' : 'faicons') + '/show', opt);
				return;
			} else if (config.type === 'color') {
				opt = {};
				opt.element = self.element;
				opt.value = self.get();
				opt.empty = true;
				opt.callback = function(al) {
					self.change(true);
					self.set(self.itransform(al), 2);
					self.check();
					rawvalue[0].focus();
				};
				SETTER('colorpicker/show', opt);
				return;
			} else if (config.type === 'emoji') {
				opt = {};
				opt.element = self.element;
				opt.value = self.get();
				opt.empty = true;
				opt.callback = function(al) {
					self.change(true);
					self.set(self.itransform(al), 2);
					self.check();
					rawvalue[0].focus();
				};
				SETTER('emoji/show', opt);
				return;
			}

			if (!config.dirsource)
				return;

			isdirvisible = true;
			setTimeout(function() {
				isdirvisible = false;
			}, 500);

			var opt = {};

			opt.element = self.find(cls2 + '-control');
			opt.items = dirsource || dirsourceread();
			opt.offsetY = -1 + (config.diroffsety || 0);
			opt.offsetX = 0 + (config.diroffsetx || 0);
			opt.placeholder = config.dirplaceholder;
			opt.render = config.dirrender ? GET(self.makepath(config.dirrender)) : null;
			opt.custom = !!config.dircustom;
			opt.offsetWidth = 2;
			opt.minwidth = config.dirminwidth || 200;
			opt.maxwidth = config.dirmaxwidth;
			opt.key = config.dirkey || config.key;
			opt.empty = config.dirempty;
			opt.checkbox = !!config.multiple;

			if (opt.items instanceof Array)
				opt.items = CLONE(opt.items);

			var val = self.get();
			if (config.multiple) {
				for (var item of opt.items) {
					if (val instanceof Array) {
						item.selectedts = val.indexOf(item[config.dirvalue || config.value]);
						item.selected = item.selectedts !== -1;
					} else
						item.selected = false;
				}
			} else
				opt.selected = val;

			if (config.dirraw)
				opt.raw = true;

			if (config.dirsearch != null)
				opt.search = config.dirsearch;

			if (dirsource && config.direxclude == false && !config.multiple) {
				for (var item of opt.items) {
					if (item)
						item.selected = typeof(item) === 'object' && item[config.dirvalue] === val;
				}
			} else if (config.direxclude)
				opt.exclude = item => item ? item[config.dirvalue] === val : false;

			opt.close = function() {
				if (!opt.skipclose) {
					self.bind('@touched');
					if (!M.is20)
						self.state(1);
				}
			};

			opt.callback = function(item, el, custom) {

				opt.skipclose = true;

				// empty
				if (item == null || (config.multiple && !item.length)) {
					rawvalue.html('');
					self.set(self.itransform(config.multiple ? [] : null), 2);
					self.change();
					self.check();
					return;
				}

				if (config.multiple) {

					var arr = [];

					for (var i = 0; i < item.length; i++) {
						var m = item[i];
						arr.push(m[config.dirvalue || config.value]);
					}

					self.set(self.itransform(arr), 2);
					self.change(true);
					// self.bindvalue();
					return;
				}

				var val = custom || typeof(item) === 'string' ? item : item[config.dirvalue || config.value];
				if (custom && typeof(config.dircustom) === 'string') {
					var fn = GET(self.makepath(config.dircustom));
					fn(val, function(val) {
						self.set(self.itransform(val), 2);
						self.change(true);
						self.bindvalue();
					});
				} else if (custom) {
					if (val) {
						val = self.itransform(val);
						self.set(val, 2);
						self.change(true);
						if (dirsource)
							self.bindvalue();
						else
							input.val(val);
					}
				} else {
					val = self.itransform(val);
					self.set(val, 2);
					self.change(true);
					if (dirsource)
						self.bindvalue();
					else
						input.val(val);
				}

				rawvalue[0].focus();
			};

			SETTER('directory/show', opt);
		});

		self.event('click', cls2 + '-placeholder,' + cls2 + '-label', function(e) {
			if (!config.disabled) {
				if (config.dirsource) {
					e.preventDefault();
					e.stopPropagation();
					self.find(cls2 + '-control').trigger('click');
				} else if (!config.camouflage || $(e.target).hclass(cls + '-placeholder')) {
					if (input.length) {
						input[0].focus();
					} else
						rawvalue[0].focus();
				}
			}
		});

		self.event('click', cls2 + '-icon-left,' + cls2 + '-icon-right', function(e) {

			if (config.disabled)
				return;

			var el = $(this);
			var left = el.hclass(cls + '-icon-left');
			var opt;

			if (config.dirsource && left && config.liconclick) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (!left && !config.riconclick) {
				if (config.type === 'date' || config.type === 'datetime') {
					opt = {};
					opt.element = self.element;
					opt.value = self.get();
					opt.clock = config.type === 'datetime';
					opt.ampm = DEF.timeformat && DEF.timeformat.includes('a');
					opt.callback = function(val) {
						self.change(true);
						self.set(self.itransform(val), 2);
					};
					SETTER('datepicker/show', opt);
				} else if (config.type === 'time') {
					opt = {};
					opt.element = self.element;
					opt.value = self.get();
					opt.callback = function(val) {
						self.change(true);
						self.set(self.itransform(val));
					};
					SETTER('timepicker/show', opt);
				} else if (config.type === 'search')
					self.set('');
				else if (config.type === 'password')
					self.password();
				else if (config.type === 'number' || config.type === 'number2') {
					var tmp = $(e.target);
					if (tmp.attr('class').indexOf('ti-') !== -1) {
						var n = tmp.hclass('ti-caret-up') ? 1 : -1;
						self.change(true);
						var val = self.preparevalue((self.get() || 0) + (config.increment * n));
						self.set(self.itransform(val), 2);
					}
				}
				return;
			}

			if (left && config.liconclick)
				self.EXEC(config.liconclick, self, el);
			else if (config.riconclick)
				self.EXEC(config.riconclick, self, el);
			else if (left && config.type === 'search')
				self.set('');

		});
	};

	self.camouflage = function(is) {
		if (config.camouflage) {
			if (is) {
				var t = input[0];
				var arr = t.value.split('');
				for (var i = 0; i < arr.length; i++)
					arr[i] = typeof(config.camouflage) === 'string' ? config.camouflage : '•';
				nobindcamouflage = true;
				t.value = arr.join('');
			} else {
				nobindcamouflage = true;
				var val = self.get();
				input[0].value = val == null ? '' : val;
			}
			self.tclass(cls + '-camouflaged', is);
		}
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

		if ((!config.required || config.disabled) && !self.forcedvalidation())
			return true;

		if (config.disabled)
			return true;

		if (config.dirsource)
			return config.multiple ? (value ? value.length > 0 : false) : (value != null && value !== '');

		if (customvalidator)
			return customvalidator(value);

		if (W.ui_input_cache.tags[config.type])
			return value && value.length > 0;

		if (config.type === 'date' || config.type === 'datetime')
			return value instanceof Date && !isNaN(value.getTime());

		if (config.type === 'radiobutton')
			return !!value;

		if (config.type === 'checkbox')
			return value === true || value === 1;

		if (value == null)
			value = '';
		else
			value = value.toString();

		if (config.mask && typeof(value) === 'string' && value.indexOf('_') !== -1)
			return false;

		if (config.minlength && value.length < config.minlength)
			return false;

		switch (config.type) {
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
			case 'number2':
				if (config.type === 'number2' && (value == null || value == ''))
					return false;
				value = value.parseFloat();
				if ((config.minvalue != null && value < config.minvalue) || (config.maxvalue != null && value > config.maxvalue))
					return false;
				return config.minvalue == null ? value > 0 : true;
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
		self.find(cls2 + '-icon-right').find('i').tclass(config.ricon, visible).tclass('ti-eye-slash', !visible).tclass('ti-eye', visible);
	};

	self.preparevalue = function(value) {
		if (config.type === 'number' && (config.type !== 'number2' || value) && (config.minvalue != null || config.maxvalue != null)) {
			var tmp = typeof(value) === 'string' ? +value.replace(',', '.') : value;

			if (isNaN(tmp))
				tmp = 0;

			if (config.minvalue > tmp)
				value = config.minvalue;
			if (config.maxvalue < tmp)
				value = config.maxvalue;
		}
		return value;
	};

	self.getterin = self.getter;
	self.getter = function(value, realtime, nobind) {

		if (!M.is20 && nobindcamouflage)
			return;

		if (config.mask && config.masktidy) {
			var val = [];
			for (var i = 0; i < value.length; i++) {
				if (config.mask.charAt(i) === '_')
					val.push(value.charAt(i));
			}
			value = val.join('');
		}

		self.getterin(self.preparevalue(value), realtime, nobind);
	};

	self.setterin = self.setter;

	self.setter = function(value, path, type) {

		if (config.mask) {
			if (value) {

				if (config.masktidy) {
					var index = 0;
					var val = [];
					for (var i = 0; i < config.mask.length; i++) {
						var c = config.mask.charAt(i);
						val.push(c === '_' ? (value.charAt(index++) || '_') : c);
					}
					value = val.join('');
				}

				// check values
				if (mask) {
					var arr = [];
					for (var i = 0; i < mask.length; i++) {
						var c = value.charAt(i);
						if (mask[i] && mask[i].test(c))
							arr.push(c);
						else
							arr.push(config.mask.charAt(i));
					}
					value = arr.join('');
				}

			} else
				value = config.mask;
		}

		if (config.realtime)
			self.setterin(value, path, type);
		else
			input.val(self.formatter(value));

		self.bindvalue();
		config.camouflage && !focused && setTimeout(self.camouflage, ((M.is20 && type.show) || type === 'show') ? 2000 : 1, true);
		config.exec && self.SEEX(config.exec, value, self.element);

		if (config.type === 'password')
			self.password(true);
		else if (W.ui_input_cache.tags[config.type])
			rawvalue.html('');
	};

	self.check = function() {

		let is = false;

		if (W.ui_input_cache.tags[config.type]) {
			is = self.find(cls2 + '-tag').length > 0;
			placeholder && placeholder.tclass('hidden', is || !!rawvalue.html());
			self.tclass(cls + '-binded', is);
			return;
		}

		if (config.type !== 'radiobutton') {
			if (config.dirsource)
				is = !!rawvalue.text();
			else
				is = input && input.length ? !!input[0].value : !!self.get();
		} else {
			let tmp = self.get();
			is = tmp && tmp.length > 0;
		}

		if (binded === is)
			return;

		binded = is;
		placeholder && placeholder.tclass('hidden', is);
		self.tclass(cls + '-binded', is);

		if (config.type === 'search')
			self.find(cls2 + '-icon-' + (config.searchalign === 1 ? 'right' : 'left')).find('i').tclass(config.searchalign === 1 ? config.ricon : config.licon, !is).tclass('ti-times', is);
	};

	self.bindvalue = function() {

		let value = self.get();

		if (dirsource && config.type !== 'radiobutton' && !W.ui_input_cache.tags[config.type]) {

			let item;
			let text = [];

			for (item of dirsource) {
				if (typeof(item) === 'string') {
					if (item === value)
						break;
					item = null;
				} else if (config.multiple || config.type === 'radiobutton') {
					let v = item[config.dirvalue || config.value];
					let index = value instanceof Array ? value.indexOf(v) : -1;
					if (index !== -1)
						text.push({ index: index, name: item[config.dirkey || config.key] });
				} else if (item[config.dirvalue || config.value] === value) {
					item = item[config.dirkey || config.key];
					break;
				} else
					item = null;
			}

			if (config.multiple) {

				text.quicksort('index');
				for (let i = 0; i < text.length; i++)
					text[i] = config.dirraw ? text[i].name : '<span class="{0}-tag">{1}</span>'.format(cls, Thelpers.encode(text[i].name));
				item = text.join('');
			} else if (value && item == null && config.dircustom)
				item = value;

			rawvalue.html(item || '');

		} else if (config.dirsource && config.type !== 'radiobutton') {
			if (config.dirdetail) {
				// Timer was added due to the "exports.caller"
				setTimeout2(self.ID + 'dirdetail', function() {
					self.EXEC(config.dirdetail, value, function(val) {
						if (config.dirraw)
							rawvalue.html(val || '');
						else
							rawvalue.text(val || '');
						self.check();
					}, 5);
				});
				return;
			} else if (config.dirraw)
				rawvalue.html(value || '');
			else
				rawvalue.text(value || '');
		} else {

			if (W.ui_input_cache.tags[config.type]) {
				self.find(cls2 + '-tag').remove();
				if (value instanceof Array) {
					for (let m of value)
						self.addtag(m);
				}
			} else {
				switch (config.type) {
					case 'radiobutton':
						let index = dirsource.findIndex('id', value);
						self.find(cls2 + '-radiobuttons').find(cls2 + '-radio').each(function() {
							let el = $(this);
							el.tclass(cls + '-checked', el.attr('data-index') == index);
						});
						break;
					case 'color':
						rawvalue.css('background-color', value || '');
						break;
					case 'icon':
						rawvalue.html('<i class="{0}"></i>'.format(value || ''));
						break;
					case 'emoji':
						rawvalue.html(value);
						break;
					case 'checkbox':
						self.tclass(cls + '-checked', value === true || value === 1);
						break;
				}
			}
		}

		self.check();
	};

	self.redraw = function() {

		if (!config.ricon) {
			if (config.dirsource)
				config.ricon = 'angle-down';
			else if (config.type === 'date' || config.type === 'datetime') {
				config.ricon = 'calendar';
				if (!config.align && !config.innerlabel)
					config.align = 1;
			} else if (config.type === 'icon' || config.type === 'color' || config.type === 'emoji') {
				config.ricon = 'angle-down';
				if (!config.align && !config.innerlabel)
					config.align = 1;
			} else if (config.type === 'time') {
				config.ricon = 'clock';
				if (!config.align && !config.innerlabel)
					config.align = 1;
			} else if (config.type === 'search')
				if (config.searchalign === 1)
					config.ricon = 'search';
				else
					config.licon = 'search';
			else if (config.type === 'password')
				config.ricon = 'eye';
			else if (config.type === 'number' || config.type === 'number2') {
				if (!config.align && !config.innerlabel)
					config.align = 1;
			}
		}

		self.tclass(cls + '-masked', !!config.mask);
		self.rclass2(cls + '-type-');

		if (config.type)
			self.aclass(cls + '-type-' + config.type);


		var html;
		var is = false;

		if (config.type === 'checkbox') {
			html = '<div class="{0}-checkbox"><span><i class="{checkicon}"></i></span><label>{label}</label></div>'.format(cls).args(config);
		} else if (config.type === 'radiobutton') {
			html = ('<div class="{0}-radiobutton">' + (config.label ? ('<label class="{0}-label">' + config.label + ':</label>') : '') + '<div class="{0}-radiobuttons"></div></div>').format(cls);
		} else {
			is = true;
			var opt = CLONE(config);
			if (opt.type === 'number2')
				opt.type = 'number';
			opt.tags = W.ui_input_cache.tags[config.type];
			html = W.ui_input_cache.template(opt);
		}

		self.html(html);

		if (is) {
			input = self.find('input,textarea');
			rawvalue = self.find(cls2 + '-value');
			placeholder = self.find(cls2 + '-placeholder');
		} else if (config.type !== 'radiobutton')
			input = rawvalue = placeholder = null;
	};

	self.radiorender = function() {
		var builder = [];
		for (let i = 0; i < dirsource.length; i++) {
			let item = dirsource[i];
			builder.push('<div data-index="{1}" class="{0}-radio"><span><i></i></span>{name}</div>'.format(cls, i).args(item));
		}
		self.find(cls2 + '-radiobuttons').tclass(cls + '-multiline', !!config.multiline).html(builder.join(''));
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'icon':
				if (value && value.indexOf(' ') === -1)
					config.icon = 'ti ti-' + value;
				break;
			case 'dirsource':
				if (config.dirajax || value.indexOf('/') !== -1) {
					dirsource = null;
					if (!init)
						self.bindvalue();
				} else {
					if (value.indexOf(',') !== -1) {
						dirsource = dirsourceprepare(self.parsesource(value));
						if (config.type === 'radiobutton')
							self.radiorender();
						else if (!init)
							self.bindvalue();
					} else {
						self.datasource(value, function(path, value) {
							dirsource = CLONE(dirsourceprepare(M.is20 ? path : value));
							if (config.type === 'radiobutton')
								self.radiorender();
							else
								self.bindvalue();
						});
					}
				}
				if (config.type !== 'radiobutton') {
					self.tclass(cls + '-dropdown', !!value);
					input.prop('readonly', !!config.disabled || !!config.dirsource);
				}
				break;
			case 'disabled':
				self.tclass('ui-disabled', !!value);
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
				customvalidator = value ? (/\(|=|>|<|\+|-|\)/).test(value) ? (new Function('value', 'return ' + value)) : (function(path) { path = self.makepath(path); return function(value) { return GET(path)(value); }; })(value) : null;
				break;
			case 'innerlabel':
				self.tclass(cls + '-inner', !!value);
				self.tclass(cls + '-raw', !value);
				break;
			case 'monospace':
				self.tclass(cls + '-monospace', !!value);
				break;
			case 'transform':
				customtransformer = value && (/\(|=|>|<|\+|-|value\.|\)/).test(value) ? (new Function('value', 'return ' + value)) : null;
				break;
			case 'maskregexp':
				if (value) {
					mask = value.toLowerCase().split(',');
					for (var i = 0; i < mask.length; i++) {
						var m = mask[i];
						if (!m || m === 'null')
							mask[i] = '';
						else
							mask[i] = new RegExp(m);
					}
				} else
					mask = null;
				break;
			case 'mask':
				config.mask = value.replace(/#/g, '_');
				break;
		}
	};

	self.formatter(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'id':
					return (value + '').toLowerCase().replace(/[^a-z0-9]/g, '');
				case 'slug':
					return (value + '').slug();
				case 'lower':
					return (value + '').toLowerCase();
				case 'upper':
					return (value + '').toUpperCase();
				case 'phone':
					return (value + '').replace(/\s/g, '');
				case 'email':
					return (value + '').toLowerCase();
				case 'date':
					var format = config.format;
					if (format === 'auto')
						format = '';
					return value.format(format || DEF.dateformat || 'yyyy-MM-dd');
				case 'datetime':
					var format = config.format;
					if (format === 'auto')
						format = '';
					return value.format(format || ENV('ts'));
				case 'time':
					var format = config.format;
					if (format === 'auto')
						format = '';
					return value.format(format || ENV('time') || 'HH:mm');
				case 'number':
					return config.format ? (config.format === 'auto' ? value.format() : value.format(config.format)) : value;
				case 'number2':
					return value == null ? '' : config.format ? (config.format === 'auto' ? value.format() : value.format(config.format)) : value;
			}
		}

		return value;
	});

	self.parser(function(path, value) {
		if (value) {
			var tmp;
			switch (config.type) {
				case 'date':
				case 'datetime':
					tmp = self.get();
					if (tmp)
						tmp = tmp.format('HH:mm');
					else
						tmp = '';
					return value + (tmp ? (' ' + tmp) : '');
				case 'id':
				case 'tags-id':
					return (value + '').toLowerCase().replace(/[^a-z0-9]/g, '');
				case 'slug':
				case 'tags-slug':
					return (value + '').slug();
				case 'lower':
				case 'email':
				case 'tags-lower':
					value = value.toLowerCase();
					break;
				case 'tags-email':
					value = value.toLowerCase();
					if (!value.isEmail())
						value = '';
					break;
				case 'tags-phone':
					value = value.replace(/\s/g, '');
					if (!value.isPhone())
						value = '';
					break;
				case 'upper':
				case 'tags-upper':
					value = value.toUpperCase();
					break;
				case 'phone':
					value = value.replace(/\s/g, '');
					break;
				case 'number2':
					if (value) {
						var type = typeof(value);
						if (type === 'string' && (/^[\-0-9\.\,]+$/).test(value))
							value = value.parseFloat();
						else if (type !== 'number')
							value = null;
					} else
						value = null;
					break;
				case 'time':
					tmp = value.split(':');
					var dt = self.get();
					value = dt ? new Date(dt.getTime()) : new Date();
					value.setHours((tmp[0] || '0').parseInt());
					value.setMinutes((tmp[1] || '0').parseInt());
					value.setSeconds((tmp[2] || '0').parseInt());
					break;
			}
		} else {
			switch (config.type) {
				case 'number':
					value = 0;
					break;
				case 'number2':
				case 'date':
				case 'datetime':
					value = null;
					break;
			}
		}

		return self.itransform(value ? config.spaces === false ? value.replace(/\s/g, '') : value : value);
	});

	self.state = function(type, what) {
		if (type) {

			if (type === 1 && what === 4) {
				self.rclass(cls + '-ok ' + cls + '-invalid');
				self.$oldstate = null;
				return;
			}

			var invalid = config.required ? self.isInvalid() : self.forcedvalidation() ? self.isInvalid() : false;
			if (invalid !== self.$oldstate) {
				self.$oldstate = invalid;
				self.tclass(cls + '-invalid', !!invalid);
				self.tclass(cls + '-ok', !invalid);
				config.error && self.find(cls2 + '-error').tclass('hidden', !invalid);
			}
		}
	};

	self.forcedvalidation = function() {

		if (!config.forcevalidation)
			return false;

		if (config.type === 'number' || config.type === 'number2')
			return false;

		var val = self.get();
		var type = typeof(val);

		if (config.type === 'radiobutton')
			return !!val;

		if (config.type === 'checkbox')
			return val === true || val === 1;

		if (type === 'string' && val && (config.minlength != null || config.maxlength != null)) {
			if ((config.minlength != null && val.length < config.minlength) || (config.maxlength != null && val.length > config.maxlength))
				return true;
			if (!config.type || (config.type === 'string' || config.type === 'multiline'))
				return false;
		}

		return (config.type === 'phone' || config.type === 'email') && (val != null && (type === 'string' && val.length !== 0));
	};

});