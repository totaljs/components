COMPONENT('editable', 'disabled:0;class:default', function(self, config, cls) {

	var rtrue = /1|true/i;
	var events = {};
	var changed = null;

	self.getter = null;
	self.setter = null;

	var isdisabled = function(el) {
		var c = 'disabled';
		var disabled = el.attrd(c);
		var parent;
		if (!disabled) {
			parent = el.parent();
			disabled = parent.attrd(c) || parent.parent().attrd(c);
		}
		return disabled ? rtrue.test(disabled) : false;
	};

	self.validate = function(value, init) {

		if (init)
			return true;

		var is = true;
		var arr = self.find('[data-editable]');

		for (var i = 0; i < arr.length; i++) {

			var el = $(arr[i]);
			var opt = self.parse(el);
			var disabled = isdisabled(el);
			if (disabled || HIDDEN(el))
				continue;

			if (!opt || !opt.required)
				continue;

			if (opt.path) {
				var val = GET(opt.path);
				if (opt.validate && !opt.validate(val))
					is = false;
				else if (opt.type === 'number')
					is = val ? val > 0 || val < 0 : false;
				else if (opt.type === 'email')
					is = val ? val.isEmail() : false;
				else if (opt.type === 'phone')
					is = val.isPhone();
				else if (opt.type === 'date')
					is = val ? val.getTime() > 0 : false;
				else if (opt.type === 'boolean')
					is = val ? true : false;
				else if (val instanceof Array)
					is = !!val.length;
				else
					is = val ? true : false;
				if (!is)
					break;
			}
		}

		return is;
	};

	self.makefn = function(val) {
		return (/\(|=|>|<|\+|-|\)/).test(val) ? FN('value=>' + val) : (function(path) { return function(value) { return GET(self.makepath(path))(value); }; })(val);
	};

	self.parse = function(el) {

		var t = el[0];

		if (t.$editable)
			return t.$editable;

		var opt = (el.attrd('editable') || '').parseConfig();

		if (!opt.path) {
			if (!opt.save) {
				// Internal hack for data-bind instance
				var binder = el[0].$jcbind;
				if (!binder)
					return;
				opt.path = binder.path;
				opt.binder = binder;
			}
		} else
			opt.path = self.path + '.' + opt.path;

		opt.html = el.html();

		if (opt.type)
			opt.type = opt.type.toLowerCase();

		if (opt.type === 'date' && !opt.format)
			opt.format = config.dateformat || 'yyyy-MM-dd';

		if (opt.type === 'bool')
			opt.type += 'ean';

		if (opt.validate)
			opt.validate = self.makefn(opt.validate);

		if (opt.accept)
			opt.accept = self.makefn(opt.accept);

		if (opt.raw == null)
			opt.raw = true;

		if (opt.can || config.can) {
			opt.canedit = function(el) {
				var opt = el[0].$editable;
				return (opt.can && !GET(self.makepath(opt.can))(opt, el)) || (config.can && !GET(self.makepath(config.can))(opt, el));
			};
		}

		t.$editable = opt;
		return opt;
	};

	self.movecursor = function(el, beg) {
		var range, selection, doc = document;
		if (doc.createRange) {
			range = doc.createRange();
			range.selectNodeContents(el[0]);
			range.collapse(beg ? true : false);
			selection = W.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		} else if (doc.selection) {
			range = doc.body.createTextRange();
			range.moveToElementText(el[0]);
			range.collapse(beg ? true : false);
			range.select();
		}
	};

	self.cancel = function(opt, el) {
		opt.value = null;
		!opt.save && el.html('');
		self.approve2(el);
	};

	self.configure = function(name, value) {
		switch (name) {
			case 'disabled':
				self.tclass(cls + '-disabled', !!value);
				self.tclass(cls + '-enabled', !value);
				break;
		}
	};

	self.focusnext = function(el, e) {
		if (el instanceof jQuery)
			el = el[0];
		var arr = self.find('[data-editable]');
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === el) {
				var next = arr[i + 1];
				if (next) {
					$(next).trigger('click');
					e && e.preventDefault();
				}
				return true;
			}
		}
	};

	self.changed = function() {
		var keys = Object.keys(changed);
		var data = {};
		var model = self.get();
		for (var i = 0; i < keys.length; i++)
			data[keys[i]] = model[keys[i]];
		return data;
	};

	self.make = function() {

		self.aclass(cls + (config.class ? (' ' + cls + '-' + config.class) : ''));
		self.event('click', '[data-editable]', function(e) {

			if (config.disabled)
				return;

			var t = this;

			e.preventDefault();
			e.stopPropagation();

			if (t.$editable && t.$editable.is)
				return;

			var el = $(t);
			if (isdisabled(el))
				return;

			var opt = self.parse(el);
			if (!opt || (opt.canedit && !opt.canedit(el)))
				return;

			var target = $(e.target);
			if (opt.type === 'tags') {
				if (target.hclass('ti') || target.hclass('remove')) {
					var temp = GET(opt.path);
					var index = target.parent().eq(0).index();
					temp.splice(index, 1);
					SET(opt.path, temp, 2);
					self.change(true);
					return;
				} else if (target[0].nodeName === 'SPAN')
					return;
			}

			opt.is = true;
			opt.keypressed = 0;

			if (opt.dirsource) {

				opt.value = GET(opt.path) || el.text();

				if (!opt.dirvalue)
					opt.dirvalue = 'id';

				var scope = el.scope();
				var attr = {};
				attr.element = el;
				attr.items = GET(scope == null ? self.makepath(opt.dirsource) : scope.makepath(opt.dirsource));
				attr.offsetY = -1;
				attr.placeholder = typeof(opt.dirsearch) === 'string' ? opt.dirsearch : opt.dirplaceholder;
				attr.search = opt.dirsearch;
				attr.render = opt.dirrender ? GET(scope == null ? self.makepath(opt.dirrender) : scope.makepath(opt.dirrender)) : null;
				attr.custom = !!opt.dircustom;
				attr.offsetWidth = 2;
				attr.minwidth = opt.dirminwidth || 200;
				attr.maxwidth = opt.dirmaxwidth;
				attr.key = opt.dirkey || 'name';
				attr.empty = opt.dirempty;

				if (opt.direxclude || opt.direxclude == null) {
					attr.exclude = function(item) {

						if (!item)
							return;

						if (typeof(item) === 'string')
							return item === opt.value;

						var v = item[opt.dirvalue || 'id'];
						return opt.value instanceof Array ? opt.value.indexOf(v) !== -1 : v === opt.value;
					};
				}

				attr.close = function() {
					opt.is = false;
				};

				attr.callback = function(item, el, custom) {

					opt.is = false;

					// empty
					if (item == null) {
						self.cancel(opt, el);
						return;
					}

					var val = custom || typeof(item) === 'string' ? item : item[opt.dirvalue];
					if (custom && typeof(attr.dircustom) === 'string') {
						var fn = GET(attr.dircustom.replace(/\?/g, self.pathscope));
						fn(val, function(val) {
							if (val) {

								if (opt.accept && !opt.accept(val)) {
									self.cancel(opt, el);
									return;
								}

								if (typeof(val) === 'string') {
									opt.value = val;
									!opt.save && el.html(val);
								} else {
									opt.value = item[opt.dirvalue];
									!opt.save && el.html(val[attr.key]);
								}
								self.approve2(val);
							}
						});
					} else if (!custom) {

						if (opt.accept && !opt.accept(val)) {
							self.cancel(opt, el);
							return;
						}

						opt.value = val;
						!opt.save && el.html(typeof(item) === 'string' ? item : item[attr.key]);
						self.approve2(el);
					}
				};

				SETTER('directory', 'show', attr);

			} else if (opt.type === 'boolean') {
				TOGGLE(opt.path, 2);
				self.change(true);
				opt.is = false;
			} else if (opt.type === 'set') {
				SET(opt.path, new Function('return ' + (opt.value == null ? 'null' : opt.value))(), 2);
				self.change(true);
				opt.is = false;
			} else {

				opt.prev = opt.value = GET(opt.path);
				opt.html = el.html();

				if (opt.value == null || opt.value == '') {
					opt.value = opt.raw ? '' : opt.html;
					if (opt.raw && !el.hclass('invalid')) {
						opt.clear = true;
						self.movecursor(el, 1);
					}
				}

				self.attach(el);
			}
		});

		events.keydown = function(e) {

			var t = this;

			if (!t.$events)
				return;

			var meta = t.$editable;

			if (meta.clear) {
				t.innerHTML = '';
				meta.clear = 0;
			}

			if (!meta.keypressed) {
				meta.keypressed = 1;
				$(t).aclass('keypressed');
			}

			if ((e.metaKey || e.ctrlKey) && (e.which === 66 || e.which === 76 || e.which === 73 || e.which === 85)) {
				if (meta.type !== 'html') {
					e.preventDefault();
					e.stopPropagation();
				}
			}

			var el;

			if (e.which === 27) {
				el = $(t);
				self.cnotify(el, 'no');
				self.detach(el);
				if (config.escape) {
					setTimeout(function() {
						self.EXEC(config.escape, meta.path, GET(meta.path), el);
					}, 100);
				}
				return;
			}

			if (e.which === 13 || e.which === 9) {

				if (e.which === 13 && meta.multiline)
					return;

				e.preventDefault();

				el = $(t);
				if (self.approve(el)) {

					self.detach(el);
					el.rclass('keypressed');

					if (e.which === 9) {
						if (self.focusnext(t, e))
							return;
					}

					if (config.enter) {
						setTimeout(function() {
							self.EXEC(config.enter, meta.path, GET(meta.path), el);
						}, 100);
					}

				} else {
					// INVALID
					self.cnotify(el, 'no');
				}
			}
		};

		events.blur = function() {
			var t = this;
			if (t.$events) {
				var el = $(t);
				el.rclass('keypressed');

				if (t.$editable.is) {
					var is = self.approve(el);
					self.cnotify(el, is ? 'ok' : 'no');
				}

				self.detach(el);
			}
		};

		events.paste = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var meta = this.$editable;
			var text = e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain');
			text && document.execCommand('insertText', false, meta.multiline ? text.trim() : text.replace(/\n|\r/g, '').trim());
		};

		events.focus = function(e) {
			var t = this;
			var jcbind = e.target.$jcbind || {};

			if (t.$editable && t.$editable.is && t.$editable.autosource) {
				var attr = t.$editable;
				var opt = {};
				opt.element = $(t);
				opt.search = GET(attr.autosource);
				opt.offsetY = 10;
				opt.callback = function(item, el) {
					attr.value = typeof(item) === 'string' ? item : item[attr.autovalue || 'name'];
					el.html(attr.value);
					self.approve2(el);
				};
				SETTER('autocomplete', 'show', opt);
				return;
			}

			if (jcbind.empty && jcbind.empty == e.target.innerText) {
				$(e.target).empty();
				return;
			}
		};
	};

	self.approve = function(el) {

		var opt = el[0].$editable;

		SETTER('!autocomplete', 'hide');

		var cur = el.html();

		if (!opt.required && (opt.html === cur || (opt.raw && !cur && !opt.empty)))
			return true;

		var val = cur;

		if (opt.type !== 'html') {
			var area = document.createElement('TEXTAREA');
			area.innerHTML = val;
			val = $(area).text();
			val = val.replace(/<br(\s\/)?>/g, opt.multiline ? '\n' : '').trim();
		}

		if (opt.maxlength && val.length > opt.maxlength)
			val = val.substring(0, opt.maxlength);

		opt.value = val;

		switch (opt.type) {
			case 'number':
				opt.value = opt.value ? opt.value.parseFloat() : 0;
				if ((opt.minvalue != null && opt.value < opt.minvalue) || (opt.maxvalue != null && opt.value > opt.maxvalue)) {
					opt.value = '';
					return false;
				}
				break;
			case 'phone':
				if (opt.required) {
					if (!opt.value.isPhone()) {
						opt.html = null;
						return false;
					}
				} else if (opt.value && !opt.value.isPhone()) {
					opt.value = '';
					return false;
				}
				break;
			case 'email':
				if (opt.required) {
					if ((!opt.value || !opt.value.isEmail())) {
						opt.html = null;
						return false;
					}
				} else if (opt.value && !opt.value.isEmail()) {
					opt.value = '';
					return false;
				}

				break;
			case 'date':
				if (!opt.empty) {
					SETTER('!datepicker', 'hide');
					opt.value = opt.value ? opt.value.parseDate(opt.format) : null;
					if (opt.required && !opt.value) {
						return false;
					}
				}
				break;
			case 'boolean':
				opt.value = opt.value === true || opt.value == 'true' || opt.value == '1' || opt.value == 'on';
				break;
			default:
				if (opt.required && !opt.value) {
					//opt.value = '';
					opt.html = null;
					return false;
				}
				break;
		}

		if (opt.accept && !opt.accept(val))
			return false;

		// EMPTY STRING
		if ((!opt.type || opt.type === 'string') && (opt.value == null || opt.value === '') && (opt.prev == null || opt.prev === ''))
			return false;

		if (!opt.empty && (opt.required && (opt.value == null || opt.value === '')) || (opt.validate && !opt.validate(opt.value)))
			return false;

		opt.html = null;
		self.approve2(el);
		return true;
	};

	self.cnotify = function(el, classname) {

		var meta = el[0].$editable;

		if (classname === 'ok') {

			el.rclass('invalid').aclass('changed');

			if (!changed) {
				self.aclass(cls + '-changed');
				changed = {};
			}

			changed[meta.path.substring(self.path.length + 1)] = 1;
			config.changed && self.SEEX(config.changed, self.changed());
			config.error && self.EXEC(config.error, el, false, meta);
			meta.invalid && self.EXEC(meta.invalid, el, false, meta);
		} else {
			config.error && self.EXEC(config.error, el, true, meta);
			meta.invalid && self.EXEC(meta.invalid, el, true, meta);
			el.aclass((meta.required ? 'invalid ' : '') + 'changed');
		}

		el.aclass(cls + '-' + classname);
		setTimeout(function() {
			el && el.rclass(cls + '-' + classname);
		}, 1000);
	};

	self.approve2 = function(el) {
		var opt = el[0].$editable;
		if (opt.save) {
			GET(opt.save)(opt, function(is) {
				el.html(is || is == null ? opt.value : opt.html);
				if (is || is == null)
					self.cnotify(el, 'ok');
				else
					self.cnotify(el, 'no');
			});
		} else {
			setTimeout(function() {

				var b = null;
				if (el.binder)
					b = el.binder();
				if (b)
					b.disabled = true;

				if (opt.type === 'tags')
					PUSH(opt.path, opt.value, 2);
				else
					SET(opt.path, opt.value, 2);

				self.cnotify(el, 'ok');
				self.change(true);

				var val = opt.binder ? GET(opt.binder.path) : null;
				if (opt.empty && !val && typeof(opt.empty) === 'string') {
					el.html(opt.empty);
					if (b)
						b.disabled = false;
					return;
				}

				b && setTimeout(function() {
					b.disabled = false;
					if (opt.empty || opt.rebind)
						opt.binder && opt.binder.exec(val, opt.binder.path);
				}, 100);
			}, 100);
		}
	};

	self.attach = function(el) {
		if (!el[0].$events) {

			var o = el[0].$editable;
			el[0].$events = true;

			el.aclass('editable-editing' + (o.multiline ? ' editable-multiline' : ''));
			el.on('focus', events.focus);
			el.on('keydown', events.keydown);
			el.on('blur', events.blur);
			el.on('paste', events.paste);
			el.attr('contenteditable', true);
			el.focus();
			self.movecursor(el, o.clear ? 1 : 0);

			if (o.type === 'date') {
				var opt = {};
				opt.element = el;
				opt.value = (o.value && typeof(o.value) === 'string' ? o.value.parseDate(o.format) : o.value) || NOW;
				opt.callback = function(date) {
					el.html(date.format(o.format));
					self.approve(el);
				};
				SETTER('datepicker', 'show', opt);
			}
		}
	};

	self.detach = function(el) {
		if (el[0].$events) {
			el.off('keydown', events.keydown);
			el.off('blur', events.blur);
			el.off('paste', events.paste);
			el[0].$events = false;
			var opt = el[0].$editable;
			if (opt.html != null)
				el.html(opt.html);
			opt.is = false;
			el.rclass('editable-editing editable-multiline');
			el.attr('contenteditable', false);
		}
	};

	self.state = function(type, what) {
		// reset or update
		if (type === 0 || what === 3 || what === 4) {

			self.find('.changed').rclass('changed');
			self.rclass(cls + '-changed');

			if (changed) {
				changed = null;
				config.changed && self.SEEX(config.changed);
			}

			var el = self.find('.invalid');

			if (config.error) {
				for (var i = 0; i < el.length; i++)
					self.EXEC(config.error, el[0], false, el[0].$editable);
			}

			el.rclass('invalid');
		}
	};

	self.setter = function(value, path, type) {
		if (type !== 2) {
			if (config.autofocus) {
				setTimeout(function() {
					self.find('[data-editable]:first-child').eq(0).trigger('click');
				}, 400);
			}
		}
	};

});
