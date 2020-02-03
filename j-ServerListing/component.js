COMPONENT('serverlisting', 'pages:3;scrolltop:1;margin:0', function(self, config, cls) {

	var container, paginate;
	var layout;
	var cls2 = '.' + cls;

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
		self.html('<div class="{0}-scrollbar"><div class="{0}-container"></div></div><div class="{0}-paginate"></div>'.format(cls));
		container = self.find(cls2 + '-container');
		paginate = self.find(cls2 + '-paginate');
		paginate.on('click', 'button', function() {

			var index = $(this).attrd('index');
			var meta = self.get();
			var current = meta.page;

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

			if (current !== index)
				EXEC(self.makepath(config.paginate), index);

		});

		if (config.parent || config.height) {
			self.aclass(cls + '-fixed');
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: 1, orientation: 'y' });
		}

		self.resize2();
		self.on('resize', self.resize2);
		$(W).on('resize', self.resize2);
	};

	self.destroy = function() {
		$(W).off('resize', self.resize2);
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

	self.setter = function(value, path, type) {

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
				builder.push('<button class="{0}-page" data-index="{1}">{1}</button>'.format(cls, i));

			builder.push(template.format('+', 'right'));
			paginate.html(builder.join(''));

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

		paginate.find('.selected').rclass('selected');
		paginate.find(cls2 + '-page[data-index="{0}"]'.format(value.page)).aclass('selected');
		paginate.tclass('hidden', value.pages < 2 && !self.scrollbar);
		self.tclass('hidden', value.count === 0);

		if (type && config.scrolltop) {
			if (self.scrollbar)
				self.scrollbar.scrollTop(0);
			else
				$(W).scrollTop(self.element.position().top - 50);
		}
	};

});