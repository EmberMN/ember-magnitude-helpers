# ember-magnitude-helpers

[![Latest NPM release](https://img.shields.io/npm/v/ember-magnitude-helpers?style=flat-square)](https://www.npmjs.com/package/ember-magnitude-helpers)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FEmberMN%2Fember-magnitude-helpers%2Fbadge&style=flat-square)](https://actions-badge.atrox.dev/EmberMN/ember-magnitude-helpers/goto)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/EmberMN/ember-magnitude-helpers?style=flat-square)](https://codeclimate.com/github/EmberMN/ember-magnitude-helpers)
[![Ember Observer Score](https://emberobserver.com/badges/ember-magnitude-helpers.svg)](https://emberobserver.com/addons/ember-magnitude-helpers)

Want to convert a quantity like 5000981077504 bytes to 5.0TB or 4.55 TiB in your [Ember.js](https://emberjs.com) app?
This addon provides the following helpers:

* `mg-prefix` (written as a replacement for [`ember-number-to-human-size`](https://github.com/kellysutton/ember-number-to-human-size))

## Compatibility

(according to the default blueprint at least)

* Ember CLI v4.12 or above
* Node.js v18 or above

## Installation

```bash
ember install ember-magnitude-helpers
```

## Usage

### `mg-prefix`

Pass a number as the first parameter, optionally followed any/all of the following named parameters:

* precision: round to this many digits (default = 3)
* type: '`si`' for base 1000, '`iec`' for base 1024 (default = 'si')
* unit: arbitrary string (default = '')
* useName: `false` for abbreviation (e.g. 'G'), `true` for name (e.g. 'giga') (default = `false`)

Examples (classic):

```hbs
{{mg-prefix 123456}} => '123 k'
{{mg-prefix 1024 type="si" unit="bytes"}} => '1.02 kbytes'
{{mg-prefix 2e6 precision=1 type="iec" unit="B"}} => '2 MiB'
{{mg-prefix 1e12 unit="flops" useName=true}} => '1.00 teraflops'
```

Example (template tag):

```gjs
// some-component.gjs
import { mgPrefix } from 'ember-magnitude-helpers';

<template>
  {{mgPrefix 123456}} => '123 k'
  {{mgPrefix 1024 type="si" unit="bytes"}} => '1.02 kbytes'
  {{mgPrefix 2e6 precision=1 type="iec" unit="B"}} => '2 MiB'
  {{mgPrefix 1e12 unit="flops" useName=true}} => '1.00 teraflops'
</template>
```

You can also import this helper into JS like this:

```js
// some-component.js
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { mgPrefix } from 'ember-magnitude-helpers';

export default class SomeComponent extends Component {
  @tracked bytes = 1234567890;

  get humanSize() {
    // returns "1.15 GiB"
    return mgPrefix([this.bytes], {
      unit: 'B',
      type: 'iec',
    });
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
