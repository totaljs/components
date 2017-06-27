COMPONENT('splashscreen', function(self) {
	self.readonly();
	self.make = function() {
		self.classes('+ui-splashscreen');
		self.html('<div><div class="ui-splashscreen-body">{0}</div></div>'.format(self.find('script').html()));
		setTimeout(function() {
			self.classes('+ui-splashscreen-animate');
		}, 100);
		setTimeout(function() {
			self.classes('+ui-splashscreen-removing');
			setTimeout(function() {
				self.remove();
			}, 500);
		}, (+self.attr('data-timeout')) || 2500);
	};
});