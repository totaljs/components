function urlify(text) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return text.replace(urlRegex, function(url,b,c) {
        var url2 = c === 'www.' ? 'http://' + url : url;
        return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
    }) ;
}