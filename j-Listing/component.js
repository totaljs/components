COMPONENT('listing', 'pages:3;count:20', function(self, config) {

	var container, paginate, current, items, pages = 0;
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

		self.aclass('ui-listing');
		self.html('<div class="ui-listing-container"></div><div class="ui-listing-paginate"></div>');
		container = self.find('.ui-listing-container');
		paginate = self.find('.ui-listing-paginate');
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
			var template = '<button data-index="{0}"><i class="fa fa-caret-{1}"></i></button>';
			var builder = [];
			builder.push(template.format('-', 'left'));

			for (var i = pfrom; i < pto + 1; i++)
				builder.push('<button class="ui-listing-page" data-index="{0}">{0}</button>'.format(i));

			builder.push(template.format('+', 'right'));
			paginate.html(builder.join(''));
		} else {

			var max = half * 2 + 1;
			var cur = (pto - pfrom) + 1;

			if (max > cur && pages > config.pages && pfrom > 1)
				pfrom--;

			paginate.find('.ui-listing-page[data-index]').each(function(index) {
				var page = pfrom + index;
				$(this).attrd('index', page).html(page);
			});

		}

		paginate.find('.selected').rclass('selected');
		paginate.find('.ui-listing-page[data-index="{0}"]'.format(page)).aclass('selected');
		paginate.tclass('hidden', pages < 2);
		self.tclass('hidden', count === 0);
	};

	self.setter = function(value) {
		if (value) {
			items = value;
			self.page(1);
		} else {
			items = null;
			container.empty();
			paginate.empty();
		}
	};
});