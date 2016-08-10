COMPONENT('highlightsyntax', function() {
	var self = this;
	self.readonly();
	self.setter = function(value) {

		if (!value) {
			self.toggle('hidden', true);
			return;
		}

		self.html('<pre><code class="{0}">{1}</code></pre>'.format(self.attr('data-type'), Tangular.helpers.encode(value)));
		hljs.highlightBlock(self.find('code').get(0));
		self.toggle('hidden', false);
	};
});