COMPONENT('formdata', 'method:POST;target:_blank;type:application/x-www-form-urlencoded', function(self, config) {

	var form;

	self.singleton();
	self.readonly();

	self.make = function() {
		self.aclass('hidden');
		form = document.createElement('FORM');
		self.dom.appendChild(form);
	};

	self.send = function(opt) {

		var data = opt.data || opt.value;

		while (form.children.length)
			form.removeChild(form.children[0]);

		form.setAttribute('method', opt.method || config.method);
		form.setAttribute('type', opt.type || config.type);
		form.setAttribute('target', opt.target || config.target);
		form.setAttribute('action', opt.url || opt.action);

		for (var key in data) {
			var input = document.createElement('INPUT');
			input.setAttribute('name', key);
			input.setAttribute('type', 'hidden');
			input.value = data[key];
			form.appendChild(input);
		}

		form.submit();
	};

});