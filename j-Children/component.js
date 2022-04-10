COMPONENT('children', function(self, config, cls) {

	var cls2 = '.' + cls;
	var template = '<div class="{0}-item" draggable="true" data-id="{id}">{html}</div>'.format(cls);
	var dragdrop;
	var delay;

	self.items = {};
	self.parents = {};
	self.novalidate();
	self.nocompile();
	self.getter = null;

	self.make = function() {

		self.aclass(cls);
		self.template = Tangular.compile(self.find('script').html());
		self.event('dragover dragenter dragstart drag drop', cls2 + '-item', function(e) {
			switch (e.type) {

				case 'dragstart':
					dragdrop = $(e.target);
					if (!dragdrop.hclass(cls + '-item'))
						dragdrop = dragdrop.closest(cls2 + '-item');
					dragdrop.aclass(cls + '-drag');
					e.originalEvent.dataTransfer.setData('text', '1');
					return;

				case 'drop':

					dragdrop.rclass(cls + '-drag');
					var el = $(e.target);

					if (!el.hclass(cls + '-item'))
						el = el.closest(cls2 + '-item');

					if (!el.length || el.closest(dragdrop).length || el[0] === dragdrop[0])
						return;

					clearTimeout(delay);
					delay = setTimeout(self.move, 50, el, dragdrop);
					break;
			}
			e.preventDefault();
		});
	};

	self.move = function(target, dragged) {

		if (delay) {
			clearTimeout(delay);
			delay = null;
		}

		var arr = self.get();
		var a = self.finditem(target.attrd('id'), arr);
		var b = self.finditem(dragged.attrd('id'), arr);

		var ac = a.children || a.items;
		var bc = b.children || b.items;

		if (ac === bc) {

			// moving in the same array
			var items = bc;

			var ai = items.indexOf(a.item);
			var bi = items.indexOf(b.item);

			if (ai < bi) {
				items.splice(bi, 1);
				ai = items.indexOf(a.item);
				items.splice(ai, 0, b.item);
			} else {
				items.splice(ai, 1);
				bi = items.indexOf(b.item);
				items.splice(bi, 0, a.item);
			}

		} else {
			// moving between arrays
			bc.splice(bc.indexOf(b.item), 1);
			ac.push(b.item);
		}

		self.update();
		self.change(true);
	};

	self.finditem = function(id, items) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.id === id)
				return { children: items, item: item };
			var children = item.children || item.items;
			if (children) {
				item = self.finditem(id, children);
				if (item)
					return item;
			}
		}
	};

	var renderchildren = function(parent, level) {

		var children = parent.children || parent.items || EMPTYARRAY;
		if (!children.length)
			return '';

		var builder = ['<div class="' + cls + '-children">'];

		for (var i = 0; i < children.length; i++) {
			var item = children[i];
			var childrenhtml = renderchildren(item, level + 1);
			self.parents[item.id] = parent;
			self.items[item.id] = item;
			builder.push(template.arg({ id: item.id, html: self.template({ value: item, level: level }) + childrenhtml }));
		}

		builder.push('</div>');
		return builder.join('');
	};

	self.setter = function(value) {

		if (!value)
			value = EMPTYARRAY;

		self.db = {};
		self.parents = {};

		var builder = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			var childrenhtml = renderchildren(item, 1);
			self.items[item.id] = item;
			builder.push(template.arg({ id: item.id, html: self.template({ value: item, level: 0 }) + childrenhtml, level: 0 }));
		}

		self.html(builder.length ? builder.join('') : config.empty ? '<div class="{0}-empty">{1}</div>'.format(cls, config.empty) : '');
	};

});