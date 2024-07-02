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
			if (e.target.tagName !== 'SPAN')
				self.aclass('hidden');
		});

		self.event('click', '.ti-copy', function(e) {
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
			var plugin = jComponent.is20 ? el.plugin() : el.scope();
			var com = el.component();
			var bind = el.binder();
			var builder = [];
			if (com || plugin || bind) {
				builder.push('<i class="ti ti-info-circle"></i>');
				builder.push('<div><i class="ti ti-copy"></i><b>Plugin</b><span class="monospace">{0}</span></div>');
				builder.push('<div><i class="ti ti-copy"></i><b>Component</b><span class="monospace">{1}</span></div>');
				builder.push('<div><i class="ti ti-copy"></i><b>Binder</b><span class="monospace">{2}</span></div>');
				self.html(builder.join('').format(plugin ? plugin.path.toString() : DEF.empty, com ? ('<span>{0}</span>'.format(com.name) + com.path.toString()) : DEF.empty, bind ? bind.path.toString() : DEF.empty));
				self.rclass('hidden');
			} else
				self.aclass('hidden');
		});
	};

});