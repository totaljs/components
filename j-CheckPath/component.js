COMPONENT('checkpath', 'position:3', function(self, config, cls) {

	self.readonly();
	self.singleton();
	self.nocompile();
	self.blind();

	self.make = function() {
		self.aclass(cls + ' hidden ' + cls + '-' + config.position);

		self.event('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.aclass('hidden');
		});

		self.event('click', '.fa-copy', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var el = $(this);
			var text = el.closest('div').find('.monospace');
			text = text.clone();
			text.find('span').remove();
			var ca = cls + '-animate';
			el.aclass(ca).rclass(ca, 300);
			navigator.clipboard.writeText(text.text());
		});

		$(document).on('click', function(e) {
			var el = $(e.target);
			var scope = el.scope();
			var com = el.component();
			var bind = el.binder();
			var builder = [];
			if (com || scope || bind) {
				builder.push('<i class="fa fa-info-circle"></i>');
				builder.push('<div><i class="far fa-copy"></i><b>Scope</b><span class="monospace">{0}</span></div>');
				builder.push('<div><i class="far fa-copy"></i><b>Component</b><span class="monospace">{1}</span></div>');
				builder.push('<div><i class="far fa-copy"></i><b>Binder</b><span class="monospace">{2}</span></div>');
				self.html(builder.join('').format(scope ? scope.path : DEF.empty, com ? ('<span>{0}</span>'.format(com.name) + com.path) : DEF.empty, bind ? bind.path : DEF.empty));
				self.rclass('hidden');
			} else
				self.aclass('hidden');
		});
	};

});