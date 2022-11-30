COMPONENT('dynamicvaluelist', 'html:{{ name }};icon2:angle-down;loading:1;limit:1000;dirvalue:id;tapi:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var template = '<div class="{0}-item"><div class="{0}-icon"><i class="ti ti-times"></i></div><div class="{0}-value">{1}</div></div>'.format(cls, config.placeholder);
	var container;
	var skip = false;

	self.nocompile();

	self.validate = function(value) {
		return !config.required || config.disabled ? true : !!value;
	};

	self.state = function(type) {
		if (type) {
			var invalid = config.required ? self.isInvalid() : false;
			if (invalid !== self.$oldstate) {
				self.$oldstate = invalid;
				self.tclass(cls + '-invalid', invalid);
			}
		}
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'html':
				config.html = Tangular.compile(value);
				break;
			case 'label':
				var label = self.find(cls2 + '-label');
				label.tclass('hidden', !value);
				label.find('span').html((value || '') + ':');
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				self.tclass(cls + '-required', value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'icon':
				var ti = self.find(cls2 + '-label').find('i');
				ti.rclass2('ti-').rclass('hidden');
				if (value)
					ti.aclass('ti-' + value);
				else
					ti.aclass('hidden');
				break;
			case 'remap':
				config.remap = value ? FN(value) : null;
				break;
		}
	};

	self.make = function() {

		if (!config.label)
			config.label = self.html();

		self.aclass(cls);
		self.html('<div class="{0}-label{1}"><i class="ti hidden"></i><span>{2}:</span></div><div class="{0}-border"><div class="{0}-container hidden"></div>{3}</div>'.format(cls, config.label ? '' : ' hidden', config.label, template.replace('-item', '-item ' + cls + '-search').replace('ti-times', 'ti-' + config.icon2)));
		container = self.find(cls2 + '-container');

		self.event('click', cls2 + '-item', function() {

			if (config.disabled)
				return;

			var t = this;

			if (config.dirsource) {
				var opt = {};
				opt.element = $(t);
				opt.offsetY = -1;
				opt.placeholder = config.dirplaceholder;
				opt.render = config.dirrender ? GET(self.makepath(config.dirrender)) : null;
				opt.custom = !!config.dircustom;
				opt.offsetWidth = 2;
				opt.minwidth = config.dirminwidth || 200;
				opt.maxwidth = config.dirmaxwidth;
				opt.key = config.dirkey || config.key;
				opt.empty = config.dirempty;
				opt.key = config.dirkey;

				var model = self.get();
				var key = config.key || config.dirvalue;
				opt.items = function(value, next) {

					var processor = function(values) {
						if (model && model.length) {
							var arr = [];
							for (var i = 0; i < values.length; i++) {
								if (model.indexOf(values[i][key]) === -1)
									arr.push(values[i]);
							}
							values = arr;
						}
						next(values);
					};

					if (config.dirsource.indexOf(' ') !== -1) {
						var val = encodeURIComponent(value);
						var fn = config.tapi ? TAPI : AJAX;
						fn(config.dirsource.format(val).arg({ value: val }), processor);
					} else
						self.EXEC(config.dirsource, value, processor);
				};
				opt.callback = function(selected) {
					var val = selected[config.dirvalue];
					var arr = self.get() || [];
					if (arr.indexOf(val) !== -1)
						return;
					skip = true;
					self.bindsinglevalue(val, t.$dlid);
					if (t.$dlid)
						self.update();
					else {
						arr.push(val);
						self.set(arr);
					}
					self.change();
					config.required && setTimeout(self.validate2, 100);
				};
				SETTER('directory/show', opt);
			} else {
				self.EXEC(config.click || config.find, self.element, function(value) {
					var arr = self.get() || [];
					if (arr.indexOf(value) !== -1)
						return;
					skip = true;
					if (t.$dlid)
						self.update();
					else {
						arr.push(value);
						self.set(arr);
					}
					self.change();
					config.required && setTimeout(self.validate2, 100);
					self.bindsinglevalue(value, t.$dlid);
				}, self.get());
			}
		});

		self.event('click', cls2 + '-icon', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (!config.disabled) {
				var el = $(this).closest(cls2 + '-item');
				if (el[0].$dlid) {
					var source = self.get();
					var index = source.indexOf(el[0].$dlid);
					if (index !== -1) {
						skip = true;
						source.splice(index, 1);
						container.tclass('hidden', !source.length);
						self.change();
						self.update();
					}
					el.remove();
				} else
					el.trigger('click');
			}
		});
	};

	self.bindvalue = function(value) {

		if (!value)
			value = [];

		config.bind && self.SEEX(config.bind, value);

		if (config.remap) {
			for (var i = 0; i < value.length; i++)
				value[i] = config.remap(value[i]);
		}

		container.empty();

		for (var i = 0; i < value.length; i++)
			el_insert(value[i]);

		self.tclass(cls + '-is', !!value.length);
		container.tclass('hidden', !value.length);
		config.loading && SETTER('loading/hide', 200);
	};

	var el_update = function(item, value) {
		var arr = container.find(cls2 + '-item');
		var key = config.key || config.dirvalue;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].$dlid === value) {
				var model = self.get();
				var index = model.indexOf(value);
				if (index !== -1) {
					model[index] = item[key];
					skip = true;
					self.update();
					self.change();
				}
				arr[i].$dlid = item[key];
				$(arr[i]).find(cls2 + '-value').html(config.html(item));
				break;
			}
		}
	};

	var el_insert = function(item) {
		var el = $(template);
		el[0].$dlid = item[config.key || config.dirvalue];
		el.find(cls2 + '-value').html(config.html(item));
		container[0].appendChild(el[0]);
	};

	self.bindsinglevalue = function(value, oldid) {

		if (value) {
			if (config.url) {
				config.loading && SETTER('loading/show');
				var val = encodeURIComponent(value);
				var fn = function(response) {
					config.loading && SETTER('loading/hide');
					if (response instanceof Array && response.length) {
						if (oldid == null)
							el_insert(response[0]);
						else
							el_update(response[0], oldid);
						container.rclass('hidden');
					}
				};

				if (config.tapi)
					TAPI(config.url.format(val).arg({ value: val }), fn);
				else
					AJAX('GET ' + config.url.format(val).arg({ value: val }), fn);

			} else {
				self.EXEC(config.exec || config.read, value, function(response) {
					if (response instanceof Array && response.length) {
						if (oldid == null)
							el_insert(response[0]);
						else
							el_update(response[0], oldid);
						container.rclass('hidden');
					}
				});
			}
		}
	};

	self.setter = function(value, path, type) {

		if (skip) {
			skip = false;
			self.tclass(cls + '-is', value && value.length > 0);
			return;
		}

		if (value && value.length) {
			if (config.url) {
				config.loading && SETTER('loading/show');
				var val = encodeURIComponent(value.join(','));
				if (config.tapi)
					TAPI(config.url.format(val).arg({ value: val }), self.bindvalue);
				else
					AJAX('GET ' + config.url.format(val).arg({ value: val }), self.bindvalue);
			} else
				self.EXEC(config.exec || config.read, value, self.bindvalue, type);
		} else
			self.bindvalue(value);
	};

});