COMPONENT('autocomplete', 'height:200', function(self, config) {

	var container, old, onSearch, searchtimeout, searchvalue, blurtimeout, onCallback, datasource, offsetter, scroller;
	var is = false;
	var margin = {};
	var prev;
	var skipmouse = false;

	self.template = Tangular.compile('<li{{ if index === 0 }} class="selected"{{ fi }} data-index="{{ index }}"><span>{{ name }}</span><span>{{ type }}</span></li>');
	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-autocomplete-container hidden');
		self.html('<div class="ui-autocomplete"><ul></ul></div>');

		scroller = self.find('.ui-autocomplete');
		container = self.find('ul');

		self.event('click', 'li', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (onCallback) {
				var val = datasource[+$(this).attrd('index')];
				if (typeof(onCallback) === 'string')
					SET(onCallback, val.value === undefined ? val.name : val.value);
				else
					onCallback(val, old);
			}
			self.visible(false);
		});

		self.event('mouseenter mouseleave', 'li', function(e) {
			if (!skipmouse) {
				prev && prev.rclass('selected');
				prev = $(this).tclass('selected', e.type === 'mouseenter');
			}
		});

		$(document).on('click', function() {
			is && self.visible(false);
		});

		$(window).on('resize', function() {
			self.resize();
		});
	};

	self.prerender = function(value) {
		self.render(value);
	};

	self.configure = function(name, value) {
		switch (name) {
			case 'height':
				value && scroller.css('max-height', value);
				break;
		}
	};

	function keydown(e) {
		var c = e.which;
		var input = this;

		if (c !== 38 && c !== 40 && c !== 13) {
			if (c !== 8 && c < 32)
				return;
			clearTimeout(searchtimeout);
			searchtimeout = setTimeout(function() {
				var val = input.value;
				if (!val)
					return self.render(EMPTYARRAY);
				if (searchvalue === val)
					return;
				searchvalue = val;
				self.resize();
				onSearch(val, self.prerender);
			}, 200);
			return;
		}

		if (!datasource || !datasource.length)
			return;

		var current = container.find('.selected');
		if (c === 13) {
			if (prev) {
				prev = null;
				self.visible(false);
				if (current.length) {
					if (onCallback) {
						var val = datasource[+current.attrd('index')];
						if (typeof(onCallback) === 'string')
							SET(onCallback, val.value === undefined ? val.name : val.value);
						else
							onCallback(val, old);
					}
					e.preventDefault();
					e.stopPropagation();
				}
			}
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		if (current.length) {
			current.rclass('selected');
			current = c === 40 ? current.next() : current.prev();
		}

		skipmouse = true;
		!current.length && (current = self.find('li:{0}-child'.format(c === 40 ? 'first' : 'last')));
		prev && prev.rclass('selected');
		prev = current.aclass('selected');
		var index = +current.attrd('index');
		var h = current.innerHeight();
		var offset = ((index + 1) * h) + (h * 2);
		scroller.prop('scrollTop', offset > config.height ? offset - config.height : 0);
		setTimeout2(self.ID + 'skipmouse', function() {
			skipmouse = false;
		}, 100);
	}

	function blur() {
		clearTimeout(blurtimeout);
		blurtimeout = setTimeout(function() {
			self.visible(false);
		}, 300);
	}

	self.visible = function(visible) {
		clearTimeout(blurtimeout);
		self.tclass('hidden', !visible);
		is = visible;
	};

	self.resize = function() {

		if (!offsetter || !old)
			return;

		var offset = offsetter.offset();
		offset.top += offsetter.height();
		offset.width = offsetter.width();

		if (margin.left)
			offset.left += margin.left;
		if (margin.top)
			offset.top += margin.top;
		if (margin.width)
			offset.width += margin.width;

		self.css(offset);
	};

	self.attach = function(input, search, callback, left, top, width) {
		self.attachelement(input, input, search, callback, left, top, width);
	};

	self.attachelement = function(element, input, search, callback, left, top, width) {

		if (typeof(callback) === 'number') {
			width = left;
			left = top;
			top = callback;
			callback = null;
		}

		clearTimeout(searchtimeout);

		if (input.setter)
			input = input.find('input');
		else
			input = $(input);

		if (input[0].tagName !== 'INPUT') {
			input = input.find('input');
		}

		if (element.setter) {
			if (!callback)
				callback = element.path;
			element = element.element;
		}

		if (old) {
			old.removeAttr('autocomplete');
			old.off('blur', blur);
			old.off('keydown', keydown);
		}

		input.on('keydown', keydown);
		input.on('blur', blur);
		input.attr({ 'autocomplete': 'off' });

		old = input;
		margin.left = left;
		margin.top = top;
		margin.width = width;

		offsetter = $(element);
		self.resize();
		self.refresh();
		searchvalue = '';
		onSearch = search;
		onCallback = callback;
		self.visible(false);
	};

	self.render = function(arr) {

		datasource = arr;

		if (!arr || !arr.length) {
			self.visible(false);
			return;
		}

		var builder = [];
		for (var i = 0, length = arr.length; i < length; i++) {
			var obj = arr[i];
			obj.index = i;
			if (!obj.name)
				obj.name = obj.text;
			builder.push(self.template(obj));
		}

		container.empty().append(builder.join(''));
		skipmouse = true;

		setTimeout(function() {
			scroller.prop('scrollTop', 0);
			skipmouse = false;
		}, 100);

		prev = container.find('.selected');
		self.visible(true);
	};
});