# j-Packeta

This component allows customers to select a [Packeta](https://www.packeta.com/) pickup point. After selection, a complete pickup point object is retrieved, which can be processed using a callback function.

- https://www.packeta.com
- jComponent `v19|v20`
- singleton

__How to call it?__

```js
var opt = {};
opt.callback = function(point) {
	console.log(point);
};
SETTER('packeta/show', opt);
```

__Output__:

```json
{
	"businessDaysOpenLunchtime": false,
	"businessDaysOpenUpTo": 0,
	"city": "Badín",
	"claimAssistant": false,
	"country": "sk",
	"creditCardPayment": true,
	"currency": "EUR",
	"directions": "<p>Z-BOX sa nachádza v obci Badín vedľa obecného úradu.</p>\n\n<p><strong>Dobré vedieť:</strong></p>\n\n<p>Štandardná úložná doba zásielok je 2 dni s možnosťou predĺženia o ďalší 1 deň.</p>\n\n<p><strong>Čo potrebujete na vyzdvihnutie zásielky?</strong></p>\n\n<p>Aktuálnu verziu mobilnej aplikácie Packeta</p>\n\n<ul><li>zapnite si Bluetooth a polohové služby</li><li>uistite sa, že v mobilnej aplikácii aj v objednávke zásielky máte uvedené rovnaké telefónne číslo</li><li>dobierku uhradenú vopred</li></ul>\n\n<p>Vyzdvihujete zásielku na dobierku? Tú je treba uhradiť vopred priamo v aplikácii alebo cez odkaz na sledovanie zásielky, ktorý nájdete v e-maile.</p>",
	"directionsCar": "",
	"directionsPublic": "",
	"error": null,
	"gps": {
		"lat": 48.6629,
		"lon": 19.12581
	},
	"holidayEnd": null,
	"holidayStart": null,
	"exceptionDays": [],
	"externalId": "I_15491",
	"id": "15491",
	"isNew": false,
	"maxWeight": 15,
	"name": "Z-BOX Badín, Sládkovičova 4",
	"nameStreet": "Z-BOX Badín, Sládkovičova 4",
	"openingHours": {
		"compactShort": "<strong>Po–Ne</strong> Nonstop",
		"compactLong": "<strong>Po–Ne</strong> Nonstop",
		"tableLong": "<table class='packetery-hours'><tr><th>Po</th><td>Nonstop</td></tr><tr><th>Ut</th><td>Nonstop</td></tr><tr><th>St</th><td>Nonstop</td></tr><tr><th>Št</th><td>Nonstop</td></tr><tr><th>Pi</th><td>Nonstop</td></tr><tr><th>So</th><td>Nonstop</td></tr><tr><th>Ne</th><td>Nonstop</td></tr></table>",
		"exceptions": [],
		"regular": {
			"monday": "Nonstop",
			"tuesday": "Nonstop",
			"wednesday": "Nonstop",
			"thursday": "Nonstop",
			"friday": "Nonstop",
			"saturday": "Nonstop",
			"sunday": "Nonstop"
		}
	},
	"packetConsignment": true,
	"photos": [
		{
			"thumbnail": "https://files.packeta.com/points/thumb/point_15491_334b78451cdf.jpg",
			"normal": "https://files.packeta.com/points/normal/point_15491_334b78451cdf.jpg"
		},
		{
			"thumbnail": "https://files.packeta.com/points/thumb/point_15491_4041603c5372.jpg",
			"normal": "https://files.packeta.com/points/normal/point_15491_4041603c5372.jpg"
		},
		{
			"thumbnail": "https://files.packeta.com/points/thumb/point_15491_425a950aa53a.jpg",
			"normal": "https://files.packeta.com/points/normal/point_15491_425a950aa53a.jpg"
		}
	],
	"photo": [
		{
			"thumbnail": "https://files.packeta.com/points/thumb/point_15491_334b78451cdf.jpg",
			"normal": "https://files.packeta.com/points/normal/point_15491_334b78451cdf.jpg"
		},
		{
			"thumbnail": "https://files.packeta.com/points/thumb/point_15491_4041603c5372.jpg",
			"normal": "https://files.packeta.com/points/normal/point_15491_4041603c5372.jpg"
		},
		{
			"thumbnail": "https://files.packeta.com/points/thumb/point_15491_425a950aa53a.jpg",
			"normal": "https://files.packeta.com/points/normal/point_15491_425a950aa53a.jpg"
		}
	],
	"place": "Z-BOX",
	"recommended": "quickBox",
	"saturdayOpenTo": 0,
	"special": "",
	"street": "Sládkovičova 4",
	"sundayOpenTo": 0,
	"url": "https://www.zasilkovna.cz/pobocky/z-box-badin-sladkovicova-4",
	"branchCode": "z-box-badin-sladkovicova-4",
	"warning": "almostFullBox",
	"wheelchairAccessible": false,
	"zip": "976 32",
	"pickupPointType": "internal",
	"carrierPickupPointId": null,
	"carrierId": null,
	"routingCode": "S96-301-15491",
	"routingName": "Z-BOX Badín, Sládkovičova 4",
	"group": "zbox"
}
```

### Author

- Dodo Marton <dodo@totaljs.com>
- [License](https://www.totaljs.com/license/)