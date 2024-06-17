COMPONENT('releaser', 'delay:500;release:10000;bindvisible:0', function(self, config) {

	var visible = false;
	var releasing = null;

	self.readonly();
	config.visible && self.bindvisible && self.bindvisible();

	self.make = function() {
		var scr = 'scri' + 'pt';
		var el = self.find('> ' + scr);
		var html = el.length ? el.html() : self.html();
		self.template = html.replace(/SCR/g, scr);
		self.aclass('invisible');
	};

	self.releasehtml = function() {
		config.released && self.SEEX(config.released, self.element);
		releasing = null;
		self.empty();
		FREE();
	};

	self.setter = function(value) {
		if (value === config.if) {

			if (visible)
				return;

			if (releasing) {
				clearTimeout(releasing);
				releasing = null;
				visible = true;
				return;
			}

			visible = true;
			self.aclass('invisible');
			self.html(self.template);
			self.rclass('invisible', config.delay);
			config.render && self.SEEX(config.render, self.element);
			COMPILE(self.element);

		} else if (visible) {
			visible = false;
			releasing = setTimeout(self.releasehtml, config.release);
		}
	};

});