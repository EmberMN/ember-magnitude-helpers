import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | mg-prefix', function (hooks) {
  setupRenderingTest(hooks);

  const cases = {
    iec: [
      {
        n: 0,
        precision: undefined,
        unit: 'bytes',
        useName: false,
        expected: '0 bytes',
      },
      {
        n: 128,
        precision: undefined,
        unit: 'bits',
        useName: false,
        expected: '128 bits',
      },
      {
        n: 512,
        precision: 1,
        unit: undefined,
        useName: false,
        expected: '512',
      },
      {
        n: 1024,
        precision: 4,
        unit: 'B',
        useName: false,
        expected: '1.000 KiB',
      },
      {
        n: 1e6,
        precision: undefined,
        unit: 'B',
        useName: false,
        expected: '977 KiB',
      },
      {
        n: 33.7 * Math.pow(2, 30),
        precision: 2,
        unit: 'B',
        useName: false,
        expected: '34 GiB',
      },
      {
        n: 789 * Math.pow(2, 40),
        precision: 4,
        unit: 'B',
        useName: false,
        expected: '789.0 TiB',
      },
    ].map((x) => Object.assign({ type: 'iec' }, x)),
    si: [
      {
        n: 0.0254,
        precision: 3,
        unit: 'm',
        useName: false,
        expected: '25.4 mm',
      },
      {
        n: 42e-6,
        precision: 2,
        unit: 'L',
        useName: false,
        expected: '42 μL',
      },
      {
        n: 1.21 * Math.pow(10, 9),
        precision: 3,
        unit: 'watts',
        useName: true,
        expected: '1.21 gigawatts',
      },
    ].map((x) => Object.assign({ type: 'si' }, x)),
    unusual: [
      {
        n: -Infinity,
        precision: undefined,
        type: 'si',
        unit: 'm',
        useName: false,
        expected: '-Infinity Ym',
      },
      {
        n: -65536,
        precision: 2,
        type: 'iec',
        unit: 'B',
        useName: false,
        expected: '-64 KiB',
      },
      {
        n: 1e-6,
        precision: 1,
        type: 'iec',
        unit: 'B',
        useName: false,
        expected: '0.000001 B',
      },
      {
        n: NaN,
        precision: undefined,
        type: 'iec',
        unit: undefined,
        useName: false,
        expected: 'NaN',
      },
    ],
    readme: [
      {
        n: 123456,
        precision: undefined,
        type: undefined,
        unit: undefined,
        useName: undefined,
        expected: '123 k',
      },
      {
        n: 1024,
        precision: undefined,
        type: 'si',
        unit: 'bytes',
        useName: undefined,
        expected: '1.02 kbytes',
      },
      {
        n: 2e6,
        precision: 1,
        type: 'iec',
        unit: 'B',
        useName: false,
        expected: '2 MiB',
      },
      {
        n: 1e12,
        precision: undefined,
        unit: 'flops',
        useName: true,
        expected: '1.00 teraflops',
      },
    ],
  };

  const caseList = Object.keys(cases).reduce((list: any, group) => {
    list.push(...cases[group].map((x) => Object.assign({ group }, x)));
    return list;
  }, []);

  caseList.forEach(
    ({
      group,
      n,
      precision,
      type,
      unit,
      useName,
      expected,
    }: {
      group: string;
      n: number;
      precision?: number;
      type?: string;
      unit?: string;
      useName?: boolean;
      expected: string;
    }) => {
      test(`${group}: it shows ${n}${
        unit ? ' ' + unit : ''
      } (type=${type}, precision=${precision}, useName=${useName}) as ${expected}`, async function (assert) {
        this.set('n', n);
        this.set('precision', precision);
        this.set('type', type);
        this.set('unit', unit);
        this.set('useName', useName);
        await render(
          hbs`{{mg-prefix this.n precision=this.precision type=this.type unit=this.unit useName=this.useName}}`
        );
        const textContent = <string>this.element.textContent;
        assert.equal(textContent.trim(), expected);
      });
    }
  );
});
