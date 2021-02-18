COMPONENT('backtotop', 'icon:fa fa-arrow-circle-up', function(self, config, cls) {

	var visible = false;
	var timeout = null;
	var $W;

	self.singleton();
	self.nocompile && self.nocompile();

	self.onscroll = function() {
		timeout = null;
		var position = $W.scrollTop();
		if (position > WH) {
			if (visible)
				return;
			visible = true;
		} else {
			if (!visible)
				return;
			visible = false;
		}
		self.tclass('active', visible);
	};

	self.make = function() {

		self.aclass(cls);
		self.html('<span><i class="{0}"></i></span>'.format(self.faicon(config.icon)));

		self.event('click', function() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		});

		$W = $(W);

		$W.on('scroll', function() {
			timeout && clearTimeout(timeout);
			timeout = setTimeout(self.onscroll, 200);
		});
	};

});