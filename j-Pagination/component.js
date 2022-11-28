COMPONENT('pagination', 'pages:# pages,# page,# pages,# pages;items:# items,# item,# items,# items', function(self, config, cls) {

	var cachePages = 0;
	var cacheCount = 0;
	var nav;
	var info;

	self.template = Tangular.compile('<span class="page{{ if selected }} selected{{ fi }}" data-page="{{ page }}">{{ page }}</span>');
	self.nocompile && self.nocompile();
	self.readonly();

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.append('<div></div><nav></nav>');
		nav = self.find('nav');
		info = self.find('div');

		self.event('click', '.page', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var el = $(this);
			self.find('.selected').rclass('selected');
			self.page && self.page(+el.attrd('page'), el);
		});
	};

	self.configure = function(key, value, init) {
		!init && self.refresh();
	};

	self.page = function(page, el) {
		config.exec && self.SEEX(config.exec, page, el);
	};

	self.getPagination = function(page, pages, max, fn) {

		var half = Math.ceil(max / 2);
		var pageFrom = page - half;
		var pageTo = page + half;
		var plus = 0;

		if (pageFrom <= 0) {
			plus = Math.abs(pageFrom);
			pageFrom = 1;
			pageTo += plus;
		}

		if (pageTo >= pages) {
			pageTo = pages;
			pageFrom = pages - max;
		}

		if (pageFrom <= 0)
			pageFrom = 1;

		if (page < half + 1) {
			pageTo++;
			if (pageTo > pages)
				pageTo--;
		}

		for (var i = pageFrom; i < pageTo + 1; i++)
			fn(i);
	};

	self.getPages = function(length, max) {
		var pages = (length - 1) / max;
		if (pages % max !== 0)
			pages = Math.floor(pages) + 1;
		if (pages === 0)
			pages = 1;
		return pages;
	};

	self.setter = function(value) {

		// value.page   --> current page index
		// value.pages  --> count of pages
		// value.count  --> count of items in DB

		self.tclass('hidden', value == null);

		if (!value)
			return;

		var is;

		if (config.nopages) {
			is = value.pages < 2;
			self.tclass('hidden', is);
			if (is)
				return;
		}

		is = false;

		if (value.pages !== undefined) {
			if (value.pages !== cachePages || value.count !== cacheCount) {
				cachePages = value.pages;
				cacheCount = value.count;
				is = true;
			}
		}

		var builder = [];

		if (cachePages > 2) {
			var prev = value.page - 1;
			if (prev <= 0)
				prev = cachePages;
			builder.push('<span class="page" data-page="{0}"><i class="ti ti-chevron-left"></i></span>'.format(prev));
		}

		var max = config.max || 8;

		self.getPagination(value.page, cachePages, max, function(index) {
			builder.push(self.template({ page: index, selected: value.page === index }));
		});

		if (cachePages > 2) {
			var next = value.page + 1;
			if (next > cachePages)
				next = 1;
			builder.push('<span class="page" data-page="{0}"><i class="ti ti-chevron-right"></i></span>'.format(next));
		}

		nav.html(builder.join('')).tclass('hidden', builder.length <= 0);

		if (is) {
			var pluralize_pages = [cachePages];
			var pluralize_items = [cacheCount];
			pluralize_pages.push.apply(pluralize_pages, (config.pages || '').split(',').trim());
			pluralize_items.push.apply(pluralize_items, (config.items || '').split(',').trim());
			info.empty().append(Tangular.helpers.pluralize.apply(value, pluralize_pages) + ' / ' + Tangular.helpers.pluralize.apply(value, pluralize_items));
			self.tclass('hidden', cachePages < 1);
		}
	};
});