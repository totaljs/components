COMPONENT('noscrollbar', 'margin:0;invisible:1;delay:100;initdelay:250', function(self, config, cls) {

	var container;
	var init = false;
	var cache = '';
	var scrolltoforce;

	self.readonly();

	self.init = function() {

		var resize = function() {
			for (var m of M.components) {
				if (m.name === 'noscrollbar' && m.dom.offsetParent && (m.ready || (m.$ready && !m.$removed)))
					m.resizeforce();
			}
		};

		ON('resize2', () => setTimeout2('noscrollbarresize', resize, 200));
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'minheight':
			case 'margin':
			case 'marginxs':
			case 'marginsm':
			case 'marginmd':
			case 'marginlg':
				!init && self.resizeforce();
				break;
		}
	};

	self.scrollbottom = function(val) {
		if (val == null)
			return self.dom.scrollTop;
		if (container)
			self.dom.scrollTop = self.dom.scrollHeight - container.height() - (val || 0);
		return self.dom.scrollTop;
	};

	self.scrolltop = function(val) {
		if (val == null)
			return self.dom.scrollTop;
		self.dom.scrollTop = (val || 0);
		return self.dom.scrollTop;
	};

	self.make = function() {

		self.aclass('noscrollbar ' + cls);
		self.css('overflow', 'auto');

		config.invisible && self.aclass('invisible');
		self.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 200);
	};

	self.resizeforce = function() {

		var el = self.parent(config.parent);
		var h = el.height();
		var width = WIDTH();

		container = el;

		var key = width + 'x' + h + 'x' + config.margin;
		if (cache === key) {
			if (scrolltoforce) {
				if (scrolltoforce ==='bottom')
					self.scrollbottom(0);
				else
					self.scrolltop(0);
				scrolltoforce = null;
			}
			return;
		}

		cache = key;

		var margin = config.margin;
		var responsivemargin = config['margin' + width];

		if (responsivemargin != null)
			margin = responsivemargin;

		if (margin === 'auto')
			margin = self.element.offset().top;

		if (h === 0) {
			self.$waiting && clearTimeout(self.$waiting);
			self.$waiting = setTimeout(self.resize, 234);
			return;
		}

		if (margin)
			h -= margin;

		if (config.minheight && h < config.minheight)
			h = config.minheight;

		self.css('height', h);
		self.element.SETTER('*', 'resize');

		var c = cls + '-hidden';
		self.hclass(c) && self.rclass(c, 100);

		if (scrolltoforce) {
			if (scrolltoforce ==='bottom')
				self.scrollbottom(0);
			else
				self.scrolltop(0);
			scrolltoforce = null;
		}

		if (!init) {
			self.rclass('invisible', config.initdelay);
			init = true;
		}
	};

	self.setter = function() {
		scrolltoforce = config.scrollto || config.scrolltop;
		if (scrolltoforce) {
			if (scrolltoforce ==='bottom') {
				if (container) {
					self.scrollbottom(0);
					scrolltoforce = null;
				}
			} else {
				self.scrolltop(0);
				scrolltoforce = null;
			}
		}
		setTimeout(self.resize, config.delay, scrolltoforce);
	};
});