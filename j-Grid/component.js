COMPONENT('grid', 'filter:true;external:false;filterlabel:Filtering values ...;boolean:true|on|yes;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;pagination:false', function(self, config) {

	var tbody, thead, tbodyhead, container, pagination;
	var options = { columns: {}, items: [], indexer: 0, filter: {} };
	var isFilter = false;
	var ppages, pitems, cache, eheight;

	self.template = Tangular.compile('<td data-index="{{ index }}"{{ if $.class }} class="{{ $.class }}"{{ fi }}><div class="wrap{{ if align }} {{ align }}{{ fi }}"{{ if background }} style="background-color:{{ background }}"{{ fi }}>{{ value | raw }}</div></td>');
	self.options = options;
	self.readonly();

	self.make = function() {

		var meta = self.find('script').html();
		self.aclass('ui-grid-container');
		self.html('<div class="ui-grid"><table class="ui-grid-header"><thead></thead></table><div class="ui-grid-scroller"><table class="ui-grid-data"><thead></thead><tbody></tbody></table></div></div>' + (config.pagination ? '<div class="ui-grid-footer"><div class="ui-grid-meta"></div><div class="ui-grid-pagination"><button class="ui-grid-button" name="first"><i class="fa fa-angle-double-left"></i></button><button class="ui-grid-button" name="prev"><i class="fa fa-angle-left"></i></button><div class="page"><input type="text" maxlength="5" class="ui-grid-input" /></div><button class="ui-grid-button" name="next"><i class="fa fa-angle-right"></i></button><button class="ui-grid-button" name="last"><i class="fa fa-angle-double-right"></i></button></div><div class="ui-grid-pages"></div></div></div>' : ''));

		var body = self.find('.ui-grid-data');
		tbody = $(body.find('tbody').get(0));
		tbodyhead = $(body.find('thead').get(0));
		thead = $(self.find('.ui-grid-header').find('thead').get(0));
		container = $(self.find('.ui-grid-scroller').get(0));
		pagination = config.pagination ? VIRTUALIZE(self.find('.ui-grid-footer'), { page: 'input', first: 'button[name="first"]', last: 'button[name="last"]', prev: 'button[name="prev"]', next: 'button[name="next"]', meta: '.meta', pages: '.pages' }) : null;
		meta && self.meta(meta);
		config.init && EXEC(config.init);

		self.event('click', '.ui-grid-columnsort', function() {
			var obj = {};
			obj.columns = options.columns;
			obj.column = options.columns[+$(this).attr('data-index')];
			self.sort(obj);
		});

		self.event('change', '.ui-grid-filter', function() {
			var el = $(this).parent();
			if (this.value)
				options.filter[this.name] = this.value;
			else
				delete options.filter[this.name];
			el.tclass('ui-grid-selected', this.value ? true : false);
			self.filter();
		});

		self.event('change', 'input', function() {
			this.type === 'checkbox' && config.checked && GET(config.checked).call(self, this, self);
		});

		self.event('click', '.ui-grid-button', function() {
			switch (this.name) {
				case 'first':
					cache.page = 1;
					self.operation('pagination');
					break;
				case 'last':
					cache.page = cache.pages;
					self.operation('pagination');
					break;
				case 'prev':
					cache.page -= 1;
					self.operation('pagination');
					break;
				case 'next':
					cache.page += 1;
					self.operation('pagination');
					break;
			}
		});

		self.event('change', '.ui-grid-input', function() {
			var page = (+this.value) >> 0;
			if (isNaN(page) || page < 0 || page > cache.pages || page === cache.page)
				return;
			cache.page = page;
			self.operation('pagination');
		});

		self.on('resize', self.resize);
	};

	self.checked = function() {
		return self.find('input:checked');
	};

	self.meta = function(html) {
		switch (typeof(html)) {
			case 'string':
				options.columns = new Function('return ' + html.trim())();
				break;
			case 'function':
				options.columns = html(self);
				break;
			case 'object':
				options.columns = html;
				break;
		}

		for (var i = 0; i < options.columns.length; i++) {
			var column = options.columns[i];
			if (typeof(column.template) === 'string')
				column.template = column.template.indexOf('{{') === -1 ? new Function('a', 'b', 'return \'' + column.template + '\'') : Tangular.compile(column.template);
		}

		self.rebuild(true);
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'pluralizepages':
				ppages = value.split(',').trim();
				break;
			case 'pluralizeitems':
				pitems = value.split(',').trim();
				break;
		}
	};

	self.rebuild = function(init) {

		var data = ['<tr class="ui-grid-empty">'];
		var header = ['<tr>'];
		var filter = ['<tr>'];

		var size = 0;
		var columns = options.columns;
		var scrollbar = SCROLLBARWIDTH();

		for (var i = 0, length = columns.length; i < length; i++) {
			var col = columns[i];
			size += col.size || 1;
			col.sorting = null;
			if (typeof(col.render) === 'string')
				col.render = FN(col.render);
			if (typeof(col.header) === 'string')
				col.header = FN(col.header);
		}

		for (var i = 0, length = columns.length; i < length; i++) {
			var col = columns[i];
			var width = typeof(col.size) === 'string' ? col.size : ((((col.size || 1) / size) * 100).floor(2) + '%');
			data.push('<td style="width:{0}" data-index="{1}" class="{2}"></td>'.format(width, i, col.class ? ' ' + col.class : ''));
			header.push('<th class="ui-grid-columnname{3}{5}" style="width:{0};text-align:center" data-index="{1}" title="{6}" data-name="{4}"><div class="wrap"><i class="fa hidden"></i>{2}</div></th>'.format(width, i, col.header ? col.header(col) : (col.text || col.name), col.class ? ' ' + col.class : '', col.name, col.sort === false ? '' : ' ui-grid-columnsort', col.title || col.text || col.name));
			if (col.filter === false)
				filter.push('<th class="ui-grid-columnfilterempty ui-grid-columnfilter{1}" style="width:{0}">&nbsp;</th>'.format(width, col.class ? ' ' + col.class : ''));
			else
				filter.push('<th class="ui-grid-columnfilter{4}" style="width:{0}"><input type="text" placeholder="{3}" name="{2}" autocomplete="off" class="ui-grid-filter" /></th>'.format(width, i, col.name, col.filter || config.filterlabel, col.class ? ' ' + col.class : ''));
		}

		if (scrollbar) {
			header.push('<th class="ui-grid-columnname ui-grid-scrollbar" style="width:{0}px"></th>'.format(scrollbar));
			filter.push('<th class="ui-grid-columnfilterempty ui-grid-scrollbar ui-grid-columnfilter{1}" style="width:{0}px">&nbsp;</th>'.format(scrollbar, col.class ? ' ' + col.class : ''));
		}

		tbodyhead.html(data.join('') + '</tr>');
		thead.html(header.join('') + '</tr>' + (config.filter ? (filter.join('') + '</tr>') : ''));
		!init && self.refresh();
		isFilter = false;
		options.filter = {};
	};

	self.fill = function(count) {

		if (config.autosize === false)
			return;

		tbody.find('.emptyfill').remove();
		var builder = ['<tr class="emptyfill">'];

		var cols = options.columns;
		for (var i = 0, length = cols.length; i < length; i++) {
			if (!cols[i].hidden)
				builder.push('<td{0}>'.format(cols[i].class ? (' class="' + cols[i].class + '"') : '') + (i ? '' : '<div class="wrap">&nbsp;</div>') + '</td>');
		}

		builder.push('</tr>');
		builder = builder.join('');
		var buffer = [];
		for (var i = 0; i < count; i++)
			buffer.push(builder);
		tbody.append(buffer.join(''));
	};

	self.resize = function() {

		if (config.autosize === false)
			return;

		var value = options.items;
		var parent = self.parent();
		var height = parent.height() - (config.padding || 0);

		if (height === eheight)
			return;

		container.height(height - (config.pagination ? 124 : 74));
		eheight = height;

		var count = (height / 32) >> 0;
		if (count > value.length) {
			self.fill((count + 1) - value.length);
			container.aclass('ui-grid-noscroll');
		} else
			container.rclass('ui-grid-noscroll');
	};

	self.filter = function() {
		isFilter = Object.keys(options.filter).length > 0;
		!config.external && self.refresh();
		self.operation('filter');
	};

	self.operation = function(type) {
		config.exec && EXEC(config.exec, type, isFilter ? options.filter : null, options.lastsort ? options.lastsort : null, cache.page);
	};

	self.sort = function(data) {

		options.lastsortelement && options.lastsortelement.rclass('fa-caret-down fa-caret-up').aclass('hidden');

		if (data.column.sorting === 'desc') {
			options.lastsortelement.find('.fa').rclass('fa-caret-down fa-caret-up').aclass('hidden');
			options.lastsortelement = null;
			options.lastsort = null;
			data.column.sorting = null;

			if (config.external)
				self.operation('sort');
			else
				self.refresh();

		} else if (data.column) {
			data.column.sorting = data.column.sorting === 'asc' ? 'desc' : 'asc';
			options.lastsortelement = thead.find('th[data-name="{0}"]'.format(data.column.name)).find('.fa').rclass('hidden').tclass('fa-caret-down', data.column.sorting === 'asc').tclass('fa-caret-up', data.column.sorting === 'desc');
			options.lastsort = data.column;

			var name = data.column.name;
			var sort = data.column.sorting;


			!config.external && options.lastsort && options.items.quicksort(name, sort === 'asc');
			self.operation('sort');
			self.redraw();
		}
	};

	self.can = function(row) {

		var keys = Object.keys(options.filter);
		var cache = {};

		for (var i = 0; i < keys.length; i++) {

			var column = keys[i];
			var val = row[column];
			var filter = options.filter[column];
			var type = typeof(val);
			var val2 = cache[column];

			if (type === 'number') {

				if (val2 == null)
					val2 = cache[column] = self.parseNumber(filter);

				if (val2.length === 1 && val !== val2[0])
					return false;

				if (val < val2[0] || val > val2[1])
					return false;

			} else if (type === 'string') {

				if (val2 == null) {
					val2 = cache[column] = filter.split(/\/\|\\|\,/).trim();
					for (var j = 0; j < val2.length; j++)
						val2[j] = val2[j].toSearch();
				}

				var is = false;
				var s = val.toSearch();

				for (var j = 0; j < val2.length; j++) {
					if (s.indexOf(val2[j]) !== -1) {
						is = true;
						break;
					}
				}

				if (!is)
					return false;

			} else if (type === 'boolean') {
				if (val2 == null)
					val2 = cache[column] = config.boolean.indexOf(filter.replace(/\s/g, '')) !== -1;
				if (val2 !== val)
					return false;
			} else if (val instanceof Date) {

				val.setHours(0);
				val.setMinutes(0);

				if (val2 == null) {
					val2 = filter.trim().split(/\/|\||\\|\,/).trim();
					var arr = cache[column] = [];
					for (var j = 0; j < val2.length; j++) {
						var dt = val2[j].trim();
						var a = self.parseDate(dt);
						if (a instanceof Array) {
							arr.push(a[0]);
							if (j === val2.length - 1) {
								arr.push(a[1]);
								break;
							}
						} else
							arr.push(a);
					}
					val2 = arr;
				}

				if (val2.length === 1 && val.format('yyyyMMdd') !== val2[0].format('yyyyMMdd'))
					return false;
				if (val < val2[0] || val > val2[1])
					return false;
			} else
				return false;
		}

		return true;
	};

	self.parseDate = function(val) {
		var index = val.indexOf('.');
		if (index === -1) {
			if ((/[a-z]+/).test(val)) {
				var dt = DATETIME.add(val);
				return dt > DATETIME ? [DATETIME, dt] : [dt, DATETIME];
			}
			if (val.length === 4)
				return [new Date(+val, 1, 1), new Date(+val + 1, 1, 1)];
		} else if (val.indexOf('.', index + 1) === -1) {
			var a = val.split('.');
			return new Date(DATETIME.getFullYear(), +a[1] - 1, +a[0]);
		}
		index = val.indexOf('-');
		if (index !== -1 && val.indexOf('-', index + 1) === -1) {
			var a = val.split('-');
			return new Date(DATETIME.getFullYear(), +a[0] - 1, +a[1]);
		}
		return val.parseDate();
	};

	self.parseNumber = function(val) {
		var arr = [];
		var num = val.replace(/\s/g, '').replace(/\,/g, '.').split(/\/|\||\\/).trim();

		for (var i = 0, length = num.length; i < length; i++) {
			var n = num[i];
			arr.push(+n);
		}

		return arr;
	};

	self.reset = function() {
		options.filter = {};
		isFilter = false;
		thead.find('input').val('');
		thead.find('.ui-grid-selected').rclass('ui-grid-selected');
		options.lastsortelement && options.lastsortelement.rclass('fa-caret-down fa-caret-up');
		options.lastsortelement = null;
		if (options.lastsort)
			options.lastsort.sorting = null;
		options.lastsort = null;
	};

	self.redraw = function() {

		var items = options.items;
		var columns = options.columns;
		var builder = [];
		var m = {};

		for (var i = 0, length = items.length; i < length; i++) {
			builder.push('<tr class="ui-grid-row" data-index="' + i + '">');
			for (var j = 0, jl = columns.length; j < jl; j++) {
				var column = columns[j];
				var val = items[i][column.name];
				m.value = column.template ? column.template(items[i], column) : column.render ? column.render(val, column, items[i]) : val == null ? '' : (column.format ? val.format(column.format) : val);
				m.index = j;
				m.align = column.align;
				m.background = column.background;
				builder.push(self.template(m, column));
			}
			builder.push('</tr>');
		}

		tbody.html(builder.join(''));
		container.rclass('noscroll');

		eheight = 0;
		self.resize();
		setTimeout(self.resize, 500);
	};

	self.setter = function(value) {

		// value.items
		// value.limit
		// value.page
		// value.pages
		// value.count

		if (!value) {
			tbody.empty();
			self.resize();
			return;
		}

		cache = value;

		if (config.pagination) {
			pagination.prev.prop('disabled', value.page === 1);
			pagination.first.prop('disabled', value.page === 1);
			pagination.next.prop('disabled', value.page >= value.pages);
			pagination.last.prop('disabled', value.page === value.pages);
			pagination.page.val(value.page);
			pagination.meta.html(value.count.pluralize.apply(value.count, pitems));
			pagination.pages.html(value.pages.pluralize.apply(value.pages, ppages));
		}

		if (config.external) {
			options.items = value.items;
		} else {
			options.items = [];
			for (var i = 0, length = value.items.length; i < length; i++) {
				if (isFilter && !self.can(value.items[i]))
					continue;
				options.items.push(value.items[i]);
			}
			options.lastsort && options.items.quicksort(options.lastsort.name, options.lastsort.sorting === 'asc');
		}

		self.redraw();
	};
});