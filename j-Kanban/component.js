COMPONENT('kanban', 'parent:parent;margin:0;padding:10;style:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var init = false;
	var events = {};
	var draggable;
	var gtemplate;
	var body;
	var selector = cls2 + '-item';
	var adi = 'data-id';
	var skip = false;

	self.readonly();
	self.make = function() {
		self.aclass(cls);
		var scr = self.find('script');
		gtemplate = Tangular.compile(scr[0].innerHTML);
		self.template = Tangular.compile(scr[1].innerHTML);
		scr.remove();
		self.append('<div class="{0}-container"><div class="{0}-body"></div></div>'.format(cls));
		body = self.find(cls2 + '-body');
		self.scrollbar = new SCROLLBAR(self.find(cls2 + '-container'));
		self.resize();

		config.dblclick && self.event('dblclick', selector, function() {
			var el = $(this);
			var group = self.findgroup(el.attrd('id'));
			group && SEEX(self.makepath(config.dblclick), group);
		});

		self.event('dragenter dragover dragexit drop dragleave dragstart', events.ondrag);
		$(document).on('mousedown', selector, events.ondown);
		$(W).on('resize', self.resize2);
	};

	self.findgroup = function(id) {
		var data = self.get();
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var index = item.items.findIndex('id', id);
			if (index !== -1)
				return { group: item, item: item.items[index], index: index };
		}
	};

	self.move = function(fromid, togroup, toindex) {

		// @nomove (last argument): Not implemented yet

		var data = self.get();
		var group = self.findgroup(fromid);

		if (!group)
			return;

		var index = group.index;
		var item = group.item;
		group = group.group;

		var target = data.findItem('id', togroup);
		if (!target)
			return false;

		var item = group.items[index];
		if (toindex != null) {
			if (group === target)
				target.items.splice(target.items.indexOf(item), 1);
			target.items.splice(toindex, 0, item);
		} else
			target.items.push(item);

		if (group !== target)
			group.items.splice(index, 1);

		skip = true;
		self.update();

		if (config.move) {
			target = { group: target, item: item, index: toindex };
			EXEC(self.makepath(config.move), group, target);
		}

		self.resizebody();
		return true;
	};

	self.remove = function(id) {
		var el = self.find(cls2 + '-item[data-id="{0}"]'.format(id));
		if (el.length) {
			el.remove();
			var group = self.findgroup(id);
			if (group) {
				group.group.items.splice(group.index, 1);
				skip = true;
				self.update();
				config.remove && EXEC(self.makepath(config.remove), group);
				return true;
			}
		}
	};

	events.ondrag = function(e) {

		if (!draggable)
			return;

		if (e.type !== 'dragstart') {
			e.stopPropagation();
			e.preventDefault();
		}

		switch (e.type) {
			case 'drop':

				var a = draggable;
				var b = e.target;
				var node;
				var nodetype;

				while (true) {

					var cn = b.getAttribute('class');

					if (cn === (cls + '-group-items') || cn === (cls + '-group-body')) {
						// group

						if (cn === cls + '-group-items')
							b = b.parentNode;

						node = b.parentNode;
						nodetype = 1;
						break;
					} else if (cn === (cls + '-item')) {
						// item
						node = b;
						nodetype = 2;
						break;
					} else
						b = b.parentNode;

					if (b === self.dom || b == null || b.tagName === 'HTML')
						return;
				}

				var aid = a.getAttribute(adi);

				if (nodetype === 1) {
					self.move(aid, node.getAttribute(adi), null, true);
					$(node).find(cls2 + '-group-items')[0].appendChild(a);
					return;
				}

				node.parentNode.insertBefore(a, node);

				var index = -1;
				var children = node.parentNode.children;

				for (var i = 0; i < children.length; i++) {
					if (children[i] === a) {
						index = i;
						break;
					}
				}

				self.move(aid, node.parentNode.parentNode.getAttribute(adi), index, true);
				break;

			case 'dragstart':
				var eo = e.originalEvent;
				if (eo.dataTransfer)
					eo.dataTransfer.setData('text', '1');
				break;
			case 'dragenter':
			case 'dragover':
			case 'dragexit':
			case 'dragleave':
				break;
		}
	};

	events.ondown = function() {
		draggable = this;
	};

	self.resize2 = function() {
		setTimeout2(self.ID + 'resize', self.resize, 300);
	};

	self.destroy = function() {
		$(document).off('mousedown', selector, events.ondown);
		$(W).off('resize', self.resize2);
	};

	self.resize = function() {

		if (self.release())
			return;

		var el = self.parent(config.parent);
		var h = el.height();
		var w = el.width();
		var width = WIDTH();
		var margin = config.margin;
		var responsivemargin = config['margin' + width];

		if (responsivemargin != null)
			margin = responsivemargin;

		if (h === 0 || w === 0) {
			self.$waiting && clearTimeout(self.$waiting);
			self.$waiting = setTimeout(self.resize, 234);
			return;
		}

		var css = {};

		css.height = h - margin;
		self.find(cls2 + '-container').css(css);

		self.element.SETTER('*', 'resize');
		var c = cls + '-hidden';
		self.hclass(c) && self.rclass(c, 100);

		self.scrollbar.resize();

		if (!init) {
			self.rclass('invisible', 250);
			init = true;
		}

		setTimeout(self.resizebody, 100);
	};

	self.resizebody = function() {
		var arr = body.find(cls2 + '-group');
		var sum = config.padding * 2;

		for (var i = 0; i < arr.length; i++)
			sum += $(arr[i]).width();

		var container = self.find(cls2 + '-container');
		var w = container.width();
		var h = container.height();

		body.css('width', sum < w ? 'auto' : (sum + 'px'));
		self.scrollbar.resize();

		arr = body.find(cls2 + '-group-items');

		var prop = config.style === 1 ? 'height' : 'max-height';

		for (var i = 0; i < arr.length; i++) {
			var el = $(arr[i]);
			var wh = h - el.position().top - (config.padding * 2);
			el.parent().parent().css(prop, wh);
			el.css(prop, wh);
		}

	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value)
			value = EMPTYARRAY;

		var builder = [];
		var obj = {};
		for (var i = 0; i < value.length; i++) {
			var group = value[i];
			var items = group.items;
			var tmp = [];

			for (var j = 0; j < items.length; j++) {
				obj.value = items[j];
				tmp.push('<figure class="{0}-item" draggable="true" data-id="{1}">{2}</figure>'.format(cls, items[j].id, self.template(items[j])));
			}

			builder.push('<section class="{0}-group" data-id="{1}"><div class="{0}-group-body">{2}<div class="{0}-group-items noscrollbar">{3}</div></div></section>'.format(cls, group.id, gtemplate(group), tmp.join('')));
		}

		body.html(builder.join(''));
		self.resizebody();
		self.element.find('.noscrollbar').noscrollbar();
	};

});