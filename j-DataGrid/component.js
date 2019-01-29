COMPONENT('datagrid', 'checkbox:true;colwidth:150;rowheight:27;limit:80;filterlabel:Filter;numbering:;height:auto;bottom:90;resize:true;reorder:true;sorting:true;boolean:true,on,yes;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;remember:true;highlight:false;unhighlight:true;autoselect:false;buttonapply:Apply;allowtitles:false;fullwidth_xs:true', function(self, config) {

	var opt = { filter: {}, filtercache: {}, filtervalues: {}, scroll: false, selected: {}, changed: {}, operation: '' };
	var header, vbody, footer, vcontainer, hcontainer, varea, hbody, vscrollbar, vscrollbararea, hscrollbar, hscrollbararea, ecolumns, isecolumns = false;
	var Theadercol = Tangular.compile('<div class="dg-hcol dg-col-{{ index }}{{ if sorting }} dg-sorting{{ fi }}" data-index="{{ index }}">{{ if sorting }}<i class="dg-sort fa fa-sort"></i>{{ fi }}<div class="dg-label{{ alignheader }}"{{ if labeltitle }} title="{{ labeltitle }}"{{ fi }}{{ if reorder }} draggable="true"{{ fi }}>{{ label | raw }}</div>{{ if filter }}<div class="dg-filter{{ alignfilter }}{{ if filterval != null && filterval !== \'\' }} dg-filter-selected{{ fi }}"><i class="fa dg-filter-cancel fa-times"></i>{{ if options }}<select class="dg-filter-input" data-name="{{ name }}" name="{{ name }}{{ index }}"><option value="">{{ filter }}</option></select>{{ else }}<input autocomplete="off" type="text" placeholder="{{ filter }}" class="dg-filter-input" name="{{ name }}{{ index }}" data-name="{{ name }}" value="{{ filterval }}" />{{ fi }}</div>{{ else }}<div class="dg-filter-empty">&nbsp;</div>{{ fi }}</div>');
	var isIE = (/msie|trident/i).test(navigator.userAgent);
	var isredraw = false;
	var pos = {};
	var sv = { is: false };
	var sh = { is: false };

	self.meta = opt;

	function Cluster(el) {

		var self = this;
		var dom = el[0];

		self.el = el;
		self.row = config.rowheight;
		self.rows = [];
		self.limit = config.limit;
		self.pos = -1;

		self.render = function() {
			var t = self.pos * self.frame;
			var b = (self.rows.length * self.row) - (self.frame * 2) - t;
			var pos = self.pos * self.limit;
			var h = self.rows.slice(pos, pos + (self.limit * 2));
			if (b < 2)
				b = 2;
			self.el.html('<div style="height:{0}px"></div>{2}<div style="height:{1}px"></div>'.format(t, b, h.join('')));
		};

		self.scrolling = function() {

			var y = dom.scrollTop + 1;
			if (y < 0)
				return;

			var frame = Math.ceil(y / self.frame) - 1;
			if (frame === -1)
				return;

			if (self.pos !== frame) {
				if (self.max && frame >= self.max)
					frame = self.max;
				self.pos = frame;
				self.render();
				self.scroll && self.scroll();
				config.change && EXEC(config.change, null, null, self.grid);
			}
		};

		self.update = function(rows, noscroll) {

			if (noscroll != true)
				self.el.prop('scrollTop', 0);

			self.limit = config.limit;
			self.pos = -1;
			self.rows = rows;
			self.max = Math.ceil(rows.length / self.limit) - 1;
			self.frame = self.limit * self.row;

			if (self.limit * 2 > rows.length) {
				self.limit = rows.length;
				self.frame = self.limit * self.row;
				self.max = 1;
			}

			self.scrolling();
		};

		self.destroy = function() {
			self.el.off('scroll');
			self.rows = null;
		};

		self.el.on('scroll', self.scrolling);
	}

	self.destroy = function() {
		opt.cluster && opt.cluster.destroy();
	};

	// opt.cols    --> columns
	// opt.rows    --> raw rendered data
	// opt.render  --> for cluster

	self.init = function() {
		$(window).on('resize', function() {
			setTimeout2('datagridresize', function() {
				SETTER('datagrid', 'resize');
			}, 500);
		});
	};

	self.readonly();
	self.bindvisible();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {
		switch (key) {
			case 'checkbox':
			case 'numbering':
				!init && self.cols(NOOP);
				break;
			case 'pluralizepages':
				config.pluralizepages = value.split(',').trim();
				break;
			case 'pluralizeitems':
				config.pluralizeitems = value.split(',').trim();
				break;
			case 'checked':
			case 'button':
			case 'exec':
				if (value && value.SCOPE)
					config[key] = value.SCOPE(self, value);
				break;
			case 'click':
				if (value && value.SCOPE)
					config.click = value.SCOPE(self, value);
				self.tclass('dg-clickable', !!value);
				break;
			case 'columns':
				self.datasource(value, function(path, value, type) {
					if (value) {
						self.rebind(value);
						type && self.setter(null);
					}
				});
				break;
		}
	};

	self.refresh = function() {
		self.refreshfilter();
	};

	self.applycolumns = function(use) {
		isecolumns = false;
		ecolumns.aclass('hidden');
		if (use) {
			var hidden = {};
			ecolumns.find('input').each(function() {
				hidden[this.value] = !this.checked;
			});
			self.cols(function(cols) {
				for (var i = 0; i < cols.length; i++) {
					var col = cols[i];
					col.hidden = hidden[col.id] === true;
				}
			});
		}
	};

	self.fn_in_changed = function(arr) {
		if (config.changed) {
			if (config.changed.indexOf('.') === -1)
				EXEC(config.changed, arr || self.changed(), self);
			else
				SET(config.changed, arr || self.changed());
		}
	};

	self.fn_in_checked = function(arr) {
		if (config.checked) {
			if (config.checked.indexOf('.') === -1)
				EXEC(config.checked, arr || self.checked(), self);
			else
				SET(config.checked, arr || self.checked());
		}
	};


	self.make = function() {

		self.IDCSS = GUID(5);
		self.aclass('dg dg-' + self.IDCSS);

		var scr = self.find('script');
		var meta = scr.html();
		meta && self.rebind(meta);

		var pagination = '';

		if (config.exec)
			pagination = '<div class="dg-footer hidden"><div class="dg-pagination-items hidden-xs"></div><div class="dg-pagination"><button name="page-first" disabled><i class="fa fa-angle-double-left"></i></button><button name="page-prev" disabled><i class="fa fa-angle-left"></i></button><div><input type="text" name="page" maxlength="5" class="dg-pagination-input" /></div><button name="page-next" disabled><i class="fa fa-angle-right"></i></button><button name="page-last" disabled><i class="fa fa-angle-double-right"></i></button></div><div class="dg-pagination-pages"></div></div>';

		self.html('<div class="dg-btn-columns"><i class="fa fa-caret-left"></i><span class="fa fa-columns"></span></div><div class="dg-columns hidden"><div><div class="dg-columns-body"></div></div><button class="dg-columns-button" name="columns-apply"><i class="fa fa-columns"></i>{1}</button></div><div class="dg-scrollbar-container-v hidden"><div class="dg-scrollbar-v hidden"></div></div><div class="dg-h-container"><div class="dg-h-body"><div class="dg-v-container"><div class="dg-v-area"><div class="dg-header"></div><div class="dg-v-body"></div></div></div></div></div><div class="dg-scrollbar-container-h hidden"><div class="dg-scrollbar-h hidden"></div></div>{0}'.format(pagination, config.buttonapply));

		varea = self.find('.dg-v-area');
		vcontainer = self.find('.dg-v-container');
		header = self.find('.dg-header');
		vbody = self.find('.dg-v-body');
		footer = self.find('.dg-footer');
		hbody = self.find('.dg-h-body');
		hcontainer = self.find('.dg-h-container');
		ecolumns = self.find('.dg-columns');

		// Scrollbars
		vscrollbar = self.find('.dg-scrollbar-v');
		vscrollbararea = self.find('.dg-scrollbar-container-v');
		hscrollbar = self.find('.dg-scrollbar-h');
		hscrollbararea = self.find('.dg-scrollbar-container-h');

		opt.vbarsize = 30;
		opt.hbarsize = 30;

		// Gets a top/left position of vertical/horizontal scrollbar
		pos.vscroll = vscrollbararea.css('top').parseInt();
		pos.hscroll = hscrollbararea.css('left').parseInt();

		var events = {};

		events.mousemove = function(e) {
			var p, scroll, half, off;
			if (sv.is) {

				off = sv.offset;
				var y = (e.pageY - sv.y);

				if (e.pageY > sv.pos) {
					half = sv.size / 1.5 >> 0;
					if (off < half)
						off = half;
				}

				p = (y / (sv.h - off)) * 100;
				scroll = ((vbody[0].scrollHeight - opt.height) / 100) * (p > 100 ? 100 : p);
				vbody[0].scrollTop = Math.ceil(scroll);

				if (sv.counter++ > 10) {
					sv.counter = 0;
					sv.pos = e.pageY;
				}

				if (p < -20 || p > 120)
					sv.is = false;

			} else if (sh.is) {

				off = sh.offset;
				var x = (e.pageX - sh.x);

				if (e.pageX > sh.pos) {
					half = sh.size / 1.5 >> 0;
					if (off < half)
						off = half;
				}

				p = (x / (sh.w - off)) * 100;
				scroll = ((hbody[0].scrollWidth - opt.width2) / 100) * (p > 100 ? 100 : p);
				hbody[0].scrollLeft = Math.ceil(scroll);

				if (sh.counter++ > 10) {
					sh.counter = 0;
					sh.pos = e.pageX;
				}

				if (p < -20 || p > 120)
					sh.is = false;

			}
		};

		events.mouseup = function(e) {
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
			events.unbind();
		};

		events.unbind = function() {
			$(window).off('mouseup', events.mouseup);
			$(window).off('mousemove', events.mousemove);
		};

		events.bind = function() {
			$(window).on('mouseup', events.mouseup);
			$(window).on('mousemove', events.mousemove);
		};

		vscrollbararea.on('mousedown', function(e) {

			events.bind();

			var el = $(e.target);
			if (el.hclass('dg-scrollbar-v')) {
				sv.is = true;
				sv.y = self.element.offset().top + e.offsetY + 60;
				sv.h = vscrollbararea.height();
				sv.pos = e.pageY;
				sv.offset = e.offsetY;
				sv.counter = 0;
				e.preventDefault();
				e.stopPropagation();
			} else if (el.hclass('dg-scrollbar-container-v')) {
				sv.is = false;
				sv.y = self.element.offset().top + pos.vscroll;
				sv.h = vscrollbararea.height();
				var y = (e.pageY - sv.y);
				var p = (y / sv.h) * 100;
				var scroll = ((vbody[0].scrollHeight - opt.height) / 100) * p;
				var plus = (p / 100) * opt.vbarsize;
				vbody.prop('scrollTop', Math.ceil(scroll + plus));
				e.preventDefault();
				e.stopPropagation();
			}
		});

		hscrollbararea.on('mousedown', function(e) {

			events.bind();

			var el = $(e.target);
			if (el.hclass('dg-scrollbar-h')) {
				sh.is = true;
				sh.x = self.element.offset().left + e.offsetX;
				sh.w = hscrollbararea.width();
				sh.pos = e.pageX;
				sh.offset = e.offsetX;
				sh.counter = 0;
				e.preventDefault();
				e.stopPropagation();
			} else if (el.hclass('dg-scrollbar-container-h')) {
				sh.is = false;
				sh.w = hscrollbararea.width();
				var x = e.offsetX;
				var p = (x / sh.w) * 100;
				var scroll = ((hbody[0].scrollWidth - opt.width2) / 100) * p;
				var plus = (p / 100) * opt.hbarsize;
				hbody.prop('scrollLeft', Math.ceil(scroll + plus));
				e.preventDefault();
				e.stopPropagation();
			}
		});

		vbody.on('scroll', function(e) {
			var el = e.target;
			var p = ((el.scrollTop / (el.scrollHeight - opt.height)) * 100) >> 0;
			var pos = (((opt.height - opt.vbarsize) / 100) * p);
			if (pos < 0)
				pos = 0;
			else {
				var max = opt.height - opt.vbarsize;
				if (pos > max)
					pos = max;
			}
			vscrollbar.css('top', pos + 'px');
			isecolumns && self.applycolumns();
		});

		hbody.on('scroll', function(e) {

			var el = e.target;
			var p = ((el.scrollLeft / (el.scrollWidth - opt.width2)) * 100) >> 0;
			var pos = (((opt.width2 - opt.hbarsize) / 100) * p);
			if (pos < 0)
				pos = 0;
			else {
				var max = opt.width2 - opt.hbarsize;
				if (pos > max)
					pos = max;
			}

			hscrollbar.css('left', pos + 'px');
			isecolumns && self.applycolumns();
		});

		var r = { is: false };

		self.event('click', '.dg-btn-columns', function(e) {
			e.preventDefault();
			e.stopPropagation();

			var cls = 'hidden';
			if (isecolumns) {
				self.applycolumns();
			} else {
				var builder = [];

				for (var i = 0; i < opt.cols.length; i++) {
					var col = opt.cols[i];
					(col.listcolumn && !col.$hidden) && builder.push('<div><label><input type="checkbox" value="{0}"{1} /><span>{2}</span></label></div>'.format(col.id, col.hidden ? '' : ' checked', col.text));
				}

				ecolumns.find('.dg-columns-body').html(builder.join(''));
				ecolumns.rclass(cls);
				isecolumns = true;
			}
		});

		self.event('dblclick', '.dg-col', function(e) {

			if (!config.change)
				return;

			var col = $(this);
			var index = col.attr('class').match(/\d+/);

			if (index == null)
				return;

			index = +index[0];

			var row = col.closest('.dg-row');
			var data = {};

			data.index = +row.attrd('index');
			data.row = opt.rows[data.index];
			data.col = opt.cols[index];
			data.value = data.row[data.col.name];
			data.elrow = row;
			data.elcol = col;

			EXEC(config.change, data, function(data) {

				data.row[data.col.name] = data.value;

				if (opt.rows[data.index] != data.row)
					opt.rows[data.index] = data.row;

				if (!data.row.CHANGES)
					data.row.CHANGES = {};

				data.row.CHANGES[data.col.name] = true;
				opt.render[data.index] = self.renderrow(data.index, data.row);
				data.elrow.replaceWith(opt.render[data.index]);
				opt.changed[data.index] = 1;
				self.fn_in_changed();
			}, self);

			e.preventDefault();
			e.stopPropagation();
		});

		self.event('click', '.dg-row', function(e) {
			var el = $(this);
			var type = e.target.nodeName;
			var target = $(e.target);
			switch (type) {
				case 'DIV':
				case 'SPAN':
					if (!target.closest('.dg-checkbox').length) {
						var elrow = el.closest('.dg-row');
						var index = +elrow.attrd('index');
						var row = opt.rows[index];
						if (row) {
							if (config.highlight) {
								var cls = 'dg-selected';
								opt.cluster.el.find('> .' + cls).rclass(cls);
								if (!config.unhighlight || self.selected !== row) {
									self.selected = row;
									elrow.aclass(cls);
								} else {
									self.selected = null;
									elrow = null;
									target = null;
									row = null;
								}
							}
							config.click && EXEC(config.click, row, self, elrow, target);
						}
					}
					break;
			}
		});

		self.event('click', '.dg-filter-cancel', function() {
			var el = $(this);
			el.parent().find('input,select').val('').trigger('change');
		});

		self.event('click', '.dg-label,.dg-sort', function() {

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
			opt.operation = 'sort';

			if (config.exec)
				self.operation(opt.operation);
			else
				self.refreshfilter(true);
		});

		isIE && self.event('keydown', 'input', function(e) {
			if (e.keyCode === 13)
				$(this).blur();
			else if (e.keyCode === 27)
				$(this).val('');
		});

		self.event('mousedown', function(e) {
			var el = $(e.target);

			if (!el.hclass('dg-resize'))
				return;

			events.bind();

			var offset = self.element.offset().left;
			r.el = el;
			r.offset = (hbody.scrollLeft() - offset) + 10;

			var prev = el.prev();

			r.min = (prev.length ? prev.css('left').parseInt() : (config.checkbox ? 70 : 30)) + 50;

			r.h = el.css('height');
			r.x = el.css('left').parseInt();
			el.css('height', opt.height + config.bottom);
			r.is = true;
			e.preventDefault();
			e.stopPropagation();
		});

		header.on('mousemove', function(e) {
			if (r.is) {
				var x = e.pageX + r.offset - 20;
				if (x < r.min)
					x = r.min;
				r.el.css('left', x);
				e.preventDefault();
				e.stopPropagation();
			}
		});

		var d = { is: false };

		self.event('dragstart', function(e) {
			!isIE && e.originalEvent.dataTransfer.setData('text/plain', GUID());
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
				default:
					return;
			}
		});

		self.event('change', '.dg-pagination-input', function() {

			var value = self.get();
			var val = +this.value;

			if (isNaN(val))
				return;

			if (val >= value.pages)
				val = value.pages;
			else if (val < 1)
				val = 1;

			value.page = val;
			opt.scroll = true;
			self.operation('page');
		});

		self.event('change', '.dg-filter-input', function() {

			var input = this;
			var $el = $(this);
			var el = $el.parent();
			var val = $el.val();
			var name = input.getAttribute('data-name');

			var col = opt.cols[+el.closest('.dg-hcol').attrd('index')];
			delete opt.filtercache[name];

			if (col.options) {
				if (val)
					val = (col.options instanceof Array ? col.options : GET(col.options))[+val][col.ovalue];
				else
					val = null;
			}

			var is = val != null && val !== '';

			if (col)
				opt.filtervalues[col.id] = val;

			if (is) {
				if (opt.filter[name] == val)
					return;
				opt.filter[name] = val;
			} else
				delete opt.filter[name];

			opt.scroll = true;
			opt.operation = 'filter';
			el.tclass('dg-filter-selected', is);

			if (config.exec)
				self.operation(opt.operation);
			else
				self.refreshfilter(true);
		});

		self.select = function(row) {

			var index;

			if (typeof(row) === 'number') {
				index = row;
				row = opt.rows[index];
			} else if (row)
				index = opt.rows.indexOf(row);

			var cls = 'dg-selected';

			if (!row || index === -1) {
				opt.cluster && opt.cluster.el.find('.' + cls).rclass(cls);
				config.highlight && config.click && EXEC(config.click, null, self);
				return;
			}

			self.selected = row;

			var elrow = opt.cluster.el.find('.dg-row[data-index="{0}"]'.format(index));
			if (elrow && config.highlight) {
				opt.cluster.el.find('.' + cls).rclass(cls);
				elrow.aclass(cls);
			}

			config.click && EXEC(config.click, row, self, elrow, null);
		};

		self.event('click', '.dg-checkbox', function() {

			var t = $(this);

			t.tclass('dg-checked');

			var val = t.attrd('value');
			var checked = t.hclass('dg-checked');

			if (val === '-1') {
				if (checked) {
					opt.checked = {};
					for (var i = 0; i < opt.rows.length; i++)
						opt.checked[opt.rows[i].ROW] = 1;
				} else
					opt.checked = {};
				self.scrolling();
			} else if (checked)
				opt.checked[val] = 1;
			else
				delete opt.checked[val];

			self.fn_in_checked();
		});

		self.event('click', 'button', function(e) {
			switch (this.name) {
				case 'columns-apply':
					self.applycolumns(true);
					break;
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
					config.button && EXEC(config.button, this.name, row, self, e);
					break;
			}
		});

		config.exec && self.operation('init');
	};

	self.operation = function(type) {

		var value = self.get();

		if (value == null)
			value = {};

		if (type === 'filter' || type === 'init')
			value.page = 1;

		var keys = Object.keys(opt.filter);
		EXEC(config.exec, type, keys.length ? opt.filter : null, opt.sort && opt.sort.sort ? [(opt.sort.name + ' ' + (opt.sort.sort === 1 ? 'asc' : 'desc'))] : null, value.page, self);

		switch (type) {
			case 'sort':
				self.redrawsorting();
				break;
		}
	};

	function align(type) {
		return type === 1 ? 'center' : type === 2 ? 'right' : type;
	}

	self.clear = function() {
		opt.changed = {};
		for (var i = 0; i < opt.rows.length; i++)
			opt.rows[i].CHANGES = undefined;
		self.renderrows(opt.rows, true);
		opt.cluster && opt.cluster.update(opt.render);
		self.fn_in_changed();
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

			if (!col.name)
				col.name = col.id;

			if(col.listcolumn == null)
				col.listcolumn = true;

			if (col.hidden) {
				col.$hidden = FN(col.hidden)(col) === true;
				col.hidden = true;
			}

			if (col.hide) {
				col.hidden = col.hide === true;
				delete col.hide;
			}

			if (col.options) {
				!col.otext && (col.otext = 'text');
				!col.ovalue && (col.ovalue = 'value');
			}

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

			if (col.alignfilter != null)
				col.alignfilter = ' ' + align(col.alignfilter);

			if (col.alignheader != null)
				col.alignheader = ' ' + align(col.alignheader);

			col.sort = 0;

			if (col.search) {
				opt.search = true;
				col.search = col.search === true ? Tangular.compile(col.template) : Tangular.compile(col.search);
			}

			if (col.align && col.align !== 'left') {
				col.align = align(col.align);
				col.align = ' ' + col.align;
				if (!col.alignfilter)
					col.alignfilter = ' center';
				if (!col.alignheader)
					col.alignheader = ' center';
			}

			if (col.template)
				col.template = Tangular.compile((col.template.indexOf('<button') === -1 ? '<div class="dg-value">{0}</div>' : '{0}').format(col.template));
			else
				col.template = Tangular.compile(('<div class="dg-value"' + (config.allowtitles ? ' title="{{ {0} }}"' : '') + '>{{ {0} }}</div>').format(col.name + (col.format ? ' | format({0}) '.format(typeof(col.format) === 'string' ? ('\'' + col.format + '\'') : col.format) : '')));

			if (col.header)
				col.header = Tangular.compile(col.header);
			else
				col.header = Tangular.compile('{{ text | raw }}');

			if (!col.text)
				col.text = col.name;

			if (col.text.substring(0, 1) === '.')
				col.text = '<i class="{0}"></i>'.format(col.text.substring(1));

			if (col.filter !== false && !col.filter)
				col.filter = config.filterlabel;
		}

		cols.quicksort('index');
		opt.cols = cols;
		self.rebindcss();
		hbody && hbody.prop('scrollLeft', 0);
		vbody && vbody.prop('scrollTop', 0);
	};

	self.rebindcss = function() {

		var cols = opt.cols;
		var css = [];
		var indexes = {};

		opt.width = (config.numbering !== false ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];

			if (!col.width)
				col.width = config.colwidth;

			css.push('.dg-{2} .dg-col-{0}{width:{1}px}'.format(i, col.width, self.IDCSS));

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
			css = { width: opt.width };
			vcontainer.css(css);
			css.width += 50;
			varea.css(css);
		}

		header && header.find('.dg-resize').each(function() {
			var el = $(this);
			el.css('left', indexes[el.attrd('index')] - 39);
		});
	};

	self.cols = function(callback) {
		callback(opt.cols);
		opt.cols.quicksort('index');
		self.rebindcss();
		self.rendercols();
		opt.rows && self.renderrows(opt.rows);
		self.save();
		opt.cluster && opt.cluster.update(opt.render);
		self.resize();
	};

	self.rendercols = function() {

		var Trow = '<div class="dg-hrow dg-row-{0}">{1}</div>';
		var column = config.numbering !== false ? Theadercol({ index: -1, label: config.numbering, filter: false, name: '$', sorting: false }) : '';
		var resize = [];

		opt.width = (config.numbering !== false ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		if (config.checkbox)
			column += Theadercol({ index: -1, label: '<div class="dg-checkbox" data-value="-1"><i class="fa fa-check"></i></div>', filter: false, name: '$', sorting: false });

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			if (!col.hidden) {
				var obj = { index: i, label: col.header(col), filter: col.filter, reorder: config.reorder, sorting: col.sorting, name: col.name, alignfilter: col.alignfilter, alignheader: col.alignheader, filterval: opt.filtervalues[col.id], labeltitle: col.title || col.text, options: col.options ? col.options instanceof Array ? col.options : GET(col.options) : null };
				opt.width += col.width;
				config.resize && resize.push('<span class="dg-resize" style="left:{0}px" data-index="{1}"></span>'.format(opt.width - 39, i));
				column += Theadercol(obj);
			}
		}

		column += '<div class="dg-hcol"></div>';
		header.html(resize.join('') + Trow.format(0, column));

		var w = self.width();
		if (w > opt.width)
			opt.width = w;

		var css = { width: opt.width };
		vcontainer.css(css);
		css.width += 50;
		varea.css(css);

		header.find('select').each(function() {
			var el = $(this);
			var index = +el.closest('.dg-hcol').attrd('index');
			var builder = [];
			var col = opt.cols[index];
			var opts = col.options instanceof Array ? col.options : GET(col.options);
			for (var i = 0; i < opts.length; i++) {
				var item = opts[i];
				builder.push('<option value="{0}"{1}>{2}</option>'.format(i, opt.filtervalues[col.id] === item[col.ovalue] ? ' selected' : '', item[col.otext]));
			}
			el.append(builder.join(''));
		});
	};

	self.redraw = function(update) {
		var x = hbody.prop('scrollLeft');
		var y = vbody.prop('scrollTop');
		isredraw = update ? 2 : 1;
		self.refreshfilter();
		isredraw = 0;
		hbody.prop('scrollLeft', x);
		vbody.prop('scrollTop', y);
	};

	self.redrawrow = function(row) {
		var index = opt.rows.indexOf(row);
		if (index !== -1) {
			var el = vbody.find('.dg-row[data-index="{0}"]'.format(index));
			if (el.length)
				self.renderrow(index, row);
		}
	};

	self.renderrow = function(index, row, plus) {

		if (plus === undefined && config.exec) {
			// pagination
			var val = self.get();
			plus = (val.page - 1) * val.limit;
		}

		var Trow = '<div class="dg-row dg-row-{0}{3}{4}" data-index="{2}">{1}</div>';
		var Tcol = '<div class="dg-col dg-col-{0}{2}{3}">{1}</div>';
		var column = '';

		if (config.numbering !== false)
			column += Tcol.format(-1, '<div class="dg-number">{0}</div>'.format(index + 1 + (plus || 0)));

		if (config.checkbox)
			column += Tcol.format(-1, '<div class="dg-checkbox{1}" data-value="{0}"><i class="fa fa-check"></i></div>'.format(row.ROW, opt.checked[row.ROW] ? ' dg-checked' : ''));

		for (var j = 0; j < opt.cols.length; j++) {
			var col = opt.cols[j];
			if (!col.hidden)
				column += Tcol.format(j, col.template(row), col.align, row.CHANGES && row.CHANGES[col.name] ? ' dg-col-changed' : '');
		}

		column += '<div class="dg-col">&nbsp;</div>';
		return Trow.format(index + 1, column, index, self.selected === row ? ' dg-selected' : '', row.CHANGES ? ' dg-row-changed' : '');
	};

	self.renderrows = function(rows, noscroll) {

		opt.rows = rows;

		var output = [];
		var plus = 0;

		if (config.exec) {
			// pagination
			var val = self.get();
			plus = (val.page - 1) * val.limit;
		}

		for (var i = 0, length = rows.length; i < length; i++)
			output.push(self.renderrow(i, rows[i], plus));

		var min = ((opt.height / config.rowheight) >> 0) + 1;
		var is = output.length < min;

		if (is) {
			for (var i = output.length; i < min + 1; i++)
				output.push('<div class="dg-row-empty">&nbsp;</div>');
		}

		if (noscroll) {
			self.tclass('dg-noscroll', is);
			hbody.prop('scrollLeft', 0);
			vbody.prop('scrollTop', 0);
		}

		opt.render = output;
		self.onrenderrows && self.onrenderrows(opt);
	};

	self.exportrows = function(page_from, pages_count, callback, reset_page_to, sleep) {

		var arr = [];
		var source = self.get();

		if (reset_page_to === true)
			reset_page_to = source.page;

		if (page_from === true)
			reset_page_to = source.page;

		pages_count = page_from + pages_count;

		if (pages_count > source.pages)
			pages_count = source.pages;

		for (var i = page_from; i < pages_count; i++)
			arr.push(i);

		!arr.length && arr.push(page_from);

		var index = 0;
		var rows = [];

		arr.wait(function(page, next) {
			opt.scroll = (index++) === 0;
			self.get().page = page;
			self.operation('page');
			self.onrenderrows = function(opt) {
				rows.push.apply(rows, opt.rows);
				setTimeout(next, sleep || 100);
			};
		}, function() {
			self.onrenderrows = null;
			callback(rows, opt);

			if (reset_page_to > 0) {
				self.get().page = reset_page_to;
				self.operation('page');
			}
		});
	};

	self.reordercolumn = function(index, position) {

		var col = opt.cols[index];
		if (!col)
			return;

		var old = col.index;

		opt.cols[index].index = position + (old < position ? 0.2 : -0.2);
		opt.cols.quicksort('index');

		for (var i = 0; i < opt.cols.length; i++) {
			col = opt.cols[i];
			col.index = i;
		}

		opt.cols.quicksort('index');

		self.rebindcss();
		self.rendercols();
		self.renderrows(opt.rows);

		opt.sort && opt.sort.sort && self.redrawsorting();
		opt.cluster && opt.cluster.update(opt.render, true);
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

	self.rows = function() {
		return opt.rows.slice(0);
	};

	self.resize = function() {

		if (!opt.cols)
			return;

		var el;
		var sbw = 10;

		switch (config.height) {
			case 'auto':
				el = self.element;
				opt.height = (WH - (el.offset().top + config.bottom) - (config.exec ? 30 : 0)) + sbw;
				vbody.css('height', opt.height);
				break;
			case 'parent':
				el = self.element.parent();
				opt.height = (el.height() - config.bottom - (config.exec ? 30 : 0)) + sbw;
				vbody.css('height', opt.height);
				break;
			default:
				if (config.height > 0) {
					vbody.css('height', config.height);
					opt.height = config.height;
				} else {
					el = self.element.closest(config.height);
					opt.height = (el.height() - config.bottom - (config.exec ? 30 : 0)) + sbw;
					vbody.css('height', opt.height);
				}
				break;
		}

		var w;

		if (config.fullwidth_xs && WIDTH() === 'xs' && isMOBILE) {
			var isfrm = false;
			try {
				isfrm = window.self !== window.top;
			} catch (e) {
				isfrm = true;
			}
			if (isfrm) {
				w = screen.width - (self.element.offset().left * 2);
				self.css('width', w);
			}
		}

		if (w == null)
			w = self.width();

		var width = (config.numbering !== false ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			if (!col.hidden)
				width += col.width;
		}

		if (w > width)
			width = w - 2;

		vcontainer.css('width', width);
		varea.css('width', width + 50);
		vscrollbararea.css('height', opt.height - 1);
		hscrollbararea.css('width', w);

		var plus = hbody.offset().top;

		if (plus < 24)
			plus = 24;

		hbody.css('height', opt.height + 50 + plus);
		hcontainer.css('height', opt.height + 50 + 7);

		opt.width2 = w;
		var hb = hbody[0];
		var issh = ((hb.scrollWidth - hb.clientWidth) < 5);

		hscrollbararea.tclass('hidden', issh);

		if (!issh) {
			hbody.css('height', (opt.height + 50 + plus) - sbw);
			vbody.css('height', opt.height - sbw);
			hcontainer.css('height', (opt.height + 50 + 7) - sbw);
			vscrollbararea.css('height', opt.height - 1 - sbw);
		}

		setTimeout2(self.ID, function() {
			var vb = vbody[0];
			var hb = hbody[0];

			var ish = isMOBILE || (hb.scrollWidth - hb.clientWidth) < 5;
			if (!ish) {
				hbody.css('height', (opt.height + 50 + plus) - sbw);
				vbody.css('height', opt.height - sbw);
				hcontainer.css('height', (opt.height + 50 + 7) - sbw);
				vscrollbararea.css('height', opt.height - 1 - sbw);
			}

			hscrollbar.rclass('hidden');
			vscrollbar.rclass('hidden');

			// Scrollbars
			vscrollbararea.tclass('hidden', isMOBILE || (vb.scrollHeight - vb.clientHeight) < 5);
			hscrollbararea.tclass('hidden', ish);

			var barsize = (w * (w / width)) >> 0;
			if (barsize < 30)
				barsize = 30;

			hscrollbar.css('width', barsize);
			opt.hbarsize = barsize;
			sh.size = barsize;

			barsize = (opt.height * (opt.height / vb.scrollHeight)) >> 0;
			if (barsize < 30)
				barsize = 30;

			sv.size = barsize;
			vscrollbar.css('height', barsize);
			opt.vbarsize = barsize;

			// Empty rows
			var min = ((opt.height / config.rowheight) >> 0) + 1;
			var is = (opt.rows ? opt.rows.length : 0) < min;
			self.tclass('dg-noscroll', is);

			// rescroll
			vbody.prop('scrollTop', vbody.prop('scrollTop') - 1);
			hbody.prop('scrollLeft', hbody.prop('scrollLeft') - 1);
		}, 500);
	};

	self.refreshfilter = function(useraction) {

		// Get data
		var obj = self.get() || EMPTYARRAY;
		var items = (obj instanceof Array ? obj : obj.items) || EMPTYARRAY;
		var output = [];

		if (isredraw) {
			if (isredraw === 2) {
				self.fn_in_checked();
				self.fn_in_changed();
			}
		} else {
			opt.checked = {};
			config.checkbox && header.find('.dg-checkbox').rclass('dg-checked');
			self.fn_in_checked(EMPTYARRAY);
		}

		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];

			item.ROW = i;

			if (!config.exec) {
				if (opt.filter && !self.filter(item))
					continue;
				if (opt.search) {
					for (var j = 0; j < opt.cols.length; j++) {
						var col = opt.cols[j];
						if (col.search)
							item['$' + col.name] = col.search(item);
					}
				}
			}

			output.push(item);
		}

		if (!isredraw) {

			if (opt.scroll) {
				vbody.prop('scrollTop', 0);
				if (useraction)	{
					var sl = hbody.prop('scrollLeft');
					hbody.prop('scrollLeft', sl ? sl - 1 : 0);
				} else
					hbody.prop('scrollLeft', 0);
				opt.scroll = false;
			}

			if (opt.sort != null) {
				opt.sort.sort && output.quicksort(opt.sort.name, opt.sort.sort === 1);
				self.redrawsorting();
			}
		}

		self.resize();
		self.renderrows(output, isredraw);

		setTimeout(self.resize, 100);
		opt.cluster && opt.cluster.update(opt.render, opt.scroll == false);
		self.scrolling();

		if (isredraw) {
			if (isredraw === 2) {
				// re-update all items
				self.select(self.selected || null);
			}
		} else {
			if (config.autoselect && output && output.length) {
				setTimeout(function() {
					self.select(output[0]);
				}, 1);
			} else if (opt.operation !== 'sort')
				self.select(null);
		}
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

	self.resetfilter = function() {
		opt.filter = {};
		opt.filtercache = {};
		opt.filtervalues = {};
		opt.cols && self.rendercols();
		if (config.exec)
			self.operation('refresh');
		else
			self.refresh();
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

		if (!opt.cols)
			return;

		if (config.exec && value == null) {
			self.operation('refresh');
			return;
		}

		opt.checked = {};
		opt.changed = {};
		opt.scroll = true;

		self.applycolumns();
		self.refreshfilter();
		self.redrawpagination();
		self.fn_in_changed();

		!config.exec && self.rendercols();

		if (opt.cluster)
			return;

		config.exec && self.rendercols();
		opt.cluster = new Cluster(vbody);
		opt.cluster.grid = self;
		opt.cluster.scroll = self.scrolling;
		opt.render && opt.cluster.update(opt.render);
		self.aclass('dg-visible');
	};

	self.scrolling = function() {
		config.checkbox && setTimeout2(self.ID, function() {
			vbody.find('.dg-checkbox').each(function() {
				$(this).tclass('dg-checked', opt.checked[this.getAttribute('data-value')] == 1);
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
			} else if (val && type === 'object' && !(val instanceof Date)) {
				val = JSON.stringify(val);
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
					val2 = opt.filtercache[column] = typeof(filter) === 'string' ? config.boolean.indexOf(filter.replace(/\s/g, '')) !== -1 : filter;
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
						var a = self.parseDate(dt, j === 1);
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

				if (val2.length === 1) {
					if (val2[0].YYYYMM)
						return val.format('yyyyMM') === val2[0].format('yyyyMM');
					if (val.format('yyyyMMdd') !== val2[0].format('yyyyMMdd'))
						return false;
				}

				if (val < val2[0] || val > val2[1])
					return false;

			} else
				return false;
		}

		return true;
	};

	self.checked = function() {
		var arr = Object.keys(opt.checked);
		var output = [];
		var model = self.get();
		var rows = model instanceof Array ? model : model.items;
		for (var i = 0; i < arr.length; i++) {
			var index = +arr[i];
			output.push(rows[index]);
		}
		return output;
	};

	self.changed = function() {
		var arr = Object.keys(opt.changed);
		var output = [];
		var model = self.get();
		var rows = model instanceof Array ? model : model.items;
		for (var i = 0; i < arr.length; i++) {
			var index = +arr[i];
			output.push(rows[index]);
		}
		return output;
	};

	self.parseDate = function(val, second) {

		var index = val.indexOf('.');
		var m, y, d, a, special, tmp;

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
				return [new Date(+val, 0, 1), new Date(+val + 1, 0, 1)];
		} else if (val.indexOf('.', index + 1) === -1) {
			a = val.split('.');
			if (a[1].length === 4) {
				y = +a[1];
				m = +a[0] - 1;
				d = second ? new Date(y, m, 0).getDate() : 1;
				special = true;
			} else {
				y = NOW.getFullYear();
				m = +a[1] - 1;
				d = +a[0];
			}

			tmp = new Date(y, m, d);
			if (special)
				tmp.YYYYMM = true;
			return tmp;
		}
		index = val.indexOf('-');
		if (index !== -1 && val.indexOf('-', index + 1) === -1) {
			a = val.split('-');
			if (a[0].length === 4) {
				y = +a[0];
				m = +a[1] - 1;
				d = second ? new Date(y, m, 0).getDate() : 1;
				special = true;
			} else {
				y = NOW.getFullYear();
				m = +a[0] - 1;
				d = +a[1];
			}

			tmp = new Date(y, m, d);

			if (special)
				tmp.YYYYMM = true;

			return tmp;
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
});