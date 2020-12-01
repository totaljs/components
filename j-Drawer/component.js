COMPONENT('drawer', 'align:left;width:250', function(self, config, cls) {

	var container;
	var old;

	self.readonly();

	self.make = function() {
		self.aclass(cls + ' ' + cls + '-a' + config.align);
		self.element.wrapInner('<div class="' + cls + '-nav"></div>');
		container = self.find('.' + cls + '-nav');

		self.event('click', function() {
			self.set('');
		});

		// Moves drawer under <body
		if (self.dom.parentNode.tagName !== 'BODY')
			document.body.appendChild(self.dom);

		self.on('resize2', self.resize);
		self.resize();
	};

	self.resize = function() {
		var d = WIDTH();
		var w = config[d] || config.width;
		if (w !== old) {
			old = w;
			container.css('width', w);
		}
	};

	self.setter = function(value) {
		var c = cls + '-visible';
		if (value === config.if) {
			self.rclass('hidden');
			self.aclass(c, 100);
		} else
			self.rclass(c).aclass('hidden', 800);
	};
});