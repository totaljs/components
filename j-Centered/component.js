COMPONENT('centered', 'closebutton:1;closeesc:1;scrollbar:1;visibleY:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var events = {};
	var container, scroller;

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			$(W).on('keydown', events.keydown);
		}
	};

	events.keydown = function(e) {
		if (e.which === 27)
			self.set('');
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			$(W).off('keydown', events.keydown);
		}
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {
		var css = { width: WW, height: WH };
		self.css(css);
		$(scroller).css(css);
		$(container).css({ height: WH });
		self.scrollbar && self.scrollbar.resize();
	};

	self.readonly();

	self.make = function() {

		self.aclass(cls + '-container hidden invisible');
		self.event('click', '[data-name="close"],[name="close"]', function() {
			self.hide();
		});

		if (self.dom.children[0].nodeName === ('SCRI' + 'PT')) {
			var html = self.dom.children[0].innerHTML;
			self.makeforce = function() {
				self.html('<span class="ti ti-times {0}-button{2}" data-name="close"></span><div class="{0}-content"><div class="{0}-body">{1}</div></div>'.format(cls, html, config.closebutton ? '' : ' hidden'));
				if (html.COMPILABLE())
					COMPILE();
				self.makeforce = null;
			};
		} else {
			container = document.createElement('DIV');
			container.setAttribute('class', cls + '-content');
			var div = document.createElement('DIV');
			div.setAttribute('class', cls + '-body');
			for (var i = 0; i < self.dom.children.length; i++)
				div.appendChild(self.dom.children[i]);

			container.appendChild(div);

			scroller = document.createElement('DIV');
			scroller.appendChild(container);

			if (config.scrollbar)
				self.scrollbar = SCROLLBAR($(scroller), { visibleY: config.visibleY });

			self.dom.appendChild(scroller);
			self.element.prepend('<span class="ti ti-times {0}-button{1}" data-name="close"></span>'.format(cls, config.closebutton ? '' : ' hidden'));
		}

		config.closeoutside && self.find(cls2 + '-body' + (typeof(config.closeoutside) === 'string' ? (',' + config.closeoutside) : '')).on('mousedown touchstart', function(e) {
			if (e.target === this)
				self.hide();
		});

		self.on('resize2', self.resize);
	};

	self.hide = function() {
		config.close && self.EXEC(config.close);
		self.set('');
	};

	self.setter = function(value) {
		var is = value === config.if;
		var hs = self.hclass('hidden');

		if (is === hs) {
			if (is) {
				self.makeforce && self.makeforce();
				config.closeesc && events.bind();
				config.default && DEFAULT(self.makepath(config.default), true);
				config.reload && self.EXEC(config.reload, self);
				config.zindex && self.css('z-index', config.zindex);
				config.autofocus && self.autofocus(config.autofocus);
			} else
				config.closeesc && events.unbind();

			self.tclass('hidden', !is);

			if (is) {
				self.resizeforce();
				self.tclass('invisible');
			} else if (config.close)
				self.EXEC(config.close);

			$('html').tclass(cls + '-noscroll', is);
		}
	};
});