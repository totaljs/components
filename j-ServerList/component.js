COMPONENT('serverlist', 'colwidth:150;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;margin:0;scrolltop:1;filter:Filter;prop:html;display:1;empty:No records found.', function(self, config, cls) {

	var cls2 = '.' + cls;
	var nodes = {};
	var filtercache = { sort: '', filter: {}, page: 1, pages: 1 };
	var Tth = Tangular.compile('<div class="{0}-th{{ if value.sorting }} {0}-sort{{ fi }}{{ if value.alignheader }} {0}-{{ value.alignheader }}{{ fi }}" style="width:{{ value.width }}px" data-id="{{ value.id }}">{{ if value.sorting }}<span class="{0}-btn-sort"><i class="ti {{ if value.sort === \'asc\' }}ti-angle-up{{ else if value.sort === \'desc\' }}ti-angle-down{{ else }}ti-arrows-v{{ fi }}"></i></span>{{ fi }}<div>{{ if value.icon }}<i class="{{ value.icon }}"></i>{{ fi }}{{ value.name | raw }}</div></div>'.format(cls));
	var Ttf = Tangular.compile('<div class="{0}-tf{{ if value.filter }} {0}-tf-is{{ fi }}" style="width:{{ value.width }}px"><i class="{0}-clear ti ti-times"></i><input data-name="{{ value.id }}"{{ if !value.filtering }} disabled{{ fi }}{{ if value.placeholder }} placeholder="{{ value.placeholder }}"{{ fi }}{{ if value.filter }} value="{{ value.filter }}"{{ fi }}{{ if cls }} class="{{ cls }}"{{ fi }} autocomplete="new-password" role="combobox" aria-expanded="true" aria-invalid="false" aria-autocomplete="list" aria-haspopup="false" autocapitalize="off" autocorrect="off" spellcheck="false"{{ if value.dirsource }} readonly{{ fi }} /></div>'.format(cls));
	var Titem = null;
	var scrollY = 0;
	var scrollX = 0;
	var emptyrows = 0;

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

		let scr = self.find('scr' + 'ipt').html();
		Titem = scr ? Tangular.compile(scr) : null;

		self.empty();

		self.aclass(cls);
		self.append('<div class="{0}-container"><div class="{0}-table"><div class="{0}-header noscrollbar"></div><div class="{0}-empty-container"><div class="{0}-empty hidden"><i class="ti ti-database mr5"></i>{1}</div></div><div class="{0}-rows"><div class="{0}-items"></div></div></div></div><div class="{0}-pagination"><span class="{0}-pagination-count">0</span><button name="first" disabled><i class="ti ti-angle-double-left"></i></button><button name="prev" disabled><i class="ti ti-angle-left"></i></button><input autocomplete="new-password" spellcheck="false" role="combobox" aria-expanded="true" aria-invalid="false" aria-autocomplete="list" autocapitalize="off" autocorrect="off" disabled value="1" /><button name="next" disabled><i class="ti ti-angle-right"></i></button><button name="last" disabled><i class="ti ti-angle-double-right"></i></button><span class="{0}-pagination-pages">0</span></div>'.format(cls, config.empty));

		config.noborder && self.aclass(cls + '-noborder');
		config.checkbox && self.aclass(cls + '-checkboxes');

		if (config.click || config.cell)
			self.aclass(cls + '-pointer');

		nodes.container = self.find(cls2 + '-container');
		nodes.table = self.find(cls2 + '-table');
		nodes.header = self.find(cls2 + '-header');
		nodes.rows = self.find(cls2 + '-rows');
		nodes.data = self.find(cls2 + '-items');
		nodes.sizer = self.find(cls2 + '-sizer');
		nodes.empty = self.find(cls2 + '-empty');
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

		nodes.scrollbarY = SCROLLBAR(nodes.rows, { visibleY: true, shadow: config.scrollbarshadow, orientation: 'y', controls: self.element, marginY: 50, wrap: false });
		self.resizeforce();

		self.event('click', cls2 + '-item', function(e) {

			if (!config.click)
				return;


			let target = e ? e.target : null;
			if (target && target.tagName === 'A' || $(target).closest('a').length)
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

			nodes.data.find('> ' + cls2 + '-item').tclass('selected', selected);
			self.selected();
		});

		self.event('click', cls2 + '-checkbox', function(e) {

			if (!config.checkbox)
				return;

			e.preventDefault();
			e.stopPropagation();

			let el = $(this).closest(cls2 + '-item');
			let index = +ATTRD(el, 'index');
			let model = self.get();
			let row = model.items[index];

			el.tclass('selected');
			row.$selected = el.hclass('selected');
			self.selected();
		});

		self.event('click', cls2 + '-sort', function(e) {

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
				if (m.sorting && m !== column && m.sort)
					m.sort = '';
			}

			filtercache.sort = column.sort ? (column.id + '_' + column.sort) : '';
			config.exec && self.EXEC(config.exec, 'sort', filtercache.filter, filtercache.sort, filtercache.page);
		});

		self.event('click', cls2 + '-clear', function(e) {

			e.stopPropagation();
			e.preventDefault();

			let model = self.get();
			let el = $(this).closest(cls2 + '-tf');
			// let index = el.index();
			// let model = self.get();
			// let column = model.columns[index - 1];
			let input = el.find('input');
			input.val('');
			self.filter();
		});

		self.event('click', cls2 + '-dirsource', function(e) {

			e.stopPropagation();
			e.preventDefault();

			let model = self.get();
			let input = $(this);
			let opt = {};
			let column = model.columns.findItem('id', input.attrd('name'));
			opt.element = input;
			opt.items = column.dirsource;
			opt.offsetY = 24;
			opt.offsetX = 2;
			opt.callback = function(selected) {
				input.val(selected.name);
				self.filter();
			};

			SETTER('directory/show', opt);
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

		let rowsheight = height - 36 - 36 - 22;
		emptyrows = Math.ceil(rowsheight / 33);
		nodes.container.css('height', height - 35);
		nodes.rows.css('height', rowsheight);
		nodes.scrollbarY && nodes.scrollbarY.resize();
		nodes.empty.css({ top: height / 2 - 50});

		if (config.display)
			self.rclass2('d-').aclass('d-' + WIDTH(self.element));

	};

	// Collects filters
	self.filter = function() {

		let model = self.get();
		let inputs = nodes.header.find('input');
		let obj = {};

		for (let m of inputs) {
			if (!m.disabled) {

				let name = m.getAttribute('data-name');
				let col = model.columns.findItem('id', name);
				if (col) {

					let val = m.value;

					col.filter = val;

					if (col.dirsource)
						val = val == null || val == '' ? null : col.dirsource.findValue('name', val, 'id');

					if (val != null && val !== '')
						obj[name] = val;

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
		config.checked && self.SEEX(config.checked, selected);
	};

	self.setter = function(value) {

		if (!value) {
			config.exec && self.EXEC(config.exec, 'filter', filtercache.filter, filtercache.sort, filtercache.page);
			return;
		}

		let builder = [];
		let filter = [];
		let width = 40; // numbering + checkox

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

			width += col.width + 2; // 2 is the Bulgarian constant

			let ccls = '';

			if (col.dirsource)
				ccls += (ccls ? ' ' : '') + '{0}-dirsource';

			if (col.alignfilter)
				ccls += (ccls ? ' ' : '') + '{0}-' + col.alignfilter;

			let obj = { value: col, cls: ccls.format(cls) };
			builder.push(Tth(obj));
			filter.push(Ttf(obj));
		}

		width += 15; // 15 is margin

		nodes.header.html('<div class="{0}-width"><div class="{0}-row">{1}</div><div class="{0}-filter">{2}</div></div>'.format(cls, builder.join(''), filter.join('')));
		builder.length = 0;

		let model = {};

		for (let i = 0; i < value.items.length; i++) {
			let row = value.items[i];
			let html = '<div class="{0}-item{1}" data-index="{2}">'.format(cls, row.$selected ? ' selected' : '', i);
			if (config.checkbox)
				html += '<div class="{0}-checkbox"><i class="ti ti-check"></i></div>'.format(cls);
			model.value = row;
			html += Titem ? Titem(model, value) : row[config.prop] || '';
			builder.push(html + '</div>');
		}

		let diff = emptyrows - value.items.length;

		nodes.pagination.pages.html(value.pages.pluralize(config.pluralizepages));
		nodes.pagination.count.html(value.count.pluralize(config.pluralizeitems));

		nodes.pagination.first.prop('disabled', value.page <= 1);
		nodes.pagination.last.prop('disabled', value.page >= value.pages);
		nodes.pagination.prev.prop('disabled', value.page <= 1);
		nodes.pagination.next.prop('disabled', value.page >= value.pages);
		nodes.pagination.page.prop('disabled', value.pages <= 1).val(value.page + '');
		nodes.empty.tclass('hidden', !!value.items.length);

		nodes.data.html(builder.join(''));
		nodes.header.find(cls2 + '-width').css({ width: width });

		if (config.scrolltop && !flags.noscroll)
			nodes.scrollbarY.scrollTop(0);

		self.resizeforce();
		self.selected();
	};

});