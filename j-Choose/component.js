COMPONENT('choose', 'limit:1;attr:id;key:id;selector:.selection;event:click;class:selected;type:string;uncheck:false', function(self, config, cls) {

	var convert = function(val) {
		switch (config.type) {
			case 'number':
				return val ? val.parseInt() : null;
			default:
				return val;
		}
	};

	self.getter = null;
	self.validate = function(value) {
		if (config.disabled || !config.required)
			return true;
		return config.limit === 1 ? value != null : value && value.length > 0;
	};

	self.make = function() {

		self.aclass(cls);

		self.event(config.event, config.selector, function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.toggle($(this));
		});

	};

	self.toggle = function(id) {

		if (config.disabled)
			return;

		id = convert(ATTRD(id, config.attr));

		var model = self.get();
		var tmp;

		if (model == null) {
			self.rewrite(model);
			tmp = config.limit === 1 ? id : [id];
			self.set(tmp);
			config.click && self.EXEC(config.click, tmp);
		} else {
			if (config.limit === 1) {
				if (model === id) {
					if (config.uncheck) {
						self.bind('@modified @touched @setter', null);
						config.click && self.EXEC(config.click, null);
					}
				} else {
					self.bind('@modified @touched @setter', id);
					config.click && self.EXEC(config.click, id);
				}
			} else {
				var index = model.indexOf(id);
				if (index === -1) {
					if (config.limit <= model.length)
						model.pop();
					model.push(id);
				} else
					model.splice(index, 1);
				config.click && self.EXEC(config.click, model);
				self.bind('@modified @touched @setter', model);
			}
		}
		self.change(true);
	};

	self.recalc = function() {

		let arr = self.find(config.selector);
		let model = self.get();

		for (let i = 0; i < arr.length; i++) {

			let el = $(arr[i]);
			let is = false;
			let index = -1;

			if (config.limit === 1) {
				is = model == null ? false : model === convert(el.attrd(config.attr));
			} else {
				index = model && model instanceof Array && model.length ? model.indexOf(el.attrd(config.attr)) : -1;
				is = index != -1;
			}

			if ((!config.limit || config.limit > 1) && config.indexer)
				el.find(config.indexer).text(is ? (index + 1) : '');

			el.tclass(config.class, is);
		}
	};

	var datasource = function() {
		self.update();
	};

	self.configure = function(key, value) {
		if (key === 'datasource')
			self.datasource(value, datasource);
	};

	self.setter = function() {
		setTimeout2(self.ID, self.recalc, 10);
	};

});