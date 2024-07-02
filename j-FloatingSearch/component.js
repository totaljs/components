COMPONENT('floatingsearch', 'height:46', function(self, config, cls) {

	var is = false;
	var input;

	// jComponent +v20
	self.autobind20 && self.autobind20();

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.append('<div class="close"><i class="ti ti-times"></i></div><div class="icon"><i class="ti ti-search"></i></div><form action="#" onsubmit="return false" class="input"><input placeholder="{1}" data-jc-bind type="text" name="input{2}" autocomplete="new-password" /></form>'.format(cls, config.placeholder, Date.now()));

		if (config.height !== 46) {
			self.find('.close,.icon,input').css('line-height', (config.height - 2) + 'px');
			self.find('.close').css('width', config.height + 'px');
			self.find('.input').css('margin-right', (config.height + 5) + 'px');
			self.css('height', config.height + 'px');
		}

		input = self.find('input').on('keydown', function(e) {
			if (e.which === 27)
				self.hide();
		}).on('input', self.toggleicon)[0];

		self.event('click', '.close', self.hide);
		self.event('click', '.icon', function() {
			if (is) {
				input.value && self.set('', 2);
				self.toggleicon();
				input.focus();
			}
		});
	};

	self.toggleicon = function() {
		var tmp = !!input.value;
		if (is !== tmp) {
			is = tmp;
			self.find('.icon').find('i').tclass('ti-search', !is).tclass('ti-times', is);
			self.tclass(cls + '-filled', is);
		}
	};

	self.hide = function() {
		input.value && self.set('', 2);
		self.aclass('hidden');
	};

	self.show = function() {
		self.toggleicon();
		self.rclass('hidden');
		self.find('input').focus();
	};

});