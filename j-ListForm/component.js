COMPONENT('listform', 'empty:---;default:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var skip = false;
	var container;
	var form;
	var items;

	self.validate = function(value) {
		return config.disabled || !config.required ? true : !!(value && value.length > 0);
	};

	self.make = function() {

		self.aclass(cls + ' invisible');

		if (config.selector) {
			var customselector = $(document).find(config.selector);
			self.html(customselector.html());
		}

		var scr = self.find('script');
		var tmp;

		self.template = Tangular.compile(scr.eq(0).html());
		form = '<div class="{0}-form-container hidden{2}" data-scope="{1}__isolated:1"><div class="{0}-form">{3}</div></div>'.format(cls, self.ID, config.formclass ? (' ' + config.formclass) : '', scr.eq(1).html());
		tmp = scr.eq(2).html();
		scr.remove();
		self.append('<div class="{0}-items"><div class="{0}-emptylabel">{1}</div></div>'.format(cls, config.empty));
		tmp && self.append('<div class="{0}-footer">{1}</div>'.format(cls, tmp));
		container = self.find(cls2 + '-items');

		var entersubmit = function() {
			self.find('button[name="submit"]').trigger('click');
		};

		config.enter && self.event('keydown', 'input', function(e) {
			if (config.enter && e.which === 13)
				setTimeout2(self.ID, entersubmit, 200);
		});

		self.event('click', cls2 + '-item', function() {

			if (config.disabled)
				return;

			var t = this;
			if (form.$target === t)
				self.cancel();
			else
				self.edit(t);
		});

		self.event('click', 'button', function(e) {

			if (config.disabled)
				return;

			var el = $(this);
			var parent = el.closest(cls2 + '-item');
			var tmp;

			if (parent.length) {
				var tmp = parent[0].$data;
				self.cancel();
				e.stopPropagation();
				switch (this.name) {
					case 'up':
					case 'down':
						var index = items.indexOf(tmp);
						var tmp = index + (this.name === 'up' ? -1 : 1);
						if (tmp < 0 || index > items.length)
							return;
						var a = items[tmp];
						items[tmp] = items[index];
						items[index] = a;
						NODEMOVE(parent[0], this.name === 'up');
						skip = true;
						self.set(items, 2);
						self.change(true);
						break;
					case 'remove':
						items.splice(items.indexOf(tmp), 1);
						skip = true;
						self.set(items, 2);
						self.change(true);
						parent.remove();
						break;
				}
				return;
			}

			var is = false;
			var fn;

			switch (this.name) {

				case 'create':

					self.check();

					if (!$(form).hclass('hidden') && !form.$data) {
						self.cancel();
						return;
					}

					fn = function(obj) {
						if (config.create || !config.default)
							SET('{0} @reset'.format(self.ID), obj);
						else
							DEFAULT(self.ID + '__{}');
						self.edit();
					};

					if (config.create)
						EXEC(self.makepath(config.create), fn);
					else
						fn({});

					is = true;
					break;

				case 'submit':
				case 'update':

					tmp = GET('{0} @reset'.format(self.ID));
					fn = function(tmp) {
						if (tmp) {

							if (!items)
								items = [];

							if (form.$target) {
								COPY(tmp, form.$data);
								self.redraw(form.$target, form.$data);
							} else {
								items.push(tmp);
								self.create(tmp);
							}
							skip = true;
							self.set(items, 2);
							self.change(true);
						}
						self.cancel();
					};

					if (config[this.name])
						EXEC(self.makepath(config[this.name]), tmp, fn);
					else
						fn(tmp);

					is = true;
					break;

				case 'cancel':
					self.cancel();
					is = true;
					break;

				case 'remove':

					var el = form.$target;
					var data = form.$data;

					fn = function(is) {
						self.cancel();
						if (is !== false && data) {
							el.parentNode.removeChild(el);
							items.splice(items.indexOf(data), 1);
							skip = true;
							self.set(items, 2);
							self.change(true);
						}
					};

					if (config.remove)
						EXEC(self.makepath(config.remove), data, fn);
					else
						fn();

					is = true;
					break;
			}

			if (is) {
				e.preventDefault();
				e.stopPropagation();
			}
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-' + key, !!value);
				self.find('button[name="create"]').prop('disabled', !!value);
				break;
			case 'required':
				self.tclass(cls + '-' + key, !!value);
				break;
		}
	};

	self.check = function() {
		if (!self.$$check) {
			form = $(form)[0];
			container.append(form);
			self.compile();
			self.$$check = true;
		}
	};

	self.edit = function(el) {

		self.check();
		self.cancel();

		var before;
		var parent;

		if (el) {
			parent = el.parentNode;
			var children = parent.children;
			for (var i = 0; i < children.length; i++) {
				if (children[i] === el) {
					before = children[i + 1];
					break;
				}
			}
			form.$target = el;
			form.$data = el.$data;
			SET('{0} @reset'.format(self.ID), CLONE(el.$data));
			$(el).aclass(cls + '-selected');
		} else {
			parent = container[0];
			form.$target = form.$data = null;
		}

		if (before)
			parent.insertBefore(form, before);
		else
			parent.appendChild(form);

		setTimeout(function() {
			$(form).tclass(cls + '-new', !el).rclass('hidden');
			config.autofocus && self.autofocus(config.autofocus);
		}, 150);
	};

	self.cancel = function() {
		if (self.$$check) {
			if (form.parentNode !== self.dom)
				self.dom.appendChild(form);
			form.$target && $(form.$target).rclass(cls + '-selected');
			form.$target = form.$data = null;
			$(form).aclass('hidden');
		}
	};

	self.redraw = function(el, data) {
		el.innerHTML = self.template(data);
	};

	self.create = function(item) {
		var dom = document.createElement('DIV');
		dom.setAttribute('class', cls + '-item' + (config.itemclass ? (' '  + config.itemclass) : ''));
		dom.innerHTML = self.template(item);
		dom.$data = item;
		container[0].appendChild(dom);
	};

	self.setter = function(value, path, type) {

		if (!type)
			self.rclass('invisible');

		items = value;
		self.tclass(cls + '-empty', !value || !value.length);
		self.cancel();

		if (skip) {
			skip = false;
			return;
		}

		form.$data && self.cancel();
		container.find(cls2 + '-item').remove();

		if (value) {
			for (var i = 0; i < value.length; i++)
				self.create(value[i]);
		}
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
	};

});