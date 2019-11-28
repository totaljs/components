## j-ServiceWorker (BETA)

This component is a little bit special. First of all, you need put the code below into file e.g. `sw-jcomponent.js` and place it to the `public` (e.g. `myproject/public/sw-jcomponent.js`)
```
var prefix='jc';function hash(s,unsigned){var hash=0,i,char;if(!s.length)return hash;var l=s.length;for(i=0;i<l;i++){char=s.charCodeAt(i);hash=((hash<<5)-hash)+char;hash|=0;}return unsigned?hash>>>0:hash}self.addEventListener('install',()=>{self.skipWaiting()});self.addEventListener('message',function(e){if(e.data.action==='jc-sw'){var data=e.data.data;data.name=prefix+'-'+data.version+'-'+hash(data.assets.toString(),true);addcache(e.data.data)}});self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request).then(function(response){if(response)return response;if(e.request.mode==='navigate'||(e.request.method==='GET'&&e.request.headers.get('accept').includes('text/html')))return caches.match('jc-offline-fallback')})}))});function addcache(data){caches.open(data.name).then(function(cache){if(data.assets&&data.assets.length)cache.addAll(data.assets);if(data.fallback){fetch(data.fallback,{mode:'no-cors'}).then(function(response){return cache.put('jc-offline-fallback',response)})}}).then(function(){caches.keys().then(function(keys){return Promise.all(keys.map(function(key){if(data.name!==key)return caches.delete(key)}))})})}
```
The component will communicate with this _service worker_ code.

__Configuration__:

- `expire` {String} expiration data from users storage (default: `1 day`) __we don't recommend changing this__
- `debug` {Boolean} enables `debug` mode. It'll refresh assets every reload (so you don't need to change the version) (default: `false`)
- `datasource` {String} path to data-source (data-source is a object)

__Datasource structure__:
```javascript
{
	version: '1.00',
	fallback: '/',
	assets: [
		'/js/default.js'
	]
}
```

__Good to know__:
- __PATH__ can be used as dynamic version. It'll refresh assets e.g. `SET('version', '1.35')`
- After add/remove something from assets, you doesn't need to increase version
- __fallback__ performs offline version of html. e.g. `fallback: '/offline.html'`
- Assets can be everything: fonts, partial pages, css files, javascript files
- __It's work only in Single Page Applications like [this](https://github.com/totaljs/spa)__

__Usage__:
```html
<div data---="serviceworker__version__datasource:mysource"></div>

<script>
	var version = '1.34';
	var mysource = {
		version: version,
		fallback: '/',
		assets: [
			'/pages/settings.html',
			'/pages/articles.html',
			'/pages/dashboard.html'
		]
	};
</script>
```


### Author

- Denis Granec <info@totalavengers.com>
- [License](https://www.totaljs.com/license/)
