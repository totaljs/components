FUNC.urlify = function(str) {
	return str.replace(/(^|\s)+(((https?:\/\/)|(www\.))[^\s]+)/g, function(url, b, c) {
		var len = url.length;
		var l = url.charAt(len - 1);
		var f = url.charAt(0);
		if (l === '.' || l === ',')
			url = url.substring(0, len - 1);
		else
			l = '';
		url = (c === 'www.' ? 'http://' + url : url).trim();
		return (f.charCodeAt(0) < 40 ? f : '') + '[' + url + '](' + url + ')' + l;
	});
};