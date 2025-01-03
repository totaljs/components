COMPONENT('servergrid', 'colwidth:150;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;margin:0;filter:Filter', function(self, config, cls) {

	var cls2 = '.' + cls;
	var nodes = {};
	var filtercache = { sort: {}, filter: {}, page: 1, pages: 1 };
	var Ttd = Tangular.compile('<div class="{0}-td {0}-c{{ value.id }}{{ if value.align }} {0}-{{ value.align }}{{ fi }} {0}-{1}" style="width:{{ value.width }}px{{ if value.color }};background:{{ value.color }}{{ fi }}">{{ value.text | raw }}</div>'.format(cls, self.ID));
	var Tth = Tangular.compile('<div class="{0}-th{{ if value.sorting }} {0}-sort{{ fi }}{{ if value.alignheader }} {0}-{{ value.alignheader }}{{ fi }}" style="width:{{ value.width }}px" data-id="{{ value.id }}">{{ if value.sorting }}<span class="{0}-btn-sort"><i class="ti {{ if value.sort === \'asc\' }}ti-angle-up{{ else if value.sort === \'desc\' }}ti-angle-down{{ else }}ti-sort{{ fi }}"></i></span>{{ fi }}<div>{{ if value.icon }}<i class="{{ value.icon }}"></i>{{ fi }}{{ value.name | raw }}</div></div>'.format(cls));
	var Ttf = Tangular.compile('<div class="{0}-tf{{ if value.filter }} {0}-tf-is{{ fi }}" style="width:{{ value.width }}px"><i class="{0}-clear ti ti-times"></i><input name="{{ value.id }}"{{ if !value.filtering }} disabled{{ fi }}{{ if value.placeholder }} placeholder="{{ value.placeholder }}"{{ fi }}{{ if value.filter }} value="{{ value.filter }}"{{ fi }} /></div>'.format(cls));
	var scrollY = 0;
	var scrollX = 0;

	var rgba = function(hex, alpha) {
		if (hex && /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			let c = hex.substring(1).split('');
			if (c.length === 3)
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			c = '0x' + c.join('');
			return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
		}
		return 'rgba(0,0,0,' + alpha + ')';
	};

	self.make = function() {

		self.aclass(cls);
		self.append('<div class="{0}-container"><div class="{0}-table"><div class="{0}-header"></div><div class="{0}-rows"><div class="{0}-data"></div></div></div></div><div class="{0}-pagination"><span class="{0}-pagination-count">0</span><button name="first" disabled><i class="ti ti-angle-double-left"></i></button><button name="prev" disabled><i class="ti ti-angle-left"></i></button><input autocomplete="new-password" spellcheck="false" role="combobox" aria-expanded="true" aria-invalid="false" aria-autocomplete="list" autocapitalize="off" autocorrect="off" disabled value="1" /><button name="next" disabled><i class="ti ti-angle-right"></i></button><button name="last" disabled><i class="ti ti-angle-double-right"></i></button><span class="{0}-pagination-pages">0</span></div>'.format(cls));

		config.noborder && self.aclass(cls + '-noborder');
		config.checkbox && self.aclass(cls + '-checkbox');

		nodes.container = self.find(cls2 + '-container');
		nodes.scrollbarX = SCROLLBAR(nodes.container, { visibleX: true, orientation: 'x', controls: self.element, wrap: false });
		nodes.table = self.find(cls2 + '-table');
		nodes.header = self.find(cls2 + '-header');
		nodes.rows = self.find(cls2 + '-rows');
		nodes.data = self.find(cls2 + '-data');
		nodes.sizer = self.find(cls2 + '-sizer');
		nodes.pagination = {};

		let pe = self.find(cls2 + '-pagination');
		nodes.pagination.element = pe;
		nodes.pagination.first = pe.find('button[name="first"]');
		nodes.pagination.last = pe.find('button[name="last"]');
		nodes.pagination.prev = pe.find('button[name="prev"]');
		nodes.pagination.next = pe.find('button[name="next"]');
		nodes.pagination.page = pe.find('input');
		nodes.pagination.pages = pe.find(cls2 + '-pagination-pages');
		nodes.pagination.count = pe.find(cls2 + '-pagination-count');

		nodes.scrollbarY = SCROLLBAR(nodes.rows, { visibleY: true, orientation: 'y', controls: self.element, marginY: 50, wrap: false });
		self.resizeforce();

		self.event('click', cls2 + '-' + self.ID, function() {

			if (!config.cell)
				return;

			if (nodes.cellhighlight && nodes.cellhighlight[0] === this)
				return;

			let el = $(this);
			nodes.cellhighlight && nodes.cellhighlight.rclass('highlight');
			nodes.cellhighlight = el;

			let td = el.closest(cls2 + '-td');
			let index = td.index();
			let model = self.get();
			let column = model.columns[index - 1];
			let row = model.items[+td.parent().attrd('index')];

			el.aclass('highlight');
			config.cell && self.SEEX(config.cell, row, el, column);
		});

		self.event('click', cls2 + '-row_' + self.ID, function() {

			if (!config.click)
				return;

			if (nodes.rowhighlight && nodes.rowhighlight[0] === this)
				return;

			let el = $(this);
			nodes.rowhighlight && nodes.rowhighlight.rclass('highlight');
			nodes.rowhighlight = el;

			let model = self.get();
			let row = model.items[+el.attrd('index')];

			el.aclass('highlight');
			config.click && self.SEEX(config.click, row, el);
		});

		nodes.pagination.first.on('click', () => self.page(1));
		nodes.pagination.prev.on('click', () => self.page(filtercache.page - 1));
		nodes.pagination.next.on('click', () => self.page(filtercache.page + 1));
		nodes.pagination.last.on('click', () => self.page(filtercache.pages));
		nodes.pagination.page.on('change', function() {
			let page = +this.value;
			if (!isNaN(page) && page >= 0)
				self.page(page);
		});

		nodes.header.on('change', 'input', () => self.filter());
		nodes.rows.on('scroll', () => scrollY = nodes.rows[0].scrollTop);
		nodes.container.on('scroll', () => scrollX = nodes.container[0].scrollLeft);

		self.event('click', cls2 + '-th-number', function() {

			let el = $(this);
			let model = self.get();

			el.tclass('selected');

			let selected = el.hclass('selected');

			for (let m of model.items)
				m.$selected = selected;

			nodes.data.find('> ' + cls2 + '-row').tclass('selected', selected);
			self.selected();
		});

		self.event('click', cls2 + '-number', function() {

			if (!config.checkbox)
				return;

			let el = $(this).closest(cls2 + '-row');
			let index = +ATTRD(el, 'index');
			let model = self.get();
			let row = model.items[index];

			el.tclass('selected');
			row.$selected = el.hclass('selected');
			self.selected();
		});

		self.event('click', cls2 + '-sort', function() {

			let model = self.get();
			let el = $(this);
			let id = ATTRD(el);
			let column = model.columns.findItem('id', id);

			switch (column.sort) {
				case 'asc':
					column.sort = '';
					break;
				case 'desc':
					column.sort = 'asc';
					break;
				default:
					column.sort = 'desc';
					break;
			}

			// Remove other sorts
			for (let m of model.columns) {
				if (m.sorting && m !== column)
					column.sort = '';
			}

			filtercache.sort = column.sort ? (column.id + '_' + column.sort) : '';
			config.exec && self.EXEC(config.exec, 'sort', filtercache.filter, filtercache.sort, filtercache.page);
		});

		self.event('click', cls2 + '-clear', function() {
			let el = $(this).closest(cls2 + '-tf');
			// let index = el.index();
			// let model = self.get();
			// let column = model.columns[index - 1];
			el.find('input').val('');
			self.filter();
		});

	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 50);
	};

	self.resizeforce = function() {

		if (!config.height && !config.parent)
			return;

		let height = 0;

		if (config.height) {
			height = config.height - config.margin;
		} else {
			let parent = self.parent(config.parent);
			height = parent.height() - config.margin;
		}

		nodes.container.css('height', height - 35);
		nodes.rows.css('height', height - 36 - 36 - 22);
		nodes.scrollbarX && nodes.scrollbarX.resize();
		nodes.scrollbarY && nodes.scrollbarY.resize();
	};

	// Collects filters
	self.filter = function() {

		let model = self.get();
		let inputs = nodes.header.find('input');
		let obj = {};

		for (let m of inputs) {
			if (!m.disabled) {
				let col = model.columns.findItem('id', m.name);
				if (col) {
					col.filter = m.value;
					obj[m.name] = m.value;
				}
			}
		}

		filtercache.filter = obj;
		config.exec && self.EXEC(config.exec, 'filter', filtercache.filter, filtercache.sort, filtercache.page);
	};

	// Switches page
	self.page = function(page) {
		if (page > filtercache.pages)
			page = filtercache.pages;
		else if (page < 0)
			page = 1;
		filtercache.page = page;
		config.exec && self.EXEC(config.exec, 'page', filtercache.filter, filtercache.sort, filtercache.page);
	};

	// Collects selected rows
	self.selected = function() {
		let model = self.get();
		let selected = [];
		for (let m of model.items) {
			if (m.$selected)
				selected.push(m);
		}
		config.checked && self.EXEC(config.checked, selected);
	};

	self.setter = function(value) {

		if (!value) {
			config.exec && self.EXEC(config.exec, 'filter', filtercache.filter, filtercache.sort, filtercache.page);
			return;
		}

		let builder = [];
		let filter = [];
		let width = 34;

		builder.push(('<div class="{0}-th {0}-th-number">' + (config.checkbox ? '<em><i class="ti ti-check"></i></em>' : '') + '</div>').format(cls));
		filter.push('<div class="{0}-th-number">&nbsp;</div>'.format(cls));

		filtercache.page = value.page || 1;
		filtercache.pages = value.pages || 1;

		if (!value.count)
			value.count = 0;

		for (let col of value.columns) {

			if (col.filtering == true)
				col.placeholder = config.filter;

			if (!col.width)
				col.width = config.colwidth;

			switch (col.align) {
				case 0:
					col.align = 'left';
					break;
				case 1:
					col.align = 'center';
					break;
				case 2:
					col.align = 'right';
					break;
			}

			switch (col.alignheader) {
				case 0:
					col.alignheader = 'left';
					break;
				case 1:
					col.alignheader = 'center';
					break;
				case 2:
					col.alignheader = 'right';
					break;
			}

			switch (col.alignfilter) {
				case 0:
					col.alignfilter = 'left';
					break;
				case 1:
					col.alignfilter = 'center';
					break;
				case 2:
					col.alignfilter = 'right';
					break;
			}

			if (!col.alignheader && col.align)
				col.alignheader = col.align;

			if (!col.alignfilter && col.align)
				col.alignfilter = col.align;

			width += col.width;
			let obj = { value: col };
			builder.push(Tth(obj));
			filter.push(Ttf(obj));
		}

		nodes.header.html('<div class="{0}-row">{1}</div><div class="{0}-filter">{2}</div>'.format(cls, builder.join(''), filter.join('')));
		builder.length = 0;

		for (let i = 0; i < value.items.length; i++) {

			let row = value.items[i];
			let html = '<div class="{0}-row {0}-row_{1}{3}" data-index="{2}">'.format(cls, self.ID, i, row.$selected ? ' selected' : '');

			html += ('<div class="{0}-td {0}-number">' + (config.checkbox ? '<em><i class="ti ti-check"></i></em>' : '') + '<span>{1}</span></div>').format(cls, i + 1);

			for (let col of value.columns) {

				let obj = {};
				obj.text = row[col.id];

				if (obj.text instanceof Date)
					obj.text = obj.text.format('[ts]');

				let color = col.color || col.bg;

				obj.width = col.width;
				obj.color = color ? rgba(color, 0.5) : '';
				obj.id = col.id;
				obj.align = col.align;
			 	html += Ttd({ value: obj });
			}

			builder.push(html + '</div>');
		}

		nodes.pagination.pages.html(value.pages.pluralize(config.pluralizepages));
		nodes.pagination.count.html(value.count.pluralize(config.pluralizeitems));

		nodes.pagination.first.prop('disabled', value.page <= 1 && value.pages > 1);
		nodes.pagination.last.prop('disabled', value.page != value.pages);
		nodes.pagination.prev.prop('disabled', value.page <= 1 && value.pages > 1);
		nodes.pagination.next.prop('disabled', value.page >= value.pages);
		nodes.pagination.page.prop('disabled', value.pages <= 1).val(value.page + '');

		nodes.table.css('width', width);
		nodes.data.html(builder.join(''));

		self.resizeforce();
		self.selected();
	};

});