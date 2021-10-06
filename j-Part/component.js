COMPONENT('part', 'hide:1;loading:1;delay:500', function(self, config, cls) {

	var init = false;
	var clid = null;
	var downloading = false;
	var isresizing = false;
	var cache = {};

	self.releasemode && self.releasemode('true');
	self.readonly();

	self.make = function() {
		self.aclass(cls);
	};

	self.resize = function() {
		if (config.absolute) {
			var pos = self.element.position();
			var obj = {};
			obj.width = WW - pos.left;
			obj.height = WH - pos.top;
			self.css(obj);
		}
	};

	var replace = function(value) {
		return value.replace(/\?/g, config.path || config.if);
	};

	var autofocus = function(counter) {
		if (!counter || counter < 10) {
			var el = self.find(typeof(config.autofocus) === 'string' ? config.autofocus : 'input[type="text"],select,textarea')[0];
			if (el)
				el.focus();
			else
				setTimeout(autofocus, 200, (counter || 1) + 1);
		}
	};

	self.setter = function(value) {

		if (cache[value]) {

			if (downloading)
				return;

			if (config.absolute && !isresizing) {
				self.on('resize2', self.resize);
				isresizing = true;
			}

			if (self.dom.hasChildNodes()) {

				if (clid) {
					clearTimeout(clid);
					clid = null;
				}

				self.release(false);

				var done = function() {
					config.hide && self.rclass('hidden');
					config.reload && EXEC(replace(config.reload));
					config.default && DEFAULT(replace(config.default), true);

					var invisible = self.hclass('invisible');
					invisible && self.rclass('invisible', config.delay);
					isresizing && setTimeout(self.resize, 50);
					setTimeout(self.emitresize, 200);

					if (!isMOBILE && config.autofocus)
						setTimeout(autofocus, (invisible ? config.delay : 0) + 400);

				};

				if (config.check)
					EXEC(replace(config.check), done);
				else
					done();

			} else {

				config.loading && SETTER('loading/show');
				downloading = true;
				setTimeout(function() {

					var preparator;

					if (config.replace)
						preparator = GET(replace(config.replace));
					else {
						preparator = function(content) {
							return content.replace(/~PATH~/g, replace(config.path || config.if));
						};
					}

					self.import(replace(config.url), function() {

						if (!init) {
							config.init && EXEC(replace(config.init));
							init = true;
						}

						var done = function() {
							config.hide && self.rclass('hidden');
							self.release(false);
							config.reload && EXEC(replace(config.reload), true);
							config.default && DEFAULT(replace(config.default), true);
							config.loading && SETTER('loading/hide', self.delay);
							var invisible = self.hclass('invisible');
							invisible && self.rclass('invisible', self.delay);
							isresizing && setTimeout(self.resize, 50);
							setTimeout(self.emitresize, 200);
							downloading = false;

							if (!isMOBILE && config.autofocus)
								setTimeout(autofocus, (invisible ? config.delay : 0) + 400);
						};

						EMIT('parts.' + config.if, self.element, self);

						if (config.check)
							EXEC(replace(config.check), done);
						else
							done();

					}, true, preparator);

				}, 200);
			}
		} else {

			if (!self.hclass('hidden')) {
				config.hidden && EXEC(replace(config.hidden));
				config.hide && self.aclass('hidden' + (config.invisible ? ' invisible' : ''));
				self.release(true);
			}

			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
		}

	};

	self.emitresize = function() {
		self.element.SETTER('*', 'resize');
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'if':

				var tmp = (value + '').split(',').trim();
				cache = {};
				for (var i = 0; i < tmp.length; i++)
					cache[tmp[i]] = 1;

				break;
			case 'absolute':
				var is = !!value;
				self.tclass(cls + '-absolute', is);
				break;
		}
	};

	self.clean = function() {
		if (self.hclass('hidden')) {
			config.clean && EXEC(replace(config.clean));
			setTimeout(function() {
				self.empty();
				init = false;
				clid = null;
				setTimeout(FREE, 1000);
			}, 1000);
		}
	};
});