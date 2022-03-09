COMPONENT('treeview', 'parent:parent;droppable:1;movable:1;expanded:0;autosort:1;margin:0;cachexpand:1;arrows:1;visibleY:1;parentselectable:1', function(self, config, cls) {

	var events = {};
	var cls2 = '.' + cls;
	var init = false;
	var items, container, prevselected, draggable, isdragged, skip = false;
	var cache = {};

	self.make = function() {
		self.template = Tangular.compile(('<div class="{0}-item{{ if item.classname }} {{ item.classname }}{{ fi }}" data-id="{{ id }}">' + (config.arrows ? '<i class="{0}-arrow fa"></i>' : '') + '<div>{{ if item.html }}{{ item.html | raw }}{{ else }}{{ item.name }}{{ fi }}</div></div>').format(cls));
		self.aclass(cls);
		self.append('<div class="{0}-scrollbar"><div class="{0}-container"></div></div>'.format(cls));
		container = self.find(cls2 + '-container')[0];
		self.scrollbar = new SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: config.visibleY, orientation: 'y' });

		self.event('click', cls2 + '-item-container', function(e) {

			e.stopPropagation();

			if (config.disabled)
				return;

			var el = $(this);
			if (el.hclass(cls + '-canexpand')) {
				el.tclass(cls + '-open');
				self.scrollbar.resize();
				var is = el.hclass(cls + '-open');
				if (config.cachexpand)
					cache[el[0].$treeview.id] = is;

				if (is && config.parentselectable) {
					var classname = cls + '-selected';
					prevselected && prevselected.rclass(classname);
					prevselected = el.find('> ' + cls2 + '-item:first-child').aclass(classname);
				}

				is && config.exec && SEEX(self.makepath(config.exec), el[0].$treeview.item, true);
			}
		});

		self.event('click', cls2 + '-item', function() {

			if (config.disabled)
				return;

			var el = $(this);
			var parent = el.parent();

			if (parent.hclass(cls + '-canexpand'))
				return;

			var classname = cls + '-selected';
			prevselected && prevselected.rclass(classname);
			prevselected = el.aclass(classname);
			config.exec && SEEX(self.makepath(config.exec), parent[0].$treeview.item, false);
		});

		if (config.droppable || config.movable) {
			self.event('dragenter dragover dragexit drop dragleave dragstart', cls2 + '-item-container', events.ondrag);
			self.event('mousedown', cls2 + '-item-container', events.ondown);
		}

		self.on('resize + resize2', self.resize2);
		self.resize();
		self.resize2();
	};

	self.resize2 = function() {
		setTimeout2(self.ID, self.resize, 300);
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				break;
		}
	};

	events.ondrag = function(e) {

		if (!draggable || config.disabled)
			return;

		if (e.type !== 'dragstart')
			e.preventDefault();

		switch (e.type) {
			case 'drop':

				e.stopPropagation();
				events.onup();
				$(draggable).rclass(cls + '-dragged');

				var target = e.target;
				var a = draggable;
				var b = $(target);
				var classname = cls + '-item-container';

				if (!b.hclass(classname))
					b = b.closest('.' + classname);

				if (b[0] === a)
					return;

				if (!b.hclass(cls + '-candrop'))
					return;

				var children = b.find('> ' + cls2 + '-children')[0];

				// Checks if the parent isn't dropped into the child
				while (true) {
					target = target.parentNode;
					if (target === self.dom)
						break;
					if (target === a)
						return;
				}

				if (!b.hclass(cls + '-canexpand'))
					b.aclass('{0}-canexpand {0}-open'.format(cls));

				var item = a.$treeview;
				var refparent = a.parentNode.parentNode.$treeview;
				var reftarget = b[0].$treeview;

				var parent = a.parentNode;
				children.appendChild(a);

				if (!parent.children.length)
					$(parent.parentNode).rclass('{0}-canexpand {0}-open'.format(cls));

				config.autosort && self.sort(children);

				var index = refparent.item.children.indexOf(item.item);
				refparent.item.children.splice(index, 1);
				reftarget.item.children.push(item.item);
				config.move && self.EXEC(config.move, item.item, reftarget.item, refparent.item);
				skip = true;
				self.update(true);
				self.change(true);
				break;

			case 'dragstart':
				var eo = e.originalEvent;
				eo.dataTransfer && eo.dataTransfer.setData('text', '1');
				break;

			case 'dragenter':
			case 'dragover':
			case 'dragleave':
			case 'dragexit':
				break;
		}
	};

	events.ondown = function(e) {

		if (config.disabled)
			return;

		e.stopPropagation();

		var el = $(this);
		if (el.hclass(cls + '-canmove')) {
			draggable = this;

			setTimeout2(self.ID + 'down', function() {
				isdragged = true;
				el.aclass(cls + '-dragged');
			}, 200);

			$(document).on('mouseup', events.onup);
		}

	};

	events.onup = function() {
		clearTimeout2(self.ID + 'down');
		if (isdragged) {
			isdragged = false;
			$(draggable).rclass(cls + '-dragged');
		}
		$(document).off('mouseup', events.onup);
	};

	self.sort = function(container) {

		var items = [];
		var backup = document.createElement('DIV');

		while (container.children.length) {
			var item = container.children[0];
			var reference = item.$treeview;
			$(item).rclass(cls + '-last');
			items.push({ node: item, sort: reference.item.sort || reference.item.name });
			backup.appendChild(item);
		}

		items.quicksort('sort');

		var length = items.length;
		for (var i = 0; i < length; i++) {
			var last = i === length - 1;
			container.appendChild(items[i].node);
			last && $(items[i].node).aclass(cls + '-last');
		}
	};

	var css = {};

	self.resize = function(scrolltop) {

		if (self.release())
			return;

		var el = self.parent(config.parent);
		var h = el.height();
		var margin = config.margin;
		var width = WIDTH();
		var responsivemargin = config['margin' + width];

		if (responsivemargin != null)
			margin = responsivemargin;

		if (h === 0) {
			self.$waiting && clearTimeout(self.$waiting);
			self.$waiting = setTimeout(self.resize, 234);
			return;
		}

		css.height = h - margin;
		self.find(cls2 + '-scrollbar,' + cls2 + '-container').css(css);
		self.css(css);
		self.scrollbar && self.scrollbar.resize();
		scrolltop && self.scrolltop(0);

		if (!init) {
			self.rclass('invisible', 250);
			init = true;
		}
	};

	self.replacenode = function(parent, item, level, last) {

		// { id: '', icon: '', iconopen: '', name: '', items: [], classname: '', actions: { move: 1, drop: 1, expand: 1 }}

		var obj = items[item.id];

		if (!obj) {
			obj = {};
			obj.id = item.id;
			items[item.id] = obj;
		}

		var actions = item.actions || EMPTYOBJECT;
		var achildren = item.children && item.children.length;
		var wrapper = document.createElement('DIV');

		var classes = cls + '-item-container';

		if (achildren)
			classes += ' ' + cls + '-canexpand' ;

		if (achildren && (config.expanded || actions.expand) && cache[item.id] !== false)
			classes += ' ' + cls + '-open';

		if (config.movable && actions.move !== false)
			classes += ' ' + cls + '-canmove';

		if (config.droppable && actions.drop !== false)
			classes += ' ' + cls + '-candrop';

		if (last)
			classes += ' ' + cls + '-last';

		wrapper.setAttribute('class', classes);
		obj.item = item;

		var node = $(self.template(obj))[0];
		obj.dom = wrapper;
		obj.dom.$treeview = obj;

		if (config.movable && actions.move !== false)
			wrapper.setAttribute('draggable', 'true');

		wrapper.appendChild(node);
		parent.appendChild(wrapper);

		var div = document.createElement('DIV');
		div.setAttribute('class', cls + '-children');
		wrapper.appendChild(div);

		if (!achildren)
			return;

		var length = item.children.length;

		for (var i = 0; i < length; i++)
			self.replacenode(div, item.children[i], level + '-' + i, (i + 1) === length);

		config.autosort && self.sort(div);
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		items = {};

		while (container.children.length)
			container.removeChild(container.children[0]);

		if (!value) {
			self.scrollbar.resize();
			return;
		}

		var length = value.length;
		for (var i = 0; i < length; i++) {
			var item = value[i];
			self.replacenode(container, item, '0-' + i, (i + 1) === length);
		}

		self.scrollbar.resize();
	};

});
