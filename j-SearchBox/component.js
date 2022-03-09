COMPONENT('searchbox', 'cleartype:0;keypress:0;autotrim:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var els = {};
	var isvisible = false;
	var type = {};
	var skip = false;
	var initialized = false;
	var hidetimeout;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {

		self.aclass(cls);
		self.append('<div class="{0}-placeholder"><i class="fa fa-search"></i><span>{1}</span></div><div class="{0}-input hidden"><span class="{0}-control"><i class="fa fa-times-circle"></i></span><span class="{0}-type"></span><div><input type="text" maxlength="100" /></div></div>'.format(cls, config.placeholder));

		els.type = self.find(cls2 + '-type');
		els.placeholder = self.find(cls2 + '-placeholder');
		els.input = self.find(cls2 + '-input');
		els.searchinput = els.input.find('input');

		// Events
		els.placeholder.on('click', function() {
			isvisible = true;
			self.refresh();
			forcefocus();
			if (!initialized) {
				config.init && self.EXEC(config.init, self);
				initialized = true;
			}
		});

		els.searchinput.on('blur focusout', function() {
			hidetimeout && clearTimeout(hidetimeout);
			hidetimeout = setTimeout(function() {
				hidetimeout = null;
				isvisible = false;
				self.refresh();
			}, 100);
		});

		els.searchinput.on('focusin', function() {
			self.focus();
		});

		els.searchinput.on('input', function() {
			if (config.keypress)
				self.modifiedvalue('input');
		});

		els.searchinput.on('keydown', function(e) {
			if (e.which === 27)
				self.blur(true);
			else if (e.which === 13 && !config.keypress)
				self.modifiedvalue('input', true);
		});

		self.find(cls2 + '-control').on('click', function() {
			self.blur(true);
		});

		els.type.on('click', function() {
			hidetimeout && clearTimeout(hidetimeout);
			isvisible = true;
			config.clicktype && self.EXEC(config.clicktype, self, type, els.searchinput.val());
		});
	};

	self.blur = function(clear) {
		isvisible = false;

		if (clear) {
			els.searchinput.val('');
			if (config.cleartype)
				self.type('', null, false);
			self.modifiedvalue('input', true);
		}

		self.refresh();
	};

	self.show = function() {
		els.placeholder.trigger('click');
	};

	self.enter = function() {
		self.modifiedvalue('input', true);
	};

	self.focus = function() {
		config.autocomplete && self.EXEC(config.autocomplete, self, els.searchinput);
	};

	var forcefocus = function() {
		els.searchinput.focus();
	};

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'placeholder':
				els.placeholder.find('span').html(value || '');
				break;
		}
	};

	self.modifiedvalue = function(caller, isenter) {

		var val = els.searchinput.val();
		var model = self.get();
		var is = true;

		if (config.autotrim)
			val = val.trim();

		if (!model) {
			is = false;
			model = {};
		}

		if (!model.value)
			model.value = '';

		if (!model.type)
			model.type = '';

		var ischange = model.type !== type.value || model.value !== val;
		if (!ischange)
			return;

		model.type = type.value;
		model.value = val;

		if (isenter && config.exec)
			SEEX(self.makepath(config.exec), model, self, caller);

		skip = true;

		if (is)
			self.update();
		else
			self.set(model);
	};

	self.resize = function() {
		var is = els.input.hclass('hidden');

		if (is)
			return;

		var div = els.searchinput.parent();
		var w = els.type.width();
		div.css('margin-left', w + 5);
	};

	self.refresh = function() {
		var value = els.searchinput.val();
		var is = !!value || isvisible;
		els.placeholder.tclass('hidden', is);
		els.input.tclass('hidden', !is);
		self.resize();
	};

	self.type = function(html, value, noemit) {

		if (type.html === html && type.value === value)
			return;

		type.html = html;
		type.value = value;
		els.type.html(html);

		if (!noemit)
			self.modifiedvalue('type', true);

		self.resize();
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		value && els.searchinput.val(value.value);
		self.refresh();
	};

});