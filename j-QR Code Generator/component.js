COMPONENT('qrcode', function() {
	var self = this;
	var url = 'https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data={0}&qzone=0&margin=0&size={1}x{1}&ecc=L';
	var img;

	self.readonly();

	self.setter = function(value) {

		var src = url;

		if (!value) {
			src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
			value = '';
		} else
			value = value.toString();

		var text = encodeURIComponent(value);
		var size = (self.attr('data-size') || '200').replace('px', '');

		if (img) {
			img.attr('src', src.format(text, size));
			return;
		}

		self.html('<img src="{0}" alt="QR Code" border="0" style="max-width:100%;height:auto" />'.format(src.format(text, size)));
		img = self.find('img');
	};
});