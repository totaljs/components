COMPONENT('highlightsyntax', function(self) {
	self.readonly();
	self.setter = function(value) {
		if (value) {
			self.html('<pre><code class="{0}">{1}</code></pre>'.format(self.attrd('type'), Tangular.helpers.encode(value)));
			hljs.highlightBlock(self.find('code').get(0));
			self.toggle('hidden', false);
		} else
			self.toggle('hidden', true);
	};
});