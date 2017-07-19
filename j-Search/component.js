COMPONENT('search', function(self) {

	var options_class;
	var options_selector;
	var options_attribute;
	var options_delay;

	self.readonly();
	self.make = function() {
		options_class = self.attrd('class') || 'hidden';
		options_selector = self.attrd('selector');
		options_attribute = self.attrd('attribute') || 'data-search';
		options_delay = (self.attrd('delay') || '200').parseInt();
	};

	self.setter = function(value) {

		if (!options_selector || !options_attribute || value == null)
			return;

		KEYPRESS(function() {

			var elements = self.find(options_selector);

			if (!value) {
				elements.removeClass(options_class);
				return;
			}

			var search = value.toSearch();
			var hide = [];
			var show = [];

			elements.toArray().waitFor(function(item, next) {
				var el = $(item);
				var val = (el.attr(options_attribute) || '').toSearch();
				if (val.indexOf(search) === -1)
					hide.push(el);
				else
					show.push(el);
				setTimeout(next, 3);
			}, function() {

				hide.forEach(function(item) {
					item.toggleClass(options_class, true);
				});

				show.forEach(function(item) {
					item.toggleClass(options_class, false);
				});
			});

		}, options_delay, 'search' + self.id);
	};
});