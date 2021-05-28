Thelpers.jsonformat = function(json, format) {

	var reguid2 = /"{14,}[a-z]{3}[01]{1}|^\d{9,14}[a-z]{2}[01]{1}a|"\d{4,18}[a-z]{2}\d{1}[01]{1}b|"[0-9a-f]{4,18}[a-z]{2}\d{1}[01]{1}c|"[0-9a-z]{4,18}[a-z]{2}\d{1}[01]{1}d/;

	if (typeof(json) === 'object')
		json = JSON.stringify(json, null, '\t');
	else if (json.indexOf('\t') === -1)
		json = JSON.stringify(JSON.parse(json), null, '\t');

	json = json.replace(/<|>/g, function(text) {
		return text === '<' ? '&lt;' : '&gt;';
	});

	return json.replace(/\t.*?:\s/g, function(text) {
		return '<span class="json-key">' + text.encode() + '</span>';
	}).replace(/\/span>(false|true)/g, function(val) {
		val = val.substring(6).encode();
		return '/span><span class="json-boolean json-' + val + '">' + val + '</span>';
	}).replace(/\/span>[\d.]+/g, function(val) {
		return '/span><span class="json-number">' + val.substring(6).encode() + '</span>';
	}).replace(/\/span>"[\d-]+T[\d:.]+Z"/g, function(val) {
		return '/span><span class="json-date">' + new Date(val.substring(7, val.length - 1)).format(format || 'yyyy-MM-dd HH:mm:ss') + '</span>';
	}).replace(/\/span>null/g, function() {
		return '/span><span class="json-null">null</span>';
	}).replace(/\/span>"#[a-f0-9]{6}"/gi, function(val) {
		val = val.substring(7, val.length - 1).encode();
		return '/span>"<span class="json-color" style="color:' + val + '">' + val + '</span>"';
	}).replace(reguid2, function(text) {
		return '<span class="json-uid">' + text.encode() + '</span>';
	});
};