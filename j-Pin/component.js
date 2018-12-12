COMPONENT('pin', 'blank:●;count:6', function(self, config) {

	var inputs = null;
	var reg_validation = /[0-9]/;
	var skip = false;
	var count = 0;

	self.nocompile && self.nocompile();

	self.validate = function(value, init) {
		return init ? true : config.required || config.disabled ? !!(value && value.indexOf(' ') === -1) : true;
	};

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'count':
				self.redraw();
				break;
			case 'disabled':
				self.find('input').prop('disabled', value);
				self.tclass('ui-disabled', value);
				!value && self.state(1, 1);
				break;
		}
	};

	self.redraw = function() {
		var builder = [];
		count = config.count;
		for (var i = 0; i < count; i++)
			builder.push('<div data-index="{0}" class="ui-pin-input"><input type="{1}" maxlength="1" name="pin{0}" pattern="[0-9]" /></div>'.format(i, isMOBILE ? 'tel' : 'text'));
		self.html(builder.join(''));
	};

	self.make = function() {

		self.aclass('ui-pin');
		self.redraw();

		self.event('keypress', 'input', function(e) {
			var c = e.which;
			var t = this;
			if (c >= 48 && c <= 57) {
				var c = String.fromCharCode(e.charCode);
				if (t.value !== c)
					t.value = c;
				setTimeout(function(el) {
					var next = el.parent().next().find('input');
					next.length && next.focus();
				}, 50, $(t));
				self.mask();
			} else if (c > 30)
				e.preventDefault();
		});

		self.event('keydown', 'input', function(e) {
			e.which === 8 && setTimeout(function(el) {
				if (!el.val()) {
					el.attr('data-value', '');
					var prev = el.parent().prev().find('input');
					prev.val() && prev.focus();
					self.mask();
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
					this.value = config.blank;
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
			this.value = config.blank;
		});
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-pin-invalid', invalid);
	};
});