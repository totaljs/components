$.fn.parallax = function(size) {
	if ('ontouchstart' in window == true)
		return;
	var self = this;
    size = size || 15;
	$('body').mousemove(function(e) {
		$(self).css('background-position', (e.pageX * -1 / size) + 'px ' + (e.pageY * -1 / size) + 'px');
	});
};