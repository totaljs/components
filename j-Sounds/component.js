COMPONENT('sounds', 'url:https://cdn.componentator.com/sounds/;volume:50', function(self, config) {

	var volume = 0;
	var can = false;
	var muted = false;

	self.items = [];
	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {
		var audio = document.createElement('audio');
		if (audio.canPlayType && audio.canPlayType('audio/mpeg').replace(/no/, ''))
			can = true;
	};

	self.setter = function(value) {
		volume = value || 0;
	};

	self.play = function(type) {
		self.playurl(config.url + type + '.mp3');
	};

	self.success = function() {
		self.play('success');
	};

	self.error = self.fail = function() {
		self.play('fail');
	};

	self.message = function() {
		self.play('message');
	};

	self.notify = self.notifications = function() {
		self.play('notifications');
	};

	self.badge = self.badges = function() {
		self.play('badges');
	};

	self.confirm = function() {
		self.play('confirm');
	};

	self.beep = function() {
		self.play('beep');
	};

	self.drum = function() {
		self.play('drum');
	};

	self.warning = function() {
		self.play('warning');
	};

	self.alert = function() {
		self.play('alert');
	};

	self.playurl = function(url) {

		if (!can || !volume || muted)
			return;

		var audio = new W.Audio();

		audio.src = url;
		audio.volume = volume;
		audio.play();

		audio.onended = function() {
			audio.$destroy = true;
			self.cleaner();
		};

		audio.onerror = function() {
			audio.$destroy = true;
			self.cleaner();
		};

		audio.onabort = function() {
			audio.$destroy = true;
			self.cleaner();
		};

		self.items.push(audio);
		return self;
	};

	self.cleaner = function() {
		var index = 0;
		while (true) {
			var item = self.items[index++];
			if (item === undefined)
				return self;
			if (!item.$destroy)
				continue;
			item.pause();
			item.onended = null;
			item.onerror = null;
			item.onsuspend = null;
			item.onabort = null;
			item = null;
			index--;
			self.items.splice(index, 1);
		}
	};

	self.stop = function(url) {

		if (!url) {
			for (var i = 0; i < self.items.length; i++)
				self.items[i].$destroy = true;
			return self.cleaner();
		}

		var index = self.items.findIndex('src', url);
		if (index === -1)
			return self;

		self.items[index].$destroy = true;
		return self.cleaner();
	};

	self.setter = function(value) {

		if (typeof(value) === 'boolean') {
			volume = config.volume / 100;
			muted = value === false;
			return;
		}

		if (value == null)
			value = config.volume / 100;
		else
			value = (value / 100);

		if (value > 1)
			value = 1;
		else if (value < 0)
			value = 0;

		volume = value ? +value : 0;
		for (var i = 0, length = self.items.length; i < length; i++) {
			var a = self.items[i];
			if (!a.$destroy)
				a.volume = value;
		}
	};

});