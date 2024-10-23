COMPONENT('pictures', 'grid:4', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container;
	var template = Tangular.compile(`{{ foreach item in value }}
<div class="{0}-item" draggable="true" data-id="{{ item }}">
	<span class="{0}-remove"><i class="ti ti-remove"></i></span>
	<img src="{{ item }}" class="img-responsive" alt="" />
</div>
{{ end }}
`.format(cls));

	self.make = function() {

		self.aclass(cls);

		W[self.ID + 'reorder'] = function(img) {

			if (config.disabled)
				return;

			let arr = [];

			for (let m of img)
				arr.push(ATTRD(m));

			self.bind('@modified @touched', arr);
		};

		self.append('<ui-component name="movable" config="selector:.{0}-item;exec:{1};disabled:{3}" class="grid-{2}"></ui-component>'.format(cls, self.ID + 'reorder', config.grid, config.disabled));
		container = self.find('ui-component');

		self.event('click', cls2 + '-remove', function() {
			if (config.disabled)
				return;
			var el = $(this);
			var model = self.get();
			var index = model.indexOf(ATTRD(el));
			if (index != -1) {
				model.splice(index, 1);
				self.bind('@modified @touched', model);
				el.closest(cls2 + '-item').remove();
			}
		});

		self.event('click', cls2 + '-empty', function() {
			if (config.disabled)
				return;
			self.EXEC(config.upload, function(response) {
				var model = self.get();
				if (!model || !(model instanceof Array))
					model = [];
				if (response instanceof Array)
					model.push.apply(model, response);
				else
					model.push(response);
				self.bind('@modified @touched @setter', model);
			});
		});
	};

	self.destroy = function() {
		delete W[self.ID + 'reorder'];
	};

	self.configure = function(key, value, init) {
		if (key === 'disabled' && !init)
			container.component().reconfigure({ disabled: value });
	};

	self.setter = function(value) {
		let html = template({ value: value || EMPTYARRAY });
		DIFFDOM(container, cls2 + '-item', html);
	};

});