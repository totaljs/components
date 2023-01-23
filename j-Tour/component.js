COMPONENT('tour', 'skiptext:Skip;nexttext:Next;backtext:Back;endtext:End;escape:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var data, lastindex;
	var $container, $info, $last;
	var $W = $(W);

	self.singleton();
	self.nocompile();

	self.configure = function(name, value) {
		switch(name) {
			case 'datasource':
				self.datasource(value, self.bind);
				break;
		}
	};

	self.bind = function(path, val) {
		data = val;
	};

	self.make = function() {
		var builder = [];

		builder.push('<div class="{0}-background"></div><div class="{0}"></div><div class="{0}-info"></div>'.format(cls));

		var html = builder.join('');

		self.aclass(cls + '-container');
		self.html(html);

		$container = self.find(cls2);
		$info = self.find(cls2 + '-info');

		self.event('click', '.close', function() {
			self.hideintro(2);
		});

		self.event('click', '.next', function() {

			lastindex += 1;

			if (lastindex === data.length) {
				self.hideintro(1);
				return;
			}

			var item = data[lastindex];
			self.setintro(item);
		});

		self.event('click', '.back', function() {
			lastindex -= 1;
			var item = data[lastindex];
			self.setintro(item);
		});

		self.event('click', cls2 + '-background', function() {
			config.bghide && self.hideintro(4);
		});

	};

	self.keydown = function(e) {
		switch (e.which) {
			case 27:
				config.escape && self.hideintro(3);
				break;
			case 9:
			case 39:
				self.find('.next').click();
				break;
			case 37:
				self.find('.back').click();
				break;
		}

	};

	self.setter = function(value, path, type) {

		if (type === 0)
			return;

		var index = +value;
		if (value === '' || data == null || data[index] == null) {
			self.hideintro(0);
			return;
		}

		var item = data[index];
		lastindex = index;
		self.setintro(item);
		$W.on('keydown', self.keydown);
	};

	self.hideintro = function(type) {
		$last && $last.rclass(cls + '-element');
		self.rclass(cls + '-visible');
		config.hide && self.EXEC(config.hide, type);
		$W.off('keydown', self.keydown);
	};

	self.setintro = function(item) {

		var builder = [];
		var css = {};

		var el = $(item.target).eq(0);
		var position = el.offset();

		css.top = position.top;
		css.left = position.left;
		css.width = el.outerWidth();
		css.height = el.outerHeight();
		$container.css(css);

		$last && $last.rclass(cls + '-element');
		$last = el;
		el.aclass(cls + '-element');

		var counter = '{0}&sol;{1}'.format(lastindex + 1, data.length);
		var islast = (data.length - 1) === lastindex;

		item.title && builder.push('<div class="' + cls + '-info-header"><span>' + counter + '</span><div>' + item.title + '</div></div>');
		builder.push('<div class="' + cls + '-info-body">' + item.text + '</div>');
		builder.push('<div class="{0}-info-footer"><button class="close">{1}</button><button class="back"{2}><i class="ti ti-angle-left"></i>{3}</button><button class="next">{4}<i class="ti ti-angle-right {5}"></i></button></div>'.format(cls, config.skiptext, (lastindex === 0 ? ' disabled' : ''), config.backtext, islast ? config.endtext : config.nexttext, islast ? 'hidden' : ''));

		$info.html(builder.join(''));

		var height = $info.innerHeight() + 20;
		$W.scrollTop(position.top - height - 100);

		var current = position.top - $W.scrollTop();
		var isbottom = (current < height);
		var viewoffset = isbottom ? ((css.height * -1) - 20) : height;

		$info.rclass(cls + '-info-bottom');

		if (isbottom)
			$info.aclass(cls + '-info-bottom');

		var offset = item.offsetY || 0;

		$info.css({
			top: (position.top - viewoffset) - offset,
			left: position.left
		});

		self.aclass(cls + '-visible');
	};

});
