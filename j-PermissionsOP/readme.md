## j-Permissions for OpenPlatform applications

The component is similar like `j-Permissions`, but this component is more developer friendly (more automated) and it's targeted for OpenPlatform applications. The component generates output in the form:

```
['C@admin', 'W@admin', 'R@admin', 'D@admin', 'R123456', 'R#employees']
```

- first letter means allowed type, defined in `types`
- `@admin` means a role `admin`
- `#employees` means a group `employees`
- `123456` means a specific `userid`

__Configuration__:

- `placeholder` {String} a placeholder for `j-Directory` component (default: `Search`)
- `types` {String} types of permission (array delimited by char, default: `CRUD`)
- `dirsource` {String} a link to method, it is evaluated after user clicks on the header
- `pk` {String} a `pk` means primary key, it's used as a prevention for duplicated values (default: `name`)
- `disabled` {Boolean} optional, disables this component
- `default` {String} default value of `type` (default: `R`)
- `dirraw` {Boolean} optional, can disable HTML encoding for text in `j-Directory` (default: `false`)
- `dirkey` {String} optional, a key for text in `j-Directory` (default: `name`)
- `labelrole` {String} optional a label for roles (default: `Role`)
- `labelgroup` {String} optional a label for groups (default: `Group`)
- `limit` {Number} a count of allowed permissions (default: `0` = unlimited)
- `pk` {String} a primary key which value will be binded into the model (default: `id`)
- __IMPORTANT__ `find` {String} URL address for finding roles, groups and users, the component sends `url?q=SEARCH_QUERY` (it sends empty value)
- __IMPORTANT__ `read` {String} URL address for reading roles, groups and users, the component sends `url?id=@role,#group,userid,...`

```javascript
// The component expects data:
['C@admin', 'W@admin', 'R@admin', 'D@admin', 'R123456', 'R#employees'];

// The component tries to find data:
// The component tries to read data and it pairs them with the model automatically:
[{ id: '123456', name: 'Peter Širka' }, { id: '@admin', name: 'Administrators' }, { id: '#employees', name: 'Employees' }];
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/licenses/)
