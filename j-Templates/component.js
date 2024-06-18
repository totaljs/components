COMPONENT('templates', 'scrollbar:1;scrolltop:1;visibleY:1;margin:0;parent:auto;emptyif:!value||!value.length', function(self, config, cls) {

	var cls2 = '.' + cls;
	var drag = {};
	var templates = {};
	var rendered = false;
	var template = 'default';
	var isempty = false;
	var fn = null;
	var eitems;

	self.readonly();
	self.nocompile();

	drag.drop = function(e) {
		if (config.drop) {
			drag.target && drag.target.rclass('dragenter');
			config.drop && self.EXEC(config.drop, e, drag.target, drag.item);
			drag.target = null;
			drag.item = null;
			drag.file = true;
		}
	};

	self.make = function() {

		self.aclass(cls);

		self.find('script').each(function() {
			var el = $(this);
			var name = el.attrd('name') || 'default';
			templates[name] = name !== 'empty' ? Tangular.compile(el.html()) : el.html();
		});

		self.html('<div class="{0}-path"></div><div class="{0}-scrollbar"><div class="{0}-items"></div></div>'.format(cls));
		eitems = self.find(cls2 + '-items');

		if (config.scrollbar) {
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: !!config.visibleY, orientation: 'y' });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		}

		self.event('dragstart', function(e) {
			if (config.drop) {
				drag.item = $(e.target);
				drag.file = false;
			}
		});

		self.event('contextmenu', function(e) {
			config.contextmenu && self.EXEC(config.contextmenu, e);
		});

		var find = function(el, cls) {
			var counter = 15;
			while (counter-- && el) {
				if (el.classList && el.classList.contains(cls))
					return el;
				el = el.parentNode;
			}
		};

		self.event('dragenter dragover dragexit drop dragleave', function(e) {

			if (!config.drop)
				return;

			switch (e.type) {

				case 'dragenter':
					var el = $(e.target);
					var target = find(el[0], 'droppable');
					drag.target && drag.target.rclass('dragenter');

					if (target && drag.item && drag.item[0] === target)
						drag.target = null;
					else
						drag.target = target ? $(target).aclass('dragenter') : null;

					break;

				case 'drop':
					drag.file = true;
					drag.drop(e, drag.target, drag.item);
					drag.target && drag.target.rclass('dragenter');
					drag.target = null;
					drag.item = null;
					break;

				case 'dragexit':
					break;
			}

			e.preventDefault();
		});

		self.on('resize + resize2', self.resize);
		self.resize();
	};

	self.resizeforce = function() {
		var el = self.parent(config.parent);
		if (self.scrollbar) {
			var h = el.height() - config.margin;
			self.scrollbar.element.css('height', h);
			self.scrollbar.resize();
			eitems.css('min-height', h);
		}
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.configure = function(key, value) {
		if (key === 'template') {
			self.datasource(value, function(path, value) {
				template = M.is20 ? path : value;
				rendered && self.refresh();
			}, true);
		} else if (value === 'emptyif')
			fn = new Function('value', 'return ' + value);
	};

	self.setter = function(value) {

		if (template) {

			if (templates.empty && fn(value)) {
				if (!isempty) {
					isempty = true;
					self.aclass(cls + '-empty');
					eitems.html('<div>' + templates.empty + '</div>');
				}
			} else {
				isempty = false;
				self.rclass(cls + '-empty');
				eitems.html(templates[template]({ value: value }));
			}

			config.scrolltop && self.scrolltop(1);
		}

		rendered = true;
	};

});