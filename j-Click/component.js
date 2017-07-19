COMPONENT('click', function(self) {

	self.readonly();

	self.click = function() {
		var value = self.attrd('value');
		if (typeof(value) === 'string')
			self.set(self.parser(value));
		else
			self.get(self.attrd('jc-path'))(self);
	};

	self.make = function() {
		self.event('click', self.click);
		var enter = self.attrd('enter');
		enter && $(enter === '?' ? self.scope : enter).on('keydown', 'input', function(e) {
			e.which === 13 && setTimeout(function() {
				!self.element.get(0).disabled && self.click();
			}, 100);
		});
	};
});