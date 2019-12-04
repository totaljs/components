COMPONENT('diagram', 'parent:parent;margin:0;reverse:0', function(self, config) {

	var cls = 'ui-' + self.name;
	var cls2 = '.' + cls;
	var init = false;
	var body;

	self.readonly();
	self.make = function() {

		self.aclass(cls);

		var scr = self.find('script');
		self.template = Tangular.compile(scr.html());
		scr.remove();
		self.append('<div class="{0}-container"><div class="{0}-padding"><div class="{0}-body"></div></div></div><div class="clearfix"></div>'.format(cls));
		body = self.find(cls2 + '-body');
		self.scrollbar = new SCROLLBAR(self.find(cls2 + '-container'), { visibleX: true, visibleY: true });

		$(W).on('resize', self.resize2);
		self.on('resize', self.resize2);
		self.resize2();
	};

	self.destroy = function() {
		$(W).off('resize', self.resize2);
	};

	self.resize2 = function() {
		setTimeout2(self.ID, self.resize, 300);
	};

	self.configure = function(key, value) {
		if (key === 'reverse')
			self.tclass(cls + '-reverse', !!value);
	};

	self.resize = function() {

		if (self.release())
			return;

		var el = config.parent ? config.parent === 'window' ? $(W) : config.parent === 'parent' ? self.parent() : self.element.closest(config.parent) : self.parent();
		var h = el.height();
		var w = el.width();
		var width = WIDTH();
		var margin = config.margin;
		var responsivemargin = config['margin' + width];

		if (responsivemargin != null)
			margin = responsivemargin;

		if (h === 0 || w === 0) {
			self.$waiting && clearTimeout(self.$waiting);
			self.$waiting = setTimeout(self.resize, 234);
			return;
		}

		var css = {};

		css.height = h - margin;
		self.find(cls2 + '-container').css(css);

		self.element.SETTER('*', 'resize');
		var c = cls + '-hidden';
		self.hclass(c) && self.rclass(c, 100);

		self.scrollbar.resize();

		if (!init) {
			self.rclass('invisible', 250);
			init = true;
		}
	};

	self.render = function(builder, item) {
		builder.push('<li>');
		builder.push('<div class="{0}-item" data-id="{1}">{2}</div>'.format(cls, item.id, self.template(item)));
		if (item.items && item.items.length) {
			builder.push('<ul>');
			for (var i = 0; i < item.items.length; i++)
				self.render(builder, item.items[i]);
			builder.push('</ul>');
		}
		builder.push('</li>');
	};

	self.setter = function(value) {
		var builder = ['<ul>'];
		for (var i = 0; i < value.length; i++) {
			self.render(builder, value[i]);
		}
		builder.push('</ul>');
		body.html(builder.join(''));
		self.scrollbar.resize();
		self.scrollbar.scrollTop(0);
	};

});