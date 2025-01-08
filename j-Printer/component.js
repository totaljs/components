COMPONENT('printer', 'delay:500;delayprint:500;delayclose:1000', function(self, config, cls) {

	self.nocompile();
	self.readonly();
	self.singleton();

	self.make = function() {
		self.aclass(cls);
	};

	self.print = function(title, html, test) {

		if (html == null || html === true) {
			test = html === true;
			html = title;
			title = '';
		}

		if (html.indexOf('<body>') === -1)
			html = '<html><head><title>{0}</title><meta charset="utf-8" /></head><body style="font-family:Arial;font-size:14px;margin:0;padding:0;color:#000">{1}</body></html>'.format(title, html);

		if (test) {
			let win = W.open('', '', 'width=800,height=600');
			win.document.write(html);
			return;
		}

		var iframe = $('<ifra' + 'me src="about:blank" frameborder="0" scrolling="no"></ifr' + 'ame>')[0];
		var win = iframe.contentWindow;
		self.dom.appendChild(iframe);

		setTimeout(function() {
			var doc = win.document;
			doc.open();
			doc.write(html);
			doc.close();
			setTimeout(() => win.print(), config.delayprint);
			setTimeout(() => self.dom.removeChild(iframe), config.delayclose);
		}, config.delay);

	};

});