COMPONENT('serverlisting', 'pages:3', function(self, config) {

	var container, paginate;
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

		self.aclass('ui-serverlisting');
		self.html('<div class="ui-serverlisting-container"></div><div class="ui-serverlisting-paginate"></div>');
		container = self.find('.ui-serverlisting-container');
		paginate = self.find('.ui-serverlisting-paginate');
		paginate.on('click', 'button', function() {

			var index = $(this).attrd('index');
			var meta = self.get();

			switch (index) {
				case '+':
					index = meta.page + 1;
					if (index > meta.pages)
						index = 1;
					break;
				case '-':
					index = meta.page - 1;
					if (index < 1)
						index = meta.pages;
					break;
				default:
					index = +index;
					break;
			}

			EXEC(config.paginate, index);
		});
	};

	self.setter = function(value) {

		if (!value) {
			container.empty();
			paginate.empty();
			self.aclass('hidden');
			return;
		}

		var builder = [];
		var g = { count: value.count, page: value.page, pages: value.pages };

		for (var i = 0; i < value.items.length; i++) {
			g.index = i;
			builder.push(self.template(value.items[i], g));
		}

		container.html(layout ? layout({ page: value.page, pages: value.pages, body: builder.join(''), count: value.count }) : builder.join(''));

		var half = Math.ceil(config.pages / 2);
		var page = value.page;
		var pages = value.pages;
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
			pfrom = pages - config.pages;
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
			builder = [];
			builder.push(template.format('-', 'left'));

			for (var i = pfrom; i < pto + 1; i++)
				builder.push('<button class="ui-serverlisting-page" data-index="{0}">{0}</button>'.format(i));

			builder.push(template.format('+', 'right'));
			paginate.html(builder.join(''));

		} else {

			var max = half * 2 + 1;
			var cur = (pto - pfrom) + 1;

			if (max > cur && pages > config.pages && pfrom > 1)
				pfrom--;

			paginate.find('.ui-serverlisting-page[data-index]').each(function(index) {
				var page = pfrom + index;
				$(this).attrd('index', page).html(page);
			});
		}

		paginate.find('.selected').rclass('selected');
		paginate.find('.ui-serverlisting-page[data-index="{0}"]'.format(value.page)).aclass('selected');
		paginate.tclass('hidden', value.pages < 2);
		self.tclass('hidden', value.count === 0);
	};

});