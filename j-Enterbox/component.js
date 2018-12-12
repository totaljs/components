COMPONENT('enterbox', function(self, config) {

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'icon':
				self.find('i').rclass().aclass('fa fa-' + value);
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
		self.aclass('ui-enterbox');
		self.append('<div class="ui-enterbox-button"><button><i class="fa fa-{0}"></i></button></div><div class="ui-enterbox-input"><input type="text" placeholder="{1}" maxlength="{2}" /></div>'.format(config.icon || 'keyboard-o', config.placeholder, config.maxlength || 50));
		self.event('click', 'button', self.submit);
		self.event('keyup', 'input', function(e) {
			e.which === 13 && self.submit();
		});
	};

	self.submit = function() {
		var val = self.find('input').val();
		if (config.exec)
			EXEC(config.exec, val);
		else
			self.set(val);
	};

	self.setter = function(value) {
		self.find('input').val(value == null ? '' : value.toString());
	};
});