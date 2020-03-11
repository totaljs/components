COMPONENT('message', function(self, config) {

	var cls = 'ui-message';
	var cls2 = '.' + cls;
	var is, visible = false;

	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');

		self.event('click', 'button', function() {
			self.hide();
		});

		$(window).on('keyup', function(e) {
			visible && e.which === 27 && self.hide();
		});
	};

	self.warning = function(message, icon, fn) {
		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}
		self.callback = fn;
		self.content(cls + '-warning', message, icon || 'warning');
	};

	self.info = function(message, icon, fn) {
		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}
		self.callback = fn;
		self.content(cls + '-info', message, icon || 'info-circle');
	};

	self.success = function(message, icon, fn) {

		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}

		self.callback = fn;
		self.content(cls + '-success', message, icon || 'check-circle');
	};

	self.response = function(message, callback, response) {

		var fn;

		if (typeof(message) === 'function') {
			response = callback;
			fn = message;
			message = null;
		} else if (typeof(callback) === 'function')
			fn = callback;
		else {
			response = callback;
			fn = null;
		}

		if (response instanceof Array) {
			var builder = [];
			for (var i = 0; i < response.length; i++) {
				var err = response[i].error;
				err && builder.push(err);
			}
			self.warning(builder.join('<br />'));
		} else if (typeof(response) === 'string')
			self.warning(response);
		else {
			message && self.success(message);
			fn(response);
		}
	};

	FUNC.messageresponse = function(success, callback) {
		return function(response, err) {
			if (err || response instanceof Array) {

				var msg = [];
				var template = '<div class="' + cls + '-error"><i class="fa fa-warning"></i>{0}</div>';

				if (response instanceof Array) {
					for (var i = 0; i < response.length; i++)
						msg.push(template.format(response[i].error));
					msg = msg.join('');
				} else
					msg = template.format(err.toString());

				self.warning(msg);
			} else {
				self.success(success);
				callback && callback(response);
			}
		};
	};

	self.hide = function() {
		self.callback && self.callback();
		self.aclass('hidden');
		visible = false;
	};

	self.content = function(classname, text, icon) {
		!is && self.html('<div><div class="ui-message-icon"><i class="fa fa-' + icon + '"></i></div><div class="ui-message-body"><div class="text"></div><hr /><button>' + (config.button || 'OK') + '</button></div></div>');
		visible = true;
		self.rclass2(cls + '-').aclass(classname);
		self.find(cls2 + '-body').rclass().aclass(cls + '-body');

		if (is)
			self.find(cls2 + '-icon').find('.fa').rclass2('fa-').aclass('fa-' + icon);

		self.find('.text').html(text);
		self.rclass('hidden');
		is = true;
		setTimeout(function() {
			self.aclass(cls + '-visible');
			setTimeout(function() {
				self.find(cls2 + '-icon').aclass(cls + '-icon-animate');
			}, 300);
		}, 100);
	};
});