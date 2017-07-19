COMPONENT('radiobutton', function(self) {

	var required;

	self.make = function() {
		var options = self.attrd('options').split(';');
		var builder = [];
		var html = self.html();

		required = self.attrd('required') === 'true';
		html && builder.push('<div class="ui-radiobutton-label{1}">{0}</div>'.format(html, required ? ' ui-radiobutton-label-required' : ''));

		options.forEach(function(item) {
			item = item.split('|');
			builder.push('<span data-value="{0}"><i class="fa fa-circle-o"></i>{1}</span>'.format(item[0] || item[1], item[1] || item[0]));
		});

		self.aclass('ui-radiobutton');
		self.event('click', 'span', function() {
			var value = self.parser($(this).attr('data-value'));
			self.dirty(false, true);
			self.getter(value, 2);
		});

		self.html(builder.join(''));
	};

	self.validate = function(value) {
		if (!required)
			return true;
		return value ? true : false;
	};

	self.setter = function(value) {
		self.find('span').each(function() {
			var el = $(this);
			var is = el.attr('data-value') === (value === null || value === undefined ? null : value.toString());
			el.toggleClass('ui-radiobutton-selected', is);
			el.find('.fa').toggleClass('fa-circle-o', !is).toggleClass('fa-circle', is);
		});
	};
});