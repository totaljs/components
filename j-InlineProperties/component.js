COMPONENT('inlineproperties', 'close:Close;dateformat:[date];dirsearch:Search;width:180', function(self, config, cls) {

	var cls2 = '.' + cls;
	var renders = {};
	var container;
	var body;

	self.readonly();

	self.make = function() {

		self.aclass(cls +' hidden invisible');
		self.append('<div class="{0}-body"><div class="{0}-container"></div><div class="{0}-button"><button>{1}</button></div></div>'.format(cls, config.close));

		body = self.find(cls2 + '-body');
		container = self.find(cls2 + '-container');

		self.event('click', function(e) {
			if (e.target === self.dom)
				self.hide();
		});

		self.event('click', 'button', function() {
			self.hide();
		});

		self.event('change', 'input', function() {

			var el = this;
			var val = el.value;
			var id = ATTRD(el);

			switch (el.getAttribute('type')) {
				case 'number':
					if (val)
						val = val.parseFloat();
					else
						val = null;
					break;
			}

			var item = self.opt.items.findItem('id', id);
			item.value = val;
			self.opt.changed[id] = 1;
		});

		self.event('click', cls2 + '-iconclick', function() {
			var el = $(this);
			var id = ATTRD(el);
			var opt = {};
			opt.element = el;
			opt.empty = true;
			opt.callback = function(val) {
				var span = opt.element.find('span').rclass();
				val && span.aclass(val);
				var item = self.opt.items.findItem('id', id);
				item.value = val;
				self.opt.changed[id] = 1;
			};
			SETTER('icons/show', opt);
		});

		self.event('click', cls2 + '-colorclick', function() {
			var opt = {};
			var el = $(this);
			var id = ATTRD(el);
			opt.element = el;
			opt.callback = function(val) {
				opt.element.find('span').css('background-color', val);
				var item = self.opt.items.findItem('id', id);
				item.value = val;
				self.opt.changed[id] = 1;
			};
			SETTER('colorpicker/show', opt);
		});

		self.event('click', cls2 + '-booleanclick', function() {
			var el = $(this);
			var id = ATTRD(el);
			el.closest('figure').tclass(cls + '-checked');
			var item = self.opt.items.findItem('id', id);
			item.value = el.hclass(cls2 + '-checked');
			self.opt.changed[id] = 1;
		});

		self.event('click', cls2 + '-dateclick', function() {
			var el = $(this);
			var id = ATTRD(el);
			var item = self.opt.items.findItem('id', id);
			var opt = {};
			opt.element = el;
			opt.value = item.value;
			opt.callback = function(val) {
				self.opt.changed[id] = 1;
				item.value = val;
				el.text(item.value == null ? '' : item.value.format(config.dateformat));
			};
			SETTER('datepicker/show', opt);
		});

		self.event('click', cls2 + '-listclick', function() {
			var el = $(this);
			var id = ATTRD(el);
			var item = self.opt.items.findItem('id', id);
			var opt = {};
			opt.element = el;
			opt.value = item.value;
			opt.placeholder = item.dirsearch || config.dirsearch;
			opt.items = item.items2;
			opt.callback = function(val) {
				self.opt.changed[id] = 1;
				item.value = val ? val.id : null;
				el.text(val ? val.name : '');
			};
			SETTER('directory/show', opt);
		});

	};

	renders.string = function() {
		return '<input type="text" data-type="string" />';
	};

	renders.number = function() {
		return '<input type="number" data-type="number" />';
	};

	renders.date = function() {
		return '<div class="{0}-dateclick"></div>'.format(cls);
	};

	renders.boolean = function() {
		return '<div class="{0}-booleanclick"><span><i class="ti ti-check"></i></span></div>'.format(cls);
	};

	renders.color = function() {
		return '<div class="{0}-colorclick"><span></span></div>'.format(cls);
	};

	renders.icon = function() {
		return '<div class="{0}-iconclick"><span></span></div>'.format(cls);
	};

	renders.list = function() {
		return '<div class="{0}-listclick"></div>'.format(cls);
	};

	self.hide = function() {
		self.aclass('hidden invisible');
		var value = {};
		for (var m of self.opt.items)
			value[m.id] = m.value;
		self.opt.scope && M.scope(self.opt.scope);
		self.opt.callback(value, Object.keys(self.opt.changed));
	};

	self.show = function(opt) {

		self.rclass('hidden');

		var builder = [];

		opt.changed = {};
		opt.scope = M.scope();

		for (var m of opt.items) {
			if (m.type === 'bool')
				m.type = 'boolean';
			builder.push('<figure class="{0}-item {0}-{2}" data-id="{3}"><div class="{0}-name">{1}</div><div class="{0}-value">{4}</div></figure>'.format(cls, m.name, m.type, m.id, renders[m.type](m)));
		}

		container.html(builder.join(''));

		var elements = container.find('> figure');

		for (var m of elements) {
			var el = $(m);
			var id = ATTRD(el);
			var item = opt.items.findItem('id', id);
			var value = opt.value ? opt.value[id] : item.value;

			switch (item.type) {
				case 'number':
					el.find('input').val(value == null ? '' : value.toString());
					break;
				case 'date':
					el.find(cls2 + '-dateclick').text(value == null ? '' : value.format(config.dateformat));
					break;
				case 'boolean':
					value && el.aclass(cls + '-checked');
					break;
				case 'icon':
					value && el.find('span').aclass(value);
					break;
				case 'list':
					if (value) {
						var items = item.items;
						if (typeof(items) === 'string')
							items = GET(items);
						item.items2 = CLONE(items);
						var tmp = item.items2.findItem('id', value);
						el.find(cls2 + '-listclick').html(tmp ? tmp.name : '');
					}
					break;
				case 'color':
					value && el.find('span').css('background-color', value);
					break;
				default:
					el.find('input').val(value == null ? '' : value.toString());
					break;

			}
		}

		var target = $(opt.element);
		var w = opt.width || 200;
		var offset = target.offset();
		var css = {};

		body.css('width', w);

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
			css.top = opt.position === 'bottom' ? (offset.top - body.height() - 10) : (offset.top + target.innerHeight() + 10);

		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.position === 'bottom')
			css.top += 10;
		else
			css.top -= 10;

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		var mw = w;
		var mh = body.height();

		if (css.left < 0)
			css.left = 10;
		else if ((mw + css.left) > WW)
			css.left = (WW - mw) - 10;

		if (css.top < 0)
			css.top = 10;
		else if ((mh + css.top) > WH)
			css.top = (WH - mh) - 10;

		body.css(css);
		self.opt = opt;
		self.rclass('invisible');
	};

});