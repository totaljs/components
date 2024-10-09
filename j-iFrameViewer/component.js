COMPONENT('iframeviewer', function(self, config, cls) {

	var cls2 = '.' + cls;
	var events = {};
	var is = false;
	var iframe;

	self.singleton();
	self.blind();

	events.keydown = function(e) {
		if (e.which === 27)
			self.hide();
	};

	events.off = function() {
		if (events.is) {
			events.is = false;
			$(W).off('keydown', events.keydown);
		}
	};

	events.on = function() {
		if (!events.is) {
			events.is = true;
			$(W).on('keydown', events.keydown);
		}
	};

	self.make = function() {

		W.iframeviewerload = function() {
			self.opt && self.opt.ready && self.opt.ready(iframe[0]);
			SETTER('!loading/hide', 1000);
		};

		self.aclass(cls + ' hidden');
		self.append('<div class="{0}-container"><div class="{0}-header"><span><i class="ti ti-times"></i></span><label></label></div><div class="{0}-body"><iframe src="about:blank" frameborder="0" onload="iframeviewerload()"></iframe></div></div>'.format(cls));
		iframe = self.find('iframe');
		self.find(cls2 + '-header > span').on('click', self.hide);
		self.on('resize + resize2', self.resize);
	};

	self.resize = function() {
		if (is) {
			var css = {};
			css.width = WW;
			css.height = WH;
			self.css(css);

			css = {};
			css.height = WH - (self.find(cls2 + '-header').height() || 45) - (self.opt.margin * 2);

			if (self.opt.margin)
				css['margin-top'] = self.opt.margin + 'px';

			iframe.css(css);
		}
	};

	self.hide = function() {
		if (is) {
			self.aclass('hidden');
			is = false;
			events.off();
			self.opt.close && self.opt.close();
			self.opt = null;
			iframe.attr('src', 'about:blank');
		}
	};

	self.open = function(opt) {

		// opt.name
		// opt.url
		// opt.width = '100%';
		// opt.close {Function}
		// opt.ready {Function}
		// opt.margin

		if (!opt.margin)
			opt.margin = 0;

		if (opt.esc)
			events.on();
		else
			events.off();

		self.opt = opt;
		is = true;
		self.tclass(cls + '-fixed', !!opt.width && opt.width !== '100%');
		self.find('label').text(opt.name);
		if (opt.html) {
			if (opt.html.indexOf('<body') === -1)
				opt.html = '<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body style="font-family:Arial;font-size:14px;margin:0;padding:0">' + opt.html + '</body></html>';
			iframe.attr('src', opt.url).css('width', opt.width || '100%');
			var doc = iframe[0].contentWindow.document;
			doc.open();
			doc.write(opt.html);
			doc.close();
		} else
			iframe.attr('src', opt.url).css('width', opt.width || '100%');

		self.resize();
		self.rclass('hidden');
		if (!opt.html)
			iframe.focus();
	};
});