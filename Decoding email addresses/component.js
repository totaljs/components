$(document).ready(function() {
	$('.ach').each(function() {
		var el = $(this);
		var m = el.html().replace(/\(\w+\)/g, function(text) {
			switch (text.toLowerCase()) {
				case '(at)':
					return '@';
				case '(dot)':
					return '.';
			}
			return text;
		});

		var cls = el.attr('class').replace('ach', '').trim();
		el.replaceWith('<a href="mailto:' + m + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + m + '</a>');
	});
});