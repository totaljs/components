COMPONENT('clbind', 'nullable:1;key:id', function(self, config, cls) {

	var datasource = [];
	var template = null;
	var curr = null;
	var prev = null;

	var bind = function() {
		if (prev !== curr) {
			prev = curr;
			var item = datasource.findItem(config.key, curr);
			if (template && (config.nullable || item))
				self.html(template({ value: item }));
			if (!config.nullable)
				self.tclass('hidden', !item);
			config.bind && self.SEEX(config.bind, item, self.element);
			config.exec && self.SEEX(config.exec, item, self.element);
		}
	};

	self.make = function() {
		var scr = self.find('scr' + 'ipt,template');
		var str = (scr.length ? scr.html() : self.html()).trim();
		if (str)
			template = Tangular.compile(str);
	};

	self.configure = function(key, value) {
		if (key === 'dirsource' || key === 'datasource' || key === 'source') {
			self.datasource(value, function(arr) {
				datasource = arr || [];
				setTimeout2(self.ID, bind, 5);
			});
		}
	};

	self.setter = function(value) {
		curr = value;
		setTimeout2(self.ID, bind, 5);
	};

});