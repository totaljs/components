COMPONENT('loadcontent', 'wait:0', function(self, config) {

	self.readonly();
	self.blind();

	self.make = function() {
		var template = $(config.selector);
		if (template.length) {

			var content = template.html().replace(/SCR/g, 'scr' + 'ipt');
			var replace = (config.replace || '').split(',').trim();

			for (var m of replace) {
				var tmp = m.split('=');
				content = content.replace(new RegExp(tmp[0], 'g'), tmp[1]);
			}

			self.html(content);
			COMPILE();
			config.exec && self.SEEX(config.exec, self.element);
		} else if (config.wait && self.dom)
			setTimeout(self.make, config.wait);
	};

});