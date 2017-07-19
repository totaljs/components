COMPONENT('pin', function(self) {

	var inputs = null;
	var reg_validation = /[0-9]/;
	var blank = '●';
	var skip = false;
	var count = 0;

	self.validate = function(value, init) {
		return init ? true : self.attrd('required') === 'true' ? value && value.indexOf(' ') === -1 ? true : false : true;
	};

	self.make = function() {

		self.aclass('ui-pin');

		var builder = [];
		count = +(self.attrd('count') || '6');

		for (var i = 0; i < count; i++)
			builder.push('<div data-index="{0}" class="ui-pin-input"><input type="textbox" maxlength="1" name="pin{0}" /></div>'.format(i));

		self.append(builder.join(''));

		self.event('keypress', 'input', function(e) {
			var c = e.which;
			if (c >= 48 && c <= 57) {
				var c = String.fromCharCode(e.charCode);
				if (this.value !== c)
					this.value = c;
				setTimeout(function(el) {
					var next = el.parent().next().find('input');
					next.length && next.focus();
				}, 50, $(this));
				self.mask();
				return;
			}

			c > 30 && e.preventDefault();
		});

		self.event('keydown', 'input', function(e) {
			e.which === 8 && setTimeout(function(el) {
				if (!el.val()) {
					el.attr('data-value', '');
					var prev = el.parent().prev().find('input');
					prev.val() && prev.focus();
				}
			}, 50, $(this));
		});

		inputs = self.find('input');
	};

	self.mask = function() {
		setTimeout2(self.id + '.mask', function() {
			inputs.each(function() {
				if (this.value && reg_validation.test(this.value)) {
					this.setAttribute('data-value', this.value);
					this.value = blank;
				}
			});
			self.getter();
		}, 300);
	};

	self.getter = function() {
		setTimeout2(self.id + '.getter', function() {
			var value = '';

			inputs.each(function() {
				value += this.getAttribute('data-value') || ' ';
			});

			if (self.get() !== value) {
				self.change(true);
				skip = true;
				self.set(value);
			}

		}, 100);
	};

	self.setter = function(value) {

		if (!value || skip) {
			skip = false;
			return;
		}

		inputs.each(function(index) {
			this.setAttribute('data-value', value.substring(index, index + 1));
			this.value = blank;
		});
	};
});