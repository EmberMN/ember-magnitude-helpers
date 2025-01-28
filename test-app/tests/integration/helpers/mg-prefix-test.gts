import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { mgPrefix } from 'ember-magnitude-helpers';

interface MagnitudePrefixCase {
  type: 'iec' | 'si';
  n: number;
  precision: number;
  unit: string;
  useName: boolean;
  group: string;
  expected: string;
}

module('Integration | Helper | mg-prefix', function (hooks) {
  setupRenderingTest(hooks);

  const iecCases: Partial<MagnitudePrefixCase>[] = [
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
  ];
  iecCases.forEach((iecCase) => {
    iecCase.type = 'iec';
  });

  const siCases: Partial<MagnitudePrefixCase>[] = [
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
  ];
  siCases.forEach((siCase) => {
    siCase.type = 'si';
  });

  const unusualCases: Partial<MagnitudePrefixCase>[] = [
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
  ];

  const readmeExampleCases: Partial<MagnitudePrefixCase>[] = [
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
  ];

  const cases = {
    iec: iecCases,
    si: siCases,
    unusual: unusualCases,
    readme: readmeExampleCases,
  };

  for (const [groupName, casesForGroup] of Object.entries(cases)) {
    casesForGroup.forEach((c) => (c.group = groupName));
  }

  const caseList = Object.values(cases).flat() as MagnitudePrefixCase[];

  caseList.forEach((testCase: MagnitudePrefixCase) => {
    const { n, precision, type, unit, useName } = testCase;
    const { group, expected } = testCase;

    test(`${group}: it shows ${n}${
      unit ? ' ' + unit : ''
    } (type=${type}, precision=${precision}, useName=${useName}) as ${expected}`, async function (assert) {
      await render(
        <template>
          <div id="result">
            {{mgPrefix
              n
              precision=precision
              type=type
              unit=unit
              useName=useName
            }}
          </div>
        </template>,
      );

      assert.dom('#result').hasText(expected);
    });
  });
});
