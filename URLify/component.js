function urlify(str) {
	return str.replace(/(((https?:\/\/)|(www\.))[^\s]+)/g, function(url, b, c) {
		var len = url.length;
		var l = url.substring(len - 1);
		if (l === '.' || l === ',')
			url = url.substring(0, len - 1);
		else
			l = '';
		url = c === 'www.' ? 'http://' + url : url;
		return '<a href="' + url + '" target="_blank">' + url + '</a>' + l;
	});
}