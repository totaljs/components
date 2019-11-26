COMPONENT('searchbox', 'cleartype:1;keypress:0;autotrim:1', function(self, config) {

	var cls = 'ui-' + self.name;
	var cls2 = '.' + cls;
	var els = {};
	var isvisible = false;
	var type = {};
	var skip = false;

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
		});

		els.searchinput.on('blur', function() {
			isvisible = false;
			self.refresh();
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
			config.clicktype && EXEC(config.clicktype, self, type, els.searchinput.val());
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

	self.modifiedvalue = function(type, isenter) {

		var val = els.searchinput.val();
		var model = self.get();
		var is = true;

		if (config.autotrim)
			val = val.trim();

		if (!model) {
			is = false;
			model = {};
		}

		model.type = type.value;
		model.value = val;

		if (isenter && config.exec)
			SEEX(config.exec, model, self);

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
		forcefocus();
		setTimeout(forcefocus, 500);
		config.autocomplete && EXEC(config.autocomplete, self, els.searchinput);
	};

	self.refresh = function() {
		var value = els.searchinput.val();
		var is = !!value || isvisible;
		els.placeholder.tclass('hidden', is);
		els.input.tclass('hidden', !is);
		self.resize();
	};

	self.type = function(html, value, noemit) {

		type.html = html;
		type.value = value;
		els.type.html(html);
		self.resize();

		if (!noemit)
			self.modifiedvalue('type');
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