COMPONENT('enter', 'validate:1', function(self, config) {
	self.readonly();
	self.make = function() {
		self.event('keydown', 'input', function(e) {
			if (e.which === 13 && (!config.validate || CAN(self.path))) {
				if (config.trigger)
					self.find(config.trigger).trigger('click');
				else
					EXEC(self.makepath(config.exec), self);
			}
		});
	};
});