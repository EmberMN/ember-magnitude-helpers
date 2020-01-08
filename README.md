# ember-magnitude-helpers

[![Latest NPM release](https://img.shields.io/npm/v/ember-magnitude-helpers?style=flat-square)](https://www.npmjs.com/package/ember-magnitude-helpers)
[![Build Status](https://img.shields.io/travis/EmberMN/ember-magnitude-helpers/master?style=flat-square)](https://travis-ci.org/EmberMN/ember-magnitude-helpers)
[![Dependencies](https://img.shields.io/david/dev/EmberMN/ember-magnitude-helpers?style=flat-square)](https://david-dm.org/EmberMN/ember-magnitude-helpers)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/EmberMN/ember-magnitude-helpers?style=flat-square)](https://codeclimate.com/github/EmberMN/ember-magnitude-helpers)
[![Ember Observer Score](https://emberobserver.com/badges/EmberMN/ember-magnitude-helpers.svg)](https://emberobserver.com/addons/ember-magnitude-helpers)

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

* Ember.js v3.8 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
