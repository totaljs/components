COMPONENT('error', function(self, config, cls) {

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');
	};

	self.setter = function(value) {

		if (!(value instanceof Array) || !value.length) {
			self.tclass('hidden', true);
			return;
		}

		var builder = [];
		for (var i = 0, length = value.length; i < length; i++)
			builder.push('<div><i class="fa {1}"></i>{0}</div>'.format(value[i].error, 'fa-' + (config.icon || 'times-circle')));

		self.html(builder.join(''));
		self.tclass('hidden', false);
	};
});