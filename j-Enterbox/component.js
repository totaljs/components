COMPONENT('enterbox', function(self, config, cls) {

	self.readonly();
	self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'icon':
				self.find('i').rclass().aclass((value.indexOf(' ') === -1 ? 'fa fa-' : '') + value);
				break;
			case 'placeholder':
				self.find('input').prop('placeholder', value);
				break;
			case 'maxlength':
				self.find('input').prop('maxlength', value);
				break;
		}
	};

	self.make = function() {

		var icon = config.icon;
		if (icon)
			icon = (icon.indexOf(' ') === -1 ? 'fa fa-' : '') + icon;

		self.aclass(cls);
		self.append('<div class="{3}-button"><button><i class="{0}"></i></button></div><div class="{3}-input"><input type="text" placeholder="{1}" maxlength="{2}" /></div>'.format(icon || 'fa fa-keyboard-o', config.placeholder, config.maxlength || 50, cls));
		self.event('click', 'button', self.submit);
		self.event('keyup', 'input', function(e) {
			e.which === 13 && self.submit();
		});
	};

	self.submit = function() {
		var val = self.find('input').val();
		config.exec && self.EXEC(config.exec, val);
		self.path && self.set(val);
	};

	self.clear = function() {
		self.find('input').val('');
		config.exec && self.EXEC(config.exec, '');
		self.path && self.set('');
	};

	self.setter = function(value) {
		self.find('input').val(value == null ? '' : value.toString());
	};
});