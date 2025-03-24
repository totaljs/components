Thelpers.badge = function(value, size) {
	if (!value)
		return '';

	let colors = DEF.badgecolors || ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#16a085','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#d35400','#c0392b'];


	if (!(value instanceof Array))
		value = [value];

	let output = '';

	for (let m of value) {
		let num = 0;
		for (let i = 0; i < m.length; i++)
			num += m.charCodeAt(i);
		output += '<span class="badge badge-{2} mr5" style="background-color:{0}">{1}</span>'.format(colors[num % colors.length], value, size || 'medium');
	}

	return output;
};