COMPONENT('editable', function(self, config) {

	var cls = 'ui-editable';
	var events = {};

	self.getter = null;
	self.setter = null;

	self.validate = function(value, init) {

		if (init)
			return true;

		var is = true;
		var arr = self.find('[data-editable]');

		for (var i = 0; i < arr.length; i++) {
			var el = $(arr[i]);
			var opt = self.parse(el);

			if (!opt || !opt.required)
				continue;

			if (opt.path) {
				var val = GET(opt.path);
				if (opt.validate && !opt.validate(val))
					is = false;
				else if (opt.type === 'number')
					is = val ? val > 0 || val < 0 : false;
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
		return (/\(|=|>|<|\+|-|\)/).test(val) ? FN('value=>' + val) : (function(path) { return function(value) { return GET(path)(value); }; })(val);
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

		if (opt.can) {
			opt.canedit = function(el) {
				var opt = el[0].$editable;
				return (opt.can && !GET(opt.can)(opt, el)) || (config.can && !GET(config.can)(opt, el));
			};
		}

		t.$editable = opt;
		return opt;
	};

	self.moveend = function(el) {
		var range, selection, doc = document;
		if (doc.createRange) {
			range = doc.createRange();
			range.selectNodeContents(el[0]);
			range.collapse(false);
			selection = W.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		} else if (doc.selection) {
			range = doc.body.createTextRange();
			range.moveToElementText(el[0]);
			range.collapse(false);
			range.select();
		}
	};

	self.cancel = function(opt, el) {
		opt.value = null;
		!opt.save && el.html('');
		self.approve2(el);
	};

	self.make = function() {

		self.aclass(cls);
		self.event('click', '[data-editable]', function() {

			if (config.disabled)
				return;

			var t = this;

			if (t.$editable && t.$editable.is)
				return;

			var el = $(t);
			var opt = self.parse(el);

			if (!opt || (opt.canedit && !opt.canedit(el)))
				return;

			opt.is = true;

			if (opt.dirsource) {

				opt.value = GET(opt.path) || el.text();

				if (!opt.dirvalue)
					opt.dirvalue = 'id';

				var attr = {};
				attr.element = el;
				attr.items = GET(opt.dirsource.replace(/\?/g, self.pathscope));
				attr.offsetY = -1;
				attr.placeholder = opt.dirplaceholder;
				attr.render = opt.dirrender ? GET(opt.dirrender.replace(/\?/g, self.pathscope)) : null;
				attr.custom = !!opt.dircustom;
				attr.offsetWidth = 2;
				attr.minwidth = opt.dirminwidth || 200;
				attr.maxwidth = opt.dirmaxwidth;
				attr.key = opt.dirkey || 'name';
				attr.empty = opt.dirempty;

				attr.exclude = function(item) {

					if (!item)
						return;

					if (typeof(item) === 'string')
						return item === opt.value;

					var v = item[opt.dirvalue || 'id'];
					return opt.value instanceof Array ? opt.value.indexOf(v) !== -1 : v === opt.value;
				};

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
					opt.raw && el.html('');
				}

				self.attach(el);
			}
		});

		events.keydown = function(e) {

			var t = this;

			if (!t.$events)
				return;

			if ((e.metaKey || e.ctrlKey) && (e.which === 66 || e.which === 76 || e.which === 73 || e.which === 85)) {
				if (t.$editable.type !== 'html') {
					e.preventDefault();
					e.stopPropagation();
				}
			}

			var el;

			if (e.which === 27) {
				el = $(t);
				self.cnotify(el, 'no');
				self.detach(el);
				return;
			}

			if (e.which === 13 || e.which === 9) {

				if (e.which === 13 && t.$editable.multiline)
					return;

				el = $(t);
				if (self.approve(el)) {
					self.detach(el);
					if (e.which === 9) {
						var arr = self.find('[data-editable]');
						for (var i = 0; i < arr.length; i++) {
							if (arr[i] === t) {
								var next = arr[i + 1];
								if (next) {
									$(next).trigger('click');
									e.preventDefault();
								}
								break;
							}
						}
					}
				} else
					e.preventDefault();
			}
		};

		events.blur = function() {
			if (this.$events) {
				var el = $(this);
				self.approve(el);
				self.detach(el);
			}
		};

		events.paste = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var text = e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain');
			text && document.execCommand('insertText', false, text);
		};

		events.focus = function() {
			var t = this;
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
			}
		};
	};

	self.approve = function(el) {

		var opt = el[0].$editable;

		SETTER('!autocomplete', 'hide');

		var cur = el.html();

		if (opt.html === cur || (opt.raw && !cur && !opt.empty))
			return true;

		var val = cur;

		if (opt.type !== 'html') {

			if (opt.multiline)
				val = val.replace(/<br(\s\/)?>/g, '\n').trim();

			val = val.replace(/&(gt|lt|nbsp|quot)+;/g, function(text) {
				switch (text) {
					case '&gt;':
						return '>';
					case '&lt;':
						return '<';
					case '&nbsp;':
						return ' ';
					case '&quot;':
						return '"';
				}
				return text;
			});
		}

		if (opt.maxlength && val.length > opt.maxlength)
			val = val.substring(0, opt.maxlength);

		opt.value = val;

		switch (opt.type) {
			case 'number':
				opt.value = opt.value ? opt.value.parseFloat() : 0;
				if ((opt.minvalue != null && opt.value < opt.minvalue) || (opt.maxvalue != null && opt.value > opt.maxvalue))
					return false;
				break;
			case 'date':
				if (!opt.empty) {
					SETTER('!datepicker', 'hide');
					opt.value = opt.value ? opt.value.parseDate(opt.format) : null;
				}
				break;
			case 'boolean':
				opt.value = opt.value === true || opt.value == 'true' || opt.value == '1' || opt.value == 'on';
				break;
		}

		if (opt.accept && !opt.accept(val))
			return false;

		if (!opt.empty && (opt.required && (opt.value == null || opt.value === '')) || (opt.validate && !opt.validate(opt.value)))
			return false;

		opt.html = null;
		self.approve2(el);
		return true;
	};

	self.cnotify = function(el, classname) {
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
				self.cnotify(el, 'ok');
				SET(opt.path, opt.value, 2);
				self.change(true);

				var val = GET(opt.binder.path);
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
			self.moveend(el);

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

	self.setter = function(value, path, type) {
		if (type !== 2) {
			if (config.autofocus) {
				setTimeout(function() {
					self.find('[data-editable]').eq(0).trigger('click');
				}, 500);
			}
		}
	};

});