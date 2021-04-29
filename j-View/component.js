COMPONENT('view', 'cache:session', function(self, config, cls) {

	var path = 'view_' + GUID(15);

	self.readonly();

	var replace2 = function(value) {
		return '<div data-scope="' + path + '__isolated:1;init:?/init">' + value.replace('PLUGIN(function', 'PLUGIN(\'' + path + '\', function').replace(/~PATH~/g, path) + '</div>';
	};

	self.destroy = function() {
		SET(path, null);
	};

	self.make = function() {
		self.aclass(cls);
		IMPORTCACHE(config.url, config.cache, self.element, function() {
			self.rclass('hidden');
			self.rclass('invisible', 150);
		}, true, replace2);
	};

	self.setter = function(value, p, type) {
		SET(path, value, type);
	};

});