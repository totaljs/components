## j-Planner

- please try to understand the functionality

- jComponent `v19|v20`

__Data-source__ needs to contain:

```javascript
{
    items: [{ id: '12345', name: 'A name of plan', dtbeg: NOW.add('-5 days'), dtend: NOW.add('3 days'), progress: 30, color: '#5385EA', title: 'A tooltip' }, ...] // items
    year: 2019
}
```

__Configuration__:

- `days {String}` pluralization for days (optional, default: `# days,# day,# days,# days`)
- `exec {String}` a path to variable or method `function(item, el)`, it's evaluated if the user will click on the item
- `scroll {String}` a path to variable or method `function(y)`, it's evaluated if the user will scroll planner
- `parent {String}` optional, a container with fixed width/height, can be `window`. Default value: `parent` element.)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)