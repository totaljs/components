COMPONENT('panel', 'width:350;icon:circle-o;zindex:12;scrollbar:true;scrollbarY:false', function(self, config) {

	var W = window;

	if (!W.$$panel) {

		W.$$panel_level = W.$$panel_level || 1;
		W.$$panel = true;

		$(document).on('click touchend', '.ui-panel-button-close,.ui-panel-container', function(e) {
			var target = $(e.target);
			var curr = $(this);
			var main = target.hclass('ui-panel-container');
			if (curr.hclass('ui-panel-button-close') || main) {
				var parent = target.closest('.ui-panel-container');
				var com = parent.component();
				if (!main || com.config.bgclose) {

					if (config.close)
						EXEC(config.close, com);
					else
						com.hide();

					e.preventDefault();
					e.stopPropagation();
				}
			}
		});

		$(W).on('resize', function() {
			SETTER('panel', 'resize');
		});
	}

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		var el = self.element.find('.ui-panel-body');
		el.height(WH - self.find('.ui-panel-header').height());
		self.scrollbar && self.scrollbar.resize();
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass('fa fa-' + value.icon);
	};

	self.make = function() {

		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';
		$(document.body).append('<div id="{0}" class="hidden ui-panel-container{3}"><div class="ui-panel" style="max-width:{1}px"><div data-bind="@config__change .ui-panel-icon:@icon__html span:value.title" class="ui-panel-title"><button name="cancel" class="ui-panel-button-close{2}"><i class="fa fa-times"></i></button><i class="ui-panel-icon"></i><span></span></div><div class="ui-panel-header"></div><div class="ui-panel-body"></div></div>'.format(self.ID, config.width, config.closebutton == false ? ' hidden' : '', config.bg ? '' : ' ui-panel-inline'));
		var el = $('#' + self.ID);

		var body = el.find('.ui-panel-body');
		body[0].appendChild(self.dom);

		if (config.scrollbar && window.SCROLLBAR) {
			self.scrollbar = SCROLLBAR(body, { visibleY: !!config.scrollbarY });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		} else
			body.aclass('ui-panel-scroll');

		self.rclass('hidden');
		self.replace(el);
		self.event('click', 'button[name]', function() {
			switch (this.name) {
				case 'cancel':
					self.hide();
					break;
			}
		});

		self.resize();
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'bg':
				self.tclass('ui-panel-inline', !value);
				self.element.css('max-width', value ? 'inherit' : (config.width + 1));
				break;
			case 'closebutton':
				!init && self.find('.ui-panel-button-close').tclass(value !== true);
				break;
			case 'width':
				self.element.css('max-width', config.bg ? 'inherit' : value);
				self.find('.ui-panel').css('max-width', value);
				break;
		}
	};

	self.setter = function(value) {

		setTimeout2('ui-panel-noscroll', function() {
			$('html').tclass('ui-panel-noscroll', !!$('.ui-panel-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden)
			return;

		setTimeout2('panelreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.aclass('hidden');
			self.release(true);
			self.rclass('ui-panel-animate');
			W.$$panel_level--;
			return;
		}

		if (self.template) {
			var is = (/(data-bind|data-jc|data--{2,})="/).test(self.template);
			self.find('div[data-jc-replaced]').html(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$panel_level < 1)
			W.$$panel_level = 1;

		W.$$panel_level++;

		var container = self.element.find('.ui-panel-body');
		self.css('z-index', W.$$panel_level * config.zindex);
		container.scrollTop(0);
		self.rclass('hidden');
		self.release(false);
		setTimeout(self.resize, 100);

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus === true ? 'input[type="text"],select,textarea' : config.autofocus);
			el.length && el[0].focus();
		}

		setTimeout(function() {
			if (self.scrollbar)
				self.scrollbar.scroll(0, 0);
			else
				container.scrollTop(0);
			self.aclass('ui-panel-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$panel_level * config.zindex) + 1);
		}, 1000);
	};
});