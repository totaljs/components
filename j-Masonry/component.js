COMPONENT('masonry', 'lg:25;md:33.33;sm:50;xs:100', function(self, config, cls) {

	var cls2 = '.' + cls;
	var compilable = false;
	var display;
	var container;

	self.readonly();

	self.make = function() {

		var scr = self.find('script');
		self.aclass(cls);
		var html = scr.html();
		compilable = html.COMPILABLE();
		self.template = Tangular.compile(html);
		scr.remove();

		ON('resize + resize2', function() {
			var d = WIDTH(self.element);
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


		if (!display)
			display = WIDTH(self.element);

		var columns = [];
		var w = config[display];
		var count = (100 / w) >> 0;
		var counter = [];
		var builder = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			var index = i % count;
			var data = { value: item, index: counter[index] || 0, column: index, counter: i };

			if (config.vdom) {
				builder.push(self.template(data));
			} else {
				if (columns[index]) {
					columns[index] += self.template(data);
					counter[index]++;
				} else {
					counter[index] = 1;
					columns[index] = self.template(data);
				}
			}
		}


		if (!config.vdom) {
			for (var i = 0; i < columns.length; i++)
				builder.push('<section style="width:{0}%">{1}</section>'.format(w, columns[i]));
		}

		if (config.vdom) {

			var div = document.createElement('DIV');
			var children = container[0].children;

			for (var child of children) {
				while (child.children.length)
					div.appendChild(child.children[0]);
			}

			DIFFDOM($(div), config.vdom, builder.join(''), config.vdomattr);
			container[0].innerHTML = '';

			var cols = [];
			for (var i = 0; i < count; i++) {
				cols.push($('<section style="width:{0}%"></section>'.format(w)));
				container[0].appendChild(cols[i][0]);
			}

			var index = 0;
			while (div.children.length) {
				var item = div.children[0];
				if (item) {
					var col = cols[index];
					index++;
					if (index === cols.length)
						index = 0;
					col[0].appendChild(item);
				}
			}

		} else
			container.html(builder.join(''));

		compilable && self.compile();
	};

});