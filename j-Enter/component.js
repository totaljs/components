COMPONENT('enter', function(self) {
	self.readonly();
	self.make = function() {
		self.event('keydown', 'input', function(e) {
			e.which === 13 && MAIN.can(self.path) && EXEC(self.attrd('enter'));
		});
	};
});