COMPONENT('grid', 'pagination:true;head:true;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items', function(self, config) {

	var tbody, thead, container, head, pagination = null;
	var options = { columns: [], items: [], head: '' };
	var ppages, pitems, cache = null;

	self.readonly();

	self.configure = function(key, value, init) {
		switch (key) {
			case 'head':
				!init && head.tclass('hidden', value === false);
				break;
			case 'pluralizepages':
				ppages = value.split(',').trim();
				break;
			case 'pluralizeitems':
				pitems = value.split(',').trim();
				break;
		}
	};

	self.make = function() {

		self.aclass('ui-grid-container');

		var reg = /<td.*?>/g;
		var meta = self.find('script').html();
		var cols = meta.match(reg);
		var index;

		for (var i = 0, length = cols.length; i < length; i++) {
			var item = cols[i];
			var col = {};
			index = item.indexOf('name="');
			col.name = (index === -1 ? '' : item.substring(index + 6, item.indexOf('"', index + 6))).trim();
			index = item.indexOf('text="');
			col.text = (index === -1 ? '' : item.substring(index + 6, item.indexOf('"', index + 6))).trim();
			index = item.indexOf('width="');
			col.width = (index === -1 ? '' : item.substring(index + 7, item.indexOf('"', index + 7))).trim();
			index = item.indexOf('align="');
			col.align = (index === -1 ? '' : item.substring(index + 7, item.indexOf('"', index + 7))).trim();
			index = item.indexOf('title="');
			col.title = (index === -1 ? '' : item.substring(index + 7, item.indexOf('"', index + 7))).trim();
			index = item.indexOf('icon="');
			col.icon = (index === -1 ? '' : item.substring(index + 6, item.indexOf('"', index + 6))).trim();
			index = item.indexOf('bg="');
			col.bg = (index === -1 ? '' : item.substring(index + 4, item.indexOf('"', index + 4))).trim();
			col.xs = item.indexOf('hidden-xs') === -1;
			col.sm = item.indexOf('hidden-sm') === -1;
			col.md = item.indexOf('hidden-md') === -1;
			col.lg = item.indexOf('hidden-lg') === -1;
			col.class = ((col.xs ? '' : ' hidden-xs') + (col.sm ? '' : ' hidden-sm') + (col.md ? '' : ' hidden-md') + (col.lg ? '' : ' hidden-lg')).trim();
			options.columns.push(col);
		}

		meta = meta.replace(reg, function(text) {
			return text.replace(/(name|width|title|align|bg)=\".*?\"/g, '').replace(/\s{2,}/g, ' ').replace(/\s\>/g, '>');
		});

		index = meta.indexOf('<tr');
		var tr = meta.substring(index, meta.indexOf('>') + 1);

		if (tr.indexOf('class') === -1)
			meta = meta.replace(tr, '<tr class="grid-row"' + tr.substring(3));
		else
			meta = meta.replace(tr, tr.replace('class="', 'class="grid-row '));

		self.template = Tangular.compile(meta);
		self.html('<div class="ui-grid"><div class="head"><table><thead></thead></table></div><div class="ui-grid-scroller"><table class="data"><tbody></tbody></table></div><div class="footer"><div class="meta"></div><div class="pagination"><button class="ui-grid-button" name="first"><i class="fa fa-angle-double-left"></i></button><button class="ui-grid-button" name="prev"><i class="fa fa-angle-left"></i></button><div class="page"><input type="text" maxlength="5" class="ui-grid-input" /></div><button class="ui-grid-button" name="next"><i class="fa fa-angle-right"></i></button><button class="ui-grid-button" name="last"><i class="fa fa-angle-double-right"></i></button></div><div class="pages"></div></div></div>');

		tbody = $(self.find('tbody').get(0));
		thead = $(self.find('thead').get(0));
		container = $(self.find('.ui-grid-scroller').get(0));
		head = self.find('.head');
		pagination = VIRTUALIZE(self.find('.footer'), { page: 'input', first: 'button[name="first"]', last: 'button[name="last"]', prev: 'button[name="prev"]', next: 'button[name="next"]', meta: '.meta', pages: '.pages' });

		config.head === false && head.aclass('hidden');

		self.event('click', '.ui-grid-button', function() {
			switch (this.name) {
				case 'first':
					EXEC(config.pageclick, 1);
					break;
				case 'last':
					EXEC(config.pageclick, cache.pages);
					break;
				case 'prev':
					var page = cache.page - 1;
					EXEC(config.pageclick, page > 0 ? page : cache.pages);
					break;
				case 'next':
					var page = cache.page + 1;
					EXEC(config.pageclick, page > cache.pages ? 1 : page);
					break;
			}
		});

		self.event('change', '.ui-grid-input', function() {
			var page = (+this.value) >> 0;
			if (isNaN(page) || page < 0 || page > cache.pages || page === cache.page)
				return;
			EXEC(config.pageclick, page);
		});

		self.event('click', 'th', function() {
			if (!config.columnclick)
				return;
			var obj = {};
			obj.columns = options.columns;
			obj.column = options.columns[+$(this).attr('data-index')];
			EXEC(config.columnclick, obj);
		});

		self.on('resize', self.resize);
	};

	self.resize = function() {

		if (config.autosize === false)
			return;

		var value = options.items;
		var parent = self.parent();
		var height = parent.height() - (config.padding || 0) - (config.offset ? self.element.offset().top : 0) - (config.head ? 40 : 0) - (config.pagination ? 55 : 0);

		container.height(height);
		var count = (height / (config.rowheight || 28)) >> 0;
		container.tclass('noscroll', count > value.length);
		!cache && config.init && EXEC(config.init, count, height);
	};

	self.setter = function(value) {

		if (!value) {
			self.aclass('hidden');
			return;
		}

		// value.items
		// value.limit
		// value.page
		// value.pages
		// value.count

		cache = value;

		pagination.prev.prop('disabled', value.page === 1);
		pagination.first.prop('disabled', value.page === 1);
		pagination.next.prop('disabled', value.page >= value.pages);
		pagination.last.prop('disabled', value.page === value.pages);

		pagination.page.val(value.page);
		pagination.meta.html(value.count.pluralize.apply(value.count, pitems));
		pagination.pages.html(value.pages.pluralize.apply(value.pages, ppages));

		var columns = options.columns;
		var builder = [];
		var header = [];

		builder.push('<tr class="empty">');
		for (var i = 0, length = columns.length; i < length; i++) {
			var column = columns[i];
			var width = column.width ? ('width:' + column.width + ';') : '';
			builder.push('<td style="{0}" data-index="{1}"{2}></td>'.format(width, i, column.class ? (' class="' + column.class + '"') : ''));
			header.push('<th style="{0}{4}{6}" data-index="{1}" title="{5}"{7}><div class="wrap">{3}{2}</div></th>'.format(width, i, column.text, (column.sort ? ('<i class="fa fa-sort-{0}"></i>'.format(column.sort)) : '') + (column.icon ? '<i class="fa fa-{0}"></i>'.format(column.icon) : ''), column.align ? ('text-align:' + column.align + ';') : '', column.title || column.text, column.bg ? ('background-color:' + column.bg) : '', column.class ? (' class="' + column.class + '"') : ''));
		}

		builder.push('</tr>');
		options.items = value.items;

		var model = {};

		for (var i = 0, length = value.items.length; i < length; i++) {
			model.index = i;
			builder.push(self.template(value.items[i], model));
		}

		var tmp = header.join('');

		if (tmp !== options.head) {
			options.head = tmp;
			thead.empty().append('<tr>{0}</tr>'.format(options.head));
		}

		tbody.empty().append(builder.join(''));
		container.rclass('noscroll');
		self.rclass('hidden');

		setTimeout(self.resize, 500);
	};
});