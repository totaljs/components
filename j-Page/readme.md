# j-Page

This component can handle different contents asynchronously. When the content is needed then the component downloads it accoding to `data-template="/relative/url/to/content"` attribute. This component is really great solution for creating SPA.

__Attributes__:
- `data-template="/home.html"` (required) can contain relative URL to a content
- `data-if="home"` (required) a valid value for showing a content (`value` according to `data-jc-path` attribute)
- `data-reload="FUNCTION_NAME"` when a condition is valid then the component executes a function with this name (optional)