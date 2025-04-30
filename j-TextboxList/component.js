COMPONENT('textboxlist', 'maxlength:100;required:0;error:You reach the maximum limit;movable:false', function (self, config, cls) {

	var container, content;
	var empty = {};
	var skip = false;
	var cempty = cls + '-empty';
	var crequired = 'required';
	var helper = null;
	var cls2 = '.' + cls;

	self.setter = null;
	self.getter = null;
	self.nocompile && self.nocompile();

	self.template = Tangular.compile(('<div class="{0}-item"><div>'  + (config.movable ? '<i class="ti ti-angle-up {0}-up"></i><i class="ti ti-angle-down {0}-down"></i>' : '') + '<i class="ti ti-trash {0}-remove"></i></div><div><input type="text" maxlength="{{ max }}" placeholder="{{ placeholder }}"{{ if disabled}} disabled="disabled"{{ fi }} value="{{ value }}" /></div></div>').format(cls));

	self.configure = function (key, value, init, prev) {

		if (init)
			return;

		var redraw = false;
		switch (key) {
			case 'disabled':
				self.tclass(crequired, value);
				self.find('input').prop('disabled', true);
				empty.disabled = value;
				self.reset();
				break;
			case 'required':
				self.tclass(cls + '-required', !!value);
				break;
			case 'maxlength':
				empty.max = value;
				self.find('input').prop(key, value);
				break;
			case 'placeholder':
				empty.placeholder = value;
				self.find('input').prop(key, value);
				break;
			case 'label':
				redraw = true;
				break;
			case 'icon':
				if (value && prev)
					self.find('i').rclass().aclass(value);
				else
					redraw = true;
				break;
		}

		if (redraw) {
			skip = false;
			self.redraw();
			self.refresh();
		}
	};

	self.redraw = function () {

		var icon = '';
		var html = config.label || content;

		if (config.icon)
			icon = '<i class="{0}"></i>'.format(self.icon(config.icon));

		empty.value = '';
		self.tclass(cls + '-movable', !!config.movable);
		self.html((html ? ('<div class="' + cls + '-label{2}">{1}{0}:</div>').format(html, icon, config.required ? (' ' + cls + '-required') : '') : '') + ('<div class="' + cls + '-items"></div>' + self.template(empty).replace('-item"', '-item ' + cls + '-base"')));
		container = self.find(cls2 + '-items');
	};

	self.make = function () {

		empty.max = config.max;
		empty.placeholder = config.placeholder;
		empty.value = '';
		empty.disabled = config.disabled;

		if (config.disabled)
			self.aclass('ui-disabled');

		if (config.required)
			self.aclass(cls + '-required');

		content = self.html();

		self.aclass(cls);
		self.redraw();

		self.move = function(offset, el) {

			var arr = self.get();
			var index = el.index();
			var tmp;

			if (offset === 1) {
				if (arr[index] == null || arr[index + 1] == null)
					return;
			} else {
				if (arr[index] == null || arr[index - 1] == null)
					return;
			}

			tmp = arr[index];
			arr[index] = arr[index + offset];
			arr[index + offset] = tmp;
			var items = self.find(cls2 + '-item');
			items.eq(index).find('input').val(arr[index]);
			items.eq(index + offset).find('input').val(arr[index + offset]);
			UPD(self.path, 2);
			self.change(true);
		};

		self.event('click', cls2 + '-up', function () {
			self.move(-1, $(this).closest(cls2 + '-item'));
		});

		self.event('click', cls2 + '-down', function () {
			self.move(1, $(this).closest(cls2 + '-item'));
		});

		self.event('click', cls2 + '-remove', function () {

			if (config.disabled)
				return;

			var el = $(this);
			var parent = el.closest(cls2 + '-item');
			var value = parent.find('input').val();
			var arr = self.get();

			helper != null && helper.remove();
			helper = null;

			parent.remove();

			var index = arr.indexOf(value);
			if (index === -1)
				return;

			arr.splice(index, 1);

			self.tclass(cempty, !arr.length);
			self.tclass(crequired, config.required && !arr.length);

			skip = true;
			SET(self.path, arr, 2);
			self.change(true);
		});

		self.event('change keypress blur', 'input', function (e) {

			if ((e.type === 'keypress' && e.which !== 13) || config.disabled)
				return;

			var el = $(this);

			var value = this.value.trim();
			if (!value)
				return;

			var arr = [];
			var base = el.closest(cls2 + '-base');
			var len = base.length > 0;

			if (len && e.type === 'change')
				return;

			var raw = self.get();

			if (config.limit && len && raw.length >= config.limit) {
				if (!helper) {
					base.after(('<div class="' + cls + '-helper"><i class="ti ti-warning" aria-hidden="true"></i> {0}</div>').format(config.error));
					helper = container.closest(cls2).find(cls2 + '-helper');
				}
				return;
			}

			if (len) {

				if (!raw || raw.indexOf(value) === -1)
					self.push(value);

				this.value = '';
				self.change(true);
				return;
			}

			skip = true;

			container.find('input').each(function () {
				var temp = this.value.trim();
				switch (config.type) {
					case 'lower':
						temp = temp.toLowerCase();
						break;
					case 'upper':
						temp = temp.toUpperCase();
						break;
					case 'number':
						temp = temp.parseInt();
						break;
					case 'date':
						temp = temp.parseDate();
						break;
					case 'a-z':
						temp = temp.toLowerCase().replace(/[^a-z]/g, '');
						break;
				}

				if (arr.indexOf(temp) === -1)
					arr.push(temp);
				else
					skip = false;
			});

			self.set(arr, 2);
			self.change(true);
		});
	};

	self.setter = function (value) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value || !value.length) {
			self.aclass(cempty);
			config.required && self.aclass(crequired);
			container.empty();
			return;
		}

		self.rclass(cempty);
		self.rclass(crequired);
		var builder = [];

		for (var i = 0; i < value.length; i++) {
			empty.value = value[i];
			builder.push(self.template(empty));
		}

		container.empty().append(builder.join(''));
	};

	self.validate = function(value, init) {

		if (init)
			return true;

		var valid = !config.required;
		var items = container.children();

		if (!value || !value.length)
			return valid;

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			!item && (item = '');
			switch (config.type) {
				case 'email':
					valid = item.isEmail();
					break;
				case 'url':
					valid = item.isURL();
					break;
				case 'currency':
				case 'number':
					valid = item > 0;
					break;
				case 'date':
					valid = item instanceof Date && !isNaN(item.getTime());
					break;
				default:
					valid = item.length > 0;
					break;
			}
			items.eq(i).tclass(cls + '-item-invalid', !valid);
		}

		return valid;
	};

});