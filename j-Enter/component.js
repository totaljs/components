COMPONENT('enter', 'validate:true', function(self, config) {
	self.readonly();
	self.make = function() {
		self.event('keydown', 'input', function(e) {
			if (e.which === 13 && (!config.validate || CAN(self.path))) {
				if (config.trigger)
					self.find(config.trigger).trigger('click');
				else
					EXEC(config.exec, self);
			}
		});
	};
});