function Movements(element) {

	var self = this;
	var cache = {};
	var timeout = {};
	var move = false;
	var pinch = false;

	cache.zoom = 0;
	cache.x = 0;
	cache.y = 0;
	cache.delay = null;

	self.onZoom = function(e, value, x, y) {
	};

	self.onMove = function(e, x, y) {
	};

	self.onTap = function(e, x, y) {
	};

	$(element).on('wheel', function(e) {
		var y = e.originalEvent.deltaY;
		if (y === 0)
			return;
		cache.zoom += y * -1;
		self.onZoom && self.onZoom(e, cache.zoom, e.originalEvent.pageX, e.originalEvent.pageY);
		clearTimeout(timeout.zoom);
		timeout.zoom = setTimeout(function() {
			cache.zoom = 0;
		}, 500);
	});

	$(element).on('mousedown mouseup mousemove', function(e) {
		var x = e.pageX;
		var y = e.pageY;
		var t = e.type;

		if (t === 'mousedown') {
			move = true;
			cache.x = x;
			cache.y = y;
			return;
		}

		if (!move)
			return;

		if (t === 'mouseup') {
			move = false;
			return;
		}

		self.onMove && self.onMove(e, cache.x - x, cache.y - y);
	});

	$(element).on('dblclick', function(e) {
		self.onTap && self.onTap(e, e.pageX, e.pageY);
	});

	$(element).on('touchstart touchend touchmove', function(e) {

		var t = e.type;

		if (t === 'touchend') {
			move = false;
			pinch = false;
			return;
		}

		var touches = e.originalEvent.touches;
		var x = touches[0].pageX;
		var y = touches[0].pageY;
		var fingers = touches.length;

		if (pinch && fingers < 2) {
			pinch = false;
			move = false;
			return;
		} else if (fingers > 1) {
			if (!pinch) {
				pinch = true;
				cache.zoom = getPinch(touches);
			}
		} else
			pinch = false;

		if (t === 'touchstart') {
			cache.x = x;
			cache.y = y;

			var now = Date.now();

			if (cache.delay) {
				var diff = now - cache.delay;
				if (diff > 100 && diff < 700) {
					self.onTap && self.onTap(e, x, y);
					move = false;
					pinch = false;
					return;
				}
			}

			cache.delay = now;
			move = !pinch;
			return;
		}

		if (move) {
			self.onMove(e, cache.x - x, cache.y - y);
			return;
		}

		if (!pinch)
			return;

		self.onZoom && self.onZoom(e, cache.zoom - getPinch(touches), getCenterX(touches), getCenterY(touches));
		clearTimeout(timeout.zoom);
		timeout.zoom = setTimeout(function() {
			cache.zoom = 0;
		}, 500);
	});

	function getCenterX(touches) {
		var num = touches[0].pageX + (touches[0].pageX - touches[1].pageX) / 2;
		return isNaN(num) ? 0 : num;
	}

	function getCenterY(touches) {
		var num = touches[0].pageY + (touches[0].pageY - touches[1].pageY) / 2;
		return isNaN(num) ? 0 : num;
	}

	function getPinch(touches) {
		return (Math.sqrt(((touches[0].pageX - touches[1].pageX) * (touches[0].pageX - touches[1].pageX) + (touches[0].pageY - touches[1].pageY) * (touches[0].pageY - touches[1].pageY))) >> 0) * -1;
	}

	$(window).on('mouseleave', function() {
		if (move)
			move = false;
	});
}