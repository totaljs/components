COMPONENT('directory', 'minwidth:200', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, timeout, icon, plus, skipreset = false, skipclear = false, ready = false, input = null, issearch = false;
	var is = false, selectedindex = 0, resultscount = 0;
	var templateE = '{{ name | encode | ui_directory_helper }}';
	var templateR = '{{ name | raw }}';
	var template = '<li data-index="{{ $.index }}" data-search="{{ $.search }}" class="{{ $.classes }}">{{ if $.checkbox }}<span class="' + cls + '-checkbox"><i class="fa fa-check"></i></span>{{ fi }}{0}</li>';
	var templateraw = template.format(templateR);
	var regstrip = /(&nbsp;|<([^>]+)>)/ig;
	var parentclass = null;
	var skiphide = false;
	var skipmouse = false;
	var main;

	template = template.format(templateE);

	Thelpers.ui_directory_helper = function(val) {
		var t = this;
		return t.template ? (typeof(t.template) === 'string' ? t.template.indexOf('{{') === -1 ? t.template : Tangular.render(t.template, this) : t.render(this, val)) : self.opt.render ? self.opt.render(this, val) : val;
	};

	self.template = Tangular.compile(template);
	self.templateraw = Tangular.compile(templateraw);

	self.readonly();
	self.singleton();
	self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'placeholder':
				self.find('input').prop('placeholder', value);
				break;
		}
	};

	self.make = function() {

		self.aclass('hidden ' + cls + '-area');
		self.append('<div class="{1}"><div class="{1}-search"><span class="{1}-add hidden"><i class="fa fa-plus"></i></span><span class="{1}-button"><i class="fa fa-search"></i></span><div><input type="text" placeholder="{0}" class="{1}-search-input" name="dir{2}" autocomplete="new-password" /></div></div><div class="{1}-container"><ul></ul></div></div>'.format(config.placeholder, cls, Date.now()));

		main = self.find(cls2);
		container = self.find('ul');
		input = self.find('input');
		icon = self.find(cls2 + '-button').find('.fa');
		plus = self.find(cls2 + '-add');

		self.event('mouseenter mouseleave', 'li', function() {
			if (ready && !issearch && !skipmouse) {
				container.find('li.current').rclass('current');
				$(this).aclass('current');
				var arr = container.find('li:visible');
				for (var i = 0; i < arr.length; i++) {
					if ($(arr[i]).hclass('current')) {
						selectedindex = i;
						break;
					}
				}
			}
		});

		self.element.on('click', function(e) {
			if (e.target === self.dom)
				self.hide(1);
		});

		var skiphidedelay;
		var skipmousedelay;
		var skipmousefalse = function() {
			skipmousedelay = null;
			skipmouse = false;
		};
		var skipmouseforce = function() {
			skipmouse = true;
			skipmousedelay && clearTimeout(skipmousedelay);
			skipmousedelay = setTimeout(skipmousefalse, 500);
		};

		self.event('focus', 'input', function() {

			skiphide = true;
			skiphidedelay && clearTimeout(skiphidedelay);
			skiphidedelay = setTimeout(function() {
				skiphide = false;
			}, 800);

			if (self.opt.search === false)
				$(this).blur();
		});

		self.event('click', cls2 + '-button', function(e) {
			skipclear = false;
			input.val('');
			self.search();
			e.stopPropagation();
			e.preventDefault();
		});

		self.event('click', cls2 + '-add', function() {
			if (self.opt.custom && self.opt.callback) {
				self.opt.scope && M.scope(self.opt.scope);
				self.opt.callback(input.val(), self.opt.element, true);
				self.hide();
			}
		});

		self.event('click', 'li', function(e) {

			var el = $(this);
			if (el.hclass('ui-disabled'))
				return;

			if (self.opt.callback) {

				self.opt.scope && M.scope(self.opt.scope);
				var item = self.opt.items[+el.attrd('index')];

				if (self.opt.checkbox) {
					item.selected = !item.selected;

					if (item.selected)
						item.selectedts = Date.now();
					else
						delete item.selectedts;

					el.tclass('selected', item.selected);

					if (self.opt.checked) {
						var tmpindex = self.opt.checked.indexOf(item.id);
						if (item.selected) {
							if (tmpindex === -1)
								self.opt.checked.push(item.id);
						} else if (tmpindex !== -1)
							self.opt.checked.splice(tmpindex, 1);
					}

					var response = null;

					if (self.opt.checked) {
						response = self.opt.checked.slice(0);
					} else {
						response = [];
						for (var i = 0; i < self.opt.items.length; i++) {
							var m = self.opt.items[i];
							if (m.selected)
								response.push(m);
						}
					}

					response.quicksort('selectedts');
					self.opt.callback(response, self.opt.element, false, e);
				} else
					self.opt.callback(item, self.opt.element, false, e);
			}

			is = true;

			if (!self.opt.checkbox) {
				self.hide(0);
				e.preventDefault();
				e.stopPropagation();
			}

		});

		var e_resize = function() {
			is && self.hide(0);
		};

		self.bindedevents = false;

		self.bindevents = function() {
			if (!self.bindedevents) {
				$(W).on('resize', e_resize);
				self.bindedevents = true;
			}
		};

		self.unbindevents = function() {
			if (self.bindedevents) {
				self.bindedevents = false;
				$(W).off('resize', e_resize);
			}
		};

		self.event('keydown', 'input', function(e) {
			var o = false;
			switch (e.which) {
				case 8:
					skipclear = false;
					break;
				case 27:
					o = true;
					self.hide();
					break;
				case 13:
					o = true;
					var sel = self.find('li.current');
					if (sel.hclass('ui-disabled'))
						return;
					if (self.opt.callback) {
						self.opt.scope && M.scope(self.opt.scope);
						var index = +sel.attrd('index');
						if (self.opt.custom && (!sel.length || index === -1))
							self.opt.callback(this.value, self.opt.element, true);
						else
							self.opt.callback(self.opt.items[index], self.opt.element);
					}
					self.hide();
					break;
				case 38: // up
					o = true;
					selectedindex--;
					if (selectedindex < 0)
						selectedindex = 0;
					self.move();
					break;
				case 40: // down
					o = true;
					selectedindex++;
					if (selectedindex >= resultscount)
						selectedindex = resultscount;
					self.move();
					break;
			}

			if (o) {
				skipmouseforce();
				e.preventDefault();
				e.stopPropagation();
			}

		});

		self.event('input', 'input', function() {
			issearch = true;
			setTimeout2(self.ID, self.search, 100, null, this.value);
		});

		var fn = function() {
			is && !skiphide && self.hide(1);
		};

		self.on('reflow + scroll + resize + resize2', fn);
		$(W).on('scroll', fn);
	};

	self.move = function() {

		var counter = 0;
		var scroller = container.parent();
		var li = container.find('li');
		var hli = 0;
		var was = false;
		var last = -1;
		var lastselected = 0;
		var plus = 0;

		for (var i = 0; i < li.length; i++) {

			var el = $(li[i]);

			if (el.hclass('hidden')) {
				el.rclass('current');
				continue;
			}

			var is = selectedindex === counter;
			el.tclass('current', is);

			if (is) {
				hli = (el.innerHeight() || 30) + 1;
				plus = (hli * 2);
				was = true;
				var t = (hli * (counter || 1));
				scroller[0].scrollTop = t - plus;
			}

			counter++;
			last = i;
			lastselected++;
		}

		if (!was && last >= 0) {
			selectedindex = lastselected;
			li.eq(last).aclass('current');
		}
	};

	var nosearch = function() {
		issearch = false;
	};

	self.nosearch = function() {
		setTimeout2(self.ID + 'nosearch', nosearch, 500);
	};

	self.search = function(value) {

		if (!self.opt)
			return;

		icon.tclass('fa-times', !!value).tclass('fa-search', !value);
		self.opt.custom && plus.tclass('hidden', !value);

		if (!value && !self.opt.ajax) {
			if (!skipclear)
				container.find('li').rclass('hidden');
			if (!skipreset)
				selectedindex = 0;
			resultscount = self.opt.items ? self.opt.items.length : 0;
			self.move();
			self.nosearch();
			return;
		}

		resultscount = 0;
		selectedindex = 0;

		if (self.opt.ajax) {
			var val = value || '';
			if (self.ajaxold !== val) {
				self.ajaxold = val;
				setTimeout2(self.ID, function(val) {
					self.opt && self.opt.ajax(val, function(items) {
						var builder = [];
						var indexer = {};
						var item;
						var key = (self.opt.search == true ? self.opt.key : (self.opt.search || self.opt.key)) || 'name';

						for (var i = 0; i < items.length; i++) {

							item = items[i];

							if (self.opt.exclude && self.opt.exclude(item))
								continue;

							if (self.opt.checked)
								item.selected = self.opt.checked.indexOf(item.id) !== -1;

							indexer.index = i;
							indexer.search = item[key] ? item[key].replace(regstrip, '') : '';
							indexer.checkbox = self.opt.checkbox === true;
							resultscount++;

							builder.push(self.opt.ta(item, indexer));
						}

						if (self.opt.empty) {
							item = {};
							var tmp = self.opt.raw ? '<b>{0}</b>'.format(self.opt.empty) : self.opt.empty;
							item[self.opt.key || 'name'] = tmp;
							if (!self.opt.raw)
								item.template = '<b>{0}</b>'.format(self.opt.empty);
							indexer.index = -1;
							builder.unshift(self.opt.ta(item, indexer));
						}

						skipclear = true;
						self.opt.items = items;
						container.html(builder);
						self.move();
						self.nosearch();
					});
				}, 300, null, val);
			}
		} else if (value) {
			value = value.toSearch().split(' ');
			var arr = container.find('li');
			for (var i = 0; i < arr.length; i++) {
				var el = $(arr[i]);
				var val = el.attrd('search').toSearch();
				var is = false;

				for (var j = 0; j < value.length; j++) {
					if (val.indexOf(value[j]) === -1) {
						is = true;
						break;
					}
				}

				el.tclass('hidden', is);

				if (!is)
					resultscount++;
			}
			skipclear = true;
			self.move();
			self.nosearch();
		}
	};

	self.show = function(opt) {

		// opt.element
		// opt.items
		// opt.callback(value, el)
		// opt.offsetX     --> offsetX
		// opt.offsetY     --> offsetY
		// opt.offsetWidth --> plusWidth
		// opt.placeholder
		// opt.render
		// opt.custom
		// opt.minwidth
		// opt.maxwidth
		// opt.key
		// opt.exclude    --> function(item) must return Boolean
		// opt.search
		// opt.selected   --> only for String Array "opt.items"
		// opt.classname
		// opt.checkbox
		// opt.checked;

		if (opt.checked == true)
			opt.checked = [];

		var el = opt.element instanceof jQuery ? opt.element[0] : opt.element;

		if (opt.items == null)
			opt.items = EMPTYARRAY;

		self.tclass(cls + '-default', !opt.render);

		if (parentclass) {
			self.rclass(parentclass);
			parentclass = null;
		}

		if (opt.classname) {
			main.aclass(opt.classname);
			parentclass = opt.classname;
		}

		if (!opt.minwidth)
			opt.minwidth = config.minwidth;

		if (is) {
			clearTimeout(timeout);
			if (self.target === el) {
				self.hide(1);
				return;
			}
		}

		self.initializing = true;
		self.target = el;
		opt.ajax = null;
		self.ajaxold = null;

		var element = opt.element ? $(opt.element) : null;
		var callback = opt.callback;
		var items = opt.items;
		var type = typeof(items);
		var item;

		if (type === 'string') {
			items = opt.items = GET(items);
			type = typeof(items);
		}

		if (type === 'function' && callback) {
			type = '';
			opt.ajax = items;
			items = null;
		}

		if (!items && !opt.ajax) {
			self.hide(0);
			return;
		}

		setTimeout(self.bindevents, 500);
		self.tclass(cls + '-search-hidden', opt.search === false);

		self.opt = opt;
		opt.class && main.aclass(opt.class);

		input.val('');

		var builder = [];
		var selected = null;

		opt.ta = opt.key ? Tangular.compile((opt.raw ? templateraw : template).replace(/\{\{\sname/g, '{{ ' + opt.key)) : opt.raw ? self.templateraw : self.template;

		if (!opt.ajax) {
			var indexer = {};
			var key = (opt.search == true ? opt.key : (opt.search || opt.key)) || 'name';
			for (var i = 0; i < items.length; i++) {

				item = items[i];

				if (typeof(item) === 'string')
					item = { name: item, id: item, selected: item === opt.selected };

				if (opt.exclude && opt.exclude(item))
					continue;

				if (item.selected || opt.selected === item) {
					selected = i;
					skipreset = true;
					item.selected = true;
				} else
					item.selected = false;

				if (opt.checked && item.selected)
					opt.checked.push(item.id);

				var c = '';

				if (item.selected)
					c += (c ? ' ' : 'selected current');

				if (item.classname)
					c += (c ? ' ' : item.classname);

				if (item.disabled)
					c += (c ? ' ' : 'ui-disabled');

				indexer.classes = c;
				indexer.checkbox = opt.checkbox === true;
				indexer.index = i;
				indexer.search = item[key] ? item[key].replace(regstrip, '') : '';
				builder.push(opt.ta(item, indexer));
			}

			if (opt.empty) {
				item = {};
				var tmp = opt.raw ? '<b>{0}</b>'.format(opt.empty) : opt.empty;
				item[opt.key || 'name'] = tmp;
				if (!opt.raw)
					item.template = '<b>{0}</b>'.format(opt.empty);
				indexer.index = -1;
				builder.unshift(opt.ta(item, indexer));
			}
		}

		self.target = element ? element[0] : null;

		var w = element ? element.width() : config.minwidth;
		var offset = element ? element.offset() : EMPTYOBJECT;
		var width = w + (opt.offsetWidth || 0);

		if (opt.minwidth && width < opt.minwidth)
			width = opt.minwidth;
		else if (opt.maxwidth && width > opt.maxwidth)
			width = opt.maxwidth;

		ready = false;
		opt.ajaxold = null;
		plus.aclass('hidden');
		self.find('input').prop('placeholder', opt.placeholder || config.placeholder);
		var scroller = self.find(cls2 + '-container').css('width', width + 30);
		container.html(builder);

		var options = { left: 0, top: 0, width: width };

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					options.left = Math.ceil((offset.left - width / 2) + (opt.element.innerWidth() / 2));
					break;
				case 'right':
					options.left = (offset.left - width) + opt.element.innerWidth();
					break;
				default:
					options.left = offset.left;
					break;
			}

			options.top = opt.position === 'bottom' ? ((offset.top - self.height()) + element.height()) : offset.top;
		} else {
			options.top = opt.y;
			options.left = opt.x;
		}

		options.scope = M.scope ? M.scope() : '';

		if (opt.offsetX)
			options.left += opt.offsetX;

		if (opt.offsetY)
			options.top += opt.offsetY;

		var mw = width;
		var mh = self.height();

		if (options.left < 0)
			options.left = 10;
		else if ((mw + options.left) > WW)
			options.left = (WW - mw) - 10;

		var dom = opt.element ? opt.element[0].parentNode : null;
		var restrict = true;

		while (dom) {

			if (dom.tagName === 'BODY') {
				restrict = false;
				break;
			}

			if (dom.classList.contains('ui-scrollbar-area'))
				break;

			dom = dom.parentNode;
		}

		if (options.top < 0)
			options.top = 10;
		else if (restrict && (mh + options.top) > WH)
			options.top = (WH - mh) - 10;

		main.css(options);

		!isMOBILE && setTimeout(function() {
			ready = true;
			if (opt.search !== false)
				input.focus();
		}, 200);

		setTimeout(function() {
			self.initializing = false;
			is = true;

			if (selected) {
				var h = container.find('li:first-child').innerHeight() + 1;
				var y = (container.find('li.selected').index() * h) - (h * 2);
				scroller[0].scrollTop = y < 0 ? 0 : y;
			} else
				scroller[0].scrollTop = 0;

			self.rclass('invisible');

		}, 100);

		if (is) {
			self.search();
			return;
		}

		selectedindex = selected || 0;
		resultscount = items ? items.length : 0;
		skipclear = true;

		self.search();
		self.aclass('invisible');
		self.rclass('hidden');

		setTimeout(function() {
			if (self.opt && ((self.opt.x != null && self.opt.y != null) || (self.target && self.target.offsetParent)))
				main.aclass(cls + '-visible');
			else
				self.hide(1);
		}, 100);

		skipreset = false;
	};

	self.hide = function(sleep) {
		if (!is || self.initializing)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.unbindevents();
			self.rclass(cls + '-visible').aclass('hidden');
			if (self.opt) {
				self.opt.close && self.opt.close();
				self.opt.class && self.rclass(self.opt.class);
				self.opt = null;
			}
			is = false;
		}, sleep ? sleep : 100);
	};
});