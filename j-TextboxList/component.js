COMPONENT('textboxlist', 'maxlength:100;required:false;error:You reach the maximum limit', function (self, config) {

	var container, content;
	var empty = {};
	var skip = false;
	var cempty = 'empty';
	var crequired = 'required';
	var helper = null;

	self.setter = null;
	self.getter = null;
	self.nocompile && self.nocompile();

	self.template = Tangular.compile('<div class="ui-textboxlist-item"><div><i class="fa fa-times"></i></div><div><input type="text" maxlength="{{ max }}" placeholder="{{ placeholder }}"{{ if disabled}} disabled="disabled"{{ fi }} value="{{ value }}" /></div></div>');

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
			icon = '<i class="fa fa-{0}"></i>'.format(config.icon);

		empty.value = '';
		self.html((html ? '<div class="ui-textboxlist-label{2}">{1}{0}:</div>'.format(html, icon, config.required ? ' ui-textboxlist-label-required' : '') : '') + '<div class="ui-textboxlist-items"></div>' + self.template(empty).replace('-item"', '-item ui-textboxlist-base"'));
		container = self.find('.ui-textboxlist-items');
	};

	self.make = function () {

		empty.max = config.max;
		empty.placeholder = config.placeholder;
		empty.value = '';
		empty.disabled = config.disabled;

		if (config.disabled)
			self.aclass('ui-disabled');

		content = self.html();
		self.aclass('ui-textboxlist');
		self.redraw();

		self.event('click', '.fa-times', function () {

			if (config.disabled)
				return;

			var el = $(this);
			var parent = el.closest('.ui-textboxlist-item');
			var value = parent.find('input').val();
			var arr = self.get();

			helper != null && helper.remove();
			helper = null;

			parent.remove();

			var index = arr.indexOf(value);
			if (index === -1)
				return;

			arr.splice(index, 1);

			self.tclass(cempty, arr.length === 0);

			self.tclass(crequired, config.required && arr.length === 0);

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
			var base = el.closest('.ui-textboxlist-base');
			var len = base.length > 0;

			if (len && e.type === 'change')
				return;

			var raw = self.get();

			if (config.limit && len && raw.length >= config.limit) {
				if (!helper) {
					base.after('<div class="ui-textboxlist-helper"><i class="fa fa-warning" aria-hidden="true"></i> {0}</div>'.format(config.error));
					helper = container.closest('.ui-textboxlist').find('.ui-textboxlist-helper');
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

				if (arr.indexOf(temp) === -1)
					arr.push(temp);
				else
				 	skip = false;
			});

			SET(self.path, arr, 2);
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

		value.forEach(function (item) {
			empty.value = item;
			builder.push(self.template(empty));
		});

		container.empty().append(builder.join(''));
	};

	self.validate = function(value, init) {

		if (init)
			return true;

		var valid = !config.required;
		var items = container.children();

		if (!value || !value.length)
			return valid;

		value.forEach(function (item, i) {
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
			items.eq(i).tclass('ui-textboxlist-item-invalid', !valid);
		});

		return valid;
	};

});
