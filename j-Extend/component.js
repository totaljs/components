COMPONENT('extend', function(self, config, cls) {
	self.readonly();
	self.make = function() {
		self.aclass(cls);
		var opt = {};
		opt.name = config.name;
		opt.type = config.type;
		opt.element = self.element;
		opt.dom = self.dom;
		opt.component = self;
		opt.path = self.path;
		opt.name && EMIT('extend_' + opt.name, opt);
		EMIT('extend', opt);
	};
});