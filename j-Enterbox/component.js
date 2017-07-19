COMPONENT('enterbox', function(self) {

	self.readonly();

	self.make = function() {
		self.aclass('ui-enterbox');
		self.append('<div class="ui-enterbox-button"><button><i class="fa {0}"></i></button></div><div class="ui-enterbox-input"><input type="text" placeholder="{1}" maxlength="{2}" /></div>'.format(self.attrd('icon') || 'fa-keyboard-o', self.attrd('placeholder'), self.attrd('maxlength') || '50'));
		self.event('click', 'button', self.submit);
		self.event('keyup', 'input', function(e) {
			e.which === 13 && self.submit();
		});
	};

	self.submit = function() {
		var exec = self.attrd('exec');
		var val = self.find('input').val();
		if (exec)
			EXEC(exec, val);
		else
			self.set(val);
	};

	self.setter = function(value) {
		self.find('input').val(value == null ? '' : value.toString());
	};
});