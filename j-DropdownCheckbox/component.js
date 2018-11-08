COMPONENT('dropdowncheckbox', 'checkicon:check;visible:0;alltext:All selected;limit:0;selectedtext:{0} selected', function(self, config) {

	var data = [], render = '';
	var container, values, content, datasource = null;
	var prepared = false;
	var W = window;

	!W.$dropdowncheckboxtemplate && (W.$dropdowncheckboxtemplate = Tangular.compile('<div class="ui-dropdowncheckbox-item" data-index="{{ index }}"><div><i class="fa fa-{{ $.checkicon }}"></i></div><span>{{ text }}</span></div>'));
	var template = W.$dropdowncheckboxtemplate;

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : value && value.length > 0;
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {

			case 'type':
				self.type = value;
				break;

			case 'required':
				self.tclass('ui-dropdowncheckbox-required', config.required);
				break;

			case 'label':
				content = value;
				redraw = true;
				break;

			case 'disabled':
				self.tclass('ui-disabled', value);
				self.reset();
				break;

			case 'checkicon':
				self.find('i').rclass().aclass('fa fa-' + value);
				break;

			case 'icon':
				redraw = true;
				break;

			case 'datasource':
				self.datasource(value, self.bind);
				datasource && self.refresh();
				datasource = value;
				break;

			case 'items':

				if (value instanceof Array) {
					self.bind('', value);
					return;
				}

				var items = [];
				value.split(',').forEach(function(item) {
					item = item.trim().split('|');
					var val = (item[1] == null ? item[0] : item[1]).trim();
					if (config.type === 'number')
						val = +val;
					items.push({ name: item[0].trim(), id: val });
				});

				self.bind('', items);
				self.refresh();
				break;
		}

		redraw && setTimeout2(self.id + '.redraw', self.redraw, 100);
	};

	self.redraw = function() {

		var html = '<div class="ui-dropdowncheckbox"><span class="fa fa-caret-down"></span><div class="ui-dropdowncheckbox-selected"></div></div><div class="ui-dropdowncheckbox-values hidden">{0}</div>'.format(render);
		if (content.length)
			self.html('<div class="ui-dropdowncheckbox-label">{0}{1}:</div>'.format(config.icon ? ('<i class="fa fa-' + config.icon + '"></i>') : '', content) + html);
		else
			self.html(html);

		container = self.find('.ui-dropdowncheckbox-values');
		values = self.find('.ui-dropdowncheckbox-selected');
		prepared && self.refresh();
		self.tclass('ui-disabled', config.disabled === true);
		self.tclass('ui-dropdowncheckbox-required', config.required === true);
	};

	self.make = function() {

		self.type = config.type;

		content = self.html();
		self.aclass('ui-dropdowncheckbox-container');
		self.redraw();

		if (config.items)
			self.reconfigure({ items: config.items });
		else if (config.datasource)
			self.reconfigure({ datasource: config.datasource });
		else
			self.bind('', null);

		self.event('click', '.ui-dropdowncheckbox', function(e) {

			if (config.disabled)
				return;

			container.tclass('hidden');

			if (W.$dropdowncheckboxelement) {
				W.$dropdowncheckboxelement.aclass('hidden');
				W.$dropdowncheckboxelement = null;
			}

			!container.hclass('hidden') && (W.$dropdowncheckboxelement = container);
			e.stopPropagation();
		});

		self.event('click', '.ui-dropdowncheckbox-item', function(e) {

			e.stopPropagation();

			if (config.disabled)
				return;

			var el = $(this);
			var is = !el.hclass('ui-dropdowncheckbox-checked');
			var index = +el.attrd('index');
			var value = data[index];

			if (value === undefined)
				return;

			value = value.value;

			var arr = self.get();

			if (!(arr instanceof Array))
				arr = [];

			var index = arr.indexOf(value);

			if (is) {
				if (config.limit && arr.length === config.limit)
					return;
				index === -1 && arr.push(value);
			} else {
				index !== -1 && arr.splice(index, 1);
			}

			self.set(arr);
			self.change(true);
		});
	};

	self.bind = function(path, value) {
		var clsempty = 'ui-dropdowncheckbox-values-empty';

		if (value !== undefined)
			prepared = true;

		if (!value || !value.length) {
			var h = config.empty || '&nbsp;';
			if (h === self.old)
				return;
			container.aclass(clsempty).html(h);
			self.old = h;
			return;
		}

		var kv = config.value || 'id';
		var kt = config.text || 'name';

		render = '';
		data = [];

		for (var i = 0, length = value.length; i < length; i++) {
			var isString = typeof(value[i]) === 'string';
			var item = { value: isString ? value[i] : value[i][kv], text: isString ? value[i] : value[i][kt], index: i };
			render += template(item, config);
			data.push(item);
		}

		var h = HASH(render);
		if (h === self.old)
			return;

		self.old = h;

		if (render)
			container.rclass(clsempty).html(render);
		else
			container.aclass(clsempty).html(config.empty);

		self.refresh();
	};

	self.setter = function(value) {

		if (!prepared)
			return;

		var label = '';
		var count = value == null || !value.length ? undefined : value.length;

		if (value && count) {
			var remove = [];
			for (var i = 0; i < count; i++) {
				var selected = value[i];
				var index = 0;
				var is = false;
				while (true) {
					var item = data[index++];
					if (item === undefined)
						break;
					if (item.value != selected)
						continue;
					label += (label ? ', ' : '') + item.text;
					is = true;
				}
				!is && remove.push(selected);
			}

			if (config.cleaner !== false && value) {
				var refresh = false;
				while (true) {
					var item = remove.shift();
					if (item === undefined)
						break;
					value.splice(value.indexOf(item), 1);
					refresh = true;
				}
				refresh && self.set(value);
			}
		}

		container.find('.ui-dropdowncheckbox-item').each(function() {
			var el = $(this);
			var index = +el.attrd('index');
			var checked = false;
			if (!value || !value.length)
				checked = false;
			else if (data[index])
				checked = data[index];
			checked && (checked = value.indexOf(checked.value) !== -1);
			el.tclass('ui-dropdowncheckbox-checked', checked);
		});

		if (!label && value && config.cleaner !== false) {
			// invalid data
			// it updates model without notification
			self.rewrite([]);
		}

		if (!label && config.placeholder) {
			values.rattr('title', '');
			values.html('<span>{0}</span>'.format(config.placeholder));
		} else {
			if (count == data.length && config.alltext !== 'null' && config.alltext)
				label = config.alltext;
			else if (config.visible && count > config.visible)
				label = config.selectedtext.format(count, data.length);
			values.attr('title', label);
			values.html(label);
		}
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-dropdowncheckbox-invalid', invalid);
	};

	if (W.$dropdowncheckboxevent)
		return;

	W.$dropdowncheckboxevent = true;
	$(document).on('click', function() {
		if (W.$dropdowncheckboxelement) {
			W.$dropdowncheckboxelement.aclass('hidden');
			W.$dropdowncheckboxelement = null;
		}
	});
});