COMPONENT('radiolist', 'text:name;value:id;description:description;disabled:false;required:false', function(self, config, cls) {

	var cls2 = '.' + cls;
	var items = [];

	// Parses "text|value|description,text|value" (a comma in the text is written as \,)
	var parse = function(str) {
		var arr = [];
		(str || '').replace(/\\,/g, '\0').split(',').forEach(function(item) {
			item = item.replace(/\0/g, ',').split('|');
			var text = (item[0] || '').trim();
			if (text)
				arr.push({ text: text, value: item[1] == null ? text : item[1].trim(), description: (item[2] || '').trim() });
		});
		return arr;
	};

	// Normalizes the array of the data-source according to the "text", "value" and "description" keys
	var normalize = function(arr) {
		var output = [];
		(arr || []).forEach(function(item) {
			if (item != null && typeof(item) === 'object')
				output.push({ text: item[config.text], value: item[config.value], description: item[config.description] || '' });
			else
				output.push({ text: item, value: item, description: '' });
		});
		return output;
	};

	// The label is HTML (the content of the tag or "config.label", as in j-Input); the group is named with aria-label, so no ids are needed
	var setlabel = function(html) {
		self.find(cls2 + '-label').html(html || '').tclass('hidden', !html);
		self.find(cls2 + '-list').attr('aria-label', $('<div></div>').html(html || '').text());
	};

	var same = function(a, b) {
		return a != null && b != null && (a + '') === (b + '');
	};

	var render = function() {

		var list = self.find(cls2 + '-list').empty();

		items.forEach(function(item, index) {
			var el = $('<div class="{0}-item" role="radio" aria-checked="false" tabindex="-1"></div>'.format(cls));
			var text = $('<div class="{0}-text"><span></span></div>'.format(cls));
			text.find('span').text(item.text);
			item.description && text.append($('<small></small>').text(item.description));
			el.attr('data-index', index).append(text).append('<i class="ti ti-check {0}-check"></i>'.format(cls));
			list.append(el);
		});

		self.setter(self.get());
	};

	// A user interaction: normalize -> self.modify() -> setter. The callback is executed once per change.
	var select = function(index) {

		var item = items[index];

		if (config.disabled || !item || same(item.value, self.get()))
			return;

		self.modify(item.value);
		config.change && self.EXEC(config.change, item.value, self);
	};

	var focus = function(index) {
		var el = self.find(cls2 + '-item').eq(index);
		el.length && el.focus();
		select(index);
	};

	self.make = function() {

		var label = config.label || $.trim(self.html());

		self.aclass(cls);
		self.html('<div class="{0}-label"></div><div class="{0}-list" role="radiogroup"></div>'.format(cls));
		setlabel(label);

		self.tclass('ui-disabled', !!config.disabled);
		self.tclass(cls + '-required', !!config.required);

		if (config.datasource)
			self.datasource(config.datasource, onsource);
		else if (config.items)
			items = parse(config.items);

		self.event('click', cls2 + '-item', function() {
			select(+$(this).attr('data-index'));
		});

		self.event('keydown', cls2 + '-item', function(e) {

			var index = +$(this).attr('data-index');
			var count = items.length;

			switch (e.which) {
				case 40: // down
				case 39: // right
					focus((index + 1) % count);
					break;
				case 38: // up
				case 37: // left
					focus((index - 1 + count) % count);
					break;
				case 32: // space
				case 13: // enter
					select(index);
					break;
				default:
					return;
			}

			e.preventDefault();
		});

		render();
	};

	// In jComponent v20 the first argument of the data-source callback is the value
	var onsource = function(value) {
		items = normalize(value);
		render();
	};

	// The model changed: only render (checkmark, ARIA state, the roving tabindex)
	self.setter = function(value) {

		var els = self.find(cls2 + '-item');
		var selected = -1;

		items.forEach(function(item, index) {
			if (selected === -1 && same(item.value, value))
				selected = index;
		});

		els.each(function(index) {
			var is = index === selected;
			$(this).tclass(cls + '-selected', is).attr({ 'aria-checked': is ? 'true' : 'false', tabindex: !config.disabled && (is || (selected === -1 && index === 0)) ? '0' : '-1', 'aria-disabled': config.disabled ? 'true' : 'false' });
		});
	};

	self.validate = function(value) {
		return (config.disabled || !config.required) ? true : (value != null && value !== '');
	};

	self.state = function(type) {
		if (type) {
			var invalid = config.required ? self.isInvalid() : false;
			self.tclass(cls + '-invalid', invalid);
			self.find(cls2 + '-list').attr('aria-invalid', invalid ? 'true' : 'false');
		}
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		switch (key) {
			case 'items':
				items = parse(value);
				render();
				break;
			case 'datasource':
				self.datasource(value, onsource);
				break;
			case 'text':
			case 'value':
			case 'description':
				config.datasource && onsource(GET(self.makepath(config.datasource)));
				break;
			case 'label':
				setlabel(value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				self.setter(self.get());
				break;
			case 'required':
				self.tclass(cls + '-required', !!value);
				self.state(1);
				break;
		}
	};

});
