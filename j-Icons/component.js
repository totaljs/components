COMPONENT('icons', 'search:Search;scrollbarshadow:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var template = '<span data-search="{0}"><i class="{1}"></i></span>';
	var events = {};
	var container;
	var is = false;
	var cachekey;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile();

	self.redraw = function() {
		self.html('<div class="{0}"><div class="{0}-header"><div class="{0}-search"><span><i class="ti ti-search clearsearch"></i></span><div><input type="text" placeholder="{1}" class="{0}-search-input"></div></div></div><div class="{0}-scrollbar"><div class="{0}-content"></div></div></div>'.format(cls, config.search));
		container = self.find(cls2 + '-content');
		self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: 1, shadow: config.scrollbarshadow });
	};

	self.rendericons = function(empty) {

		var key = empty ? '1' : '0';
		if (cachekey === key)
			return;

		cachekey = key;
		var builder = [];

		empty && builder.push(template.format('', ''));

		AJAX('GET https://cdn.componentator.com/icons-db.html', function(response) {
			response = response.split(',');
			for (var icon of response)
				builder.push(template.format(icon.toSearch(), 'ti ti-' + icon));
			self.find(cls2 + '-content').html(builder.join(''));
		});
	};

	self.search = function(value) {

		var search = self.find('.clearsearch');
		search.rclass2('ti-');

		if (!value.length) {
			search.aclass('ti-search');
			container.find('.hidden').rclass('hidden');
			return;
		}

		value = value.toSearch();
		search.aclass('ti-times');
		self.scrollbar.scrollTop(0);
		var icons = container.find('span');
		for (var i = 0; i < icons.length; i++) {
			var el = $(icons[i]);
			el.tclass('hidden', el.attrd('search').indexOf(value) === -1);
		}
	};

	self.make = function() {

		self.aclass(cls + '-container hidden');

		self.event('keydown', 'input', function() {
			var t = this;
			setTimeout2(self.ID, function() {
				self.search(t.value);
			}, 300);
		});

		self.event('click', '.ti-times', function() {
			self.find('input').val('');
			self.search('');
		});

		self.event('click', cls2 + '-content span', function() {
			self.opt.scope && M.scope(self.opt.scope);
			self.opt.callback && self.opt.callback($(this).find('i').attr('class'));
			self.hide();
		});

		events.click = function(e) {
			var el = e.target;
			var parent = self.dom;
			do {
				if (el == parent)
					return;
				el = el.parentNode;
			} while (el);
			self.hide();
		};

		self.on('reflow + resize + resize2', self.hide);
		self.on('scroll', function(e) {
			if (e && e[0] !== self.scrollbar.area[0])
				self.hide();
		});

		self.redraw();
	};

	self.bindevents = function() {
		if (!events.is) {
			events.is = true;
			$(document).on('click', events.click);
		}
	};

	self.unbindevents = function() {
		if (events.is) {
			events.is = false;
			$(document).off('click', events.click);
		}
	};

	self.show = function(opt) {

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		var search = self.find(cls2 + '-search-input');
		search.val('');
		self.find('.clearsearch').rclass2('ti-').aclass('ti-search');

		if (M.scope)
			opt.scope = M.scope();

		self.target = tmp;
		self.opt = opt;
		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.css(css);
		} else
			self.rclass('hidden');

		var target = $(opt.element);
		var w = self.element.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
				default:
					css.left = offset.left;
					break;
			}

			css.top = opt.position === 'bottom' ? (offset.top - self.element.height() - 10) : (offset.top + target.innerHeight() + 10);

		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		is = true;
		self.rendericons(opt.empty);
		self.css(css);
		if (opt.scrolltop == null || opt.scrolltop)
			self.scrollbar.scrollTop(0);
		search.focus();
		setTimeout(self.bindevents, 50);
		clearTimeout2(self.ID);
	};

	self.clear = function() {
		container.empty();
		cachekey = null;
	};

	self.hide = function() {
		is = false;
		self.target = null;
		self.opt = null;
		self.unbindevents();
		self.aclass('hidden');
		container.find('.hidden').rclass('hidden');
		setTimeout2(self.ID, self.clear, 1000 * 10);
	};
});