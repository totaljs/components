COMPONENT('iframe', 'margin:0;parent:window;scrollbar:0;left:0;right:0;top:0;bottom:0', function(self, config, cls) {

	var iframe;
	var size;

	self.make = function() {
		self.aclass(cls);
		self.append('<iframe frameborder="0" scrolling="' + (config.scrollbar ? 'yes' : 'no') + '" allowtransparency="true" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *" style="width:100%"></iframe>');
		iframe = self.find('iframe');
		self.on('resize + resize2', self.resize);
		self.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {
		var parent = self.parent(config.parent);
		var h = parent.height() - config.margin;

		if (size != h) {
			size = h;
			var css = {};
			css.height = h;

			if (config.position === 'absolute') {
				css.position = 'absolute';
				if (config.top)
					css.top = config.top;
				if (config.right)
					css.right = config.right;
				if (config.left)
					css.left = config.left;
			}

			iframe.css(css);
		}
	};

	self.setter = function(value) {
		iframe.attr('src', value || 'about:blank');
	};

});