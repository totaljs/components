COMPONENT('spotlight', 'height:40;placeholder:Search', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, timeout, input, search, scroller = null;
	var is = false, selectedindex = 0, resultscount = 0, skip = false, checksum;
	var prevclass;

	self.items = null;
	self.template = Tangular.compile('<figure data-index="{{ $.index }}"{{ if selected }} class="selected"{{ fi }}>{{ if icon }}<i class="{{ icon }}"></i>{{ fi }}{{ if html }}{{ html | raw }}{{ else }}{{ name | raw }}{{ fi }}</figure>');
	self.callback = null;
	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	var onclick = function(e) {
		if (is && (!$(e.target).closest(cls2).length))
			self.hide();
	};

	self.select = function(index) {
		var item = self.items[index];
		if (item) {

			self.opt.callback && self.opt.callback(item);

			if (!self.opt.recent)
				return;

			var key = 'spotlight' + (self.opt.id || '');
			var arr = PREF[key] || [];
			var id = HASH(item) + '';
			item.spotlightid = id;

			if (arr.length && arr.findItem('spotlightid', id))
				return;

			arr.unshift(item);

			if (arr.length > 10)
				arr.pop();

			PREF.set(key, arr, typeof(self.opt.recent) === 'string' ? self.opt.recent : '1 month');
		}
	};

	self.make = function() {

		self.aclass(cls + '-layer hidden');
		self.append('<div class="{1}"><div class="{1}-search"><span><i class="fa fa-search"></i></span><div><input type="text" placeholder="{0}" class="{1}-search-input" /></div></div><div class="{1}-container"><div class="{1}-items"></div></div></div>'.format(config.placeholder, cls));

		container = self.find(cls2 + '-items');
		scroller = self.find(cls2 + '-container');
		input = self.find('input');
		search = self.find(cls2);

		self.event('click', 'figure[data-index]', function(e) {
			self.select(+this.getAttribute('data-index'));
			self.hide();
			e.preventDefault();
			e.stopPropagation();
		});

		self.on('resize2', function() {
			is && self.hide(0);
		});

		self.event('keydown', 'input', function(e) {
			skip = false;
			switch (e.which) {
				case 27:
					skip = true;
					self.hide();
					self.opt.cancel && self.opt.cancel();
					break;
				case 13:
					skip = true;
					var sel = self.find('figure.selected');
					sel.length && self.select(+sel.attrd('index'));
					self.hide();
					break;
				case 38: // up
					skip = true;
					selectedindex--;
					if (selectedindex < 0)
						selectedindex = 0;
					else
						self.move();
					break;
				case 40: // down
					skip = true;
					selectedindex++ ;
					if (selectedindex >= resultscount)
						selectedindex = resultscount;
					else
						self.move();
					break;
			}

			if (skip) {
				e.preventDefault();
				e.stopPropagation();
			}
		});

		self.event('keyup', 'input', function() {
			if (!skip)
				setTimeout2(self.id, self.search, self.opt.delay || 100, null, this.value);
		});
	};

	self.search = function(value) {
		if (typeof(self.opt.search) === 'function')
			self.opt.search(value, self.render);
		else {
			var url = self.opt.search.format(encodeURIComponent(value));
			if (self.opt.cache)
				AJAXCACHE(url, self.render, self.opt.cache);
			else
				AJAX(url, self.render);
		}
	};

	self.move = function() {
		var itemheight = self.opt.height || config.height;
		var counter = 0;
		var h = scroller.css('max-height').parseInt();
		container.find('figure').each(function() {
			var el = $(this);
			if (el.hclass('hidden'))
				return;
			var is = selectedindex === counter;
			el.tclass('selected', is);
			if (is) {
				var t = (itemheight * counter) - itemheight;
				if ((t + itemheight * 5) > h)
					scroller.scrollTop(t);
				else
					scroller.scrollTop(0);
			}
			counter++;
		});
	};

	self.render = function(items, noremap) {

		if (items) {

			if (!(items instanceof Array)) {
				self.render(items.items || items.response);
				return;
			}

			if (!noremap && self.opt.remap) {
				var tmp = self.opt.remap(items);
				if (tmp)
					items = tmp;
			}

			var newchecksum;

			if (self.items && items) {
				newchecksum = HASH(STRINGIFY(items, true));
				if (checksum === newchecksum)
					return;
			}

			checksum = newchecksum;
			self.items = items;
		}

		selectedindex = 0;
		resultscount = self.items.length;

		var builder = [];
		var indexer = {};

		for (var i = 0; i < self.items.length; i++) {
			var item = items[i];
			indexer.index = i;
			if (item.icon)
				item.icon = self.faicon(item.icon);
			builder.push(self.template(item, indexer));
		}

		container.html(builder);
		self.move();
	};

	self.show = function(opt) {

		if (is) {
			clearTimeout(timeout);
			self.hide(0);
			return;
		}

		var key = 'spotlight' + (opt.id || '');
		var recent = PREF[key];

		$(document).on('touchstart mousedown', onclick);
		self.opt = opt;

		input.prop('placeholder', opt.placeholder || config.placeholder);

		prevclass && self.rclass(prevclass);
		prevclass = null;

		if (opt.class) {
			prevclass = opt.class;
			self.aclass(opt.class);
		}

		self.rclass('hidden');

		if (opt.recent == null)
			opt.recent = '3 days';

		if (opt.clear)
			input.val('');

		if (!self.items || !self.items.length) {
			selectedindex = 0;
			if (recent && recent.length)
				self.render(recent, true);
			else {
				self.render([]);
				opt.init && self.search('');
			}
		}

		var w = ((WW / (isMOBILE ? 1.1 : 1.3)) >> 0);
		search.css({ width: w, left: ((WW - w) / 2) });
		scroller.css({ width: w + 50, 'max-height': (WH / 1.3) >> 0 });

		setTimeout(function() {
			self.aclass(cls + '-visible');
		}, 100);

		setTimeout(function() {
			input.focus();
		}, 500);

		is = true;
		$('html,body').aclass(cls + '-noscroll');
	};

	self.hide = function(sleep) {
		if (is) {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				$(document).off('touchstart mousedown', onclick);
				self.aclass('hidden').rclass(cls + '-visible');
				is = false;
				$('html,body').rclass(cls + '-noscroll');
			}, sleep ? sleep : 100);
		}
	};
});