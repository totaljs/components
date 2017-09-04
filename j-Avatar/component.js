COMPONENT('avatar', function(self, config) {
	var data = {
		size: 50,
		lighten: 80,
		rounded: true,
		radius: 50,
		weight: 'bold',
		font: 'Helvetica, Arial, sans-serif',
		// colors from https://flatuicolors.com/
		backgrounds: [
			'#1abc9c', '#2ecc71', '#3498db', '#9b59b6',
			'#34495e', '#16a085', '#2980b9', '#8e44ad',
			'#2c3e50', '#f1c40f', '#e67e22', '#e74c3c',
			'#d35400', '#c0392b']
	};

	self.readonly();

	self.make = function() {
		var name = self.attr('data-jc-username') || 'Unkown';
		var img = self.attr('data-jc-image') || null;
		var initials = name.match(/\b\w/g) || [];
		initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

		var style = [];
		var size = config.size || data.size;
		var lighten = config.lighten || data.lighten;
		var rounded = (typeof config.rounded != 'undefined') ? config.rounded : data.rounded;
		var radius = config.radius || data.radius;
		var fontsize = Math.floor(size / 2.5);  
		var line = (size + Math.floor(size / 20));
		var background = config.background || data.backgrounds[ name.length % data.backgrounds.length ];
		var color = config.color || LightenDarkenColor(data.backgrounds[ name.length % data.backgrounds.length ], lighten);

		style.push('width: {0}px'.format(size));
		style.push('height: {0}px'.format(size));
		if (rounded) style.push('border-radius: {0}px'.format(radius));
		style.push('text-align: center');
		style.push('vertical-align: middle');

		if (img == null) {
			style.push('background-color: {0}'.format(background));
			style.push('font-style: normal');
			style.push('font-weight: {0}'.format(data.weight));
			style.push('font-size: {0}px'.format(fontsize));
			style.push('line-height: {0}px'.format(line));
			style.push('font-family: {0}'.format(data.font));
			style.push('color: {0}'.format(color));
			self.html('<div class="avatar" style="{0}"><span>{1}</span></div>'.format(style.join(';'), initials));
		} else {
			style.push('background: url({0}) 0% 0% / {1}px {2}px no-repeat content-box;'.format(img, size, size));
			self.html('<div class="avatar" style="{0}"></div>'.format(style.join(';')));
		}
	};

	// Thanks Chris Coyier (https://css-tricks.com/snippets/javascript/lighten-darken-color/) 
	function LightenDarkenColor(col, amt) {
		var usePound = false;
		if (col[0] == "#") {
			col = col.slice(1);
			usePound = true;
		}
		var num = parseInt(col,16);
		var r = (num >> 16) + amt;
		if (r > 255) r = 255;
		else if  (r < 0) r = 0;
		var b = ((num >> 8) & 0x00FF) + amt;
		if (b > 255) b = 255;
		else if  (b < 0) b = 0;
		var g = (num & 0x0000FF) + amt;
		if (g > 255) g = 255;
		else if (g < 0) g = 0;
		return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16); 
	}
});