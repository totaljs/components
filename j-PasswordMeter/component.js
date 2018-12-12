COMPONENT('passwordmeter', 'numbers:true;chars:true;special:false;casesensitive:true;sequence:true;min:4;valid:40;weak:Weak;good:Good;strong:Strong;text:Password strength;short:Short password', function(self, config) {

	var elp, elr, p;

	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-passwordmeter');
		self.element.prepend('<div class="ui-passwordmeter-progress"><div></div></div><div class="ui-passwordmeter-help"><div class="ui-passwordmeter-rating"></div>');
		elp = $(self.find('.ui-passwordmeter-progress > div')[0]);
		elr = self.find('.ui-passwordmeter-rating');
	};

	self.setter = function(value, type) {

		if (!value)
			value = '';

		var numbers = 0;
		var chars = 0;
		var special = 0;
		var lower = 0;
		var upper = 0;
		var unicode = 0;
		var max = 0;
		var points = 0;
		var numbersseq = false;
		var charsseq = false;

		for (var i = 0; i < value.length; i++) {

			var prev2 = i > 1 ? value.charCodeAt(i - 2) : 0;
			var prev = i ? value.charCodeAt(i - 1) : 0;
			var c = value.charCodeAt(i);

			if (c > 47 && c < 58) {

				if ((c + 1 === prev || c - 1 === prev) && (c + 2 === prev2 || c - 2 === prev2))
					numbersseq = true;

				numbers++;
				continue;
			}

			if (c > 64 && c < 91) {

				if ((c + 1 === prev || c - 1 === prev) && (c + 2 === prev2 || c - 2 === prev2))
					charsseq = true;

				upper++;
				chars++;
				continue;
			}

			if (c > 96 && c < 123) {
				lower++;
				chars++;
				continue;
			}

			if (c < 127)
				special++;
			else if (c > 128) {
				unicode++;
				chars++;
			}
		}

		if (config.numbers) {
			max += 2;
			if (numbers)
				points++;
			if (numbers > 1) // More than 1 number
				points++;
		}

		if (config.chars) {
			max += 2;
			if (chars || unicode)
				points++;
			if (chars > 1 || unicode > 1) // More than 1 char
				points++;
		}

		if (config.casesensitive) {
			max += 2;
			if (lower)
				points++;
			if (upper)
				points++;
		}

		if (config.special) {
			max++;
			if (special)
				points++;
		}

		if (config.sequence) {
			max++;
			if (!numbersseq && !charsseq && value)
				points++;
		}

		var rating;

		if (value.length < config.min) {
			p = 0;
			rating = 'short';
		} else {
			p = Math.ceil((points / max) * 100);
			rating = p < 30 ? 'weak' : p < 70 ? 'good' : 'strong';
		}

		elp.animate({ width: p + '%' }, 300);
		self.rclass2('ui-passwordmeter-').aclass('ui-passwordmeter-' + rating);
		elr.html('<b>{0}:</b>'.format(config.text) + config[rating]);

		type && self.change(true);
	};

	self.validate = function(value, init) {
		return init ? true : config.valid ? p > config.valid && value && value.length >= config.min : true;
	};
});