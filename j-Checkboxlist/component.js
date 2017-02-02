COMPONENT('checkboxlist', function() {

	var self = this;
	var isRequired = self.attr('data-required');
	var template = Tangular.compile('<div class="{0} ui-checkboxlist-checkbox"><label><input type="checkbox" value="{{ id }}"><span>{{ name }}</span></label></div>'.format(self.attr('data-class')));

	self.validate = function(value) {
		return isRequired ? value && value.length > 0 : true;
	};

	self.required = function(value) {
		isRequired = value;
		return self;
	};

	!isRequired && self.noValid();

	self.make = function() {

		self.event('click', 'input', function() {
			var arr = self.get() || [];
			var value = self.parser(this.value);
			var index = arr.indexOf(value);
			if (index === -1)
				arr.push(value);
			else
				arr.splice(index, 1);
			self.set(arr);
		});

		self.event('click', '.ui-checkboxlist-selectall', function() {
			var arr = [];
			var inputs = self.find('input');
			var value = self.get();

			if (value && inputs.length === value.length) {
				self.set(arr);
				return;
			}

			inputs.each(function() {
				arr.push(self.parser(this.value));
			});

			self.set(arr);
		});

		var datasource = self.attr('data-source');
		datasource && self.watch(datasource, function(path, value) {
			if (!value)
				value = [];
			self.redraw(value);
		}, true);

		var options = self.attr('data-options');
		if (!options)
			return;

		var arr = options.split(';');
		var datasource = [];

		for (var i = 0, length = arr.length; i < length; i++) {
			var item = arr[i].split('|');
			datasource.push({ id: item[1] === undefined ? item[0] : item[1], name: item[0] });
		}

		self.redraw(datasource);
	};

	self.setter = function(value) {
		self.find('input').each(function() {
			this.checked = value && value.indexOf(self.parser(this.value)) !== -1;
		});
	};

	self.redraw = function(arr) {
		var builder = [];
		var kn = self.attr('data-source-text') || 'name';
		var kv = self.attr('data-source-value') || 'id';

		for (var i = 0, length = arr.length; i < length; i++) {
			var item = arr[i];
			if (typeof(item) === 'string')
				builder.push(template({ id: item, name: item }));
			else
				builder.push(template({ id: item[kv] === undefined ? item[kn] : item[kv], name: item[kn] }));
		}

		if (!builder.length)
			return;

		var btn = self.attr('data-button') || '';
		if (btn)
			btn = '<div class="ui-checkboxlist-selectall"><a href="javascript:void(0)"><i class="fa fa-check-square-o mr5"></i>{0}</a></div>'.format(btn);

		builder.push('<div class="clearfix"></div>' + btn);
		self.html(builder.join(''));
		return self;
	};
});