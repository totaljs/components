COMPONENT('aselected', 'selector:a;attr:href;class:selected;delay:300', function(self, config) {

	self.readonly();

	var timeoutid;

	self.make = function() {
		self.refresh();
		ON('location', self.refresh);
	};

	self.refresh = function() {
		timeoutid && clearTimeout(timeoutid);
		timeoutid = null;
		var arr = self.find(config.selector);
		var url = NAV.url;
		for (var i = 0; i < arr.length; i++) {
			var el = $(arr[i]);
			var href = el.attr(config.attr);
			var selected = config.strict ? url === href : url.length === 1 || href.length === 1 ? href === url : url.indexOf(href) === 0;
			el.tclass(config.class, selected);
		}
	};

	self.setter = function() {
		timeoutid && clearTimeout(timeoutid);
		timeoutid = setTimeout(self.refresh, config.delay);
	};

});