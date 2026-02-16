COMPONENT('prompt', 'zindex:12;width:400;cancel:Cancel;submit:OK', function(self, config, cls) {

	var cls2 = '.' + cls;
	var body, input, textarea, multiline = false;
	var op = {};

	self.readonly();
	self.singleton();

	var current = function() {
		return multiline ? textarea : input;
	};

	var currentselector = function() {
		return multiline ? 'textarea' : 'input';
	};

	op.cancel = function() {
		var val = current().val();
		self.opt.cancel && self.opt.cancel(val);
		self.hide();
	};

	op.submit = function() {

		var val = current().val();

		if (!val || (!self.opt.newbie && val === self.opt.value)) {
			op.cancel();
			return;
		}

		self.opt.callback(val);
		self.hide();
	};

	self.make = function() {

		$(document.body).append('<div id="{1}" class="{0} {0}-container hidden"><div class="{0}-area"><div class="{0}-body"><div class="{0}-title"></div><div class="{0}-summary"></div><div class="{0}-input"><input type="text" /><textarea rows="3" class="hidden"></textarea></div><div class="{0}-buttons"><button name="cancel">{cancel}</button><button name="submit">{submit}</button></div></div>'.format(cls, self.ID).args(config));

		self.replace('#' + self.ID);
		body = self.find(cls2 + '-body');
		input = self.find('input');
		textarea = self.find('textarea');

		self.event('click', function(e) {
			var tag = e.target.tagName;
			if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'BUTTON')
				self.autofocus(currentselector());
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

		self.event('keydown', 'textarea', function(e) {
			switch (e.which) {
				case 13:
					if (e.ctrlKey || e.metaKey)
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
		multiline = opt.multiline === true;
		$('html').aclass(cls + '-noscroll');
		var title = opt.name || opt.title || '';
		var value = opt.value || '';
		input.tclass('hidden', multiline);
		textarea.tclass('hidden', !multiline);
		input.attr('type', opt.type || 'text');
		input.val(value);
		textarea.val(value);
		self.find(cls2 + '-title').tclass('hidden', !title).html(title);
		self.find(cls2 + '-summary').tclass('hidden', !opt.summary).html(opt.summary || '');
		self.css('z-index', opt.zindex || config.zindex);
		body.css({ 'max-width': opt.width || config.width });
		self.tclass(cls + '-centered', opt.centered === true);
		self.rclass('hidden');
		self.autofocus(currentselector());
	};
});
