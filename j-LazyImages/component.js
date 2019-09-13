COMPONENT('lazyimages', function(self) {

	var is = null;
	var regtest = /[?./]/;

	self.readonly();
	self.singleton();

	self.make = function() {
		is = true;
		$(W).on('scroll', self.refresh);
		setTimeout(self.refresh, 1000);
	};

	self.refresh = function() {
		setTimeout2(self.id, self.prepare, 200);
	};

	self.released = self.refresh;
	self.setter = self.refresh;

	self.prepare = function() {
		var scroll = $(W).scrollTop();
		var beg = scroll;
		var end = beg + WH;
		var off = 50;
		var arr = document.querySelectorAll('img[data-src]');
		for (var i = 0; i < arr.length; i++) {
			var t = arr[i];
			if (!t.$lazyload) {
				var src = t.getAttribute('data-src');
				if (src && regtest.test(src)) {
					var el = $(t);
					var top = (is ? 0 : scroll) + el.offset().top;
					if ((top + off) >= beg && (top - off) <= end) {
						t.setAttribute('src', src);
						t.$lazyload = true;
						t.removeAttribute('data-src');
					}
				}
			}
		}
	};
});