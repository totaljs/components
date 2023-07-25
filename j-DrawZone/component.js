COMPONENT('drawzone', 'height:200;zoom:13;stroke:2;radius:7;color:#fcba03;readonly:0;opacity:40;margin:0;geolocation:1;center:48.73702478789267,19.137712002562715', function(self, config, cls) {

	var meta = { points: [], zoom: config.zoom, color: config.color };
	var skip = false;

	self.readonly();
	self.nocompile();

	self.meta = meta;

	self.destroy = function() {

		for (var m of meta.points)
			m.remove();

		meta.map.remove();
		meta.points = null;
		meta.map = null;
		meta.polygon = null;
		meta.source = null;
		meta.view = null;
	};

	self.make = function() {

		self.aclass(cls);
		self.append('<div style="height:{height}px"></div>'.args(config));

		meta.container = self.find('div')[0];

		var extent = new ol.proj.get('EPSG:3857').getExtent().slice();
		extent[0] += extent[0];
		extent[2] += extent[2];

		meta.view = new ol.View({ center: [0,0], zoom: config.zoom, extent });
		meta.map = new ol.Map({
			layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
			target: meta.container,
			view: meta.view
		});

		meta.map.on('moveend', function() {
			var zoom = meta.view.getZoom();
			if (meta.zoom !== zoom) {
				meta.zoom = zoom;
				var model = self.get();
				if (model) {
					model.zoom = zoom;
					self.change(true);
				}
			}
		});

		self.on('resize + resize2', self.resize);
		self.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {

		var container = $(meta.container);
		var height = config.height;

		if (config.parent) {
			var parent = self.parent(config.parent);
			var tmp = parent.height() - config.margin;
			if (height < tmp)
				height = tmp;
		}

		container.css('height', height);
	};

	self.export = function(opt, callback) {

		// opt.width {Number}
		// opt.height {Number}
		// opt.zoom {Number}
		// opt.type {png|jpg}
		// opt.quality {Number}
		// opt.points {Array Number}
		// opt.color {String}
		// opt.radius {Number}

		if (callback)
			opt.callback = callback;

		var picture = document.createElement('canvas');
		var div = document.createElement('DIV');
		var extent = new ol.proj.get('EPSG:3857').getExtent().slice();

		extent[0] += extent[0];
		extent[2] += extent[2];

		div.style = 'width:{width}px;height:{height}px;position:absolute;visibility:hidden;zindex:0;left:-{width}px;top:-{height}px'.args(opt);
		document.body.appendChild(div);

		var view = new ol.View({ center: [0, 0], zoom: opt.zoom || 13, extent, duration: 0 });
		var map = new ol.Map({
			layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
			controls: [],
			target: div,
			view: view
		});

		var polygon = self.createpolygon(opt.points, opt.color || config.color, opt.radius || config.radius);

		map.addLayer(polygon);
		view.fit(polygon.getSource().getFeatures()[0].getGeometry());
		opt.zoom && view.animate({ zoom: opt.zoom, duration: 0 });

		picture.width = opt.width;
		picture.height = opt.height;

		var ctx = picture.getContext('2d');

		ctx.globalAlpha = 1;
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		map.renderSync();

		setTimeout(function() {
			var nodes = map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer');
			for (var canvas of nodes) {

				if (canvas.width > 0) {
					var opacity = canvas.parentNode.style.opacity || canvas.style.opacity;
					var transform = canvas.style.transform;
					var matrix;

					ctx.globalAlpha = opacity === '' ? 1 : Number(opacity);

					if (transform) {
						// Get the transform parameters from the style's transform matrix
						matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
					} else
						matrix = [parseFloat(canvas.style.width) / canvas.width, 0, 0, parseFloat(canvas.style.height) / canvas.height, 0, 0];

					// Apply the transform to the export map context
					CanvasRenderingContext2D.prototype.setTransform.apply(ctx, matrix);

					var bgcolor = canvas.parentNode.style.backgroundColor;
					if (bgcolor) {
						ctx.fillStyle = bgcolor;
						ctx.fillRect(0, 0, canvas.width, canvas.height);
					}

					ctx.drawImage(canvas, 0, 0);
				}
			}

			opt.callback(picture.toDataURL(opt.type === 'jpg' || opt.type === 'jpeg' ? 'image/jpeg' : 'image/png', opt.quality));
			var layers = map.getAllLayers();
			for (var m of layers)
				map.removeLayer(m);
			map = null;
			setTimeout(() => document.body.removeChild(div), 1000);

		}, 1000);
	};

	self.modify = function() {

		meta.modify && meta.map.removeInteraction(meta.modify);
		meta.modify = null;

		if (config.readonly || !meta.polygon)
			return;

		meta.modify = new ol.interaction.Modify({
			source: meta.polygon.getSource(),
			deleteCondition: e => ol.events.condition.doubleClick(e)
		});

		meta.modify.on('modifyend', function(e) {
			self.coords(e.features.item(0));
			meta.zoom = meta.view.getZoom();
		});

		meta.map.addInteraction(meta.modify);

	};

	self.draw = function() {

		meta.draw && meta.map.removeInteraction(meta.draw);
		meta.draw = null;

		if (config.readonly)
			return;

		meta.draw = new ol.interaction.Draw({
			source: meta.source,
			type: 'Polygon',
			style: meta.style
		});

		meta.map.addInteraction(meta.draw);

		meta.draw.on('drawend', function(e) {
			meta.map.removeInteraction(meta.draw);
			meta.zoom = meta.view.getZoom();
			meta.draw = null;
			self.coords(e.feature);
		});
	};

	self.center = function() {
		var feature = meta.source.getFeatures()[0];
		var polygon = feature.getGeometry();
		meta.view.fit(polygon, { padding: [170, 50, 30, 150] });
		meta.view.animate({ zoom: meta.zoom, duration: 250 });
	};

	self.createpolygon = function(arr, color, radius) {

		// @arr {Array Object} [lat:Number, lng:Number]
		// @color {String}
		// @radius {Number}

		var points = [];

		for (var item of arr)
			points.push(ol.proj.transform([item.lng, item.lat], 'EPSG:4326', 'EPSG:3857'));

		var source = new ol.source.Vector({});
		var feature = new ol.Feature({ geometry: new ol.geom.Polygon([points]) });

		source.addFeature(feature);

		var polygon = new ol.layer.Vector({
			source: source,
			style: [
				meta.style,
				new ol.style.Style({ image: new ol.style.Circle({ radius: radius || 3, fill: new ol.style.Fill({ color: color })}), geometry: function (feature) {
					var coordinates = feature.getGeometry().getCoordinates()[0];
					return new ol.geom.MultiPoint(coordinates);
				}})
			]
		});

		return polygon;
	};

	self.coords = function(feature) {

		var p = feature.getGeometry();
		var format = new ol.format.WKT();
		var wkt = format.writeGeometry(p.transform(ol.proj.get('EPSG:3857'), ol.proj.get('EPSG:4326')));

		var center = ol.extent.getCenter(p.getExtent());
		var tmp = wkt.replace('POLYGON((', '').replace('))', '').split(',');
		var arr = [];

		p.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

		for (var item of tmp) {
			var tmpitem = item.split(' ');
			var latlng = {};
			latlng.lat = +tmpitem[1];
			latlng.lng = +tmpitem[0];
			arr.push(latlng);
		}

		skip = true;

		var obj = self.get() || {};
		obj.zoom = meta.view.getZoom();
		obj.color = obj.color || config.color;
		obj.points = arr;
		obj.center = { lat: center[1], lng: center[0] };

		self.clear();
		meta.polygon = self.createpolygon(arr, obj.color, config.radius);
		meta.map.addLayer(meta.polygon);
		self.set(obj);

		if (!config.readonly)
			self.modify();
	};

	self.clear = function(draw) {
		var layers = meta.map.getAllLayers();
		for (var i = 1; i < layers.length; i++)
			meta.map.removeLayer(layers[i]);
		meta.draw && meta.map.removeInteraction(meta.draw);
		meta.draw = null;
		meta.polygon = null;
		draw && self.draw();
	};

	self.move = function(lat, lng) {
		meta.view.setCenter(ol.proj.fromLonLat([lng, lat], 'EPSG:3857'));
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		self.clear();

		var refresh = false;

		if (!value) {
			value = { points: [] };
			refresh = true;
		}

		var color = value.color || config.color;
		var zoom = value.zoom || config.zoom;

		value.zoom = zoom;
		value.color = color;

		meta.style = {
			'fill-color': color + config.opacity,
			'stroke-color': color,
			'stroke-width': config.stroke,
			'circle-radius': config.radius,
			'circle-fill-color': color,
		};

		var view = meta.view;

		if (value.points && value.points.length) {

			meta.polygon = self.createpolygon(value.points, color, config.radius);
			meta.map.addLayer(meta.polygon);

			if (value.center) {
				view.setCenter(ol.proj.fromLonLat([value.center.lng, value.center.lat], 'EPSG:3857'));
				view.setZoom(zoom);
			} else
				setTimeout(self.center, 800);

		} else {

			var arr;

			if (value.center) {
				arr = [value.center.lng, value.center.lat];
			} else {
				arr = config.center.split(',');
				arr[0] = arr[0].parseFloat();
				arr[1] = arr[1].parseFloat();
			}


			view.setCenter(ol.proj.fromLonLat([arr[1], arr[0]], 'EPSG:3857'));
			view.setZoom(zoom);
			self.draw();
		}

		if (!config.readonly)
			self.modify();

		if (refresh) {
			skip = true;
			self.update(true);
		}

	};

}, ['https://cdn.jsdelivr.net/npm/ol@v7.3.0/dist/ol.js', 'https://cdn.jsdelivr.net/npm/ol@v7.3.0/ol.css']);