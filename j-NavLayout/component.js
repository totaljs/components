COMPONENT('navlayout', 'parent:window;autoresize:1;margin:0;width:250;hide:xs,sm;position:left', function(self, config, cls) {

	var cls2 = '.' + cls;
	var main;
	var section;
	var init = false;

	self.readonly();

	self.init = function() {
		ON('resize + resize2', function() {
			for (var i = 0; i < M.components.length; i++) {
				var com = M.components[i];
				if (com.name === 'navlayout' && com.dom.offsetParent && com.$ready && !com.$removed && com.config.autoresize)
					com.resize();
			}
		});
	};

	self.make = function() {

		self.aclass(cls);

		for (var i = 0; i < self.dom.children.length; i++) {
			var el = self.dom.children[i];
			switch (el.tagName) {
				case 'SECTION':
					section = $(el);
					break;
				case 'MAIN':
					main = $(el);
					break;
			}
		}

		self.resize();
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'hide':
				var arr = value.split(',');
				if (!init)
					self.rclass2(cls2 + '-d-');
				for (var i = 0; i < arr.length; i++)
					self.aclass(cls + '-d-' + arr[i]);
				break;
			case 'position':
				self.rclass(cls + '-left ' + cls + '-right').aclass(cls + '-' + config.position);
				break;
			case 'width':
				var css = {};
				css.width = config.width;
				section.css(css);
				css = {};
				css['margin-left'] = config.position === 'left' ? config.width : '';
				css['margin-right'] = config.position === 'right' ? config.width : '';
				main.css(css);
				break;
		}
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 100);
	};

	self.resizeforce = function() {
		var parent = self.parent(config.parent);
		var height = parent.height() - config.margin;
		var css = {};
		css.height = height;
		self.css(css);
		section.css(css);
		main.css(css);
		if (!init) {
			var arr = [self.element, main, section];
			for (var i = 0; i < arr.length; i++)
				arr[i].rclass('invisible hidden', 100);
			init = true;
		}
	};

	self.setter = function(value) {
		self.tclass(cls + '-show', !!value);
	};

});