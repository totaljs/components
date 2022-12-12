COMPONENT('fontawesomebox', 'height:300', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, input, icon, prev;
	var template = '<li data-search="{0}"><i class="{1}"></i></li>';
	var skip = false;
	var refresh = false;

	self.init = function() {
		W.fontawesomeicons = 'address-book,address-card,adjust,align-center,align-justify,align-left,align-right,allergies,ambulance,american-sign-language-interpreting,anchor,angle-double-down,angle-double-left,angle-double-right,angle-double-up,angle-down,angle-left,angle-right,angle-up,archive,arrow-alt-circle-down,arrow-alt-circle-left,arrow-alt-circle-right,arrow-alt-circle-up,arrow-circle-down,arrow-circle-left,arrow-circle-right,arrow-circle-up,arrow-down,arrow-left,arrow-right,arrow-up,arrows-alt,arrows-alt-h,arrows-alt-v,assistive-listening-systems,asterisk,at,audio-description,backward,balance-scale,ban,band-aid,barcode,bars,baseball-ball,basketball-ball,bath,battery-empty,battery-full,battery-half,battery-quarter,battery-three-quarters,bed,beer,bell,bell-slash,bicycle,binoculars,birthday-cake,blender,blind,bold,bolt,bomb,book,book-open,bookmark,bowling-ball,box,box-open,boxes,braille,briefcase,briefcase-medical,broadcast-tower,broom,bug,building,bullhorn,bullseye,burn,bus,calculator,calendar,calendar-alt,calendar-check,calendar-minus,calendar-plus,calendar-times,camera,camera-retro,capsules,car,caret-down,caret-left,caret-right,caret-square-down,caret-square-left,caret-square-right,caret-square-up,caret-up,cart-arrow-down,cart-plus,certificate,chalkboard,chalkboard-teacher,chart-area,chart-bar,chart-line,chart-pie,check,check-circle,check-square,chess,chess-bishop,chess-board,chess-king,chess-knight,chess-pawn,chess-queen,chess-rook,chevron-circle-down,chevron-circle-left,chevron-circle-right,chevron-circle-up,chevron-down,chevron-left,chevron-right,chevron-up,child,church,circle,circle-notch,clipboard,clipboard-check,clipboard-list,clock,clone,closed-captioning,cloud,cloud-download-alt,cloud-upload-alt,code,code-branch,coffee,cog,cogs,coins,columns,comment,comment-alt,comment-dots,comment-slash,comments,compact-disc,compass,compress,copy,copyright,couch,credit-card,crop,crosshairs,crow,crown,cube,cubes,cut,database,deaf,desktop,diagnoses,dice,dice-five,dice-four,dice-one,dice-six,dice-three,dice-two,divide,dna,dollar-sign,dolly,dolly-flatbed,donate,door-closed,door-open,dot-circle,dove,download,dumbbell,edit,eject,ellipsis-h,ellipsis-v,envelope,envelope-open,envelope-square,equals,eraser,euro-sign,exchange-alt,exclamation,exclamation-circle,exclamation-triangle,expand,expand-arrows-alt,external-link-alt,external-link-square-alt,eye,eye-dropper,eye-slash,fast-backward,fast-forward,fax,feather,female,fighter-jet,file,file-alt,file-archive,file-audio,file-code,file-excel,file-image,file-medical,file-medical-alt,file-pdf,file-powerpoint,file-video,file-word,film,filter,fire,fire-extinguisher,first-aid,flag,flag-checkered,flask,folder,folder-open,font,football-ball,forward,frog,frown,futbol,gamepad,gas-pump,gavel,gem,genderless,gift,glass-martini,glasses,globe,golf-ball,graduation-cap,greater-than,greater-than-equal,h-square,hand-holding,hand-holding-heart,hand-holding-usd,hand-lizard,hand-paper,hand-peace,hand-point-down,hand-point-left,hand-point-right,hand-point-up,hand-pointer,hand-rock,hand-scissors,hand-spock,hands,hands-helping,handshake,hashtag,hdd,heading,headphones,heart,heartbeat,helicopter,history,hockey-puck,home,hospital,hospital-alt,hospital-symbol,hourglass,hourglass-end,hourglass-half,hourglass-start,i-cursor,id-badge,id-card,id-card-alt,image,images,inbox,indent,industry,infinity,info,info-circle,italic,key,keyboard,kiwi-bird,language,laptop,leaf,lemon,less-than,less-than-equal,level-down-alt,level-up-alt,life-ring,lightbulb,link,lira-sign,list,list-alt,list-ol,list-ul,location-arrow,lock,lock-open,long-arrow-alt-down,long-arrow-alt-left,long-arrow-alt-right,long-arrow-alt-up,low-vision,magic,magnet,male,map,map-marker,map-marker-alt,map-pin,map-signs,mars,mars-double,mars-stroke,mars-stroke-h,mars-stroke-v,medkit,meh,memory,mercury,microchip,microphone,microphone-alt,microphone-alt-slash,microphone-slash,minus,minus-circle,minus-square,mobile,mobile-alt,money-bill,money-bill-alt,money-bill-wave,money-bill-wave-alt,money-check,money-check-alt,moon,motorcycle,mouse-pointer,music,neuter,newspaper,not-equal,notes-medical,object-group,object-ungroup,outdent,paint-brush,palette,pallet,paper-plane,paperclip,parachute-box,paragraph,parking,paste,pause,pause-circle,paw,pen-square,pencil-alt,people-carry,percent,percentage,phone,phone-slash,phone-square,phone-volume,piggy-bank,pills,plane,play,play-circle,plug,plus,plus-circle,plus-square,podcast,poo,portrait,pound-sign,power-off,prescription-bottle,prescription-bottle-alt,print,procedures,project-diagram,puzzle-piece,qrcode,question,question-circle,quidditch,quote-left,quote-right,random,receipt,recycle,redo,redo-alt,registered,reply,reply-all,retweet,ribbon,road,robot,rocket,rss,rss-square,ruble-sign,ruler,ruler-combined,ruler-horizontal,ruler-vertical,rupee-sign,save,school,screwdriver,search,search-minus,search-plus,seedling,server,share,share-alt,share-alt-square,share-square,shekel-sign,shield-alt,ship,shipping-fast,shoe-prints,shopping-bag,shopping-basket,shopping-cart,shower,sign,sign-in-alt,sign-language,sign-out-alt,signal,sitemap,skull,sliders-h,smile,smoking,smoking-ban,snowflake,sort,sort-alpha-down,sort-alpha-up,sort-amount-down,sort-amount-up,sort-down,sort-numeric-down,sort-numeric-up,sort-up,space-shuttle,spinner,square,square-full,star,star-half,step-backward,step-forward,stethoscope,sticky-note,stop,stop-circle,stopwatch,store,store-alt,stream,street-view,strikethrough,stroopwafel,subscript,subway,suitcase,sun,superscript,sync,sync-alt,syringe,table,table-tennis,tablet,tablet-alt,tablets,tachometer-alt,tag,tags,tape,tasks,taxi,terminal,text-height,text-width,th,th-large,th-list,thermometer,thermometer-empty,thermometer-full,thermometer-half,thermometer-quarter,thermometer-three-quarters,thumbs-down,thumbs-up,thumbtack,ticket-alt,times,times-circle,tint,toggle-off,toggle-on,toolbox,trademark,train,transgender,transgender-alt,trash,trash-alt,tree,trophy,truck,truck-loading,truck-moving,tshirt,tty,tv,umbrella,underline,undo,undo-alt,universal-access,university,unlink,unlock,unlock-alt,upload,user,user-alt,user-alt-slash,user-astronaut,user-check,user-circle,user-clock,user-cog,user-edit,user-friends,user-graduate,user-lock,user-md,user-minus,user-ninja,user-plus,user-secret,user-shield,user-slash,user-tag,user-tie,user-times,users,users-cog,utensil-spoon,utensils,venus,venus-double,venus-mars,vial,vials,video,video-slash,volleyball-ball,volume-down,volume-off,volume-up,walking,wallet,warehouse,weight,wheelchair,wifi,window-close,window-maximize,window-minimize,window-restore,wine-glass,won-sign,wrench,x-ray,yen-sign,fab 500px,fab accessible-icon,fab accusoft,fab acquisitions-incorporated,fab adn,fab adversal,fab affiliatetheme,fab algolia,fab alipay,fab amazon,fab amazon-pay,fab amilia,fab android,fab angellist,fab angrycreative,fab angular,fab app-store,fab app-store-ios,fab apper,fab apple,fab apple-pay,fab asymmetrik,fab audible,fab autoprefixer,fab avianex,fab aviato,fab aws,fab bandcamp,fab behance,fab behance-square,fab bimobject,fab bitbucket,fab bitcoin,fab bity,fab black-tie,fab blackberry,fab blogger,fab blogger-b,fab bluetooth,fab bluetooth-b,fab btc,fab buromobelexperte,fab buysellads,fab cc-amazon-pay,fab cc-amex,fab cc-apple-pay,fab cc-diners-club,fab cc-discover,fab cc-jcb,fab cc-mastercard,fab cc-paypal,fab cc-stripe,fab cc-visa,fab centercode,fab chrome,fab cloudscale,fab cloudsmith,fab cloudversify,fab codepen,fab codiepie,fab connectdevelop,fab contao,fab cpanel,fab creative-commons,fab creative-commons-by,fab creative-commons-nc,fab creative-commons-nc-eu,fab creative-commons-nc-jp,fab creative-commons-nd,fab creative-commons-pd,fab creative-commons-pd-alt,fab creative-commons-remix,fab creative-commons-sa,fab creative-commons-sampling,fab creative-commons-sampling-plus,fab creative-commons-share,fab css3,fab css3-alt,fab cuttlefish,fab d-and-d,fab dashcube,fab delicious,fab deploydog,fab deskpro,fab deviantart,fab digg,fab digital-ocean,fab discord,fab discourse,fab dochub,fab docker,fab draft2digital,fab dribbble,fab dribbble-square,fab dropbox,fab drupal,fab dyalog,fab earlybirds,fab ebay,fab edge,fab elementor,fab ello,fab ember,fab empire,fab envira,fab erlang,fab ethereum,fab etsy,fab expeditedssl,fab facebook,fab facebook-f,fab facebook-messenger,fab facebook-square,fab firefox,fab first-order,fab first-order-alt,fab firstdraft,fab flickr,fab flipboard,fab fly,fab font-awesome,fab font-awesome-alt,fab font-awesome-flag,fab fonticons,fab fonticons-fi,fab fort-awesome,fab fort-awesome-alt,fab forumbee,fab foursquare,fab free-code-camp,fab freebsd,fab fulcrum,fab galactic-republic,fab galactic-senate,fab get-pocket,fab gg,fab gg-circle,fab git,fab git-square,fab github,fab github-alt,fab github-square,fab gitkraken,fab gitlab,fab gitter,fab glide,fab glide-g,fab gofore,fab goodreads,fab goodreads-g,fab google,fab google-drive,fab google-play,fab google-plus,fab google-plus-g,fab google-plus-square,fab google-wallet,fab gratipay,fab grav,fab gripfire,fab grunt,fab gulp,fab hacker-news,fab hacker-news-square,fab hackerrank,fab hips,fab hire-a-helper,fab hooli,fab hornbill,fab hotjar,fab houzz,fab html5,fab hubspot,fab imdb,fab instagram,fab internet-explorer,fab ioxhost,fab itunes,fab itunes-note,fab java,fab jedi-order,fab jenkins,fab joget,fab joomla,fab js,fab js-square,fab jsfiddle,fab kaggle,fab keybase,fab keycdn,fab kickstarter,fab kickstarter-k,fab korvue,fab laravel,fab lastfm,fab lastfm-square,fab leanpub,fab less,fab line,fab linkedin,fab linkedin-in,fab linode,fab linux,fab lyft,fab magento,fab mailchimp,fab mandalorian,fab markdown,fab mastodon,fab maxcdn,fab medapps,fab medium,fab medium-m,fab medrt,fab meetup,fab megaport,fab microsoft,fab mix,fab mixcloud,fab mizuni,fab modx,fab monero,fab napster,fab neos,fab nimblr,fab node,fab node-js,fab npm,fab ns8,fab nutritionix,fab odnoklassniki,fab odnoklassniki-square,fab old-republic,fab opencart,fab openid,fab opera,fab optin-monster,fab osi,fab page4,fab pagelines,fab palfed,fab patreon,fab paypal,fab periscope,fab phabricator,fab phoenix-framework,fab phoenix-squadron,fab php,fab pied-piper,fab pied-piper-alt,fab pied-piper-hat,fab pied-piper-pp,fab pinterest,fab pinterest-p,fab pinterest-square,fab playstation,fab product-hunt,fab pushed,fab python,fab qq,fab quinscape,fab quora,fab r-project,fab ravelry,fab react,fab readme,fab rebel,fab red-river,fab reddit,fab reddit-alien,fab reddit-square,fab renren,fab replyd,fab researchgate,fab resolving,fab rev,fab rocketchat,fab rockrms,fab safari,fab sass,fab schlix,fab scribd,fab searchengin,fab sellcast,fab sellsy,fab servicestack,fab shirtsinbulk,fab shopware,fab simplybuilt,fab sistrix,fab sith,fab skyatlas,fab skype,fab slack,fab slack-hash,fab slideshare,fab snapchat,fab snapchat-ghost,fab snapchat-square,fab soundcloud,fab speakap,fab spotify,fab squarespace,fab stack-exchange,fab stack-overflow,fab staylinked,fab steam,fab steam-square,fab steam-symbol,fab sticker-mule,fab strava,fab stripe,fab stripe-s,fab studiovinari,fab stumbleupon,fab stumbleupon-circle,fab superpowers,fab supple,fab teamspeak,fab telegram,fab telegram-plane,fab tencent-weibo,fab the-red-yeti,fab themeco,fab themeisle,fab trade-federation,fab trello,fab tripadvisor,fab tumblr,fab tumblr-square,fab twitch,fab twitter,fab twitter-square,fab typo3,fab uber,fab uikit,fab uniregistry,fab untappd,fab usb,fab ussunnah,fab vaadin,fab viacoin,fab viadeo,fab viadeo-square,fab viber,fab vimeo,fab vimeo-square,fab vimeo-v,fab vine,fab vk,fab vnv,fab vuejs,fab weebly,fab weibo,fab weixin,fab whatsapp,fab whatsapp-square,fab whmcs,fab wikipedia-w,fab windows,fab wix,fab wolf-pack-battalion,fab wordpress,fab wordpress-simple,fab wpbeginner,fab wpexplorer,fab wpforms,fab xbox,fab xing,fab xing-square,fab y-combinator,fab yahoo,fab yandex,fab yandex-international,fab yelp,fab yoast,fab youtube,fab youtube-square,fab zhihu'.split(',');
	};

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.aclass(cls);
		self.css('height', config.height + 'px');
		self.append('<div class="{2}-search"><span><i class="fa fa-search clearsearch"></i></span><div><input type="text" maxlength="50" placeholder="{0}" /></div></div><div class="{2}-search-empty"></div><div class="{2}-icons"><ul style="height:{1}px" class="noscrollbar"></ul></div>'.format(config.search, config.height - 40, cls));
		container = $(self.find(cls2 + '-icons').find('ul')[0]);
		input = self.find('input');
		icon = self.find(cls2 + '-search').find('i');

		self.event('click', '.clearsearch', function() {
			input.val('').trigger('keydown');
		});

		self.event('click', 'li', function() {
			var el = $(this);
			var val = '';

			if (!el.hclass('selected'))
				val = el.find('i').attr('class');

			skip = true;
			config.exec && self.EXEC(config.exec, val, self);
			self.set(val);
			self.change(true);
		});

		self.event('keydown', 'input', function() {
			var self = this;
			setTimeout2(self.id, function() {
				var hide = [];
				var show = [];
				var value = self.value.toSearch();
				container.find('li').each(function() {
					if (value && this.getAttribute('data-search').toSearch().indexOf(value) === -1)
						hide.push(this);
					else
						show.push(this);
				});
				$(hide).aclass('hidden');
				$(show).rclass('hidden');
				icon.tclass('fa-times', !!value).tclass('fa-search', !value);
			}, 300);
		});
	};

	self.configure = function (key, value, init) {

		if (init)
			return;

		switch (key) {
			case 'height':
				self.css('height', value + 'px');
				container.css('height', value - (38) + 'px');
				break;
		}
	};

	self.released = function(is) {
		if (is) {
			container.empty();
		} else {
			self.render();
			refresh && self.refresh();
		}
	};

	self.render = function() {
		var builder = [];
		var icons = W.fontawesomeicons;
		for (var i = 0, length = icons.length; i < length; i++) {
			var icon = icons[i];
			builder.push(template.format(icon, icon.indexOf(' ') === -1 ? ('fa fa-' + icon) : icon.replace(' ', ' fa-')));
		}
		container.empty();
		input.val('').trigger('keydown');
		container.html(builder.join(''));
	};

	self.rescroll = function(t, offset, bottom) {
		t.each(function() {
			var e = this;
			var el = e;
			el.scrollIntoView(true);
			if (offset) {
				var count = 0;
				while (el && el.scrollTop == 0 && count++ < 25) {
					el = el.parentNode;
					if (el && el.scrollTop) {

						var off = el.scrollTop + offset;

						if (bottom != false) {
							if (el.scrollTop + el.getBoundingClientRect().height >= el.scrollHeight) {
								el.scrollTop = el.scrollHeight;
								return;
							}
						}

						el.scrollTop = off;
						return;
					}
				}
			}
		});
	};

	self.setter = function(value) {
		prev && prev.rclass('selected');
		if (value) {
			if (value.indexOf('fa-') === -1)
				value = 'fa-' + value;

			var index = value.indexOf(' ');
			if (index === -1)
				value = '.' + value;
			else
				value = '.' + value.substring(index + 1);

			var fa = container.find(value);
			prev = fa.parent().aclass('selected');
			setTimeout(function() {
				if (!skip && prev.length)
					self.rescroll(prev, -40);
			}, 100);
		}
		skip = false;
		refresh = true;
	};
});