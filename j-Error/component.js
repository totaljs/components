COMPONENT('error', function() {
	var self = this;

	self.readonly();

	self.make = function() {
		self.element.addClass('ui-error hidden');
	};

	self.setter = function(value) {

		if (!(value instanceof Array) || !value.length) {
			self.toggle('hidden', true);
			return;
		}

		var builder = [];
		for (var i = 0, length = value.length; i < length; i++)
			builder.push('<div><span class="fa fa-times-circle"></span>{0}</div>'.format(value[i].error));

		self.html(builder.join(''));
		self.toggle('hidden', false);
	};
});