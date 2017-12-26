# j-Binder

This component can help with changing of dynamic content, class or visibility. The component can be hooked on a `body` element. It's optimized for the performance.

__Supported attributes__:

- `data-b="SOME.PATH"`
- `data-b-visible="value => value > 100 && value < 1000"` - optional, toggles `hidden` class
- `data-b-class="value => value === 100 ? '+selected +animate -border -margin' : '-selected -animate +border +margin'` - optional, adds and removes classes
- `data-b-html="value => value && value.price ? value.price.format(2) : 'without price'` - optional, sets HTML content
- `data-b-template="true"` enables Tangular compiler for nested `<script type="text/html">{{ markup }}</script>` or raw `{{ markup }}`.
- `data-b-disable="value => value > 100 && value < 1000"` - optional, toggles `disabled` attribute
- `data-b-selector=".ui-textbox-label"` - optional, target element will be elements by selector (default: `null`)
- `data-b-src="value"` - optional, can change `src` argument in the image
- `data-b-href="value"` - optional, can change `href` argument in the link