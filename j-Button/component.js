COMPONENT('button', 'delay:100;icon:home;flags:visible;validation:1;name:submit;size:normal', function(self, config, cls) {

	var ihtml, old, track;
	var flags = null;
	var tracked = false;
	var ready = false;

	self.readonly();

	self.make = function() {
		self.aclass(cls);
		ihtml = self.dom.innerHTML;

		self.event('click', 'button', function() {
			var t = this;
			if (config.exec && (!config.ddos || !BLOCKED(self.ID, config.ddos)))
				self.EXEC(config.exec, $(t), self.path);
		});

		self.redraw();
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
			case 'track':
				track = value.split(',').trim();
				break;
			case 'disabled':
				self.button && self.button.prop('disabled', !!value);
				break;
			case 'icon':
				if (self.button) {
					var i = self.find('i').rclass2('ti');
					if (value)
						i.aclass(self.tiicon(value)).rclass('hidden');
					else
						i.aclass('hidden');
				}
				break;
			case 'size':
				ready && self.rclass2(cls + '-');
				self.aclass(cls + '-' + value);
				break;
		}
	};

	var settracked = function() {
		tracked = 0;
	};

	self.redraw = function() {
		var html = '<i class="{0}"></i>'.format(config.icon ? (self.tiicon(config.icon) + (config.color ? (' ' + config.color) : '')) : 'hidden') + ihtml;
		self.html('<button' + (config.disabled || (self.path && config.validation) ? ' disabled' : '') + (config.name ? (' name="' + config.name + '"') : '') + '>' + html + '</button>');
		self.button = self.find('button');
		if (ready) {
			if (config.validation && self.path)
				self.check();
		} else
			ready = false;
		self.rclass('hidden invisible', 100);
	};

	self.setter = function(value, path, type) {

		if (!config.validation || !path)
			return;

		if ((type === 1 || type === 2) && track && track.length) {
			for (var i = 0; i < track.length; i++) {
				if (path.indexOf(track[i]) !== -1) {
					tracked = 1;
					return;
				}
			}
			if (tracked === 1) {
				tracked = 2;
				setTimeout(settracked, config.delay * 3);
			}
		}
	};

	var check = function() {
		var path = self.path.replace(/\.\*$/, '');
		var disabled = tracked || config.validonly ? !VALID(path, flags) : DISABLED(path, flags);
		if (!disabled && config.if)
			disabled = !EVALUATE(path, config.if);

		if (disabled !== old && self.button) {
			self.button.prop('disabled', disabled);
			old = disabled;
		}
	};

	self.state = function(type, what) {
		if (config.validation && self.path) {
			if (type === 3 || what === 3)
				tracked = 0;
			setTimeout2(self.ID, check, config.delay);
		}
	};

});