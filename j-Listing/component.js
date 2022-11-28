COMPONENT('listing', 'pages:3;count:20;scrolltop:1;margin:0;pluralizeitems:# items,# item,# items,# items;pluralizepages:# pages,# page,# pages,# pages', function(self, config, cls) {

	var container, paginate, current, items, pages = 0;
	var cls2 = '.' + cls;
	var layout;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {

		self.find('script').each(function(index) {
			var T =  Tangular.compile(this.innerHTML);
			if (index)
				layout = T;
			else
				self.template = T;
		});

		self.aclass(cls);
		self.html('<div class="{0}-scrollbar"><div class="{0}-container"></div></div><div class="{0}-paginate"><div class="{0}-info"></div><div class="{0}-buttons"></div></div>'.format(cls));
		container = self.find(cls2 + '-container');
		paginate = self.find(cls2 + '-paginate');
		paginate.on('click', 'button', function() {
			var index = $(this).attrd('index');
			switch (index) {
				case '+':
					index = current + 1;
					if (index > pages)
						index = 1;
					break;
				case '-':
					index = current - 1;
					if (index < 1)
						index = pages;
					break;
				default:
					index = +index;
					break;
			}
			self.page(index);
		});

		if (config.parent || config.height) {
			self.aclass(cls + '-fixed');
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { shadow: config.scrollbarshadow, visibleY: 1, orientation: 'y' });
		}

		self.resize2();
		self.on('resize + resize2', self.resize2);
	};

	self.resize2 = function() {
		setTimeout2(self.ID, self.resize, 300);
	};

	self.resize = function() {
		var p = config.parent || config.height;
		if (p) {

			var margin = config.margin;
			var responsivemargin = config['margin' + WIDTH()];

			if (responsivemargin != null)
				margin = responsivemargin;

			var parent = self.parent(p);
			var height = parent.height() - margin - paginate.height() - 11; // 10 is padding + 1 border
			self.find(cls2 + '-scrollbar').css('height', height);
			self.scrollbar.resize();
		}
	};

	self.page = function(index) {

		var builder = [];
		var arr = items.takeskip(config.count, (index - 1) * config.count);
		var g = { count: items.length, page: index, pages: pages };

		for (var i = 0; i < arr.length; i++) {
			g.index = i;
			builder.push(self.template(arr[i], g));
		}

		current = index;
		self.paginate(items.length, index);
		container.html(layout ? layout({ page: index, pages: pages, body: builder.join(''), count: items.length }) : builder.join(''));
	};

	self.paginate = function(count, page) {

		var max = config.pages;
		var half = Math.ceil(max / 2);

		pages = Math.ceil(count / config.count);

		var pfrom = page - half;
		var pto = page + half;
		var plus = 0;

		if (pfrom <= 0) {
			plus = Math.abs(pfrom);
			pfrom = 1;
			pto += plus;
		}

		if (pto >= pages) {
			pto = pages;
			pfrom = pages - max;
		}

		if (pfrom <= 0)
			pfrom = 1;

		if (page < half + 1) {
			pto++;
			if (pto > pages)
				pto--;
		}

		if (page < 2) {
			var template = '<button data-index="{0}"><i class="ti ti-caret-{1}"></i></button>';
			var builder = [];
			builder.push(template.format('-', 'left'));

			for (var i = pfrom; i < pto + 1; i++)
				builder.push('<button class="{1}-page" data-index="{0}">{0}</button>'.format(i, cls));

			builder.push(template.format('+', 'right'));
			paginate.find(cls2 + '-buttons').html(builder.join(''));
		} else {

			var max = half * 2 + 1;
			var cur = (pto - pfrom) + 1;

			if (max > cur && pages > config.pages && pfrom > 1)
				pfrom--;

			paginate.find(cls2 + '-page[data-index]').each(function(index) {
				var page = pfrom + index;
				$(this).attrd('index', page).html(page);
			});
		}

		paginate.find(cls2 + '-info').html(pages ? (pages.pluralize(config.pluralizepages) + ' / ' + items.length.pluralize(config.pluralizeitems)) : '');
		paginate.find('.selected').rclass('selected');
		paginate.find(cls2 + '-page[data-index="{0}"]'.format(page)).aclass('selected');
		paginate.tclass('hidden', pages < 2 && !self.scrollbar);

		self.tclass('hidden', count === 0);

		if (config.scrolltop) {
			if (self.scrollbar)
				self.scrollbar.scrollTop(0);
			else
				$(W).scrollTop(self.element.position().top - 50);
		}
	};

	self.setter = function(value) {
		if (value) {
			items = value;
			self.page(1);
		} else {
			items = null;
			container.empty();
			paginate.find(cls2 + '-buttons').empty();
			paginate.find(cls2 + '-info').aclass('hidden');
		}
	};
});