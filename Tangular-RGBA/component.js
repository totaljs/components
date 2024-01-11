Thelpers.rgba = function(hex, alpha) {
	if (hex && /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		var c = hex.substring(1).split('');
		if (c.length === 3)
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		c= '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
	}
	return 'rgba(0,0,0,' + alpha + ')';
};