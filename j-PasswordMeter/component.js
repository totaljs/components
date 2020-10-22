COMPONENT('passwordmeter', 'numbers:true;chars:true;special:false;casesensitive:true;sequence:true;min:4;valid:40;weak:Weak;good:Good;strong:Strong;text:Password strength;short:Short password;showprogress:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var elp, elr, p;

	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.element.prepend('<div class="{0}-progress{1}"><div></div></div><div class="{0}-help"><div class="{0}-rating"></div>'.format(cls, config.showprogress ? '' : ' hidden'));
		elp = $(self.find(cls2 + '-progress > div')[0]);
		elr = self.find(cls2 + '-rating');
	};

	self.setter = function(value, path, type) {

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
		self.rclass2(cls + '-').aclass(cls + '-' + rating);
		elr.html((config.text ? '<b>{0}:</b>'.format(config.text) : '') + config[rating]);

		config.progress && self.SEEX(config.progress, { progress: p, rating: rating, numbers: numbers, chars: chars, special: special, upper: upper, lower: lower, unicode: unicode, points: points });
		type && self.change(true);
	};

	self.validate = function(value, init) {
		return init ? true : config.valid ? p > config.valid && value && value.length >= config.min : true;
	};
});