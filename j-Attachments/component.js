COMPONENT('attachments', function(self, config, cls) {

	let cls2 = '.' + cls;

	self.template = Tangular.compile('<a href="{{ value.url }}" target="_blank" data-id="{{ value.url }}" class="{0}-file">{{ if $.remove }}<span class="{0}-remove"><i class="ti ti-remove"></i></span>{{ fi }}<span class="{0}-date">{{ value.dtcreated | format(\'[date]\') }}</span><i class="ti ti-file"></i>{{ value.name }}{{ if value.size }}<span class="{0}-size">({{ value.size | format(2) }} MB)</span>{{ fi }}</a>'.format(cls));

	self.make = function() {
		self.aclass(cls);
		self.event('click', cls2 + '-remove', function(e) {

			e.preventDefault();
			e.stopPropagation();

			let el = $(this);
			let url = ATTRD(el);
			let model = self.get();
			let item = model.findItem('url', url);

			if (item) {
				model.splice(model.indexOf(item), 1);
				self.bind('@modified @touched @setter', model);
			}

		});
	};

	self.setter = function(value) {

		if (!value)
			value = [];

		let builder = [];
		let model = {};
		let second = { remove: !config.disabled };

		for (let m of value) {
			let file = CLONE(m);
			file.remove = !config.disabled;
			file.size = file.length || file.size || 0;
			file.size = file.size / 1024 / 1024; // bytes
			file.size = file.size.round(2);
			model.value = file;
			builder.push(self.template(model, second));
		}

		self.html(builder.join(''));
	};

});