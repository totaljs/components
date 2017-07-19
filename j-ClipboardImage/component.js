COMPONENT('clipboardimage', function(self) {

	var ctx, img, canvas, maxW, maxH, quality;

	self.singleton();
	self.readonly();
	self.blind();

	self.make = function() {
		self.aclass('hidden');
		self.append('<canvas></canvas><img src="data:image/png;base64,R0lGODdhAQABAIAAAHnrWAAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==" />');
		canvas = self.find('canvas').get(0);
		ctx = canvas.getContext('2d');
		img = self.find('img').get(0);
		maxW = (self.attrd('width') || '1280').parseInt();
		maxH = (self.attrd('height') || '1024').parseInt();
		quality = (self.attrd('quality') || '90').parseInt() * 0.01;

		$(window).on('paste', function(e) {
			var item = e.originalEvent.clipboardData.items[0];
			if (item.kind !== 'file' || item.type.substring(0, 5) !== 'image')
				return;
			var blob = item.getAsFile();
			var reader = new FileReader();
			reader.onload = function(e) {
				img.onload = function() {
					self.resize();
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(blob);
		});
	};

	self.resize = function() {
		var dpr = window.devicePixelRatio;

		if (dpr > 1) {
			canvas.width = img.width / dpr;
			canvas.height = img.height / dpr;
		} else {
			canvas.width = img.width;
			canvas.height = img.height;
		}

		if (canvas.width > maxW) {
			canvas.width = maxW;
			canvas.height = (maxW / (img.width / img.height)) >> 0;
		} else if (canvas.height > maxH) {
			canvas.height = maxH;
			canvas.width = (maxH / (img.width / img.height)) >> 0;
		}

		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		EMIT('clipboardimage', canvas.toDataURL('image/jpeg', quality));
	};
});