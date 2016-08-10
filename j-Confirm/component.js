/**
 * Confirm Message
 * @version 1.0.0
 */
COMPONENT('confirm', function() {
	var self = this;
	var is = false;
	var visible = false;
	var timer;

	self.readonly();
	self.singleton();

	self.make = function() {
		self.element.addClass('ui-confirm hidden');
		self.element.on('click', 'button', function() {
			self.hide($(this).attr('data-index').parseInt());
		});
	};

	self.confirm = function(message, buttons, fn) {
		self.callback = fn;

		var builder = [];

		buttons.forEach(function(item, index) {
			builder.push('<button data-index="{1}">{0}</button>'.format(item, index));
		});

		self.content('ui-confirm-warning', '<div class="ui-confirm-message">{0}</div>{1}'.format(message.replace(/\n/g, '<br />'), builder.join('')));
	};

	self.hide = function(index) {

		if (self.callback)
			self.callback(index);

		self.element.removeClass('ui-confirm-visible');
		if (timer)
			clearTimeout(timer);
		timer = setTimeout(function() {
			visible = false;
			self.element.addClass('hidden');
		}, 1000);
	};

	self.content = function(cls, text) {

		if (!is)
			self.html('<div><div class="ui-confirm-body"></div></div>');

		if (timer)
			clearTimeout(timer);

		visible = true;
		self.element.find('.ui-confirm-body').empty().append(text);
		self.element.removeClass('hidden');
		setTimeout(function() {
			self.element.addClass('ui-confirm-visible');
		}, 5);
	};
});