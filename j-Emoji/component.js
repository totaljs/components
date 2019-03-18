COMPONENT('emoji', 'categories:128342,128578,128161,127944,128008,128690,128172,127828,127937;height:295;history:15;empty:No emoji match your search;emptyemoji:128557;speed:500;footer:Choose skin tone;toneemoji:9995', function(self, config) {

	var template = '<span data-id="{2}" {3}>{0}{1}</span>';
	var tone = ['', '&#127995;', '&#127996;', '&#127997;', '&#127998;', '&#127999;'];
	var toneclear = ['', '-127995', '-127996', '-127997', '-127998', '-127999'];
	var toneselected = 0;
	var allemoticons = '';
	var history = [];
	var categories = [];
	var is = false;

	self.singleton();
	self.readonly();
	self.blind();

	self.configure = function(name, value) {
		switch (name) {
			case 'categories':
				categories = value.split(',');
				for (var i = categories.length - 1; i >= 0; i--) {
					categories[i] = '&#{0};'.format(categories[i]);
				}
				self.redraw();
				break;
		}
	};

	self.redraw = function() {
		self.html('<div class="ui-emoji"><div class="ui-emoji-header"><div class="ui-emoji-nav"><span data-type="history">{0}</span><span data-type="people">{1}</span><span data-type="objects">{2}</span><span data-type="activity">{3}</span><span data-type="nature">{4}</span><span data-type="travel">{5}</span><span data-type="symbols">{6}</span><span data-type="food">{7}</span><span data-type="flags">{8}</span></div><div class="ui-emoji-search"><span><i class="fa fa-search clearsearch"></i></span><div><input type="text" placeholder="Search" class="ui-emoji-search-input"></div></div></div><div class="ui-emoji-content noscrollbar" style="height:{9}px;"></div><div class="ui-emoji-footer"><div class="ui-emoji-footer-text">{10}</div><span data-type="0">&#{11};</span><span data-type="1">&#{11};&#127995;</span><span data-type="2">&#{11};&#127996;</span><span data-type="3">&#{11};&#127997;</span><span data-type="4">&#{11};&#127998;</span><span data-type="5">&#{11};&#127999;</span></div></div>'.format(categories[0], categories[1], categories[2], categories[3], categories[4], categories[5], categories[6], categories[7], categories[8], config.height, config.footer, config.toneemoji));
		self.renderemoji();
		self.find('.noscrollbar').noscrollbar();
	};

	self.parseemoji = function(emoji) {

		var temp = emoji.split('-');
		var parsed = '';

		for (var i = 0, len = temp.length; i < len; i++) {
			parsed += '&#{0};'.format(temp[i]);
		}

		return parsed;
	};

	self.renderemoji = function(){
		var html = '';
		var code;

		if (history.length) {
			html += '<div class="ui-emoji-content-title" id="history">Frequently used</div>';
			for (var i = 0, len = history.length; i < len; i++) {
				html += template.format(self.parseemoji(history[i].id), '', history[i].id);
			}
		}

		for (var i = 0, len = W.emoticonsdb.length; i < len; i++) {

			var emoticon = W.emoticonsdb[i];
			html += '<div class="ui-emoji-content-title" id="{0}">{0}</div>'.format(emoticon.name);

			for (var item = 0, len2 = emoticon.emojis.length; item < len2; item++) {

				var emoji = emoticon.emojis[item];
				var editable = emoji.fitzpatrick || false;

				code = emoji.code_decimal.replace(/&#/g, '').replace(/;/g, '-').slice(0, -1);
				html += template.format(emoji.code_decimal, (editable ? tone[toneselected] : ''), code, (editable ? 'data-editable="1"' : ''));
			}
		}

		allemoticons = html;
		self.find('.ui-emoji-content').html(html);
	};

	self.search = function(value) {

		var search = self.find('.clearsearch');
		search.rclass2('fa-');

		if (!value.length) {
			search.aclass('fa-search');
			self.find('.ui-emoji-content').html(allemoticons);
			return;
		}

		var html = '';
		value = value.toSearch();
		self.find('.ui-emoji-content').html('');
		search.aclass('fa-times');

		for (var i = 0, len = W.emoticons_search.length; i < len; i++) {
			if (W.emoticons_search[i].search.indexOf(value) !== -1) {
				var emoji = W.emoticons_search[i];
				html += template.format(emoji.decimal, (emoji.editable ? tone[toneselected] : ''), emoji.id, (emoji.editable ? 'data-editable="1"' : ''));
			}
		}

		if (html === '')
			html = '<div class="ui-emoji-empty"><div>&#{0};</div>{1}</div>'.format(config.emptyemoji, config.empty);

		self.find('.ui-emoji-content').html(html).scrollTop(0);
	};

	self.make = function() {

		var saved = CACHE(self.name) || {};

		if (saved.tone != null)
			toneselected = saved.tone;

		if (saved.history != null)
			history = saved.history;

		self.aclass('ui-emoji-container hidden');
		self.redraw();

		self.event('keydown', 'input', function() {

			var _self = this;

			setTimeout2(self.id, function() {
				self.search(_self.value);
			}, 300);
		});

		self.event('click', '.fa-times', function() {
			self.find('.ui-emoji-search-input').val('');
			self.find('.ui-emoji-content').html(allemoticons).scrollTop(0);
			$(this).rclass2('fa-').aclass('fa-search');
		});

		self.event('click', '.ui-emoji-nav span', function() {

			var id = $(this).data('type');
			var el = self.find('.ui-emoji-content');

			el.animate({
				scrollTop: el.scrollTop() + (self.find('#{0}'.format(id)).offset().top - el.offset().top)
			}, config.speed);
		});

		self.event('click', '.ui-emoji-content span', function() {

			var editable = $(this).data('editable') || 0;
			var icon = '{0}{1}'.format($(this).data('id'), editable ? toneclear[toneselected] : '');
			var saved = CACHE(self.name) || {};

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

			CACHE(self.name, saved, '1 month');
			self.opt.callback(icon);
			self.hide();
		});

		self.event('click', '.ui-emoji-footer span', function() {

			var saved = CACHE(self.name) || {};

			toneselected = $(this).data('type');
			saved.tone = toneselected;

			CACHE(self.name, saved, '1 month');
			self.renderemoji();
		});

		self.click = function(e) {
			var el = e.target;
			var parent = self.element[0];

			do {
				if (el == parent)
					return;
				el = el.parentNode;
			} while (el);

			self.hide();
		};
	};


	self.bindevents = function() {
		$(document).on('click', self.click);
	};

	self.unbindevents = function() {
		$(document).off('click', self.click);
	};

	self.show = function(opt) {

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}


		self.target = tmp;
		self.opt = opt;

		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else {
			self.element.rclass('hidden');
			is = true;
		}

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

		self.bindevents();
		self.redraw();
		self.element.css(css);
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

			for (var i = 0, len =  items.length; i < len; i++) {
				if (items[i].shortname === code) {
					return text.replace(items[i].shortname, items[i].decimal);
				}
			}

			return text;
		});

		return value;
	};

}, [function(next) {
	AJAX('GET https://cdn.componentator.com/j-emoji.json', function(response) {

		W.emoticonsdb = response;
		W.emoticons_search = [];
		W.emoticons_ascii = {};

		for (var i = 0, len = response.length; i < len; i++) {

			var emoticon = response[i];

			for (var item = 0, len2 = emoticon.emojis.length; item < len2; item++) {

				var emoji = emoticon.emojis[item];
				var name;
				var keywords = '';
				var code;

				for (var index = 0, len3 = emoji.keywords.length; index < len3; index++) {
					keywords += emoji.keywords[index];
				}

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