COMPONENT('enter', 'validate:1;trigger:button[name="submit"];flags:visible;timeout:1500;delay:500', function(self, config) {

	var delay = null;
	var flags;

	var submit = function(btn) {
		delay = null;
		if (btn)
			btn.trigger('click');
		else
			self.EXEC(config.exec, self);
	};

	self.readonly();

	self.make = function() {

		var isvalid = function() {

			var arr = COMPONENTS(self.path);
			var modified = false;
			var disabled = false;

			for (var m of arr) {

				if (m === self)
					continue;

				if (config.validonly) {
					if (m.config.invalid) {
						disabled = true;
						break;
					}
				} else if (m.config.invalid) {
					disabled = true;
					break;
				} else if (m.config.modified)
					modified = true;
			}

			return modified && !disabled;
		};

		self.event('keydown', 'input', function(e) {
			if (e.which === 13 && (!config.validate || !self.path || isvalid())) {
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