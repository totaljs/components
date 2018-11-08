COMPONENT('backtotop', function(self) {

	var height = 0;
	var visible = false;

	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {

		var $w = $(window);

		self.aclass('ui-backtotop');
		self.html('<a href="javascript:void(0)"><i class="fa fa-arrow-circle-up"></i></a>');

		self.event('click', function() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		});

		height = $w.height();

		$w.on('resize', function() {
			height = $w.height();
		});

		$w.on('scroll', function() {
			setTimeout2(self.id, function() {
				var position = $w.scrollTop();
				if (position > height) {
					if (visible)
						return;
					visible = true;
				} else {
					if (!visible)
						return;
					visible = false;
				}
				self.tclass('active', visible);
			}, 200);
		});
	};
});