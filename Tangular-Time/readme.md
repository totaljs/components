# Tangular-Time

A simple Tangular template engine __helper__ for rendering `humanable` date and time.

- jComponent `v19|v20`

__Outputs__:

- `now`
- `5 minutes ago`
- `1 month ago`
- `2 years ago`

__Usage__:

```html
<h1>{{ name }}</h1>
<div>{{ created | time }}</div>
```

or

```js
console.log(Thelpers.time(new Date()));
```

### Improvements

__New__: Tangular helper `time2` performs updating of time every minute automatically.