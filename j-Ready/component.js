COMPONENT('ready', 'delay:800', function(self, config) {

	self.readonly();
	self.blind();

	self.make = function() {
		config.rclass && self.rclass(config.rclass, config.adelay || config.delay);
		config.aclass && self.aclass(config.aclass, config.rdelay || config.delay);
		self.rclass('invisible', config.adelay || config.delay);
		config.focus && setTimeout(function() {
			self.autofocus(config.focus === true || config.focus === 1 ? null : config.focus).focus();
		}, config.fdelay || (config.delay + 5));
	};

});