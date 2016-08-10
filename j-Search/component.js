COMPONENT('search', function() {

	var self = this;
	var options_class;
	var options_selector;
	var options_attribute;
	var options_delay;

	self.readonly();
	self.make = function() {
		options_class = self.attr('data-class') || 'hidden';
		options_selector = self.attr('data-selector');
		options_attribute = self.attr('data-attribute') || 'data-search';
		options_delay = (self.attr('data-delay') || '200').parseInt();
	};

	self.setter = function(value) {

		if (!options_selector || !options_attribute)
			return;
       
		KEYPRESS(function() {

			var elements = self.element.find(options_selector);

			if (!value) {
				elements.removeClass(options_class);
				return;
			}

            var search = value.toLowerCase().replace(/y/gi, 'i');
      
			elements.toArray().waitFor(function(item, next) {
				var el = $(item);
				var val = (el.attr(options_attribute) || '').toLowerCase().replace(/y/gi, 'i');
				el.toggleClass(options_class, val.indexOf(search) === -1);
				setTimeout(next, 5);
			});

		}, options_delay, 'search' + self.id);
	};
});