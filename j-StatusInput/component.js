COMPONENT('statusinput', function(self) {

	var cls = 'ui-statusinput';
	var cls2 = '.ui-statusinput';
	var placeholder, input, isplaceholder, submit;

	self.readonly();
	self.singleton();
	self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.append('<label class="{0}-placeholder"></label><nav><button name="ok" disabled><i class="ti ti-check"></i></button><button name="no"><i class="ti ti-times"></i></button></nav><div class="{0}-input"><input type="text" /></div>'.format(cls));

		input = self.find('input');
		placeholder = self.find(cls2 + '-placeholder');
		submit = self.find('button[name="ok"]');

		input.on('input', function() {

			var t = this;
			var is = !!t.value;
			if (is !== isplaceholder) {
				isplaceholder = is;
				placeholder.tclass('hidden', is);
				submit.prop('disabled', !is);
			}

			if (self.opt.validate && t.value)
				submit.prop('disabled', !self.opt.validate.test(t.value));

		}).on('keydown', function(e) {
			switch (e.keyCode) {
				case 13:
					if (!submit[0].disabled)
						submit.trigger('click');
					break;
				case 27:
					self.aclass('hidden');
					input.blur();
					self.opt.hide && self.opt.hide();
					break;
			}
		});

		placeholder.on('click', function() {
			input.focus();
		});

		self.event('click', 'button', function() {
			var t = this;
			switch (t.name) {
				case 'ok':
					self.opt.callback(input.val());
					break;
				case 'no':
					self.opt.hide && self.opt.hide();
					break;
			}
			self.aclass('hidden');
		});
	};

	self.show = function(opt) {

		// opt.callback {Function}
		// opt.placeholder
		// opt.value
		// opt.icon
		// opt.validate {RegExp}
		// opt.hide {Function}

		self.opt = opt;
		input.val(opt.value || '');
		isplaceholder = false;
		placeholder.tclass('hidden', !!opt.value);
		placeholder.html((opt.icon ? '<i class="ti ti-{0}"></i>'.format(opt.icon) : '') + opt.placeholder || '');
		submit.prop('disabled', true);
		self.rclass('hidden');

		setTimeout(function() {
			input.focus();
		}, 500);
	};

});