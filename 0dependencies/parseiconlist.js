// https://fontawesome.com/cheatsheet/pro/regular
var arr = document.querySelectorAll('.icon');
var builder = [];
for (var i = 0; i < arr.length; i++) {
	var id = arr[i].getAttribute('id');
	if (id)
		builder.push('r ' + id);
}

console.log(builder.join(','));