COMPONENT('markdownpreview', 'showsecret:Show secret data;hidesecret:Hide secret data', function(self, config, cls) {

	var cls2  = '.' + cls;
	var elcache;
	var elbody;

	self.bindvisible();
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		if (!config.html) {
			self.append('<div class="{0}-body"></div><div class="{0}-cache hidden"></div>'.format(cls));
			elcache = self.find(cls2 + '-cache');
			elbody = self.find(cls2 + '-body');
		}
	};

	self.redraw = function(el) {
		FUNC.markdownredraw(el); // part of j-Markdown
	};

	self.setter = function(value) {

		if (config.html) {
			self.redraw(self.element);
			return;
		}

		// Waits for markdown component
		if (!String.prototype.markdown) {
			setTimeout(self.setter, 500, value);
			return;
		}

		var cache = {};
		var html = (value || '').markdown();
		var vdom = $(html);

		elcache.empty();

		elbody.find('.code').each(function(index) {
			var t = this;
			var checksum = t.getAttribute('data-checksum') + '_' + index;
			cache[checksum] = t;
			elcache[0].appendChild(t);
		});

		elbody.find('img').each(function(index) {
			var t = this;
			var checksum = t.getAttribute('data-checksum') + '_' + index;
			cache[checksum] = t;
			elcache[0].appendChild(t);
		});

		vdom.find('.code').each(function(index) {
			var t = this;
			var h = 'code' + HASH(t.outerHTML, true) + '_' + index;
			if (cache[h])
				$(t).replaceWith(cache[h]);
			else
				t.setAttribute('data-checksum', h);
		}).rclass('hidden');

		vdom.find('img').each(function(index) {
			var t = this;
			var h = 'img' + HASH(t.outerHTML, true) + '' + index;
			if (cache[h])
				$(t).replaceWith(cache[h]);
			else
				t.setAttribute('data-checksum', h);
		});

		elbody.html(vdom);
		self.redraw(elbody);
		config.render && self.EXEC(config.render, elbody);
	};

	self.readingtime = function() {
		var arr = self.find('h1,h2,h3,h4,h5,p,li');
		var sum = 0;
		for (var i = 0; i < arr.length; i++) {
			var text = $(arr[i]).text();
			var words = text.split(' ');
			for (var j = 0; j < words.length; j++) {
				var word = words[j];
				sum += (word.length * 0.650) / 10; // Reading time for 10 characters word is 450 ms
			}
		}
		return (sum / 60) >> 0;
	};

});

