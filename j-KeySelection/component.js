COMPONENT('keyselection', 'selector:input;class:selected;autoselect:true;selectoritem:.item;autoscroll:true', function(self, config) {

	var TYPE = { '38': 'up', '40': 'down', '13': 'enter' };
	var selected = { index: -1, element: null };

	var onkeydown = function(e) {
		var c = e.keyCode;
		switch (c) {
			case 13: // enter
			case 38: // up
			case 40: // down
				self.keydown(TYPE[c + ''], e);
				return;
		}

		if (c > 47 || c === 8) {
			selected.index = config.autoselect ? 0 : -1;
			if (selected.index !== -1)
				self.select();
		}
	};

	self.readonly();

	self.assign = function() {
		if (!self.removed) {
			var target = self.find(config.selector);
			if (target.length)
				target.on('keydown', onkeydown);
			else
				setTimeout(self.assign, 500);
		}
	};

	self.select = function() {

		if (selected.element) {
			selected.element.parentNode && selected.element.classList.remove(config.class);
			selected.element = null;
		}

		var arr = self.find(config.selectoritem);
		var max = arr.length - 1;

		if (selected.index < 0)
			selected.index = 0;
		else if (selected.index > max)
			selected.index = max;

		if (arr[selected.index]) {
			arr[selected.index].classList.add(config.class);
			selected.element = arr[selected.index];
			config.autoscroll && selected.element.scrollIntoView(true);
		} else
			selected.element = null;
	};

	self.keydown = function(key, e) {
		if (key === 'up') {
			e.preventDefault();
			selected.index--;
			self.select();
		} else if (key === 'down') {
			e.preventDefault();
			selected.index++;
			self.select();
		} else if (key === 'enter' && selected.element && config.exec) {
			var el = $(selected.element);
			self.EXEC(config.exec, el);
		}
	};

	self.make = function() {
		self.assign();
	};

	self.setter = function() {
		selected.index = config.autoselect ? 0 : -1;
		if (selected.index === -1) {
			if (selected.element)
				selected.element.classList.remove(config.class);
		} else
			self.select();
	};

});