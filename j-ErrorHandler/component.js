COMPONENT('errorhandler', 'keywords:401=login', function(self, config) {

	self.readonly();
	self.singleton();
	self.nocompile();
	self.blind();

	self.make = function() {

		var keywords = config.keywords ? config.keywords.split(',') : EMPTYARRAY;
		for (var i = 0; i < keywords.length; i++)
			keywords[i] = keywords[i].split('=');

		self.on('ERROR', function(err) {

			if (err instanceof Error)
				err = [{ error: err.message }];
			else if (!(err instanceof Array))
				err = [{ error: err.error || err.message || err.err }];

			var arr = [];
			var response = {};

			for (var m of err) {

				if (!m.error)
					continue;

				for (var k of keywords) {
					if ((m.name && m.name.indexOf(k[0]) !== -1) || m.error.indexOf(k[0]) !== -1)
						response[k[1]] = true;
				}

				arr.push(m.error);
			}

			response.items = arr;

			if (config.exec) {
				response.message = arr.join('<br />');
				self.SEEX(config.exec, arr);
			} else {
				var name = self.caniuse('message') ? 'message' : self.caniuse('snackbar') ? 'snackbar' : self.caniuse('notifybar') ? 'notifybar' : self.caniuse('notify') ? 'notify' : '';
				if (name)
					SETTER(name + '/warning', response.items.join('<br />'));
				else if (W.console)
					console.error('ERROR():', response.items.join('<br />'));
			}

			SETTER('!loading/hide', 100);
		});
	};

});