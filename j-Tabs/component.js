COMPONENT('tabs', function(self, config, cls) {

	var cls2 = '.' + cls;
	var open = '';
	var manual = false;

	self.make = function() {

		self.aclass(cls);

		var parent = document.createElement('DIV');
		parent.classList.add(cls + '-tabs');
		NODEINSERT(parent, self.dom.children[0], true);

		self.find('> section').aclass('hidden').each(function() {
			let el = $(this);
			let div = document.createElement('DIV');
			el.aclass('hidden');
			div.classList.add(cls + '-item');
			div.classList.add(cls + '-item-' + self.ID);
			let icon = el.attrd('icon') || config.icon;
			div.innerHTML = (icon ? '<i class="{0}"></i>'.format(icon) : '') + (el.attr('title') || el.attrd('name'));
			div.setAttribute('data-id', el.attrd('id'));
			el.attr('title', null);
			parent.appendChild(div);
		});

		self.event('click', cls2 + '-item-' + self.ID, function(e) {

			let el = $(this);
			let section = self.element.find('> section[data-id="{0}"]'.format(ATTRD(el)));
			let id = section.attrd('id');

			if (section.hclass('hidden'))
				open = id;

			if (!open)
				open = id;

			self.bind('@touched @modified @setter', open || null);
		});

	};

	self.setter = function(value) {

		self.find(cls2 + '-item-' + self.ID).each(function() {
			let item = $(this);
			let id = ATTRD(item);
			let is = value === id;
			let el = self.element.find('> section[data-id="{0}"]'.format(id));
			el.tclass('hidden', !is);
			item.tclass('selected', is);
		});

		self.rclass('invisible hidden');
	};

});