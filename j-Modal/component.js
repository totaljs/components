COMPONENT('modal', function(self) {

	var reload = self.attrd('reload');

	if (!MAN.$$modal) {
		window.$$modal_level = window.$$modal_level || 1;
		MAN.$$modal = true;
		$(document).on('click', '.ui-modal-close', function() {
			SET($(this).attr('data-path'), '');
			window.$$modal_level--;
		});
	}

	self.readonly();
	self.make = function() {
		self.condition = self.attrd('if');
		$(document.body).append('<div id="{0}" class="hidden ui-modal-container"><a href="javascript:void(0)" class="ui-modal-close" data-path="{2}"><i class="fa fa-times"></i>{1}</a><div class="ui-modal-body"></div></div>'.format(self._id, self.attrd('button') || 'Close window', self.path));
		var el = $('#' + self._id);
		el.find('.ui-modal-body').get(0).appendChild(self.element.get(0));
		self.rclass('hidden');
		self.element = el;

		self.event('scroll', function() {
			EMIT('reflow', self.name);
		});

		self.attrd('esc') !== 'false' && $(window).on('keydown', function(e) {
			e.which === 27 && self.get() && self.set('');
		});
	};

	self.getter = null;
	self.setter = function() {

		setTimeout2(self.id + '.scroll', function() {
			$('html').tclass('ui-modal-noscroll', !!$('.ui-modal-container').not('.hidden').length);
		}, 100);

		var isHidden = !EVALUATE(self.path, self.condition);
		if (self.hclass('hidden') && isHidden)
			return;

		EMIT('reflow', self.name);

		if (isHidden) {
			self.rclass('ui-modal-visible');
			setTimeout2(self.id, function() {
				self.aclass('hidden');
			}, 50);
			return;
		}

		window.$$modal_level++;
		self.rclass('hidden');

		setTimeout2(self.id, function() {
			self.aclass('ui-modal-visible');
		}, 50);

		reload && EXEC(reload, self);
		self.element.css('z-index', window.$$modal_level * 5);
		self.find('.ui-modal-body').animate({ scrollTop: 0 }, 0, NOOP, 300);
	};
});