COMPONENT('prompt', 'zindex:12;width:400;cancel:Cancel;submit:OK', function(self, config, cls) {

	var cls2 = '.' + cls;
	var body, input;
	var op = {};

	self.readonly();
	self.singleton();

	op.cancel = function() {
		var val = input.val();
		self.opt.cancel && self.opt.cancel(val);
		self.hide();
	};

	op.submit = function() {

		var val = input.val();

		if (val === self.opt.value) {
			op.cancel();
			return;
		}

		self.opt.callback(val);
		self.hide();
	};

	self.make = function() {

		$(document.body).append('<div id="{1}" class="{0} {0}-container hidden"><div class="{0}-area"><div class="{0}-body"><div class="{0}-title"></div><div class="{0}-summary"></div><div class="{0}-input"><input type="text" /></div><div class="{0}-buttons"><button name="cancel">{cancel}</button><button name="submit">{submit}</button></div></div>'.format(cls, self.ID).args(config));

		self.replace('#' + self.ID);
		body = self.find(cls2 + '-body');
		input = self.find('input');

		self.event('click', function(e) {
			var tag = e.target.tagName;
			if (tag !== 'INPUT' && tag !== 'BUTTON')
				self.autofocus('input');
		});

		self.event('click', '.cancel', self.hide);
		self.event('click', 'button[name]', function() {
			var t = this;
			if (!t.disabled)
				op[t.name]();
		});

		self.event('keydown', 'input', function(e) {
			switch (e.which) {
				case 13:
					op.submit();
					break;
				case 27:
					op.cancel();
					break;
			}
		});
	};

	self.hide = function() {

		if (!self.opt)
			return;

		self.opt.hide && self.opt.hide();
		self.opt = null;
		self.aclass('hidden', 100);
	};

	self.show = function(opt) {
		self.opt = opt;
		$('html').aclass(cls + '-noscroll');
		var title = opt.name || opt.title || '';
		input.attr('type', opt.type || 'text');
		input.val(opt.value || '');
		self.find(cls2 + '-title').tclass('hidden', !title).html(title);
		self.find(cls2 + '-summary').tclass('hidden', !opt.summary).html(opt.summary || '');
		self.css('z-index', opt.zindex || config.zindex);
		body.css({ 'max-width': opt.width || config.width });
		self.find(cls2 + '-area').tclass(cls + '-centered', opt.centered === true);
		self.rclass('hidden');
		self.autofocus('input');
	};
});