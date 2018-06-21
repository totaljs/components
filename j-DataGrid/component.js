COMPONENT('datagrid', 'checkbox:true;colwidth:150;rowheight:24;filterlabel:Filter;numbering:Num.;height:auto;bottom:80;resize:true;reorder:true;sorting:true;boolean:true,on,yes;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;remember:true', function(self, config) {

	var opt = { filter: {}, filtercache: {}, filtervalues: {}, scroll: false, selected: {} };
	var header, body, vbody, footer, vcontainer, hcontainer, varea, hbody, vscrollbar, vscrollbararea, hscrollbar, hscrollbararea;
	var Theadercol = Tangular.compile('<div class="dg-hcol dg-col-{{ index }}{{ if sorting }} dg-sorting{{ fi }}" data-index="{{ index }}"{{ if reorder }} draggable="true"{{ fi }}>{{ if sorting }}<i class="dg-sort fa fa-sort"></i>{{ fi }}<div class="dg-label{{ alignheader }}"{{ if labeltitle }} title="{{ labeltitle }}"{{ fi }}>{{ label | raw }}</div>{{ if filter }}<div class="dg-filter{{ alignfilter }}{{ if filterval }} dg-filter-selected{{ fi }}"><input autocomplete="off" type="text" placeholder="{{ filter }}" class="dg-filter-input" name="{{ name }}" value="{{ filterval }}" /></div>{{ else }}<div class="dg-filter-empty">&nbsp;</div>{{ fi }}</div>');
	var pos = {};

	// opt.cols    --> columns
	// opt.rows    --> raw rendered data
	// opt.render  --> for clusterize

	self.init = function() {
		$(window).on('resize', function() {
			setTimeout2('datagridresize', function() {
				var arr = FIND('datagrid', true);
				for (var i = 0; i < arr.length; i++)
					arr[i].resize(true);
			}, 500);
		});
	};

	self.readonly();
	self.bindvisible();

	self.configure = function(key, value) {
		switch (key) {
			case 'pluralizepages':
				config.pluralizepages = value.split(',').trim();
				break;
			case 'pluralizeitems':
				config.pluralizeitems = value.split(',').trim();
				break;
			case 'click':
				self.tclass('dg-clickable', !!value);
				break;
		}
	};

	self.make = function() {

		var scr = self.find('script');
		self.rebind(scr.html());

		var pagination = '';

		if (config.exec)
			pagination = '<div class="dg-footer hidden"><div class="dg-pagination-items"></div><div class="dg-pagination"><button name="page-first" disabled><i class="fa fa-angle-double-left"></i></button><button name="page-prev" disabled><i class="fa fa-angle-left"></i></button><div><input type="text" name="page" maxlength="5" /></div><button name="page-next" disabled><i class="fa fa-angle-right"></i></button><button name="page-last" disabled><i class="fa fa-angle-double-right"></i></button></div><div class="dg-pagination-pages"></div></div>';

		self.html('<div class="dg-scrollbar-container-v hidden"><div class="dg-scrollbar-v"></div></div><div class="dg-h-container"><div class="dg-h-body"><div class="dg-v-container"><div class="dg-v-area"><div class="dg-header"></div><div class="dg-v-body"><div class="dg-body"></div></div></div></div></div></div><div class="dg-scrollbar-container-h hidden"><div class="dg-scrollbar-h"></div></div>{0}'.format(pagination));

		varea = self.find('.dg-v-area');
		vcontainer = self.find('.dg-v-container');
		header = self.find('.dg-header');
		body = self.find('.dg-body');
		vbody = self.find('.dg-v-body');
		footer = self.find('.dg-footer');
		hbody = self.find('.dg-h-body');
		hcontainer = self.find('.dg-h-container');

		// Scrollbars
		vscrollbar = self.find('.dg-scrollbar-v');
		vscrollbararea = self.find('.dg-scrollbar-container-v');
		hscrollbar = self.find('.dg-scrollbar-h');
		hscrollbararea = self.find('.dg-scrollbar-container-h');

		self.aclass('dg');

		// Gets a top/left position of vertical/horizontal scrollbar
		pos.vscroll = vscrollbararea.css('top').parseInt();
		pos.hscroll = hscrollbararea.css('left').parseInt();

		var sv = { is: false };
		var sh = { is: false };

		vscrollbararea.on('mousedown', function(e) {
			var el = $(e.target);
			if (el.hclass('dg-scrollbar-v')) {
				sv.is = true;
				sv.y = self.element.offset().top + pos.vscroll;
				sv.h = vscrollbararea.height();
				sv.s = vbody[0].scrollHeight;
				e.preventDefault();
				e.stopPropagation();
			} else if (el.hclass('dg-scrollbar-container-v')) {
				sv.is = false;
				sv.y = self.element.offset().top + pos.vscroll;
				sv.h = vscrollbararea.height();
				var y = (e.pageY - sv.y);
				var p = (y / sv.h) * 100;
				var scroll = ((vbody[0].scrollHeight - opt.height) / 100) * p;
				var plus = (p / 100) * 30;
				vbody.prop('scrollTop', scroll + plus);
				e.preventDefault();
				e.stopPropagation();
			}
		});

		hscrollbararea.on('mousedown', function(e) {
			var el = $(e.target);
			if (el.hclass('dg-scrollbar-h')) {
				sh.is = true;
				sh.x = self.element.offset().left + pos.hscroll;
				sh.w = hscrollbararea.width();
				sh.s = hbody[0].scrollWidth;
				e.preventDefault();
				e.stopPropagation();
			} else if (el.hclass('dg-scrollbar-container-h')) {
				sh.is = false;
				sh.w = hscrollbararea.width();
				var x = e.offsetX;
				var p = (x / sh.w) * 100;
				var scroll = ((hbody[0].scrollWidth - opt.width2) / 100) * p;
				var plus = (p / 100) * 30;
				hbody.prop('scrollLeft', scroll + plus);
				e.preventDefault();
				e.stopPropagation();
			}
		});

		$(window).on('mousemove', function(e) {
			if (sv.is) {
				var y = (e.pageY - sv.y);
				var p = (y / sv.h) * 100;
				var scroll = ((vbody[0].scrollHeight - opt.height) / 100) * p;
				vbody.prop('scrollTop', scroll);
			} else if (sh.is) {
				var x = (e.pageX - sh.x);
				var p = (x / sh.w) * 100;
				var scroll = ((hbody[0].scrollWidth - opt.width2) / 100) * p;
				hbody.prop('scrollLeft', scroll);
			}
		});

		vbody.on('scroll', function(e) {
			var el = e.target;
			var p = ((el.scrollTop / (el.scrollHeight - opt.height)) * 100) >> 0;
			var plus = (p / 100) * 30;
			p = (((opt.height - pos.vscroll) / 100) * p);
			vscrollbar.css('top', (p + plus - 2) + 'px');
		});

		hbody.on('scroll', function(e) {
			var el = e.target;
			var p = ((el.scrollLeft / (el.scrollWidth - opt.width2)) * 100) >> 0;
			var plus = (p / 100) * 30;
			p = (((opt.width2 - pos.hscroll) / 100) * p);
			hscrollbar.css('left', (p - plus) + 'px');
		});

		var r = { is: false };

		self.event('click', '.dg-row', function(e) {
			var el = $(this);
			switch (e.target.nodeName) {
				case 'DIV':
				case 'BUTTON':
				case 'SPAN':
					var row = opt.rows[+el.closest('.dg-row').attrd('index')];
					row && config.click && EXEC(config.click, row);
					break;
			}
		});

		self.event('click', '.dg-label', function() {

			var el = $(this).closest('.dg-hcol');

			if (!el.find('.dg-sort').length)
				return;

			var index = +el.attrd('index');

			for (var i = 0; i < opt.cols.length; i++) {
				if (i !== index)
					opt.cols[i].sort = 0;
			}

			var col = opt.cols[index];
			switch (col.sort) {
				case 0:
					col.sort = 1;
					break;
				case 1:
					col.sort = 2;
					break;
				case 2:
					col.sort = 0;
					break;
			}

			opt.sort = col;

			if (config.exec)
				self.operation('sort');
			else
				self.refreshfilter();
		});

		self.event('mousedown', function(e) {
			var el = $(e.target);

			if (!el.hclass('dg-resize'))
				return;

			r.el = el;
			r.offset = hbody.scrollLeft();

			r.h = el.css('height');
			r.x = el.css('left').parseInt();
			el.css('height', opt.height + config.bottom);
			r.is = true;
			e.preventDefault();
			e.stopPropagation();
		});

		header.on('mousemove', function(e) {
			if (r.is) {
				r.el.css('left', e.pageX + r.offset - 20);
				e.preventDefault();
				e.stopPropagation();
			}
		});

		$(window).on('mouseup', function(e) {
			if (r.is) {
				r.is = false;
				r.el.css('height', r.h);
				var x = r.el.css('left').parseInt();
				var index = +r.el.attrd('index');
				var width = opt.cols[index].width + (x - r.x);
				self.resizecolumn(index, width);
				e.preventDefault();
				e.stopPropagation();
			} else if (sv.is) {
				sv.is = false;
				e.preventDefault();
				e.stopPropagation();
			} else if (sh.is) {
				sh.is = false;
				e.preventDefault();
				e.stopPropagation();
			}
		});

		var d = { is: false };

		self.event('dragstart', function(e) {
			e.originalEvent.dataTransfer.setData('text/plain', GUID());
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':

					if (d.is) {
						var col = opt.cols[+$(e.target).closest('.dg-hcol').attrd('index')];
						col && self.reordercolumn(d.index, col.index);
					}

					d.is = false;
					break;

				case 'dragenter':
					if (!d.is) {
						d.index = +$(e.target).closest('.dg-hcol').attrd('index');
						d.is = true;
					}
					return;
				case 'dragover':
					return;
				case 'dragleave':
				case 'dragexit':
				default:
					return;
			}
		});

		self.event('change', '.dg-filter-input', function() {
			var input = this;
			var el = $(input).parent();
			var val = input.value;
			var name = input.name;

			var col = opt.cols[+el.closest('.dg-hcol').attrd('index')];

			delete opt.filtercache[name];
			if (col)
				opt.filtervalues[col.id] = val;

			if (val) {
				if (opt.filter[name] == val)
					return;
				opt.filter[name] = val;
			} else
				delete opt.filter[name];

			opt.scroll = true;
			el.tclass('dg-filter-selected', !!val);

			if (config.exec)
				self.operation('filter');
			else
				self.refreshfilter();
		});

		self.event('change', '.dg-checkbox-input', function() {
			var val = this.value;
			if (val === '-1') {
				if (this.checked) {
					opt.selected = {};
					for (var i = 0; i < opt.rows.length; i++)
						opt.selected[opt.rows[i].ROW] = 1;
				} else
					opt.selected = {};
				self.scrolling();
			} else
				opt.selected[val] = 1;
			config.selected && EXEC(config.selected, self.selected(), self);
		});

		self.event('click', 'button', function() {
			switch (this.name) {
				case 'page-first':
					opt.scroll = true;
					self.get().page = 1;
					self.operation('page');
					break;
				case 'page-last':
					opt.scroll = true;
					var tmp = self.get();
					tmp.page = tmp.pages;
					self.operation('page');
					break;
				case 'page-prev':
					opt.scroll = true;
					self.get().page -= 1;
					self.operation('page');
					break;
				case 'page-next':
					opt.scroll = true;
					self.get().page += 1;
					self.operation('page');
					break;
				default:
					var row = opt.rows[+$(this).closest('.dg-row').attrd('index')];
					config.button & EXEC(config.button, row, self);
					break;
			}
		});
	};

	self.operation = function(type) {
		var value = self.get();
		if (type === 'filter')
			value.page = 1;

		var keys = Object.keys(opt.filter);
		EXEC(config.exec, type, keys.length ? opt.filter : null, opt.sort && opt.sort.sort ? [(opt.sort.name + ' ' + (opt.sort.sort === 1 ? 'asc' : 'desc'))] : null, value.page, self);

		switch (type) {
			case 'sort':
				self.redrawsorting();
				break;
		}
	};

	self.rebind = function(code) {

		var type = typeof(code);

		if (type === 'string') {
			code = code.trim();
			self.gridid = 'dg' + HASH(code);
		} else
			self.gridid = 'dg' + HASH(JSON.stringify(code));

		var cache = config.remember ? CACHE(self.gridid) : null;
		var cols = type === 'string' ? new Function('return ' + code)() : CLONE(code);

		opt.search = false;

		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];

			col.id = GUID(5);
			col.realindex = i;

			if (col.hidden)
				col.hidden = FN(col.hidden)(col) === true;

			if (cache) {
				var c = cache[i];
				if (c) {
					col.index = c.index;
					col.width = c.width;
					col.hidden = c.hidden;
				}
			}

			if (col.index == null)
				col.index = i;

			if (col.sorting == null)
				col.sorting = config.sorting;

			if (col.alignfilter)
				col.alignfilter = ' ' + col.alignfilter;

			if (col.alignheader)
				col.alignheader = ' ' + col.alignheader;

			col.sort = 0;

			if (col.search) {
				opt.search = true;
				col.search = col.search === true ? Tangular.compile(col.template) : Tangular.compile(col.search);
			}

			if (col.align)
				col.align = ' ' + col.align;

			if (col.template)
				col.template = Tangular.compile((col.template.indexOf('<') === -1 ? '<div class="dg-value{1}">{0}</div>' : '{0}').format(col.template, col.align));
			else
				col.template = Tangular.compile('<div class="dg-value{1}">{{ {0} }}</div>'.format(col.name, col.align));

			if (col.header)
				col.header = Tangular.compile(col.header);
			else
				col.header = Tangular.compile('{{ text }}');

			if (col.filter !== false && !col.filter)
				col.filter = config.filterlabel;
		}

		cols.quicksort('index');
		opt.cols = cols;
		self.rebindcss();
	};

	self.rebindcss = function() {

		var cols = opt.cols;
		var css = [];
		var indexes = {};

		opt.width = (config.numbering ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];

			if (!col.width)
				col.width = config.colwidth;

			css.push('.dg-col-{0}{width:{1}px}'.format(i, col.width));

			if (!col.hidden) {
				opt.width += col.width;
				indexes[i] = opt.width;
			}
		}

		self.style(css);

		var w = self.width();
		if (w > opt.width)
			opt.width = w - 2;

		if (varea) {
			var css = { width: opt.width };
			vcontainer.css(css);
			css.width += 50;
			varea.css(css);
		}

		header && header.find('.dg-resize').each(function() {
			var el = $(this);
			el.css('left', indexes[el.attrd('index')] - 39);
		});
	};

	self.rendercols = function() {

		var Trow = '<div class="dg-hrow dg-row-{0}">{1}</div>';
		var column = config.numbering ? Theadercol({ index: -1, label: config.numbering, filter: false, name: '$', sorting: false }) : '';
		var resize = [];
		var index = 0;

		opt.width = (config.numbering ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		if (config.checkbox)
			column += Theadercol({ index: -1, label: '<div class="center"><input type="checkbox" value="-1" class="dg-checkbox-input" /></div>', filter: false, name: '$', sorting: false });

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			if (!col.hidden) {
				var obj = { index: index, label: col.header(col), filter: col.filter, reorder: config.reorder, sorting: col.sorting, name: col.name, alignfilter: col.alignfilter, alignheader: col.alignheader, filterval: opt.filtervalues[col.id], labeltitle: col.title };
				opt.width += col.width;
				config.resize && resize.push('<span class="dg-resize" style="left:{0}px" data-index="{1}"></span>'.format(opt.width - 39, i));
				column += Theadercol(obj);
				index++;
			}
		}

		column += '<div class="dg-hcol">&nbsp;</div>';

		header.html(resize.join('') + Trow.format(0, column));

		var w = self.width();
		if (w > opt.width)
			opt.width = w;

		var css = { width: opt.width };
		vcontainer.css(css);
		css.width += 50;
		varea.css(css);
	};

	self.renderrows = function(rows) {

		opt.rows = rows;

		var output = [];
		var Trow = '<div class="dg-row dg-row-{0}" data-index="{2}">{1}</div>';
		var Tcol = '<div class="dg-col dg-col-{0}">{1}</div>';

		for (var i = 0, length = rows.length; i < length; i++) {

			var row = rows[i];
			var column = '';
			var index = 0;

			if (config.numbering)
				column += Tcol.format(-1, '<div class="dg-number">{0}</div>'.format(i + 1));

			if (config.checkbox)
				column += Tcol.format(-1, '<div class="dg-checkbox"><input type="checkbox" value="{0}" class="dg-checkbox-input" /></div>'.format(row.ROW));

			for (var j = 0; j < opt.cols.length; j++) {
				var col = opt.cols[j];
				if (!col.hidden)
					column += Tcol.format(index++, col.template(row));
			}

			column += '<div class="dg-col">&nbsp;</div>';
			column && output.push(Trow.format(i + 1, column, i));
		}

		var min = (opt.height / config.rowheight >> 0) + 1;
		var is = output.length < min;

		if (is) {
			for (var i = output.length; i < min + 1; i++)
				output.push('<div class="dg-row-empty">&nbsp;</div>');
		}

		self.tclass('dg-noscroll', is);
		opt.render = output;
	};

	self.reordercolumn = function(index, position) {

		var col = opt.cols[index];
		if (!col)
			return;

		var old = col.index;

		opt.cols[index].index = position + (old < position ? 0.2 : -0.2);
		opt.cols.quicksort('index');

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			col.index = i;
		}

		opt.cols.quicksort('index');

		self.rebindcss();
		self.rendercols();
		self.renderrows(opt.rows);

		opt.sort && opt.sort.sort && self.redrawsorting();
		opt.clusterize && opt.clusterize.update(opt.render);
		self.scrolling();

		config.remember && self.save();
	};

	self.resizecolumn = function(index, size) {
		opt.cols[index].width = size;
		self.rebindcss();
		config.remember && self.save();
		self.resize();
	};

	self.save = function() {

		var cache = {};

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			col.index = i;
			cache[col.realindex] = { index: col.index, width: col.width, hidden: col.hidden };
		}

		CACHE(self.gridid, cache, '1 month');
	};

	self.resize = function(g) {
		switch (config.height) {
			case 'auto':
				var el = self.element;
				opt.height = WH - (el.offset().top + config.bottom) - (config.exec ? 30 : 0);
				vbody.css('height', opt.height);
				g && opt.clusterize && opt.clusterize.refresh();
				break;
			default:
				vbody.css('height', config.height);
				opt.height = config.height;
				break;
		}

		var w = self.width();
		var width = (config.numbering ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		for (var i = 0; i < opt.cols.length; i++)
			width += opt.cols[i].width;

		if (w > width)
			width = w - 2;

		vcontainer.css('width', width);
		varea.css('width', width + 50);
		vscrollbararea.css('height', opt.height + 2);
		hscrollbararea.css('width', w);

		var plus = hbody.offset().top;

		hbody.css('height', opt.height + 50 + plus);
		hcontainer.css('height', opt.height + 50 + 7);

		opt.width2 = w;

		setTimeout(function() {
			var vb = vbody[0];
			var hb = hbody[0];
			vscrollbararea.tclass('hidden', isMOBILE || (vb.scrollHeight - vb.clientHeight) === 0);
			hscrollbararea.tclass('hidden', isMOBILE || (hb.scrollWidth - hb.clientWidth) === 0);
		}, 500);
	};

	self.refreshfilter = function() {

		// Get data
		var obj = self.get();
		var items = obj instanceof Array ? obj : obj.items;
		var output = [];

		opt.selected = {};
		config.checkbox && header.find('.dg-checkbox-input').prop('checked', false);
		config.selected && EXEC(config.selected, EMPTYARRAY, self);

		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];

			item.ROW = i;

			if (opt.filter && !self.filter(item))
				continue;

			if (opt.search) {
				for (var j = 0; j < opt.cols.length; j++) {
					var col = opt.cols[j];
					if (col.search)
						item['$' + col.name] = col.search(item);
				}
			}

			output.push(item);
		}

		if (opt.scroll) {
			vbody.prop('scrollTop', 0);
			opt.scroll = false;
		}

		if (opt.sort != null) {
			opt.sort.sort && output.quicksort(opt.sort.name, opt.sort.sort === 1);
			self.redrawsorting();
		}

		self.resize();
		self.renderrows(output);

		var clusterize = opt.clusterize;

		if (clusterize) {
			clusterize.update(opt.render);
			clusterize.refresh();
		}

		self.scrolling();
	};

	self.redrawsorting = function() {
		self.find('.dg-sorting').each(function() {
			var el = $(this);
			var col = opt.cols[+el.attrd('index')];
			var fa = el.find('.dg-sort').rclass2('fa-');
			switch (col.sort) {
				case 1:
					fa.aclass('fa-arrow-up');
					break;
				case 2:
					fa.aclass('fa-arrow-down');
					break;
				default:
					fa.aclass('fa-sort');
					break;
			}
		});
	};

	self.redrawpagination = function() {

		if (!config.exec)
			return;

		var value = self.get();

		footer.find('button').each(function() {

			var el = $(this);
			var dis = true;

			switch (this.name) {
				case 'page-next':
					dis = value.page >= value.pages;
					break;
				case 'page-prev':
					dis = value.page === 1;
					break;
				case 'page-last':
					dis = value.page === value.pages;
					break;
				case 'page-first':
					dis = value.page === 1;
					break;
			}

			el.prop('disabled', dis);

		});

		footer.find('input').val(value.page);
		footer.find('.dg-pagination-pages').html(value.pages.pluralize.apply(value.pages, config.pluralizepages));
		footer.find('.dg-pagination-items').html(value.count.pluralize.apply(value.count, config.pluralizeitems));
		footer.rclass('hidden');
	};

	self.setter = function(value) {

		opt.selected = {};

		self.rendercols();
		self.refreshfilter();
		self.redrawpagination();

		if (opt.clusterize)
			return;

		var options = {};
		options.rows = opt.render;
		options.scrollElem = vbody[0];
		options.contentElem = body[0];
		options.callbacks = { scrollingProgress: self.scrolling };
		opt.clusterize = clusterize = new Clusterize(options);
	};

	self.scrolling = function() {
		config.checkbox && setTimeout2(self.ID, function() {
			body.find('.dg-checkbox-input').each(function() {
				this.checked = opt.selected[this.value] == 1;
			});
		}, 80, 10);
	};

	self.filter = function(row) {
		var keys = Object.keys(opt.filter);
		for (var i = 0; i < keys.length; i++) {

			var column = keys[i];
			var filter = opt.filter[column];
			var val2 = opt.filtercache[column];
			var val = row['$' + column] || row[column];
			var type = typeof(val);

			if (val instanceof Array) {
				val = val.join(' ');
				type = 'string';
			}

			if (type === 'number') {

				if (val2 == null)
					val2 = opt.filtercache[column] = self.parseNumber(filter);

				if (val2.length === 1 && val !== val2[0])
					return false;

				if (val < val2[0] || val > val2[1])
					return false;

			} else if (type === 'string') {

				if (val2 == null) {
					val2 = opt.filtercache[column] = filter.split(/\/\|\\|,/).trim();
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
					val2 = opt.filtercache[column] = config.boolean.indexOf(filter.replace(/\s/g, '')) !== -1;
				if (val2 !== val)
					return false;
			} else if (val instanceof Date) {

				val.setHours(0);
				val.setMinutes(0);

				if (val2 == null) {

					val2 = filter.trim().replace(/\s-\s/, '/').split(/\/|\||\\|,/).trim();
					var arr = opt.filtercache[column] = [];

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

	self.selected = function() {
		var arr = Object.keys(opt.selected);
		var output = [];
		var model = self.get();
		var rows = model instanceof Array ? model : model.items;
		for (var i = 0; i < arr.length; i++) {
			var index = +arr[i];
			output.push(rows[index]);
		}
		return output;
	};

	self.parseDate = function(val) {
		var index = val.indexOf('.');
		if (index === -1) {
			if ((/[a-z]+/).test(val)) {
				var dt;
				try {
					dt = NOW.add(val);
				} catch (e) {
					return [0, 0];
				}
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

}, ['https://cdnjs.cloudflare.com/ajax/libs/clusterize.js/0.18.0/clusterize.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/clusterize.js/0.18.0/clusterize.min.js']);