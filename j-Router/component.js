COMPONENT('router', function() {

	var self = this;
	var router_view;
	var userRoles;
	var processing = {};
	var views = {};

	window.$$router_form = window.$$router_form || '';
	window.$$routes = window.$$routes || {};

	self.make = function() {

		var el = self.element;

		userRoles = GET(self.attr('data-user-roles')) || [];
		el.after('<div class="router-view-' + self.id + '"></div>');
		router_view = el.parent().find('.router-view-' + self.id);

		el.find('div').each(function(){
			var route = parseRoute($(this));
			if(route.isForm)
				self.form(route);
			else
				self.route(route);
		});

	};

	self.route = function(route){

		views[route.template] = route;

		jR.route(route.path, function() {
			var tmp_args = arguments;

			if(!route.role || hasRole(route.role)){
				self.view(route.template, function(){
					var handler = window[route.handlerfn];
					if(handler && typeof handler === 'function') {
						handler.apply(handler, tmp_args);
					}								
				});
			}
			else {
				alert('Access dennied! You do not have sufficient privileges.');
				jR.back();
			}

		}, route.middlewares);
	};

	self.form = function(form){

		jC.ready(function(){
			FIND('#' + form.formid).onHide = function(){
				form.parent && jR.redirect(form.parent);
			};	            		
		});

		jR.route(form.path, function(id){

			if(!form.role || hasRole(form.role)) {
				var handler = window[form.handlerfn];
				if(handler && typeof handler === 'function') {
					handler(id, function(){
						SET('$$router_form', form.formid);
					});
				}	
			}
			else {
				alert('Access dennied! You do not have sufficient privileges.');
				jR.back();
			}

		}, form.middlewares);
	};

	self.view = function(templateurl, callback){
		
		if(processing[templateurl]) return;

		router_view.children().addClass('hidden');

		var view = views[templateurl];

		if(view.element) {
			//view.handlerfn && EXEC(view.handlerfn);
			view.element.removeClass('hidden');	
			callback();					
			return;
		}

		SETTER('loading', 'show');
		processing[templateurl] = true;
		var slug = templateurl.slug();
		var elem = router_view.append('<div id="view-' + slug + '" class="hidden">').find('#view-' + slug);

		INJECT(templateurl, elem, function() {
			processing[templateurl] = false;

			//view.handlerfn && EXEC(view.handlerfn);

			views[templateurl].element = elem;
			setTimeout(function() {
				elem.removeClass('hidden');
			}, 200);
			SETTER('loading', 'hide', 1000);
			callback();
		});

	};

	// použití např. u formuláře kde je url /products/123 tak po submitu jde o level výš na /products
	self.up = function(){
		var index = location.pathname.lastIndexOf('/');
		if(!index) return jR.redirect('/');
		var path = location.pathname;
		path = path[path.length] === '/' ? path.substring(0, path.length - 1) : path;
		index = path.lastIndexOf('/');
		path = path.substring(0, index);
		jR.redirect(path);
	};

	function hasRole(role){
		return userRoles.length ? userRoles.indexOf(role) !== -1 : true;
	};

	function parseRoute(el){

		var path = el.attr('data-path');
		if(!path) return;
		//if(path.indexOf('.') < 0 && path[path.length - 1] !== '/') path += '/';

		var role = el.attr('data-role');
		var handlerfn = el.attr('data-handler');
		var initfn = el.attr('data-init');
		var template = el.attr('data-template');
		var formid = el.attr('data-form-id');
		var middlewares = el.attr('data-middlewares');
		var parent = el.attr('data-parent');

		var route = {};
		route.path = path;
		role && (route.role = role);
		handlerfn && (route.handlerfn = handlerfn);
		initfn && (route.initfn = initfn);
		template && (route.template = template);
		formid && (route.formid = formid) && (route.isForm = true);
		parent && (route.parent = parent);
		middlewares && (route.middlewares = middlewares.split('/'));

		return route;
	};

	if(!window.$$router_init) {

		jRouting.on('status', function(code, message) {
			switch (code) {
				case 404:
					console.log('Error 404:', message);
					jR.redirect('/404', {message: message});
					break;
				case 500:
					console.log('Error 500:', message);
					jR.redirect('/500', {message: message});	                     
					break;
			}
		});

		jR.clientside('a.jr');
		window.$$router_init = true;
	}
});