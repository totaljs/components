COMPONENT('contextmenu', function(self) {

	var is = false;
	var timeout, container, arrow;

	self.template = Tangular.compile('<div data-value="{{ value }}"{{ if selected }} class="selected"{{ fi }}><i class="fa {{ icon }}"></i><span>{{ name | raw }}</span></div>');
	self.singleton();
	self.readonly();
	self.callback = null;

	self.make = function() {

		self.classes('ui-contextmenu');
		self.append('<span class="ui-contextmenu-arrow fa fa-caret-up"></span><div class="ui-contextmenu-items"></div>');
		container = self.find('.ui-contextmenu-items');
		arrow = self.find('.ui-contextmenu-arrow');

		self.event('touchstart mousedown', 'div[data-value]', function(e) {
			self.callback && self.callback($(this).attr('data-value'), $(self.target));
			self.hide();
			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('touchstart mousedown', function() {
			is && self.hide(0);
		});
	};

	self.show = function(orientation, target, items, callback) {

		if (is) {
			clearTimeout(timeout);
			var obj = target instanceof jQuery ? target.get(0) : target;
			if (self.target === obj) {
				self.hide(0);
				return;
			}
		}

		target = $(target);
		var type = typeof(items);
		var item;

		if (type === 'string')
			items = self.get(items);
		else if (type === 'function') {
			callback = items;
			items = (target.attr('data-options') || '').split(';');
			for (var i = 0, length = items.length; i < length; i++) {
				item = items[i];
				if (!item)
					continue;
				var val = item.split('|');
				items[i] = { name: val[0], icon: val[1], value: val[2] || val[0] };
			}
		}

		if (!items) {
			self.hide(0);
			return;
		}

		self.callback = callback;

		var builder = [];
		for (var i = 0, length = items.length; i < length; i++) {
			item = items[i];
			item.index = i;
			if (!item.value)
				item.value = item.name;
			if (!item.icon)
				item.icon = 'fa-caret-right';
			builder.push(self.template(item));
		}

		self.target = target.get(0);
		var offset = target.offset();

		container.html(builder);

		switch (orientation) {
			case 'left':
				arrow.css({ left: '15px' });
				break;
			case 'right':
				arrow.css({ left: '210px' });
				break;
			case 'center':
				arrow.css({ left: '107px' });
				break;
		}

		var options = { left: orientation === 'center' ? Math.ceil((offset.left - self.element.width() / 2) + (target.innerWidth() / 2)) : orientation === 'left' ? offset.left - 8 : (offset.left - self.element.width()) + target.innerWidth(), top: offset.top + target.innerHeight() + 10 };
		self.css(options);

		if (is)
			return;

		self.element.show();
		setTimeout(function() {
			self.classes('ui-contextmenu-visible');
			self.emit('contextmenu', true, self, self.target);
		}, 100);

		is = true;
	};

	self.hide = function(sleep) {
		if (!is)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.element.hide().removeClass('ui-contextmenu-visible');
			self.emit('contextmenu', false, self, self.target);
			self.callback = null;
			self.target = null;
			is = false;
		}, sleep ? sleep : 100);
	};
});