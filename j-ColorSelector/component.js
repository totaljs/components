COMPONENT('colorselector', function() {

	var self = this;
	var colors = ['#DA4453', '#E9573F', '#F6BB42', '#8CC152', '#37BC9B', '#3BAFDA', '#4A89DC', '#967ADC', '#D770AD', '#656D78'];
	var selected;
	var list;
	var required = self.attr('data-required') === 'true';

	self.validate = function(value) {
		return colors.indexOf(value) === -1;
	};

	if (!required)
		self.noValid();

	self.make = function() {
		var builder = [];
		var html = self.html();
		html && builder.push('<div class="ui-colorselector-label">{0}</div>'.format(html));
		builder.push('<ul class="ui-colorselector">');
		for (var i = 0, length = colors.length; i < length; i++)
			builder.push('<li data-index="{0}" style="background-color:{1}"></li>'.format(i, colors[i]));
		builder.push('</ul>');

		self.html(builder.join(''));
		list = self.find('li');

		self.event('click', 'li', function() {
			var li = $(this);
			self.change(true);
			self.set(colors[+li.attr('data-index')]);
		});
	};

	self.setter = function(value) {
		var index = colors.indexOf(value);
		selected && selected.removeClass('selected');
		if (index !== -1) {
			selected = list.eq(index);
			selected.addClass('selected');
		}
	};
});