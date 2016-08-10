function on_resize() {
	var container = $('.body');
	var top = container.offset().top;
	var $w = $(window);
	var h = $w.height();
	container.css({ height: h - top });
}
$(window).on('resize', on_resize);
on_resize();