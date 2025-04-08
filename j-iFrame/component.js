COMPONENT('iframe', 'margin:0;parent:window;scrollbar:0;autohide:0', function(self, config, cls) {

	var size;
	var loaded = false;
	var pending = [];
	var winid = 'iframeonload' + self.ID;

	self.iframe = null;

	var onmessage = function(e) {
		let event = e.originalEvent;
		if (config.message && self.iframe && self.iframe[0].src.includes(event.origin)) {
			let msg = event.data && typeof(event.data) === 'string' ? PARSE(event.data || '') : event.data;
			if (msg)
				self.SEEX(config.message, msg);
		}
	};

	var onload = function() {
		loaded = true;
		let messages = pending.splice(0);
		for (let msg of messages)
			self.send(msg);
		if (config.ready)
			self.EXEC(config.ready, self);
		self.resizeforce();
	};

	self.make = function() {
		W[winid] = () => setTimeout2(self.ID, onload, 300);
		self.aclass(cls);
		self.append('<iframe frameborder="0" scrolling="' + (config.scrollbar ? 'yes' : 'no') + '" allowtransparency="true" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *" style="width:100%" onload="{0}()"></iframe>'.format(winid));
		self.iframe = self.find('iframe');
		self.on('resize + resize2', self.resize);
		self.resize();
		$(W).on('message', onmessage);
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.destroy = function() {
		delete W[winid];
		$(W).off('message', onmessage);
	};

	self.resizeforce = function() {
		var parent = self.parent(config.parent);
		var h = parent.height() - config.margin;
		if (size != h) {
			size = h;
			self.iframe.css({ height: h });
		}
	};

	self.send = function(msg) {
		if (loaded)
			self.iframe[0].contentWindow.postMessage(STRINGIFY(msg), '*');
		else
			pending.push(msg);
	};

	self.setter = function(value) {
		loaded = false;
		pending.length = 0;
		self.iframe.attr('src', value || 'about:blank');
		config.autohide && self.tclass('hidden', !value);
	};

});