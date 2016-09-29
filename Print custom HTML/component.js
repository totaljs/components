function printer(html) {
	var w = window.open();
	w.document.write(html);
	w.print();
	w.close();
}