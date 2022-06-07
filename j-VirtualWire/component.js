COMPONENT('virtualwire', 'selector:.virtualwire;max:50;repeat:100', function(self, config, cls) {

	var old, waiter;

	self.make = function() {
		self.aclass(cls);
	};

	self.restore = function() {
		if (old) {
			while (self.dom.children.length)
				old[0].appendChild(self.dom.children[0]);
			var exec = old.attrd('out');
			exec && self.EXEC(exec);
			old = null;
		}
	};

	self.backup = function(el) {

		if (!el || !el.length) {
			self.restore();
			return;
		}

		if (old && old[0] === el[0])
			return;

		self.restore();

		var children = el[0].children;
		while (children.length)
			self.dom.appendChild(children[0]);

		old = el;
		var exec = el.attrd('in');
		exec && self.EXEC(exec);
	};

	self.load = function(value, count) {

		waiter && clearTimeout(waiter);
		waiter = null;

		if (count > config.max)
			return;

		var el = $(config.selector + '[data-if="' + value + '"],' + config.selector + '[data-scope="' + value + '"]');
		if (el.length)
			self.backup(el);
		else
			waiter = setTimeout(self.load, config.repeat, value, (count || 0) + 1);
	};

	self.setter = function(value) {

		self.restore();

		if (!value)
			return;

		waiter && clearTimeout(waiter);
		self.load(value);
	};

});