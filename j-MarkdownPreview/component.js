COMPONENT('markdownpreview', function(self) {

	self.bindvisible();
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		marked.setOptions({ gfm: true, breaks: true, sanitize: true, tables: true });
		self.M = function(text) {
			return marked(text).replace(/<img/g, '<img class="img-responsive img-rounded"').replace(/<table/g, '<table class="table table-bordered"');
		};
		self.aclass('ui-markdown');
	};

	self.setter = function(value) {
		self.html(value ? self.M(value) : '');
		value && self.find('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	};

}, ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.19/marked.min.js']);