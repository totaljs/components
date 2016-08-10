function messenger(msg, isError, timeout) {
	var el = $('.message');
	var cls = 'message-visible';

	el.removeClass('message-' + (isError ? 'success' : 'error'));
	el.addClass('message-' + (isError ? 'error' : 'success'));
	el.html(msg).addClass(cls);

	setTimeout(function() {
		el.removeClass(cls);
	}, timeout || 4000);
}

$(document).on('click', 'a', function(e) {
   e.preventDefault();
   e.stopPropagation();
   var el = $(this);
   messenger(el.html(), el.hasClass('error'));
});