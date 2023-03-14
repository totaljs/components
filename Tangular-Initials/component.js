var TTIC = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#16a085','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#d35400','#c0392b'];

Thelpers.initials = function(value) {
	if (value) {
		var index = value.indexOf('.');
		var arr = value.substring(index + 1).replace(/\s{2,}/g, ' ').trim().split(' ');
		var initials = ((arr[0].substring(0, 1) + (arr[1] || '').substring(0, 1))).toUpperCase();
		var sum = 0;
		for (var i = 0; i < value.length; i++)
			sum += value.charCodeAt(i);
		return '<span class="initials" style="background-color:{1}" title="{2}">{0}</span>'.format(Thelpers.encode(initials), TTIC[sum % TTIC.length], Thelpers.encode(value));
	}
};

Thelpers.initialsbase64 = function(value, width, height) {
	if (value) {
		var index = value.indexOf('.');
		var arr = value.substring(index + 1).replace(/\s{2,}/g, ' ').trim().split(' ');
		var initials = ((arr[0].substring(0, 1) + (arr[1] || '').substring(0, 1))).toUpperCase();
		var sum = 0;

		for (var i = 0; i < value.length; i++)
			sum += value.charCodeAt(i);

		var canvas = W.$initialscanvas;
		if (!canvas)
			canvas = W.$initialscanvas = document.createElement('CANVAS');

		if (canvas.width != width)
			canvas.width = width;

		if (canvas.height != height)
			canvas.height = height;

		var color = TTIC[sum % TTIC.length];
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, width, height);
		ctx.font = 'bold ' + ((width / 2) >> 0) + 'px Arial';
		ctx.fillStyle = '#FFFFFF';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(initials, (width / 2), (height / 2 >> 0) + 5);
		return canvas.toDataURL('image/png');
	}
};