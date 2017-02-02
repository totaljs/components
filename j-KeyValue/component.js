COMPONENT('keyvalue', function() {
	var self = this;
	var container;
	var empty = {};
	var skip = false;

	self.binder = function(type, value) {
		return value;
	};

	self.template = Tangular.compile('<div class="ui-keyvalue-item"><div class="ui-keyvalue-item-remove"><i class="fa fa-times"></i></div><div class="ui-keyvalue-item-key"><input type="text" name="key" maxlength="{{ max }}" placeholder="{{ placeholder_key }}" value="{{ key }}" /></div><div class="ui-keyvalue-item-value"><input type="text" maxlength="{{ max }}" placeholder="{{ placeholder_value }}" value="{{ value }}" /></div></div>');
	self.make = function() {

		empty.max = (self.attr('data-maxlength') || '100').parseInt();
		empty.placeholder_key = self.attr('data-placeholder-key');
		empty.placeholder_value = self.attr('data-placeholder-value');
		empty.value = '';

		var html = self.html();
		var icon = self.attr('data-icon');

		if (icon)
			icon = '<i class="fa {0}"></i>'.format(icon);

		self.toggle('ui-keyvalue');
		self.html((html ? '<div class="ui-keyvalue-label">{1}{0}:</div>'.format(html, icon) : '') + '<div class="ui-keyvalue-items"></div>' + self.template(empty).replace('-item"', '-item ui-keyvalue-base"'));

		container = self.find('.ui-keyvalue-items');

		self.event('click', '.fa-times', function() {
			var el = $(this);
			var parent = el.closest('.ui-keyvalue-item');
			var inputs = parent.find('input');
			var obj = self.get();
			var key = inputs.get(0).value;
			parent.remove();
			delete obj[key];
			self.set(self.path, obj, 2);
			self.change(true);
		});

		self.event('change keypress', 'input', function(e) {

			if (e.type !== 'change' && e.keyCode !== 13)
				return;

			var el = $(this);
			var inputs = el.closest('.ui-keyvalue-item').find('input');
			var key = self.binder('key', inputs.get(0).value);
			var value = self.binder('value', inputs.get(1).value);

			if (!key || !value)
				return;

			var arr = [];
			var base = el.closest('.ui-keyvalue-base').length > 0;
			if (base && e.type === 'change')
				return;

			if (base) {
				var tmp = self.get();
				tmp[key] = value;
				self.set(tmp);
				self.change(true);
				inputs.val('');
				inputs.eq(0).focus();
				return;
			}

			var keyvalue = {};
			var k;

			container.find('input').each(function() {
				if (this.name === 'key') {
					k = this.value.trim();
				} else if (k) {
					keyvalue[k] = this.value.trim();
					k = '';
				}
			});

			skip = true;
			self.set(self.path, keyvalue, 2);
			self.change(true);
		});
	};

	self.setter = function(value, path, type) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value) {
			container.empty();
			return;
		}

		var builder = [];

		Object.keys(value).forEach(function(key) {
			empty.key = key;
			empty.value = value[key];
			builder.push(self.template(empty));
		});

		container.empty().append(builder.join(''));
	};
});