COMPONENT('expansionpanel', 'multiple:0;icon:ti ti-caret-right', function(self, config, cls) {

	var cls2 = '.' + cls;
	var open = [];
	var manual = false;

	self.make = function() {

		self.aclass(cls);

		self.find('> section').aclass('hidden').each(function() {
			let parent = this.parentNode;
			let el = $(this);
			let div = document.createElement('DIV');
			let label = document.createElement('LABEL');
			el.aclass('hidden');
			div.classList.add(cls + '-item');
			let icon = el.attrd('icon') || config.icon;
			label.classList.add(cls + '-label');
			label.innerHTML = '<i class="{0}"></i>'.format(icon) + (el.attr('title') || el.attrd('name'));
			div.appendChild(label);
			div.appendChild(this);
			parent.appendChild(div);
		});

		self.event('click', cls2 + '-label', function(e) {

			let el = $(this).parent();
			let section = el.find('> section');
			let id = section.attrd('id');

			if (section.hclass('hidden')) {
				if (config.multiple)
					open.push(id);
				else
					open = [id];
			} else
				open.splice(open.indexOf(id), 1);

			self.bind('@touched @modified @setter', config.multiple ? open : (open[0] || null));
		});

	};

	self.setter = function(value) {
		var selected = value instanceof Array ? value : value ? [value] : [];
		self.find(cls2 + '-item').each(function() {
			let item = $(this);
			let el = item.find('> section');
			let id = el.attrd('id');
			let is = selected.includes(id);
			el.tclass('hidden', !is);
			item.tclass('selected', is);
		});
		self.rclass('invisible hidden');
	};

});