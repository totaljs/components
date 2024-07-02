COMPONENT('edit', 'dateformat:yyyy-MM-dd;padding:10;floating:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var events = {};
	var floating;

	self.readonly();
	self.singleton();

	var findfn = function(opt, path) {
		if (path.charAt(0) === '@') {
			var com = opt.element.component();
			return com ? com[path.substring(1)] : null;
		} else
			return GET(opt.scope ? opt.scope.makepath(path) : path);
	};

	self.parse = function(el) {

		var t = el[0];

		if (t.$edit)
			return t.$edit;

		var opt = (el.attrd('edit') || '').parseConfig();
		opt.scope = opt.plugin = M.is20 ? el.plugin() : el.scope();
		opt.html = el.html();

		if (opt.type)
			opt.type = opt.type.toLowerCase();

		if (opt.type === 'date' && !opt.format)
			opt.format = config.dateformat;

		if (opt.offsetX == null)
			opt.offsetX = config.offsetX;

		if (opt.offsetY == null)
			opt.offsetY = config.offsetY;

		if (opt.floating == null)
			opt.floating = config.floating;

		if (opt.check) {
			opt.checkforce = function(el) {
				var opt = el[0].$edit;
				var path = opt.scope ? opt.scope.makepath(opt.check) : opt.check;
				var fn = findfn(opt, path);
				return fn ? fn(opt, el) : NOOP;
			};
		}

		t.$edit = opt;
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

	self.focusnext = function(el, e) {

		el = $(el);

		var parent = el[0];
		for (var i = 0; i < 12; i++) {
			parent = parent.parentNode;
			if (parent === document.body)
				break;
		}

		var arr = $(parent).find('.edit,.edit2');
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === el[0]) {
				var next = arr[i + 1];
				e && e.preventDefault();
				next && self.edit($(next));
				return true;
			}
		}

	};

	self.make = function() {

		self.aclass(cls);
		self.append('<div class="{0}-window hidden"></div>'.format(cls));
		floating = self.find(cls2 + '-window');
		$(document).on('click', '.edit', self.edit).on('dblclick', '.edit2', self.edit);

		events.keydown = function(e) {

			var t = this;

			if (!t.$editevents)
				return;

			var meta = t.$edit;

			if (meta.clear) {
				t.innerHTML = '';
				meta.clear = 0;
			}

			if (!meta.keypressed) {
				meta.keypressed = 1;
				$(t).aclass('edit-keypressed');
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
				t.$edit.is = false;
				self.detach(el);
				return;
			}

			if (e.which === 13 || e.which === 9) {

				if (e.which === 13 && meta.multiline)
					return;

				e.preventDefault();

				el = $(t);

				if (self.approve(el)) {
					self.detach(el);
					el.rclass('edit-keypressed');
					if (e.which === 9 && self.focusnext(t, e))
						return;
				} else
					self.detach(el);
			}
		};

		events.blur = function() {
			var t = this;
			if (t.$editevents) {
				var el = $(t);
				el.rclass('edit-keypressed');
				t.$edit.is && self.approve(el);
				self.detach(el);
			}
		};

		events.paste = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var meta = this.$edit;
			var text = e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain');
			text && document.execCommand('insertText', false, meta.multiline ? text.trim() : text.replace(/\n|\r/g, '').trim());
		};

	};

	self.edit = function(e) {

		var is = e instanceof jQuery;
		var t = is ? e : this;

		if (!is) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (t.$edit && t.$edit.is)
			return;

		var el = $(t);

		var opt = self.parse(el);
		if (!opt || (opt.checkforce && !opt.checkforce(el)))
			return;

		if (opt.prevent) {
			e.preventDefault();
			e.stopPropagation();
		}

		var value = el.html();
		var empty = false;

		var jcbind = el[0].$jcbind || {};
		if (jcbind.empty && jcbind.empty == el[0].innerText) {
			empty = true;
		}

		if (opt.floating) {

			var target = opt.parent ? (opt.parent === 'parent' ? el.parent() : el.closest(opt.parent)) : el;
			var offset = opt.floating === 'position' ? target.position() : target.offset();
			var width = opt.width || (target.width() + (config.padding * 2) + (opt.offsetWidth || 0));

			if (width < config.minwidth)
				width = config.minwidth;

			var align = opt.align || '';
			floating.css({ width: width, left: (offset.left - config.padding) + (opt.offsetX || 0), top: (offset.top - config.padding) + (opt.offsetY || 0), font: el.css('font'), 'text-align': align });
			floating.html(empty ? '' : value);
			floating.rclass('hidden');
			floating[0].$edit = opt;
		} else {
			floating.aclass('hidden');
			delete floating[0].$edit;
			empty && el.empty();
		}

		opt.is = true;
		opt.keypressed = 0;
		opt.html = value;
		opt.element = el;

		self.attach(opt.floating ? floating : el);
	};

	self.approve = function(el) {

		var opt = el[0].$edit;
		var cur = el.html();

		if (opt.html === cur)
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
				if ((opt.minvalue != null && opt.value < opt.minvalue) || (opt.maxvalue != null && opt.value > opt.maxvalue))
					return false;
				break;
			case 'phone':
				if (opt.required) {
					if (!opt.value.isPhone())
						return false;
				} else if (opt.value && !opt.value.isPhone())
					return false;
				break;
			case 'url':
				if (opt.required) {
					if (!opt.value.isURL())
						return false;
				} else if (opt.value && !opt.value.isURL())
					return false;
				break;
			case 'email':
				if (opt.required) {
					if ((!opt.value || !opt.value.isEmail()))
						return false;
				} else if (opt.value && !opt.value.isEmail())
					return false;
				break;
			case 'date':
				if (!opt.empty) {
					opt.value = opt.value ? opt.value.parseDate(opt.format) : null;
					if (opt.required && !opt.value)
						return false;
				}
				break;
			default:
				if (opt.required && !opt.value)
					return false;
				break;
		}

		self.save(el);
		return true;
	};

	self.save = function(el) {

		var opt = el[0].$edit;
		var fn = opt.exec || opt.save || config.exec;
		if (fn) {

			fn = findfn(opt, fn);

			if (typeof(fn) === 'function') {
				opt.detached = true;
				fn(opt, function(body) {
					if (body == null || body === false)
						opt.value = opt.html;
					else if (body !== true)
						opt.value = body + '';
					opt.element.html(opt.value + '');
					opt.notify && EXEC(opt.scope ? opt.scope.makepath(opt.notify) : opt.notify, opt);
				});
				return;
			}
		}

		if (!opt.nobind && opt.bind !== true) {
			setTimeout(function() {
				var b = opt.element.binder();
				if (b) {
					b.disabled = true;
					b.exec(opt.value, b.path);
					SET(b.path, opt.value, 2);
					b.disabled = false;
					opt.notify && EXEC(opt.scope ? opt.scope.makepath(opt.notify) : opt.notify, opt);
				}
			}, 100);
		}
	};

	self.attach = function(el) {
		if (!el[0].$editevents) {
			var o = el[0].$edit;
			el[0].$editevents = true;
			el.aclass('edit-open' + (o.multiline ? ' edit-multiline' : ''));
			el.on('keydown', events.keydown);
			el.on('blur', events.blur);
			el.on('paste', events.paste);
			el.attr('contenteditable', true);
			el.focus();

			if (o.clear || o.cursor === 'beg' || o.cursor === 'begin')
				setTimeout(self.movecursor, 10, el, 1);
			else
				self.movecursor(el, 0);

			if (o.select || o.selectall) {
				setTimeout(function() {
					document.execCommand('selectAll', false, null);
				}, 20);
			}
		}
	};

	self.detach = function(el) {
		if (el[0].$editevents) {
			el.off('keydown', events.keydown);
			el.off('blur', events.blur);
			el.off('paste', events.paste);
			el[0].$editevents = false;

			if (el[0] === floating[0])
				floating.aclass('hidden');

			var opt = el[0].$edit;

			if (!opt.detached && opt.html != null)
				opt.element.html(opt.html);

			delete opt.detached;
			opt.is = false;
			el.rclass('edit-open edit-multiline');
			el.attr('contenteditable', false);
		}
	};

});