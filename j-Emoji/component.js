COMPONENT('emoji', 'categories:128342,128578,128161,127944,128008,128690,128172,127828,127937;height:295;history:49;empty:No emoji match your search;emptyemoji:128557;speed:500;footer:Choose skin tone;toneemoji:9995;search:Search', function(self, config, cls) {

	var cls2 = '.' + cls;
	var template = '<span data-id="{2}" {3}>{0}{1}</span>';
	var tone = ['', '&#127995;', '&#127996;', '&#127997;', '&#127998;', '&#127999;'];
	var toneclear = ['', '-127995', '-127996', '-127997', '-127998', '-127999'];
	var toneselected = 0;
	var allemoticons = [];
	var history = [];
	var categories = [];
	var is = false;
	var page = 0;
	var events = {};
	var content;

	var cacheset = function(value) {
		if (W.PREF)
			W.PREF.set(self.name, value);
		else
			CACHE(self.name, value, '1 month');
	};

	var cacheget = function() {
		return (W.PREF ? W.PREF.get(self.name) : CACHE(self.name)) || {};
	};

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile();

	self.configure = function(name, value) {
		switch (name) {
			case 'categories':
				categories = value.split(',');
				for (var i = categories.length - 1; i >= 0; i--)
					categories[i] = '&#{0};'.format(categories[i]);
				self.redraw();
				break;
		}
	};

	self.changepage = function() {
		self.find(cls2 + '-search-input').val('');
		self.find('.clearsearch').rclass2('ti-').aclass('ti-search');
		self.find(cls2 + '-nav span').rclass('active');
		self.find(cls2 	+ '-nav span[data-type="' + page +'"]').tclass('active');
		content.html(allemoticons[page]);
		self.scrollbar.scrollTop(0);
		self.scrollbar.resize();
	};

	self.redraw = function() {
		self.html('<div class="{12}"><div class="{12}-header"><div class="{12}-nav"><span data-type="0">{0}</span><span data-type="1">{1}</span><span data-type="2">{2}</span><span data-type="3">{3}</span><span data-type="4">{4}</span><span data-type="5">{5}</span><span data-type="6">{6}</span><span data-type="7">{7}</span><span data-type="8">{8}</span></div><div class="{12}-search"><span><i class="ti ti-search clearsearch"></i></span><div><input type="text" placeholder="{13}" class="{12}-search-input"></div></div></div><div class="{12}-scrollbar" style="height:{9}px"><div class="{12}-content"></div></div><div class="{12}-footer"><div class="{12}-footer-text">{10}</div><span data-type="0">&#{11};</span><span data-type="1">&#{11};&#127995;</span><span data-type="2">&#{11};&#127996;</span><span data-type="3">&#{11};&#127997;</span><span data-type="4">&#{11};&#127998;</span><span data-type="5">&#{11};&#127999;</span></div></div>'.format(categories[0], categories[1], categories[2], categories[3], categories[4], categories[5], categories[6], categories[7], categories[8], config.height, config.footer, config.toneemoji, cls, config.search));
		self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: 1 });
		content = self.find(cls2 + '-content');
		self.renderemoji();
	};

	self.redrawhistory = function() {
		var html = '';

		html = '<div class="{0}-content-title" id="history">Frequently used</div>'.format(cls);
		for (var i = 0, len = history.length; i < len; i++) {
			html += template.format(self.parseemoji(history[i].id), '', history[i].id);
		}
		allemoticons[0] = html;
	};

	self.parseemoji = function(emoji) {

		var temp = emoji.split('-');
		var parsed = '';

		for (var i = 0, len = temp.length; i < len; i++) {
			parsed += '&#{0};'.format(temp[i]);
		}

		return parsed;
	};

	self.renderemoji = function() {

		var html = '';
		var code;

		html = '<div class="{0}-tab0"><div class="{0}-content-title" id="history">Frequently used</div>'.format(cls);
		for (var i = 0; i < history.length; i++)
			html += template.format(self.parseemoji(history[i].id), '', history[i].id);
		html += '</div>';
		allemoticons[0] = html;

		for (var i = 0; i < W.emoticonsdb.length; i++) {
			html = '';
			var emoticon = W.emoticonsdb[i];
			html += '<div class="{0}-tab{2}"><div class="{0}-content-title" id="{1}">{1}</div>'.format(cls, emoticon.name, i + 1);
			for (var item = 0; item < emoticon.emojis.length; item++) {
				var emoji = emoticon.emojis[item];
				var editable = emoji.fitzpatrick || false;
				code = emoji.code_decimal.replace(/&#/g, '').replace(/;/g, '-').slice(0, -1);
				html += template.format(emoji.code_decimal, (editable ? tone[toneselected] : ''), code, (editable ? 'data-editable="1"' : ''));
			}
			html += '</div>';
			allemoticons[i + 1] = html;
		}
		page = 1;
		self.changepage();
	};

	self.search = function(value) {

		var search = self.find('.clearsearch');
		search.rclass2('ti-');

		if (!value.length) {
			search.aclass('ti-search');
			self.changepage();
			return;
		}

		var html = '';
		value = value.toSearch();
		content.html('');
		search.aclass('ti-times');

		for (var i = 0, len = W.emoticons_search.length; i < len; i++) {
			if (W.emoticons_search[i].search.indexOf(value) !== -1) {
				var emoji = W.emoticons_search[i];
				html += template.format(emoji.decimal, (emoji.editable ? tone[toneselected] : ''), emoji.id, (emoji.editable ? 'data-editable="1"' : ''));
			}
		}

		if (!html.length)
			html = '<div class="{0}-empty"><div>&#{1};</div>{2}</div>'.format(cls, config.emptyemoji, config.empty);

		content.html(html);
		self.scrollbar.scrollTop(0);
	};

	self.make = function() {

		self.aclass(cls + '-container hidden');

		self.event('keydown', 'input', function() {
			var t = this;
			setTimeout2(self.id, function() {
				self.search(t.value);
			}, 300);
		});

		self.event('click', '.ti-times', function() {
			self.find(cls2 + '-search-input').val('');
			self.changepage();
			$(this).rclass2('ti-').aclass('ti-search');
		});

		self.event('click', cls2 + '-nav span', function() {
			page = parseInt($(this).data('type'));
			self.changepage();
		});

		self.event('click', cls2 + '-content span', function() {

			var t = $(this);
			var editable = t.attrd('editable') || 0;
			var icon = '{0}{1}'.format(t.data('id'), editable ? toneclear[toneselected] : '');
			var saved = cacheget();

			if (saved.history == null)
				saved.history = [];

			var find = saved.history.findItem('id', icon);
			if (find) {
				find.count++;
				saved.history.quicksort('count', false);
			} else {
				saved.history.length > config.history && saved.history.pop();
				saved.history.push({ id: icon, count: 1 });
			}

			cacheset(saved);

			var num = icon.split('-').trim().map(function(c) {
				return +c;
			});

			self.opt.scope && M.scope(self.opt.scope);
			self.opt.callback(String.fromCodePoint.apply(null, num));
			self.hide();
		});

		self.event('click', cls2 + '-footer span', function() {
			var saved = cacheget();
			toneselected = $(this).attrd('type');
			saved.tone = toneselected;
			cacheset(saved);
			self.renderemoji();
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

		if (M.scope)
			opt.scope = M.scope();

		self.target = tmp;
		self.opt = opt;
		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
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

		var saved = cacheget();

		if (saved.tone != null)
			toneselected = saved.tone;

		if (saved.history != null)
			history = saved.history;

		page = 0;

		if (!history.length)
			page = 1;

		is = true;

		self.redrawhistory();
		self.changepage();
		self.element.css(css);
		setTimeout(self.bindevents, 50);
	};

	self.hide = function() {
		is = false;
		self.target = null;
		self.opt = null;
		self.unbindevents();
		self.aclass('hidden');
	};

	FUNC.parseASCII = function(value) {

		var db = { ':-)': '&#128517;', ':)': '&#128517;', ';)': '&#128521;', ':D': '&#128515;', '8)': '&#128515;', ';(': '&#128546;', ':(': '&#128531;', ':P': '&#128539;', ':O': '&#128558;', ':*': '&#128536;' };

		value = value.replace(/(^|\s):[a-z]+:(\s|$)|(-1|[:;8O\-)DP(|*]|\+1){1,3}/g, function(text) {

			var code = text;

			if (db[code])
				return db[code];

			var items = W.emoticons_search;
			code = code.trim();

			for (var i = 0; i < items.length; i++) {
				if (items[i].shortname === code)
					return text.replace(items[i].shortname, items[i].decimal);
			}

			return text;
		});

		return value;
	};

}, [function(next) {
	let cdn = (DEF.cdn || 'https://cdn.componentator.com');
	AJAX('GET {0}/j-emoji.json'.format(cdn), function(response) {

		W.emoticonsdb = response;
		W.emoticons_search = [];
		W.emoticons_ascii = {};

		for (var i = 0; i < response.length; i++) {

			var emoticon = response[i];

			for (var a = 0; a < emoticon.emojis.length; a++) {

				var emoji = emoticon.emojis[a];
				var name;
				var keywords = '';
				var code;

				for (var b = 0; b < emoji.keywords.length; b++)
					keywords += emoji.keywords[b];

				name = '{1}{2}{3}{4}'.format(emoji.category, emoji.name, emoji.shortname, keywords);
				code = emoji.code_decimal.replace(/&#/g, '').replace(/;/g, '-').slice(0, -1);

				W.emoticons_search.push({
					search: name.toSearch(),
					decimal: emoji.code_decimal,
					id: code,
					editable: emoji.fitzpatrick || false,
					shortname: emoji.shortname
				});
			}
		}
		next();
	});
}]);
