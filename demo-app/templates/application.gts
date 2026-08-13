import { pageTitle } from 'ember-page-title';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { mgPrefix } from '#src/index.ts';

class HumanSize extends Component {
  @tracked bytes = 1234567890;

  get humanSize() {
    // returns "1.15 GiB"
    return mgPrefix(this.bytes, {
      unit: 'B',
      type: 'iec',
    });
  }

  randomize = () => {
    this.bytes = Math.floor(Math.random() * 1e12);
  };

  <template>
    {{this.bytes}}
    bytes =
    {{this.humanSize}}
    <button type="button" {{on "click" this.randomize}}>Randomize</button>
  </template>
}

const examples = [
  {
    code: '{{mgPrefix 123456}}',
    result: mgPrefix(123456),
  },
  {
    code: '{{mgPrefix 1024 type="si" unit="bytes"}}',
    result: mgPrefix(1024, { type: 'si', unit: 'bytes' }),
  },
  {
    code: '{{mgPrefix 2000000 precision=1 type="iec" unit="B"}}',
    result: mgPrefix(2_000_000, { precision: 1, type: 'iec', unit: 'B' }),
  },
  {
    code: '{{mgPrefix 1000000000000 unit="flops" useName=true}}',
    result: mgPrefix(1_000_000_000_000, { unit: 'flops', useName: true }),
  },
  {
    code: '{{mgPrefix 5000981077504 unit="B"}}',
    result: mgPrefix(5_000_981_077_504, { unit: 'B' }),
  },
  {
    code: '{{mgPrefix 5000981077504 type="iec" unit="B"}}',
    result: mgPrefix(5_000_981_077_504, { type: 'iec', unit: 'B' }),
  },
  {
    code: '{{mgPrefix 0.0000123 unit="g"}}',
    result: mgPrefix(0.0000123, { unit: 'g' }),
  },
  {
    code: '{{mgPrefix -4096 type="iec" unit="B"}}',
    result: mgPrefix(-4096, { type: 'iec', unit: 'B' }),
  },
  {
    code: '{{mgPrefix 5000 decimals=1}}',
    result: mgPrefix(5000, { decimals: 1 }),
  },
  {
    code: '{{mgPrefix 50000 decimals=1}}',
    result: mgPrefix(50_000, { decimals: 1 }),
  },
  {
    code: '{{mgPrefix 500000 decimals=1}}',
    result: mgPrefix(500_000, { decimals: 1 }),
  },
];

const usageSnippet = `import { mgPrefix } from 'ember-magnitude-helpers';

<template>
  {{mgPrefix 1024 type="iec" unit="B"}}
</template>`;

<template>
  {{pageTitle "ember-magnitude-helpers"}}

  <h1>ember-magnitude-helpers</h1>

  <h2>Installation</h2>

  <pre><code>pnpm add ember-magnitude-helpers</code></pre>

  <h2>Usage</h2>

  <p>Import the helper and use it in a template tag component:</p>

  <pre><code>{{usageSnippet}}</code></pre>

  <h2><code>mgPrefix</code> examples</h2>

  <table>
    <thead>
      <tr>
        <th>Invocation</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      {{#each examples as |example|}}
        <tr>
          <td><code>{{example.code}}</code></td>
          <td>{{example.result}}</td>
        </tr>
      {{/each}}
    </tbody>
  </table>

  <h2><code>mgPrefix</code> in a component</h2>

  <HumanSize />
</template>
