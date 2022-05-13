COMPONENT('backup', 'expire:1 day;btnsave:SAVE;btnload:LOAD', function(self, config, cls) {
	self.make = function() {
		self.aclass(cls);
		self.append('<button name="save"><i class="fa fa-cloud-upload-alt"></i>{{ btnsave }}</button><button name="load"><i class="fa fa-download"></i>{{ btnload }}</button>'.arg(config));
		self.event('click', 'button', function() {
			var name = this.name;
			switch (name) {
				case 'load':
					var item = CACHE(self.path);
					item && self.set(item);
					break;
				case 'save':
					var value = self.get();
					CACHE(self.path, value, config.expire);
					break;
			}
			config.exec && self.SEEX(config.exec, name);
		});
	};
});