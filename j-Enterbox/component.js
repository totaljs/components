COMPONENT('enterbox', function(self, config, cls) {

	self.readonly();
	self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'icon':
				self.find('i').rclass().aclass(self.tiicon(value));
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
		self.aclass(cls);
		self.append('<div class="{3}-button"><button><i class="{0}"></i>{4}</button></div><div class="{3}-input"><input type="text" placeholder="{1}" maxlength="{2}" /></div>'.format(self.tiicon(config.icon) || 'ti ti-keyboard', config.placeholder, config.maxlength || 50, cls, config.button || ''));
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