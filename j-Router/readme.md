# j-Router

As the name suggests this component is for routing. It uses jRouting under the hood.


__Attributes__:
- `data-user-roles="ROLES"` (optional) Array of user's roles

__Route attributes__:
- `data-path="/"` (required) a valid URL without host
- `data-template="/home.html"` (optional) can contain relative URL to a content
- `data-form-id="FORM_ID"` (optional) name of a form, must corespond to id of j-Form `data-jc-id="FORM_ID"`
- `data-init="FUNCTION_NAME"` (optional) function to call when the path is entered for the first time
- `data-handler="FUNCTION_NAME"` (optional) function to call whenever the path is entered
- `data-middlewares="log|increase_counter"` (optional) middlewares (name of functions) separated by `|` to call before entering the route
- `data-role="ROLE"` (optional) will be called whenever the path is entered