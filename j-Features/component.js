COMPONENT('features', 'height:35', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, timeout, input, search, scroller = null;
	var is = false, results = false, selectedindex = 0, resultscount = 0;

	self.oldsearch = '';
	self.items = null;
	self.template = Tangular.compile('<li data-search="{{ $.search }}" data-index="{{ $.index }}"{{ if selected }} class="selected"{{ fi }}>{{ if icon }}<i class="{{ icon }}"></i>{{ fi }}{{ name | raw }}</li>');
	self.callback = null;
	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

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

		self.aclass(cls + '-layer hidden');
		self.append('<div class="{1}"><div class="{1}-search"><span><i class="ti ti-search"></i></span><div><input type="text" placeholder="{0}" class="{1}-search-input" /></div></div><div class="{1}-scrollbar"><div class="{1}-container"><ul></ul></div></div></div>'.format(config.placeholder, cls));

		container = self.find('ul');
		self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: true, orientation: 'y' });
		input = self.find('input');
		search = self.find(cls2);
		scroller = self.find(cls2 + '-container');

		self.event('click', 'li[data-index]', function(e) {
			self.callback && self.callback(self.items[+this.getAttribute('data-index')]);
			self.hide();
			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('touchstart mousedown', function(e) {
			if (is && e.target.tagName !== 'INPUT' && !container[0].contains(e.target))
				self.hide(0);
		});

		$(W).on('resize', function() {
			is && self.hide(0);
		});

		self.event('keydown', 'input', function(e) {
			var o = false;
			switch (e.which) {
				case 27:
					o = true;
					self.hide();
					break;
				case 13:
					o = true;
					var sel = self.find('li.selected');
					if (sel.length && self.callback)
						self.callback(self.items[+sel.attrd('index')]);
					self.hide();
					break;
				case 38: // up
					o = true;
					selectedindex--;
					if (selectedindex < 0)
						selectedindex = 0;
					else
						self.move();
					break;
				case 40: // down
					o = true;
					selectedindex++ ;
					if (selectedindex >= resultscount)
						selectedindex = resultscount;
					else
						self.move();
					break;
			}

			if (o && results) {
				e.preventDefault();
				e.stopPropagation();
			}
		});

		self.event('keyup', 'input', function() {
			setTimeout2(self.id, self.search, 100, null, this.value);
		});
	};

	self.search = function(value) {

		if (!value) {
			if (self.oldsearch === value)
				return;
			self.oldsearch = value;
			selectedindex = 0;
			results = true;
			resultscount = self.items.length;
			container.find('li').rclass('hidden selected');
			self.move();
			return;
		}

		if (self.oldsearch === value)
			return;

		self.oldsearch = value;
		value = value.toSearch().split(' ');
		results = false;
		resultscount = 0;
		selectedindex = 0;

		var li = container.find('li');
		for (var j = 0; j < li.length; j++) {
			var el = $(li[j]);
			var val = el.attrd('search');
			var h = false;

			for (var i = 0; i < value.length; i++) {
				if (val.indexOf(value[i]) === -1) {
					h = true;
					break;
				}
			}

			if (!h) {
				results = true;
				resultscount++;
			}

			el.tclass('hidden', h);
			el.rclass('selected');
		}

		self.scrollbar.resize();
		self.move();
	};

	self.move = function() {

		var counter = 0;
		var h = scroller.css('max-height').parseInt();
		var li = container.find('li');

		for (var i = 0; i < li.length; i++) {
			var el = $(li[i]);
			if (el.hclass('hidden'))
				continue;
			var is = selectedindex === counter;
			el.tclass('selected', is);
			if (is) {
				var t = (config.height * counter) - config.height;
				if ((t + config.height * 5) > h)
					self.scrollbar.scrollTop(t);
				else
					self.scrollbar.scrollTop(0);
			}
			counter++;
		}
	};

	self.open = self.show = function(opt, callback) {

		if (opt.scrolltop) {
			selectedindex = 0;
			self.scrollbar.scrollTop(0);
		}

		if (opt instanceof Array)
			self.render.apply(self. arguments);
		else
			self.render(opt.items, opt.callback || callback, opt.placeholder);
	};

	self.render = function(items, callback, placeholder) {

		if (is) {
			clearTimeout(timeout);
			self.hide(0);
			return;
		}

		self.find('input').prop('placeholder', placeholder == null ? config.placeholder : placeholder);

		var type = typeof(items);
		var item;

		if (type === 'string')
			items = self.get(items);

		if (!items) {
			self.hide(0);
			return;
		}

		self.items = items;
		self.callback = callback;
		results = true;
		resultscount = self.items.length;

		input.val('');

		var builder = [];
		var indexer = {};

		for (var i = 0; i < items.length; i++) {
			item = items[i];
			indexer.index = i;
			indexer.search = (item.name + ' ' + (item.keywords || '')).trim().toSearch();
			item.icon = self.icon(item.icon);
			!item.value && (item.value = item.name);
			builder.push(self.template(item, indexer));
		}

		container.html(builder);

		var w = $(W);
		var top = ((w.height() / 2) - (search.height() / 2)) - self.scrollbar.element.height();
		var options = { top: top, left: (w.width() / 2) - (search.width() / 2) };

		search.css(options);
		self.move();

		if (is)
			return;

		isMOBILE && self.find(cls2).css({ left: '30px', width: WW - (30 * 2) });
		self.rclass('hidden');
		self.aclass(cls + '-visible', 100);

		!isMOBILE && setTimeout(function() {
			input.focus();
		}, 500);

		is = true;
		$('html,body').aclass(cls + '-noscroll');
	};

	self.hide = function(sleep) {
		if (!is)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.aclass('hidden').rclass(cls + '-visible');
			self.callback = null;
			self.target = null;
			is = false;
			$('html,body').rclass(cls + '-noscroll');
		}, sleep ? sleep : 100);
	};
});