COMPONENT('clbind', 'nullable:1;key:id', function(self, config, cls) {

	var datasource = [];
	var template = null;
	var curr = null;

	var bind = function() {
		var item = datasource.findItem(config.key, curr);
		if (template && (config.nullable || item))
			self.html(template({ value: item }));
		if (!config.nullable)
			self.tclass('hidden', !item);
		config.bind && self.SEEX(config.bind, item, self.element);
		config.exec && self.SEEX(config.exec, item, self.element);
	};

	self.make = function() {
		var scr = self.find('scr' + 'ipt,template');
		var str = (scr.length ? scr.html() : self.html()).trim();
		if (str)
			template = Tangular.compile(str);
	};

	self.configure = function(key, value) {
		if (key === 'dirsource' || key === 'datasource' || key === 'source') {
			self.datasource(value, function(path, value) {
				datasource = (M.is20 ? path : value) || [];
				setTimeout2(self.ID, bind, 10);
			});
		}
	};

	self.setter = function(value) {
		curr = value;
		setTimeout2(self.ID, bind, 10);
	};

});