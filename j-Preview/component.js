COMPONENT('preview', 'width:200;height:100;background:#FFFFFF;quality:90;customize:1;schema:{file\\:base64,name\\:filename}', function(self, config, cls) {

	var empty, img, canvas, name, content = null;

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'width':
			case 'height':
			case 'background':
				setTimeout2(self.id + 'reinit', self.reinit, 50);
				break;
			case 'label':
			case 'icon':
				redraw = true;
				break;
		}

		redraw && setTimeout2(self.id + 'redraw', function() {
			self.redraw();
			self.refresh();
		}, 50);

	};

	self.reinit = function() {
		canvas = document.createElement('canvas');
		canvas.width = config.width;
		canvas.height = config.height;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = config.background;
		ctx.fillRect(0, 0, config.width, config.height);
		empty = canvas.toDataURL('image/png');
		canvas = null;
	};

	var resizewidth = function(w, h, size) {
		return Math.ceil(w * (size / h));
	};

	var resizeheight = function(w, h, size) {
		return Math.ceil(h * (size / w));
	};

	self.resizeforce = function(image) {

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = config.width;
		canvas.height = config.height;
		ctx.fillStyle = config.background;
		ctx.fillRect(0, 0, config.width, config.height);

		var w = 0;
		var h = 0;
		var x = 0;
		var y = 0;
		var is = false;
		var diff = 0;

		if (config.customize) {

			if (config.percentage) {
				config.width = (image.width / 100) * config.percentage >> 0;
				config.height = (image.height / 100) * config.percentage >> 0;
				canvas.width = config.width;
				canvas.height = config.height;
				ctx.fillStyle = config.background;
				ctx.fillRect(0, 0, config.width, config.height);
				empty = canvas.toDataURL('image/png');
			}

			if (image.width > config.width || image.height > config.height) {
				if (image.width > image.height) {

					w = resizewidth(image.width, image.height, config.height);
					h = config.height;

					if (w < config.width) {
						w = config.width;
						h = resizeheight(image.width, image.height, config.width);
					}

					if (w > config.width) {
						diff = w - config.width;
						x -= (diff / 2) >> 0;
					}

					is = true;
				} else if (image.height > image.width) {

					w = config.width;
					h = resizeheight(image.width, image.height, config.width);

					if (h < config.height) {
						h = config.height;
						w = resizewidth(image.width, image.height, config.height);
					}

					if (h > config.height) {
						diff = h - config.height;
						y -= (diff / 2) >> 0;
					}

					is = true;
				}
			}
		}

		if (!is) {
			if (image.width < config.width && image.height < config.height) {
				w = image.width;
				h = image.height;
				x = (config.width / 2) - (image.width / 2);
				y = (config.height / 2) - (image.height / 2);
			} else if (image.width >= image.height) {
				w = config.width;
				h = image.height * (config.width / image.width);
				y = (config.height / 2) - (h / 2);
			} else {
				h = config.height;
				w = (image.width * (config.height / image.height)) >> 0;
				x = (config.width / 2) - (w / 2);
			}

		}

		ctx.drawImage(image, x, y, w, h);
		var base64 = canvas.toDataURL('image/jpeg', config.quality * 0.01);
		img.attr('src', base64);
		self.upload(base64);
	};

	self.redraw = function() {
		var label = config.label || content;
		self.html((label ? ('<div class="' + cls + '-label">{0}{1}:</div>'.format(config.icon ? '<i class="{0}"></i>'.format(config.icon.indexOf(' ') === -1 ? ('fa fa-' + config.icon) : config.icon) : '', label)) : '') + '<input type="file" accept="image/*" class="hidden" /><img src="{0}" class="img-responsive" alt="" />'.format(empty, config.width, config.height));
		img = self.find('img');
		img.on('click', function() {
			self.find('input').trigger('click');
		});
	};

	self.make = function() {

		content = self.html();
		self.aclass(cls);
		self.reinit();
		self.redraw();

		self.event('change', 'input', function() {
			var file = this.files[0];
			file && self.load(file);
			this.value = '';
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					break;
				default:
					return;
			}

			var dt = e.originalEvent.dataTransfer;
			if (dt && dt.files.length) {
				var file = e.originalEvent.dataTransfer.files[0];
				file && self.load(file);
			}
		});
	};

	self.load = function(file) {
		name = file.name;
		self.getOrientation(file, function(orient) {
			var reader = new FileReader();
			reader.onload = function () {
				var img = new Image();
				img.onload = function() {
					self.resizeforce(img);
					self.change(true);
				};
				img.crossOrigin = 'anonymous';
				if (orient < 2) {
					img.src = reader.result;
				} else {
					SETTER('loading', 'show');
					self.resetOrientation(reader.result, orient, function(url) {
						SETTER('loading', 'hide', 500);
						img.src = url;
					});
				}
			};
			reader.readAsDataURL(file);
		});
	};

	self.upload = function(base64) {
		if (base64) {
			var data = (new Function('base64', 'filename', 'return ' + config.schema))(base64, name);
			SETTER('loading', 'show');
			var url = config.url.env(true);
			AJAX((url.indexOf(' ') === -1 ? 'POST ' : '') + url, data, function(response, err) {
				SETTER('loading', 'hide', 100);
				if (err) {
					SETTER('snackbar', 'warning', err.toString());
				} else {
					self.change(true);
					self.set(config.map ? FN(config.map)(response) : response);
				}
			});
		}
	};

	self.setter = function(value) {
		if (value && config.preview)
			value = FN(config.preview)(value);
		if (!value && config.empty)
			value = config.empty;
		img.attr('src', value ? value : empty);
	};

	// http://stackoverflow.com/a/32490603
	self.getOrientation = function(file, callback) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var view = new DataView(e.target.result);
			if (view.getUint16(0, false) != 0xFFD8)
				return callback(-2);
			var length = view.byteLength;
			var offset = 2;
			while (offset < length) {
				var marker = view.getUint16(offset, false);
				offset += 2;
				if (marker == 0xFFE1) {
					if (view.getUint32(offset += 2, false) != 0x45786966)
						return callback(-1);
					var little = view.getUint16(offset += 6, false) == 0x4949;
					offset += view.getUint32(offset + 4, little);
					var tags = view.getUint16(offset, little);
					offset += 2;
					for (var i = 0; i < tags; i++)
						if (view.getUint16(offset + (i * 12), little) == 0x0112)
							return callback(view.getUint16(offset + (i * 12) + 8, little));
				} else if ((marker & 0xFF00) != 0xFF00)
					break;
				else
					offset += view.getUint16(offset, false);
			}
			return callback(-1);
		};
		reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
	};

	self.resetOrientation = function(src, srcOrientation, callback) {
		var img = new Image();
		img.onload = function() {
			var width = img.width;
			var height = img.height;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			// set proper canvas dimensions before transform & export
			/*
			if (4 < srcOrientation && srcOrientation < 9) {
				canvas.width = height;
				canvas.height = width;
			} else {
				canvas.width = width;
				canvas.height = height;
			}*/

			canvas.width = width;
			canvas.height = height;

			switch (srcOrientation) {
				case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
				case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
				case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
				case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
				// case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
				case 6: ctx.transform(-1, 0, 0, 1, width, 0); break;
				case 7: ctx.transform(0, -1, -1, 0, height, width); break;
				case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
			}
			ctx.drawImage(img, 0, 0);
			callback(canvas.toDataURL());
		};
		img.src = src;
	};
});