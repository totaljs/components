COMPONENT('iframepreview', function(self) {

	var iframe;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-iframepreview');
		self.html('<iframe src="about:blank" frameborder="0" scrolling="no"></iframe>');
		iframe = self.find('iframe');
	};

	self.write = function(content) {

		var is = false;
		var offset = '<div id="IFPOFFSET"></div>';

		content = content.replace(/<\/body>/i, function() {
			is = true;
			return offset + '</body>';
		});

		if (!is)
			content += offset;

		var doc = iframe[0].contentWindow.document;
		doc.open();
		doc.write(content);
		doc.close();
		self.resize();
		setTimeout(self.resize, 500);
		setTimeout(self.resize, 1000);
		setTimeout(self.resize, 2000);
		setTimeout(self.resize, 3000);
	};

	self.resize = function() {
		var el = $(iframe[0].contentWindow.document.getElementById('IFPOFFSET'));
		self.element.css('height', el.offset().top);
	};

	self.setter = function(value) {
		if (value == null)
			iframe.attr('src', 'about:blank');
		else
			self.write(value);
	};
});