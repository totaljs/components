COMPONENT('sticker', function(self) {

	var ca = null;
	var cb = null;
	var enabled = false;
	var is = false;
	var ready = false;
	var top = 0;
	var events = {};
	var raf = W.requestAnimationFrame ? W.requestAnimationFrame : function(cb) { cb(); };

	self.readonly();

	function parentscroll(node) {
		return node ? (node.scrollHeight > node.clientHeight ? node : parentscroll(node.parentNode)) : null;
	}

	self.configure = function(key, value) {
		switch (key) {
			case 'on':
				ca = value;
				break;
			case 'off':
				cb = value;
				break;
		}
	};

	events.onscroll = function() {
		raf(self.toggle);
	};

	events.bind = function() {
		$(self.container.tagName === 'HTML' ? W : self.container).on('scroll', events.onscroll);
	};

	self.destroy = function() {
		$(self.container.tagName === 'HTML' ? W : self.container).off('scroll', events.onscroll);
	};

	self.resize = function() {

		if (self.hclass(ca))
			return;

		ready = false;

		WAIT(function() {
			top = self.element.offset().top;
			return top > 0;
		}, function() {
			ready = true;
			setTimeout(self.toggle, 500);
		});
	};

	self.make = function() {
		self.container = parentscroll(self.dom);
		if (self.container) {
			self.resize();
			events.bind();
		} else
			setTimeout(self.make, 500);
	};

	self.toggle = function() {

		if (!ready)
			return;

		var el = self.element;

		if (!top || !self.dom.parentNode) {
			ca && el.rclass(ca);
			cb && el.aclass(cb);
			return;
		}

		var y = W.pageYOffset || self.container.scrollTop;
		is = y >= top;
		if (is) {
			if (!enabled) {
				ca && el.rclass(ca);
				cb && el.aclass(cb);
				enabled = true;
			}
		} else if (enabled) {
			cb && el.rclass(cb);
			ca && el.aclass(ca);
			enabled = false;
		}
	};
});