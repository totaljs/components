COMPONENT('packeta', function(self) {

	self.singleton();
	self.show = function(opt) {

		if (typeof(W.Packeta) === 'undefined' || typeof(Packeta.Widget) === 'undefined')
			throw new Error('Packeta is not loaded.');

		Packeta.Widget.pick(null, function(point) {
			if (point) {
				if (opt.callback)
					opt.callback(point);
			}
		});

	};

}, ['https://widget.packeta.com/v6/www/js/library.js']);