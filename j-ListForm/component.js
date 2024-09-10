COMPONENT('listform', 'empty:---;default:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var skip2 = false;
	var skip = false;
	var container;
	var form;
	var items;
	var plugin;

	self.validate = function(value) {
		if (config.disabled)
			return true;
		var valid = config.required ? !!(value && value.length > 0) : true;
		if (valid && config.invalidform)
			valid = self.$$invalid ? false : valid;
		return valid;
	};

	self.make = function() {

		plugin = config.plugin || self.ID;
		self.aclass(cls + ' invisible');

		if (config.selector) {
			var customselector = $(document).find(config.selector);
			self.html(customselector.html());
		}

		var scr = self.find('script');
		var tmp;

		self.template = Tangular.compile(scr.eq(0).html());
		form = '<div class="{0}-form-container hidden{2}"><ui-plugin path="{1}" config="isolated:1"><div class="{0}-form">{3}</div></ui-plugin></div>'.format(cls, plugin, config.formclass ? (' ' + config.formclass) : '', scr.eq(1).html());
		tmp = scr.eq(2).html();
		scr.remove();

		var footer = tmp ? '<div class="{0}-footer">{1}</div>'.format(cls, tmp) : '';

		if (footer && config.footertop)
			self.append(tmp);

		self.append('<div class="{0}-container"><div class="{0}-emptylabel">{1}</div><div class="{0}-items"></div></div>'.format(cls, config.empty));

		if (footer && !config.footertop)
			self.append(tmp);

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
			var fn;

			if (parent.length) {
				var data = parent[0].$data;
				self.cancel();
				e.stopPropagation();
				switch (this.name) {
					case 'up':
					case 'down':
						tmp = parent.aclass(cls + '-item-highlight');
						tmp.rclass(cls + '-item-highlight', 1000);
						var index = items.indexOf(data);

						tmp = index + (this.name === 'up' ? -1 : 1);
						if (tmp < 0 || tmp >= items.length)
							return;

						var a = items[tmp];
						items[tmp] = items[index];
						items[index] = a;
						NODEMOVE(parent[0], this.name === 'up');
						skip = true;
						self.bind('@modified @touched @setter', items);
						config.move && self.EXEC(config.move, items);
						break;

					case 'remove':

						fn = function(is) {
							self.cancel();
							if (is !== false && data) {
								parent.remove();
								items.splice(items.indexOf(data), 1);
								skip = true;
								self.bind('@modified @touched @setter', items);
							}
						};

						if (config.remove)
							self.EXEC(config.remove, data, fn, self.get());
						else
							fn();
						break;
				}
				return;
			}

			var is = false;

			switch (this.name) {

				case 'create':
					self.add();
					is = true;
					break;

				case 'submit':
				case 'update':

					tmp = GET('{0} @reset'.format(plugin));
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
							self.$$invalid = false;
							skip = true;
							self.bind('@modified @touched @setter', items);
						}
						self.cancel();
					};

					if (config[this.name])
						self.EXEC(config[this.name], tmp, fn, self.get(), form.$data);
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
						if (is !== false && data) {
							el.parentNode.removeChild(el);
							items.splice(items.indexOf(data), 1);
							skip = true;
							self.$$invalid = false;
							self.bind('@modified @touched @setter', items);
						}
						self.cancel();
					};

					if (config.remove)
						self.EXEC(config.remove, data, fn, self.get());
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

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-' + key, !!value);
				self.find('button[name="create"]').prop('disabled', !!value);
				break;
			case 'required':
				self.tclass(cls + '-' + key, !!value);
				if (!init)
					self.validate2();
				break;
		}
	};

	self.add = function() {

		self.check();

		if (!$(form).hclass('hidden') && !form.$data) {
			self.cancel();
			return;
		}

		var fn = function(obj) {

			if (config.newbie)
				obj[config.newbie] = true;

			if (config.create || !config.default)
				SET('{0} @reset'.format(plugin), obj);
			else
				SET('{0} @default'.format(plugin), obj);

			self.edit();
		};

		if (config.create)
			self.EXEC(config.create, {}, fn, self.get());
		else
			fn({});
	};

	self.check = function() {
		if (!self.$$check) {
			form = $(form)[0];
			container.append(form);
			self.compile && self.compile();
			self.$$check = true;
			self.$$invalid = true;
			if (config.invalidform)
				self.validate2();
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
			SET('{0} @reset'.format(plugin), CLONE(el.$data));
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

		if (config.invalidform) {
			self.$$invalid = true;
			self.validate2();
			skip2 = true;
			self.update();
		}

	};

	self.cancel = function() {
		if (self.$$check) {

			if (self.$$invalid) {
				self.$$invalid = false;
				self.validate2();
				skip2 = true;
				self.update();
			}

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

		if (skip2) {
			skip2 = false;
			return;
		}

		if ((M.is20 && type.init) || !type)
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