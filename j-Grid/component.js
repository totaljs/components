COMPONENT('grid', 'filter:true;external:false;fillcount:50;filterlabel:Filtering values ...;boolean:true|on|yes;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;pagination:false;rowheight:30', function(self, config) {

	var tbody, thead, tbodyhead, container, pagination;
	var options = { columns: {}, items: [], indexer: 0, filter: {} };
	var isFilter = false;
	var ppages, pitems, cache, eheight, wheight, scroll, filtercache, filled = false;

	self.template = Tangular.compile('<td data-index="{{ index }}"{{ if $.cls }} class="{{ $.cls }}"{{ fi }}><div class="wrap{{ if align }} {{ align }}{{ fi }}"{{ if background }} style="background-color:{{ background }}"{{ fi }}>{{ value | raw }}</div></td>');
	self.options = options;
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {

		var meta = self.find('script').html();
		self.aclass('ui-grid-container' + (config.autosize ? '' : ' hidden'));
		self.html('<div class="ui-grid"><table class="ui-grid-header"><thead></thead></table><div class="ui-grid-scroller"><table class="ui-grid-data"><thead></thead><tbody></tbody></table></div></div>' + (config.pagination ? '<div class="ui-grid-footer hidden"><div class="ui-grid-meta"></div><div class="ui-grid-pagination"><button class="ui-grid-button" name="first"><i class="fa fa-angle-double-left"></i></button><button class="ui-grid-button" name="prev"><i class="fa fa-angle-left"></i></button><div class="page"><input type="text" maxlength="5" class="ui-grid-input" /></div><button class="ui-grid-button" name="next"><i class="fa fa-angle-right"></i></button><button class="ui-grid-button" name="last"><i class="fa fa-angle-double-right"></i></button></div><div class="ui-grid-pages"></div></div></div>' : ''));

		var body = self.find('.ui-grid-data');
		tbody = $(body.find('tbody')[0]);
		tbodyhead = $(body.find('thead')[0]);
		thead = $(self.find('.ui-grid-header').find('thead')[0]);
		container = $(self.find('.ui-grid-scroller')[0]);

		if (config.pagination) {
			var el = self.find('.ui-grid-footer');
			pagination = {};
			pagination.main = el;
			pagination.page = el.find('input');
			pagination.first = el.find('button[name="first"]');
			pagination.last = el.find('button[name="last"]');
			pagination.prev = el.find('button[name="prev"]');
			pagination.next = el.find('button[name="next"]');
			pagination.meta = el.find('.ui-grid-meta');
			pagination.pages = el.find('.ui-grid-pages');
		}

		meta && self.meta(meta);

		self.event('click', '.ui-grid-columnsort', function() {
			var obj = {};
			obj.columns = options.columns;
			obj.column = options.columns[+$(this).attrd('index')];
			self.sort(obj);
		});

		self.event('change', '.ui-grid-filter', function() {
			var el = $(this).parent();
			if (this.value)
				options.filter[this.name] = this.value;
			else
				delete options.filter[this.name];
			el.tclass('ui-grid-selected', !!this.value);
			scroll = true;
			self.filter();
		});

		self.event('change', 'input', function() {
			var el = this;
			if (el.type === 'checkbox') {
				el && !el.value && self.checked(el.checked);
				config.checked && self.EXEC(config.checked, el, self);
			}
		});

		self.event('click', '.ui-grid-button', function() {
			switch (this.name) {
				case 'first':
					scroll = true;
					cache.page = 1;
					self.operation('pagination');
					break;
				case 'last':
					scroll = true;
					cache.page = cache.pages;
					self.operation('pagination');
					break;
				case 'prev':
					scroll = true;
					cache.page -= 1;
					self.operation('pagination');
					break;
				case 'next':
					scroll = true;
					cache.page += 1;
					self.operation('pagination');
					break;
			}
		});

		self.event('change', '.ui-grid-input', function() {
			var page = (+this.value) >> 0;
			if (isNaN(page) || page < 0 || page > cache.pages || page === cache.page)
				return;
			scroll = true;
			cache.page = page;
			self.operation('pagination');
		});

		tbody.on('click', 'button', function() {
			var btn = $(this);
			var tr = btn.closest('tr');
			config.button && self.EXEC(config.button, btn, options.items[+tr.attrd('index')], self);
		});

		var ALLOWED = { INPUT: 1, SELECT: 1 };

		tbody.on('click', '.ui-grid-row', function(e) {
			!ALLOWED[e.target.nodeName] && config.click && self.EXEC(config.click, options.items[+$(this).attrd('index')], self);
		});

		self.on('resize', self.resize);
		config.init && self.EXEC(config.init);
		wheight = WH;
	};

	self.checked = function(value) {
		if (typeof(value) === 'boolean')
			self.find('input[type="checkbox"]').prop('checked', value);
		else
			return tbody.find('input:checked');
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

		options.columns = options.columns.remove(function(column) {
			return !!(column.remove && FN(column.remove)());
		});

		options.customsearch = false;

		for (var i = 0; i < options.columns.length; i++) {
			var column = options.columns[i];

			if (typeof(column.header) === 'string')
				column.header = column.header.indexOf('{{') === -1 ? new Function('return \'' + column.header + '\'') : Tangular.compile(column.header);

			if (typeof(column.template) === 'string')
				column.template = column.template.indexOf('{{') === -1 ? new Function('a', 'b', 'return \'' + column.template + '\'') : Tangular.compile(column.template);

			if (column.search) {
				options.customsearch = true;
				column.search = column.search === true ? column.template : Tangular.compile(column.search);
			}
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

	self.cls = function(d) {
		var a = [];
		for (var i = 1; i < arguments.length; i++) {
			var cls = arguments[i];
			cls && a.push(cls);
		}
		return a.length ? ((d ? ' ' : '') + a.join(' ')) : '';
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

			if (typeof(col.size) !== 'string')
				size += col.size || 1;

			col.sorting = null;

			if (typeof(col.render) === 'string')
				col.render = FN(col.render);

			if (typeof(col.header) === 'string')
				col.header = FN(col.header);

			col.cls = self.cls(0, col.classtd, col.class);
		}

		for (var i = 0, length = columns.length; i < length; i++) {
			var col = columns[i];
			var width = typeof(col.size) === 'string' ? col.size : ((((col.size || 1) / size) * 100).floor(2) + '%');

			data.push('<td style="width:{0}" data-index="{1}" class="{2}"></td>'.format(width, i, self.cls(0, col.classtd, col.class)));
			header.push('<th class="ui-grid-columnname{3}{5}" style="width:{0};text-align:center" data-index="{1}" title="{6}" data-name="{4}"><div class="wrap"><i class="fa hidden ui-grid-fa"></i>{2}</div></th>'.format(width, i, col.header ? col.header(col) : (col.text || col.name), self.cls(1, col.classth, col.class), col.name, col.sort === false ? '' : ' ui-grid-columnsort', col.title || col.text || col.name));
			if (col.filter === false)
				filter.push('<th class="ui-grid-columnfilterempty ui-grid-columnfilter{1}" style="width:{0}">&nbsp;</th>'.format(width, self.cls(1, col.classfilter, col.class)));
			else
				filter.push('<th class="ui-grid-columnfilter{4}" style="width:{0}"><input type="text" placeholder="{3}" name="{2}" autocomplete="off" class="ui-grid-filter" /></th>'.format(width, i, col.name, col.filter || config.filterlabel, self.cls(1, col.classfilter, col.class)));
		}

		if (scrollbar) {
			header.push('<th class="ui-grid-columnname ui-grid-scrollbar" style="width:{0}px"></th>'.format(scrollbar));
			filter.push('<th class="ui-grid-columnfilterempty ui-grid-scrollbar ui-grid-columnfilter{1}" style="width:{0}px">&nbsp;</th>'.format(scrollbar, self.cls(1, col.classtd, col.class)));
		}

		tbodyhead.html(data.join('') + '</tr>');
		thead.html(header.join('') + '</tr>' + (config.filter ? (filter.join('') + '</tr>') : ''));
		!init && self.refresh();
		isFilter = false;
		options.filter = {};
	};

	self.fill = function() {

		if (config.autosize === false || filled)
			return;

		filled = true;
		tbody.find('.emptyfill').remove();
		var builder = ['<tr class="emptyfill">'];

		var cols = options.columns;
		for (var i = 0, length = cols.length; i < length; i++) {
			var col = cols[i];
			if (!col.hidden) {
				var cls = self.cls(0, col.classtd, col.class);
				builder.push('<td{0}>'.format(cls ? (' class="' + cls + '"') : '') + (i ? '' : '<div class="wrap">&nbsp;</div>') + '</td>');
			}
		}

		builder.push('</tr>');
		builder = builder.join('');
		var buffer = [];
		for (var i = 0; i < config.fillcount; i++)
			buffer.push(builder);
		tbody.append(buffer.join(''));
	};

	self.resize = function(delay) {

		if (config.autosize === false) {
			self.hclass('hidden') && self.rclass('hidden');
			return;
		}

		setTimeout2(self.id + '.resize', function() {

			var parent = self.parent().height();
			if (parent < wheight / 3)
				return;

			var value = options.items;
			var height = parent - (config.padding || 0) - (config.pagination ? 105 : 74);

			if (height === eheight)
				return;

			container.height(height);
			eheight = height;

			var cls = 'ui-grid-noscroll';
			var count = (height / config.rowheight) >> 0;
			if (count > value.length) {
				self.fill(config.fillcount);
				self.aclass(cls);
			} else
				self.rclass(cls);

			pagination && pagination.main.rclass('hidden');
			eheight && self.rclass('hidden');
		}, typeof(delay) === 'number' ? delay : 50);
	};

	self.limit = function() {
		return Math.ceil(container.height() / config.rowheight);
	};

	self.filter = function() {
		isFilter = Object.keys(options.filter).length > 0;
		!config.external && self.refresh();
		self.operation('filter');
	};

	self.operation = function(type) {
		if (type === 'filter')
			cache.page = 1;
		config.exec && self.EXEC(config.exec, type, isFilter ? options.filter : null, options.lastsort ? options.lastsort : null, cache.page, self);
	};

	self.sort = function(data) {

		options.lastsortelement && options.lastsortelement.rclass('fa-caret-down fa-caret-up').aclass('hidden');

		if (data.column.sorting === 'desc') {
			options.lastsortelement.find('.ui-grid-fa').rclass('fa-caret-down fa-caret-up').aclass('hidden');
			options.lastsortelement = null;
			options.lastsort = null;
			data.column.sorting = null;

			if (config.external)
				self.operation('sort');
			else
				self.refresh();

		} else if (data.column) {
			data.column.sorting = data.column.sorting === 'asc' ? 'desc' : 'asc';
			options.lastsortelement = thead.find('th[data-name="{0}"]'.format(data.column.name)).find('.ui-grid-fa').rclass('hidden').tclass('fa-caret-down', data.column.sorting === 'asc').tclass('fa-caret-up', data.column.sorting === 'desc');
			options.lastsort = data.column;

			var name = data.column.name;
			var sort = data.column.sorting;

			!config.external && options.lastsort && options.items.quicksort(name, sort !== 'asc');
			self.operation('sort');
			self.redraw();
		}
	};

	self.can = function(row) {

		var keys = Object.keys(options.filter);

		for (var i = 0; i < keys.length; i++) {

			var column = keys[i];
			var filter = options.filter[column];
			var val2 = filtercache[column];
			var val = row['$' + column] || row[column];

			var type = typeof(val);

			if (val instanceof Array) {
				val = val.join(' ');
				type = 'string';
			}

			if (type === 'number') {

				if (val2 == null)
					val2 = filtercache[column] = self.parseNumber(filter);

				if (val2.length === 1 && val !== val2[0])
					return false;

				if (val < val2[0] || val > val2[1])
					return false;

			} else if (type === 'string') {

				if (val2 == null) {
					val2 = filtercache[column] = filter.split(/\/\|\\|,/).trim();
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
					val2 = filtercache[column] = config.boolean.indexOf(filter.replace(/\s/g, '')) !== -1;
				if (val2 !== val)
					return false;
			} else if (val instanceof Date) {

				val.setHours(0);
				val.setMinutes(0);

				if (val2 == null) {

					val2 = filter.trim().replace(/\s-\s/, '/').split(/\/|\||\\|,/).trim();
					var arr = filtercache[column] = [];

					for (var j = 0; j < val2.length; j++) {
						var dt = val2[j].trim();
						var a = self.parseDate(dt);
						if (a instanceof Array) {
							if (val2.length === 2) {
								arr.push(j ? a[1] : a[0]);
							} else {
								arr.push(a[0]);
								if (j === val2.length - 1) {
									arr.push(a[1]);
									break;
								}
							}
						} else
							arr.push(a);
					}

					if (val2.length === 2 && arr.length === 2) {
						arr[1].setHours(23);
						arr[1].setMinutes(59);
						arr[1].setSeconds(59);
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
				var dt = NOW.add(val);
				return dt > NOW ? [NOW, dt] : [dt, NOW];
			}
			if (val.length === 4)
				return [new Date(+val, 0, 1), new Date(+val + 1, 0	, 1)];
		} else if (val.indexOf('.', index + 1) === -1) {
			var a = val.split('.');
			return new Date(NOW.getFullYear(), +a[1] - 1, +a[0]);
		}
		index = val.indexOf('-');
		if (index !== -1 && val.indexOf('-', index + 1) === -1) {
			var a = val.split('-');
			return new Date(NOW.getFullYear(), +a[0] - 1, +a[1]);
		}
		return val.parseDate();
	};

	self.parseNumber = function(val) {
		var arr = [];
		var num = val.replace(/\s-\s/, '/').replace(/\s/g, '').replace(/,/g, '.').split(/\/|\|\s-\s|\\/).trim();

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
				m.value = column.template ? column.template(items[i], column) : column.render ? column.render(val, column, items[i]) : val == null ? '' : Thelpers.encode((column.format ? val.format(column.format) : val));
				m.index = j;
				m.align = column.align;
				m.background = column.background;
				builder.push(self.template(m, column));
			}
			builder.push('</tr>');
		}

		tbody.find('.ui-grid-row').remove();
		tbody.prepend(builder.join(''));
		container.rclass('noscroll');
		scroll && container.prop('scrollTop', 0);
		scroll = false;
		eheight = 0;
		self.resize(0);
	};

	self.setter = function(value) {

		// value.items
		// value.limit
		// value.page
		// value.pages
		// value.count

		if (!value) {
			tbody.find('.ui-grid-row').remove();
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

		if (options.customsearch) {
			for (var i = 0, length = value.items.length; i < length; i++) {
				var item = value.items[i];
				for (var j = 0; j < options.columns.length; j++) {
					var col = options.columns[j];
					if (col.search)
						item['$' + col.name] = col.search(item);
				}
			}
		}

		if (config.external) {
			options.items = value.items;
		} else {
			options.items = [];
			filtercache = {};
			for (var i = 0, length = value.items.length; i < length; i++) {
				var item = value.items[i];
				if (isFilter && !self.can(item))
					continue;
				options.items.push(item);
			}
			options.lastsort && options.items.quicksort(options.lastsort.name, options.lastsort.sorting === 'asc');
		}

		self.redraw();
		config.checked && self.EXEC(config.checked, null, self);
	};
});