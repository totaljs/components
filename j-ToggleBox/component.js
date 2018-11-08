COMPONENT('togglebox', 'dragdrop:true;text:name;hidden:hidden;replace:false', function(self, config) {

	var container, dragdrop;
	var touch = {};
	var skip = false;
	var clsdrop = 'ui-togglebox-drop';
	var clsdrag = 'ui-togglebox-drag';

	self.template = Tangular.compile('<li data-index="{{ index }}" draggable="true"{{ if !hidden }} class="ui-togglebox-visible"{{ fi }}><span></span>{{ text }}</li>');
	self.nocompile && self.nocompile();

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
		}
	};

	self.make = function() {

		self.aclass('ui-togglebox');
		self.append('<div><ul></ul></div>');
		container = self.find('ul');

		self.event('click', 'li', function() {

			if (config.disabled)
				return;

			var el = $(this);
			var index = +el.attrd('index');

			var items = self.get();
			items[index][config.hidden] = !items[index][config.hidden];
			el.tclass('ui-togglebox-visible', !items[index][config.hidden]);
			setTimeout2(self.id, self.rebind, 500);
		});

		self.rebind = function() {
			var current = self.get();
			var arr = [];
			self.find('li').each(function(counter) {
				var el = $(this);
				var index = +el.attrd('index');
				el.attrd('index', counter);
				arr.push(current[index]);
			});
			skip = true;
			self.set(arr);
			self.change(true);
		};

		self.event('touchstart touchmove touchend', '[draggable]', function(e) {

			if (!isTOUCH || !config.dragdrop || config.disabled)
				return;

			if (e.type === 'touchstart') {
				touch.beg = Date.now();
				touch.target = $(e.target).aclass(clsdrag);
				touch.height = touch.target.innerHeight();
				touch.released = false;
				touch.is = false;
				return;
			}

			if (touch.is && e.type === 'touchend') {

				touch.target.rclass(clsdrag);

				if (touch.drop) {
					touch.drop.rclass(clsdrop);
					if (touch.proccessed)
						self.move(touch.target, touch.drop);
					else
						touch.released = true;
				}

				e.preventDefault();
				return;
			}

			if (!touch.is) {
				if (Date.now() - touch.beg < 100) {
					touch.is = false;
					return;
				} else
					touch.is = true;
			}

			touch.x = e.touches[0].clientX;

			var y = e.touches[0].clientY;
			if (touch.y === y)
				return;

			touch.y = y;
			touch.proccessed = false;

			setTimeout2(self._id + 'drop', function() {

				touch.proccessed = true;

				var el = $(document.elementFromPoint(touch.x, touch.y));

				touch.drop && touch.drop.rclass(clsdrop);
				touch.drop = null;

				if (el && el.is('li')) {
					touch.drop = el.aclass(clsdrop);
					if (touch.released) {
						touch.drop.rclass(clsdrop);
						touch.target.rclass(clsdrag);
						self.move(touch.target, touch.drop);
					}
				}

			}, 80);

			e.preventDefault();
		});

		self.move = function(a, b) {

			var ai = +a.attrd('index');
			var bi = +b.attrd('index');

			if (ai === bi)
				return;

			if (config.replace) {
				var ac = a.clone(true);
				var bc = b.clone(true);
				ac.attrd('index', bi);
				bc.attrd('index', ai);
				a.replaceWith(bc);
				b.replaceWith(ac);
			} else
				b.insertBefore(a);

			setTimeout2(self._id, self.rebind, 500);
		};

		self.event('dragover dragenter dragstart drag drop', 'li', function(e) {

			if (!config.dragdrop || config.disabled) {
				e.preventDefault();
				return;
			}

			switch (e.type) {

				case 'dragstart':
					dragdrop = $(e.target);
					dragdrop.aclass('ui-togglebox-drag');
					e.originalEvent.dataTransfer.setData('text', '1');
					return;

				case 'drop':
					dragdrop.rclass('ui-togglebox-drag');
					self.move($(e.target), dragdrop);
					break;
			}

			e.preventDefault();
		});
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		var builder = [];
		var obj = {};

		value && value.forEach(function(item, index) {
			obj.text = item[config.text];
			obj.hidden = item[config.hidden];
			obj.index = index;
			builder.push(self.template(obj));
		});

		container.empty().append(builder.join(''));
	};
});