COMPONENT('websocket', 'reconnect:3000;encoder:false;statsinterval:1000', function(self, config) {

	var ws, url, statsinterval;
	var queue = [];
	var sending = false;
	var isidle = false;
	var sizei = 0;
	var sizeo = 0;
	var encoder = config.stats && W.TextEncoder ? (new TextEncoder()) : null;

	self.online = false;
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		url = (config.url || '').env(true);
		if (!url.match(/^(ws|wss):\/\//))
			url = location.origin.replace('http', 'ws') + (url.charAt(0) !== '/' ? '/' : '') + url;

		setTimeout(self.connect, 500);

		if (config.stats) {
			statsinterval = setInterval(function() {
				self.SEEX(config.stats, { received: sizei, sent: sizeo });
				sizei = 0;
				sizeo = 0;
			}, config.statsinterval);
		}

		self.destroy = function() {
			statsinterval && clearInterval(statsinterval);
			isidle = true;
			self.close();
		};
	};

	self.send = function(obj) {
		var data = JSON.stringify(obj);

		if (config.encoder)
			queue.push(encodeURIComponent(data));
		else
			queue.push(data);

		self.process();
		return self;
	};

	self.idletime = function(is) {
		if (isidle !== is) {
			isidle = is;
			if (is) {
				// close
				ws && self.close();
			} else {
				// open
				if (!ws)
					self.connect();
			}
		}
	};

	self.process = function(callback) {

		if (!ws || !ws.send || sending || !queue.length || ws.readyState !== 1) {
			callback && callback();
			return;
		}

		sending = true;

		var async = queue.splice(0, 3);

		async.wait(function(item, next) {
			if (ws) {

				if (encoder)
					sizeo += encoder.encode(item).length;

				ws.send(item);
				setTimeout(next, 5);
			} else {
				queue.unshift(item);
				next();
			}
		}, function() {
			callback && callback();
			sending = false;
			queue.length && self.process();
		});
	};

	self.close = function(isClosed) {
		if (ws) {
			self.online = false;
			ws.onopen = ws.onclose = ws.onmessage = null;
			!isClosed && ws.close();
			ws = null;
			EMIT('online', false);
		}
		return self;
	};

	function onClose(e) {

		if (e.code === 4001) {
			location.href = location.href + '';
			return;
		}

		e.reason && WARN('WebSocket:', config.encoder ? decodeURIComponent(e.reason) : e.reason);
		self.close(true);

		if (!isidle)
			setTimeout(self.connect, config.reconnect);
	}

	function onMessage(e) {

		var data = null;
		var msg = e.data;

		if (encoder && msg)
			sizei += encoder.encode(msg).length;

		try {
			data = PARSE(config.encoder ? decodeURIComponent(msg) : msg);
			self.path && self.set(data);
		} catch (e) {
			WARN('WebSocket "{0}": {1}'.format(url, e.toString()));
		}
		data && EMIT('message', data);
	}

	function onOpen() {
		self.online = true;
		self.process(function() {
			EMIT('online', true);
		});
	}

	self.connect = function() {
		ws && self.close();
		setTimeout2(self.id, function() {
			ws = new WebSocket(url.env(true));
			ws.onopen = onOpen;
			ws.onclose = onClose;
			ws.onmessage = onMessage;
			self.ws = ws;
		}, 100);
		return self;
	};
});