COMPONENT('restart', 'url:?reload=1;top:75;right:20', function(self, config, cls) {

	self.singleton();

	let is = false;
	let html;

	self.make = function() {

		let css = {};

		if (config.top)
			css.top = config.top + 'px';

		if (config.bottom)
			css.bottom = config.bottom + 'px';

		if (config.right)
			css.right = config.right + 'px';

		if (config.left)
			css.left = config.left + 'px';

		self.aclass('hidden ' + cls);
		self.css(css);
		html = self.html();
		self.empty();

	};

	self.setter = function(value) {
		if (!is && value) {
			is = true;
			self.html('<a href="{0}">{1}</a>'.format(config.url, html));
			self.rclass('hidden');
		}
	};
});
