COMPONENT('idletime', 'count:300', function(self, config) {

	var is = false;
	var count = 0;
	var countfocus = 0;
	var interval;
	var interval_rebind;
	var ticks;
	var rebinded = false;
	var $W = $(W);

	self.singleton();
	self.readonly();

	function rebind() {

		if (is) {
			EMIT('idletime', false);
			self.path && self.set(false);
		}

		is = false;
		countfocus = 0;
		count = 0;
		unbind();
		interval_rebind && clearTimeout(interval_rebind);
		interval_rebind = setTimeout(rebind2, config.count * 100);
	}

	function rebind2() {
		if (!rebinded) {
			$W.on('mousemove mousewheel click keyup touchstart focus scroll pageshow', rebind);
			rebinded = true;
		}
	}

	function unbind() {
		if (rebinded) {
			$W.off('mousemove mousewheel click keyup touchstart focus scroll pageshow', rebind);
			rebinded = false;
		}
	}

	self.destroy = function() {
		interval_rebind && clearTimeout(interval_rebind);
		clearInterval(interval);
		interval = null;
		unbind();
	};

	self.make = function() {

		$(document).on('visibilitychange', function() {
			var now = Date.now();
			if (document.hidden) {
				ticks = now;
			} else {
				var diff = Math.ceil((now - ticks) / 1000);
				if (diff >= config.count) {
					rebind();
					setTimeout(() => EMIT('reload'), 500);
				}
				ticks = now;
			}
		});

		rebind2();
		interval = setInterval(function() {

			if (document.hasFocus())
				countfocus = 0;
			else
				countfocus++;

			if ((count > config.count || countfocus > config.count) && !is) {
				is = true;
				self.path && self.set(is);
				EMIT('idletime', is);
			} else
				count++;

		}, 1000);
	};
});
