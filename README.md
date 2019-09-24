# ember-magnitude-helpers

Want to convert a quantity like 5000981077504 bytes to 5.0TB or 4.55 TiB in your [Ember.js](https://emberjs.com) app?
This addon provides the following helpers:

* `mg-prefix` (written as a replacement for [`ember-number-to-human-size`](https://github.com/kellysutton/ember-number-to-human-size))


## Installation

```
ember install ember-magnitude-helpers
```


## Usage

### `mg-prefix`

Pass a number as the first parameter, optionally followed any/all of the following named parameters:

* precision: round to this many digits (default = 3)
* type: '`si`' for base 1000, '`iec`' for base 1024 (default = 'si')
* unit: arbitrary string (default = '')
* useName: `false` for abbrevation (e.g. 'G'), `true` for name (e.g. 'giga') (default = `false`)

Examples:
```hbs
{{mg-prefix 123456}} => '123 k'
{{mg-prefix 1024 type="si" unit="bytes"}} => '1.02 kbytes'
{{mg-prefix 2e6 precision=1 type="iec" unit="B"}} => '2 MiB'
{{mg-prefix 1e12 unit="flops" useName=true}} => '1.00 teraflops'
```


## Compatibility

(according to the default blueprint at least)

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
