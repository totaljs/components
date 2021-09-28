COMPONENT('enter', 'validate:1;trigger:button[name="submit"];flags:visible;timeout:1500;delay:500', function(self, config) {

	var flags;
	var delay = null;
	var submit = function(btn) {
		delay = null;
		if (btn)
			btn.trigger('click');
		else
			self.EXEC(config.exec, self);
	};

	self.readonly();
	self.make = function() {
		self.event('keydown', 'input', function(e) {
			if (e.which === 13 && (!config.validate || !self.path || CAN(self.path, flags))) {
				if (config.exec) {
					if (!BLOCKED(self.ID, config.timeout)) {
						delay && clearTimeout(delay);
						delay = setTimeout(submit, config.delay);
					}
				} else {
					var btn = self.find(config.trigger);
					if (!btn.prop('disabled')) {
						if (!BLOCKED(self.ID, config.timeout)) {
							delay && clearTimeout(delay);
							delay = setTimeout(submit, config.delay, btn);
						}
					}
				}
			}
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'flags':
				if (value) {
					flags = value.split(',');
					for (var i = 0; i < flags.length; i++)
						flags[i] = '@' + flags[i];
				} else
					flags = null;
				break;
		}
	};

});