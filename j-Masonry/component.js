COMPONENT('masonry', 'lg:25;md:33.33;sm:50;xs:100', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container;
	var display = WIDTH();

	self.readonly();

	self.make = function() {

		var scr = self.find('script');
		self.aclass(cls);
		self.template = Tangular.compile(scr.html());
		scr.remove();

		ON('resize + resize2', function() {
			var d = WIDTH();
			if (d !== display) {
				display = d;
				self.refresh();
			}
		});

		self.append('<div class="{0}-items"></div><div class="clearfix"></div>'.format(cls));
		container = self.find(cls2 + '-items');
	};

	self.setter = function(value) {

		if (!value) {
			container.empty();
			return;
		}

		var columns = [];
		var w = config[display];
		var count = (100 / w) >> 0;
		var counter = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			var index = i % count;
			var data = { value: item, index: counter[index] || 0, column: index, counter: i };
			if (columns[index]) {
				columns[index] += self.template(data);
				counter[index]++;
			} else {
				counter[index] = 1;
				columns[index] = self.template(data);
			}
		}

		var builder = [];
		for (var i = 0; i < columns.length; i++) {
			var html = columns[i];
			builder.push('<section style="width:{0}%">{1}</section>'.format(w, html));
		}

		container.html(builder.join(''));
	};

});