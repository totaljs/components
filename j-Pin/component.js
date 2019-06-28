COMPONENT('pin', 'blank:●;count:6;hide:false;mask:true', function(self, config) {

	var reg_validation = /[0-9]/;
	var inputs = null;
	var skip = false;
	var count = 0;

	self.nocompile && self.nocompile();

	self.validate = function(value, init) {
		return init ? true : config.required || config.disabled ? !!(value && value.indexOf(' ') === -1) : true;
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'count':
				!init && self.redraw();
				break;
			case 'disabled':
				self.find('input').prop('disabled', value);
				self.tclass('ui-disabled', value);
				!init && !value && self.state(1, 1);
				break;
		}
	};

	self.redraw = function() {
		var builder = [];
		count = config.count;
		for (var i = 0; i < count; i++)
			builder.push('<div data-index="{0}" class="ui-pin-input"><input type="{1}" maxlength="1" autocomplete="pin{2}" name="pin{2}" pattern="[0-9]" /></div>'.format(i, isMOBILE ? 'tel' : 'text', Date.now() + i));
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

				if (config.mask) {
					if (config.hide) {
						self.maskforce(t);
					} else
						self.mask();
				}
				else {
					t.setAttribute('data-value', t.value);
					self.getter();
				}

				setTimeout(function(el) {
					var next = el.parent().next().find('input');
					next.length && next.focus();
				}, 50, $(t));
			} else if (c > 30)
				e.preventDefault();
		});

		self.event('keydown', 'input', function(e) {
			e.which === 8 && setTimeout(function(el) {
				if (!el.val()) {
					el.attrd('value', '');
					var prev = el.parent().prev().find('input');
					prev.val() && prev.focus();
					self.mask();
				}
			}, 50, $(this));
		});

		inputs = self.find('input');
	};

	self.maskforce2 = function() {
		self.maskforce(this);
	};

	self.maskforce = function(input) {
		if (input.value && reg_validation.test(input.value)) {
			input.setAttribute('data-value', input.value);
			input.value = config.blank;
			self.getter();
		}
	};

	self.mask = function() {
		setTimeout2(self.id + '.mask', function() {
			inputs.each(self.maskforce2);
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

		if (skip) {
			skip = false;
			return;
		}

		if (value == null)
			value = '';

		inputs.each(function(index) {
			this.setAttribute('data-value', value.substring(index, index + 1));
			this.value = value ? config.blank : '';
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