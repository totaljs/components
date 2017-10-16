COMPONENT('crop', 'dragdrop:true;format:{0}', function(self, config) {

	var width, height, canvas, context;
	var img = new Image();
	var can = false;
	var is = false;
	var zoom = 100;
	var current = { x: 0, y: 0 };
	var offset = { x: 0, y: 0 };
	var cache = { x: 0, y: 0, zoom: 0 };

	self.noValid();
	self.getter = null;

	img.onload = function () {
		can = true;
		zoom = 100;

		var nw = (img.width / 2) >> 0;
		var nh = (img.height / 2) >> 0;

		if (img.width > width) {
			var p = (width / (img.width / 100)) >> 0;
			zoom -= zoom - p;
			nh = ((img.height * (p / 100)) / 2) >> 0;
			nw = ((img.width * (p / 100)) / 2) >> 0;
		}

		// centering
		cache.x = current.x = (width / 2) - nw;
		cache.y = current.y = (height / 2) - nh;
		cache.zoom = zoom;
		self.redraw();
	};

	self.resize = function(w, h) {
		width = w;
		height = h;
		canvas.width = w;
		canvas.height = h;
	};

	self.output = function(type) {
		return type ? canvas.toDataURL(type) : !config.background && self.isTransparent(context) ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg');
	};

	self.make = function() {

		width = config.width;
		height = config.height;

		self.aclass('ui-crop');
		self.append('<input type="file" style="display:none" accept="image/*" /><ul><li data-type="upload"><span class="fa fa-folder"></span></li><li data-type="plus"><span class="fa fa-plus"></span></li><li data-type="refresh"><span class="fa fa-refresh"></span></li><li data-type="minus"><span class="fa fa-minus"></span></li></ul>');
		self.append(Tangular.render('<canvas width="{0}" height="{1}"></canvas>'.format(width, height)));
		canvas = self.find('canvas').get(0);
		context = canvas.getContext('2d');

		self.event('click', 'li', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var type = $(this).attr('data-type');

			switch (type) {
				case 'upload':
					self.find('input').trigger('click');
					break;
				case 'plus':
					zoom += 5;
					if (zoom > 300)
						zoom = 300;
					current.x -= 5;
					current.y -= 5;
					self.redraw();
					break;
				case 'minus':
					zoom -= 5;
					if (zoom < 5)
						zoom = 5;
					current.x += 5;
					current.y += 5;
					self.redraw();
					break;
				case 'refresh':
					zoom = cache.zoom;
					self.redraw();
					break;
			}

		});

		self.find('input').on('change', function() {

			var file = this.files[0];
			var reader = new FileReader();

			reader.onload = function () {
				img.src = reader.result;
				setTimeout(function() {
					self.change(true);
				}, 500);
			};

			reader.readAsDataURL(file);
			this.value = '';

		});

		$(canvas).on('mousedown', function (e) {

			if (self.disabled || !can)
				return;

			is = true;
			var rect = canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			offset.x = x - current.x;
			offset.y = y - current.y;
		});

		(config.dragdrop && $(canvas).on('dragenter dragover dragexit drop dragleave', function (e) {
			if (self.disabled)
				return;

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					self.rclass('ui-crop-dragdrop');
					break;
				case 'dragenter':
				case 'dragover':
					self.aclass('ui-crop-dragdrop');
					return;
				case 'dragexit':
				case 'dragleave':
				default:
					self.rclass('ui-crop-dragdrop');
					return;
			}

			var files = e.originalEvent.dataTransfer.files;
			var reader = new FileReader();

			reader.onload = function () {
				img.src = reader.result;
				setTimeout(function() {
					self.change(true);
				}, 500);
			};

			reader.readAsDataURL(files[0]);
		});

		self.event('mousemove mouseup', function (e) {

			if (e.type === 'mouseup') {
				is && self.change();
				is = false;
				return;
			}

			if (self.disabled || !can || !is)
				return;

			var rect = canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			current.x = x - offset.x;
			current.y = y - offset.y;
			self.redraw();
		});
	};

	self.redraw = function() {

		var w = img.width;
		var h = img.height;

		w = ((w / 100) * zoom) >> 0;
		h = ((h / 100) * zoom) >> 0;

		context.clearRect(0, 0, width, height);

		if (config.background) {
			context.fillStyle = config.background;
			context.fillRect(0, 0, width, height);
		}

		can && context.drawImage(img, current.x || 0, current.y || 0, w, h);
	};

	self.setter = function(value) {
		if (value) {
			img.src = config.format.format(value);
		} else {
			can = false;
			self.redraw();
		}
	};

	self.isTransparent = function(ctx) {
		var id = ctx.getImageData(0, 0, width, height);
		for (var i = 0, length = id.data.length; i < length; i += 4) {
			if (id.data[i + 3] !== 255)
				return true;
		}
		return false;
	}
});