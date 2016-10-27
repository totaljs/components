COMPONENT('page', function() {
	var self = this;
	var isProcessed = false;
	var isProcessing = false;

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.setter = function(value) {

		if (isProcessing)
			return;

		var el = self.element;
		var is = el.attr('data-if') == value;
		var reload = self.attr('data-reload');

		if (isProcessed || !is) {
			el.toggleClass('hidden', !is);
			is && reload && self.get(reload)();
			return;
		}

		SETTER('loading', 'show');
		isProcessing = true;

		INJECT(el.attr('data-template'), el, function() {
			isProcessing = false;

			var init = el.attr('data-init');
			if (init) {
				var fn = GET(init || '');
				typeof(fn) === 'function' && fn(self);
			}

			reload && self.get(reload)();
			isProcessed = true;
			setTimeout(function() {
				el.toggleClass('hidden', !is);
			}, 200);
			SETTER('loading', 'hide', 1000);
		});
	};
});