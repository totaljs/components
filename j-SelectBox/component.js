COMPONENT('selectbox', function() {

	var self = this;
	var Eitems, Eselected;
	var isRequired = self.attr('data-required') === 'true';

	self.datasource = EMPTYARRAY;
	self.template = Tangular.compile('<li data-search="{{ search }}" data-index="{{ index }}">{{ text }}</li>');

	self.validate = function(value) {
		return isRequired ? value && value.length > 0 : true;
	};

	!isRequired && self.noValid();

	self.required = function(value) {
		self.noValid(!value);
		isRequired = value;
		!value && self.state(1, 1);
	};

	self.search = function() {
		var search = self.find('input').val().toSearch();

		Eitems.find('li').each(function() {
			var el = $(this);
			el.toggleClass('hidden', el.attr('data-search').indexOf(search) === -1);
		});

		self.find('.ui-selectbox-search-icon').toggleClass('fa-search', search.length === 0).toggleClass('fa-times', search.length > 0);
	};

	self.make = function() {
		var search = self.attr('data-search');

		self.append((typeof(search) === 'string' ? '<div class="ui-selectbox-search"><span><i class="fa fa-search ui-selectbox-search-icon"></i></span><div><input type="text" placeholder="{0}" /></div></div><div>'.format(search) : '') + '<div style="height:{0}"><ul></ul><ul style="height:{0}"></ul></div>'.format(self.attr('data-height') || '200px'));
		self.classes('ui-selectbox');

		self.find('ul').each(function(index) {
			if (index)
				Eselected = $(this);
			else
				Eitems = $(this);
		});

		var datasource = self.attr('data-source');
		datasource && self.watch(datasource, function(path, value) {
			var propText = self.attr('data-source-text') || 'name';
			var propValue = self.attr('data-source-value') || 'id';
			self.datasource = [];
			value && value.forEach(function(item, index) {

				var text;
				var value;

				if (typeof(item) === 'string') {
					text = item;
					value = self.parser(item);
				} else {
					text = item[propText];
					value = item[propValue];
				}

				self.datasource.push({ text: text, value: value, index: index, search: text.toSearch() });
			});
			self.redraw();
		}, true);

		datasource = self.attr('data-options');
		if (datasource) {
			var items = [];
			datasource.split(';').forEach(function(item, index) {
				var val = item.split('|');
				items.push({ text: val[0], value: self.parser(val[1] === undefined ? val[0] : val[1]), index: index, search: val[0].toSearch() });
			});
			self.datasource = items;
			self.redraw();
		}

		self.event('click', 'li', function() {
			var selected = self.get() || [];
			var index = this.getAttribute('data-index').parseInt();
			var value = self.datasource[index];

			if (selected.indexOf(value.value) === -1)
				selected.push(value.value);
			else
				selected = selected.remove(value.value);

			self.set(selected);
			self.change(true);
		});

		self.event('click', '.fa-times', function() {
			self.find('input').val('');
			self.search();
		});

		typeof(search) === 'string' && self.event('keydown', 'input', function() {
			setTimeout2(self.id, self.search, 500);
		});
	};

	self.redraw = function() {
		var builder = [];
		self.datasource.forEach(function(item) {
			builder.push(self.template(item));
		});
		self.search();
		Eitems.empty().append(builder.join(''));
	};

	self.setter = function(value) {
		var selected = {};
		var builder = [];

		for (var i = 0, length = self.datasource.length; i < length; i++) {
			var item = self.datasource[i];
			if (value && value.indexOf(item.value) !== -1)
				selected[i] = item;
		}

		Eitems.find('li').each(function() {
			var el = $(this);
			var index = el.attr('data-index').parseInt();
			el.toggleClass('ui-selectbox-selected', selected[index] !== undefined);
		});

		Object.keys(selected).forEach(function(key) {
			builder.push(self.template(selected[key]));
		});

		Eselected.empty().append(builder.join(''));
		self.search();
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = self.isInvalid();
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.toggle('ui-selectbox-invalid', invalid);
	};
});