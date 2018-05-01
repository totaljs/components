COMPONENT('markdownpreview', function(self) {

	marked.setOptions({ gfm: true, breaks: true, sanitize: true, tables: true });

	var M = function(text) {
		return marked(text).replace(/<img/g, '<img class="img-responsive img-rounded"').replace(/<table/g, '<table class="table table-bordered"');
	};

	window.Markdown = M;

	self.bindvisible();
	self.readonly();

	self.make = function() {
		self.aclass('ui-markdown');
	};

	self.setter = function(value) {
		self.html(value ? M(value) : '');
	};

}, ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js', '//cdnjs.cloudflare.com/ajax/libs/marked/0.3.19/marked.min.js']);