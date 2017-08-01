COMPONENT('highlightsyntax', function(self, config) {
	self.readonly();
	self.setter = function(value) {
		if (value) {
			self.html('<pre><code class="{0}">{1}</code></pre>'.format(config.type), Tangular.helpers.encode(value)));
			hljs.highlightBlock(self.find('code').get(0));
			self.tclass('hidden', false);
		} else
			self.tclass('hidden', true);
	};
});