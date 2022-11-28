COMPONENT('layer', 'offset:65;scrollbar:true', function(self, config, cls) {

	var cls2 = '.' + cls;
	var visible = false;
	var csspos = {};
	var W = window;

	if (!W.$$layer) {
		W.$$layer_level = W.$$layer_level || 1;
		W.$$layer = true;
		W.$$layer_resize = function() {
			setTimeout2(cls, function() {
				SETTER('layer', 'resize');
			}, 100);
		};
		ON('resize2', W.$$layer_resize);
	}

	self.readonly();

	self.make = function() {

		// Move element to safe place
		$(document.body).append('<div id="{1}" class="{0}"><div class="{0}-toolbar"><div class="{0}-toolbar-back"><button class="{0}-toolbar-backbutton"><i class="ti ti-times"></i></button></div><div class="{0}-toolbar-caption" data-bind="@config.title__html:value"></div></div><div class="{0}-body"><div class="{0}-scrollbar"></div></div></div>'.format(cls, self.ID));

		var el = $('#' + self.ID);
		el.find(cls2 + '-scrollbar')[0].appendChild(self.dom);
		self.rclass('hidden');
		self.replace(el);
		self.event('click', cls2 + '-toolbar-backbutton', self.hide);

		var body = el.find(cls2 + '-body');

		if (config.scrollbar && W.SCROLLBAR) {
			self.scrollbar = SCROLLBAR(body.find(cls2 + '-scrollbar'), { visibleY: !!config.scrollbarY, parent: cls2 + '-body' });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		} else
			body.aclass(cls + '-scroll');

		self.event('click', function() {
			var arr = self.get();
			var index = arr.indexOf(config.if);
			if (index !== -1 && index !== arr.length - 1)
				self.set(arr.slice(0, index + 1));
		});
	};

	self.hide = function() {
		var path = self.get();
		var index = path.indexOf(config.if);
		if (index !== -1) {
			path.splice(index, 1);
			self.refresh(true);
		}
	};

	self.$hide = function() {
		self.rclass(cls + '-visible');
		self.aclass('hidden', 500);
		self.release(true);
	};

	self.resize = function() {
		var el = self.find(cls2 + '-body');
		self.css('height', WH);
		var h = WH - el.offset().top;
		el.css('height', h);
		config.resize && self.EXEC(config.resize, h);
		if (self.scrollbar) {
			self.scrollbar.resize();
			setTimeout(self.scrollbar.resize, 500);
		}
	};

	self.setter = function(value) {

		$('html').tclass(cls + '-noscroll', value.length > 0);

		var index = value.indexOf(config.if);
		if (index === -1) {
			visible && self.$hide();
			visible = false;
			return;
		}

		if (visible) {
			csspos['z-index'] = 10 + index;
			csspos.width = (WW - config.offset) - (config.offset * index);
			self.attrd('index', index);
			self.css(csspos);
			config.autofocus && self.autofocus(config.autofocus);
			setTimeout(self.resize, 100);
			return;
		}

		visible = true;
		csspos['z-index'] = 10 + index;
		csspos.width = (WW - config.offset) - (config.offset * index);
		self.css(csspos);
		self.attrd('index', index);
		self.rclass('hidden');
		self.resize();
		self.release(false);
		config.reload && self.EXEC(config.reload);
		config.default && DEFAULT(self.makepath(config.default), true);

		setTimeout(function() {
			self.aclass(cls + '-visible');
			setTimeout(self.resize, 100);
			config.autofocus && self.autofocus(config.autofocus);
		}, 200);
	};
});