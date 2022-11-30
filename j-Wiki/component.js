COMPONENT('wiki', 'title:Wiki;margin:20;width:400', function(self, config, cls) {

	var cls2 = '.' + cls;
	var etopics, container;

	self.singleton();
	self.readonly();

	self.make = function() {

		self.css('max-width', config.width);
		self.aclass(cls + ' hidden');
		self.append('<div class="{0}-title"><button><i class="ti ti-times"></i></button><span></span></div><div class="{0}-topics"><div class="{0}-topics-body markdown-small"></div></div>'.format(cls));
		etopics = self.find(cls2 + '-topics-body');
		container = self.find(cls2 + '-topics');

		self.scrollbar = SCROLLBAR(self.find(cls2 + '-topics'), { visibleY: !!config.scrollbarY, orientation: 'y' });
		self.scrollleft = self.scrollbar.scrollLeft;
		self.scrolltop = self.scrollbar.scrollTop;
		self.scrollright = self.scrollbar.scrollRight;
		self.scrollbottom = self.scrollbar.scrollBottom;

		self.on('resize2', self.resize);
		self.resize();

		self.event('click', 'label', function() {

			var el = $(this);
			var index = +el.attrd('index');
			var parent = el.parent();
			parent.tclass(cls + '-visible');

			if (parent.hclass(cls + '-visible')) {
				el = parent.find(cls2 + '-topic-body');
				if (!el.html().length) {
					var item = GET(self.makepath(config.datasource))[index];
					el.html(item ? (item.body || '').markdown() : '');
				}
			}

			self.scrollbar.resize();
		});

		self.event('click', 'button', function() {
			self.set(false);
		});
	};

	self.resize = function() {
		var offset = self.element.offset();
		var header = self.element.find(cls2 + '-title').height();
		container.css('height', WH - header - offset.top - config.margin - 1);
		self.scrollbar.resize();
	};

	self.rebind = function(path, value) {
		var builder = [];
		var template = '<div class="{0}-topic"><label data-index="{1}"><i class="ti"></i>{2}</label><div class="{0}-topic-body"></div></div>';
		for (var i = 0; i < (value || EMPTYARRAY).length; i++)
			builder.push(template.format(cls, i, value[i].name));
		etopics.html(builder.join(''));
		self.resize();
	};

	self.configure = function(key, value) {
		if (key === 'datasource')
			self.datasource(value, self.rebind);
		else if (key === 'title')
			self.find(cls2 + '-title span').html(value);
	};

	self.setter = function(value) {
		self.tclass('hidden', !value);
		if (value) {
			self.resize();
			setTimeout(self.resize, 1000);
		}
	};

}, ['https://cdn.componentator.com/highlight.min@914.js', 'https://cdn.componentator.com/apexcharts.min@310.js']);