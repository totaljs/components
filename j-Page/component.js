COMPONENT('page', function(self) {

	var isProcessed = false;
	var isProcessing = false;

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.setter = function(value) {

		if (isProcessing)
			return;

		var is = self.attrd('if') == value;
		var reload = self.attrd('reload');

		if (isProcessed || !is) {
			self.toggle('hidden', !is);
			is && reload && self.get(reload)();
			self.release(!is);
			return;
		}

		SETTER('loading', 'show');
		isProcessing = true;

		IMPORT(self.attrd('template'), self.element, function() {
			isProcessing = false;

			var init = self.attrd('init');
			if (init) {
				var fn = GET(init || '');
				typeof(fn) === 'function' && fn(self);
			}

			reload && self.get(reload)();
			isProcessed = true;

			setTimeout(function() {
				self.toggle('hidden', !is);
			}, 200);

			SETTER('loading', 'hide', 1000);
		});
	};
});