COMPONENT('parameters', 'search:Search;dateformat:yyyy-MM-dd;offset:5', function(self, config) {

	var cls = 'ui-parameters';
	var cls2 = '.ui-parameters';
	var container, search, scroller, prevh, skip;

	self.readonly();
	self.nocompile && self.nocompile();
	self.bindvisible();

	self.init = function() {
		Thelpers.ui_parameters_value = function(val, format) {
			if (val instanceof Date)
				return val.format(format);
			if (typeof(val) === 'number')
				return val;
			return val ? Thelpers.encode(val.toString()) : '';
		};
	};

	self.template = Tangular.compile('<div class="{0}-item{{ if modified }} {0}-modified{{ fi }}" data-index="{{ $.index }}" data-search="{{ $.search }}"><div class="{0}-name">{{ name }}</div><div class="{0}-type">{{ type }}</div><div class="{0}-value">{{ if type === \'boolean\' }}<div class="{0}-boolean">{{ if value }}true{{ else }}false{{ fi }}</div>{{ else }}<input class="{0}-input" value="{{ value | ui_parameters_value(\'{1}\') }}" />{{ fi }}</div></div>'.format(cls, config.dateformat));

	self.search = function() {
		var val = search.find('input').val().toSearch();
		search.find('i').rclass('fa-').tclass('fa-search', !val).tclass('fa-times', !!val);
		self.find(cls2 + '-item').each(function() {
			var el = $(this);
			el.tclass('hidden', val ? el.attrd('search').indexOf(val) === -1 : false);
		});
		self.scrollbar.resize();
	};

	self.resize = function() {
		var h = 0;

		if (config.height > 0)
			h = config.height;
		else if (config.parent)
			h = (config.parent === 'window' ? WH : config.parent === 'parent' ? self.parent().height() : self.closest(config.parent).height()) - search.height() - self.element.offset().top - config.offset;

		if (prevh === h)
			return;

		prevh = h;
		scroller.css('height', h);
		self.scrollbar.resize();
	};

	self.make = function() {
		self.aclass(cls);
		self.append('<div class="{0}-search"><span><i class="fa fa-search"></i></span><div><input type="text" placeholder="{1}" maxlength="50" class="{0}-searchinput" /></div></div><div class="{0}-scroller"><div class="{0}-container"></div></div>'.format(cls, config.search));
		container = self.find(cls2 + '-container');
		search = self.find(cls2 + '-search');
		scroller = self.find(cls2 + '-scroller');

		self.scrollbar = SCROLLBAR(scroller);

		search.on('keydown', cls2 + '-searchinput', function(e) {
			setTimeout2(self.ID, self.search, 300);
		});

		search.on('click', '.fa-times', function() {
			search.find('input').val('');
			self.search();
		});

		container.on('dblclick', cls2 + '-boolean', function() {
			var el = $(this).parent();
			var row = el.closest(cls2 + '-item');
			var index = +row.attrd('index');
			var item = self.get()[index];
			var indexer = { index: index, search: item.name.toSearch() };

			skip = true;

			item.value = !item.value;
			item.modified = item.prev !== item.value;
			row.replaceWith(self.template(item, indexer));
			item.modified && self.change(true);
			UPD(self.path, 2);
		});

		container.on('change', cls2 + '-input', function() {
			var el = $(this);
			var row = el.closest(cls2 + '-item');
			var index = +row.attrd('index');
			var item = self.get()[index];
			var indexer = { index: index, search: item.name.toSearch() };
			item.value = el.val();
			switch (item.type) {
				case 'date':
					item.value = item.value ? item.value.parseDate(config.dateformat) : null;
					if (item.value && isNaN(item.value.getTime()))
						item.value = item.prev;
					var a = item.value ? item.value.format(config.dateformat) : 0;
					var b = item.prev ? item.prev.format(config.dateformat) : 0;
					item.modified = a !== b;
					break;
				case 'number':
					item.value = item.value.parseFloat();
					item.modified = item.value !== item.prev;
					break;
				default:
					item.modified = item.value !== item.prev;
					break;
			}
			row.replaceWith(self.template(item, indexer));
			item.modified && self.change(true);

			skip = true;
			UPD(self.path, 2);
		});

		self.on('resize', self.resize);
		self.resize();
		self.scrollbar.resize();
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		var builder = [];
		var indexer = {};

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			indexer.index = i;
			indexer.search = item.name.toSearch();
			item.prev = item.type === 'date' && item.value ? item.value.format(config.dateformat) : item.value;
			builder.push(self.template(item, indexer));
		}

		container.html(builder.join(''));
		self.search();
		self.resize();
	};

});