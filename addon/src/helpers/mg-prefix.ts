import { htmlSafe } from '@ember/template';

interface MagnitudePrefix {
  abbr: string;
  name: string;
}

interface MagnitudePrefixTable {
  [index: number]: MagnitudePrefix;
}

interface MagnitudePrefixTableGroups {
  [key: string]: MagnitudePrefixTable;
}

// See https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
// and https://en.wikipedia.org/wiki/Binary_prefix#Adoption_by_IEC,_NIST_and_ISO
const prefixes: MagnitudePrefixTableGroups = {
  iec: {
    '0': { abbr: '', name: '' },
    '1': { abbr: 'Ki', name: 'kibi' },
    '2': { abbr: 'Mi', name: 'mebi' },
    '3': { abbr: 'Gi', name: 'gibi' },
    '4': { abbr: 'Ti', name: 'tebi' },
    '5': { abbr: 'Pi', name: 'pebi' },
    '6': { abbr: 'Ei', name: 'exbi' },
    '7': { abbr: 'Zi', name: 'zebi' },
    '8': { abbr: 'Yi', name: 'yobi' },
  },
  si: {
    '-8': { abbr: 'y', name: 'yocto' },
    '-7': { abbr: 'z', name: 'zepto' },
    '-6': { abbr: 'a', name: 'atto' },
    '-5': { abbr: 'f', name: 'femto' },
    '-4': { abbr: 'p', name: 'pico' },
    '-3': { abbr: 'n', name: 'nano' },
    '-2': { abbr: 'μ', name: 'micro' },
    '-1': { abbr: 'm', name: 'milli' },
    '0': { abbr: '', name: '' },
    '1': { abbr: 'k', name: 'kilo' },
    '2': { abbr: 'M', name: 'mega' },
    '3': { abbr: 'G', name: 'giga' },
    '4': { abbr: 'T', name: 'tera' },
    '5': { abbr: 'P', name: 'peta' },
    '6': { abbr: 'E', name: 'exa' },
    '7': { abbr: 'Z', name: 'zetta' },
    '8': { abbr: 'Y', name: 'yotta' },
  },
};

export default function mgPrefix(
  value: number = 0,
  {
    precision = 3,
    type = 'si',
    unit = '',
    useName = false,
  }: {
    precision?: number;
    type?: 'iec' | 'si';
    unit?: string;
    useName?: boolean;
  } = {},
) {
  if (['iec', 'si'].indexOf(type) === -1) {
    throw Error(`Type must be either 'iec' or 'si' (was ${type})`);
  }

  // Handle negative numbers by temporarily converting them to positive ones until the end of the calculation
  const isNegative = (value ?? 0) < 0;
  const n = isNegative ? -(value ?? 0) : (value ?? 0);

  // For the purposes of this addon, "one order of magnitude" means one factor of the following `base`
  const base = type === 'iec' ? 1024 : 1000;
  const power = n > 0 ? Math.floor(Math.log(n) / Math.log(base)) : 0;

  const orders = Object.keys(prefixes[type] || {}).map((s) => parseInt(s, 10)); // unsorted but don't care
  const minOrder = Math.min(...orders);
  const maxOrder = Math.max(...orders);
  const order = Math.min(maxOrder, Math.max(minOrder, power));

  const symbols = new Array(maxOrder - minOrder + 1)
    .fill(0)
    .map((_z, i) => minOrder + i)
    .map((ord) => prefixes[type]?.[ord]?.[useName ? 'name' : 'abbr'] ?? '');
  const symbol = symbols[order - minOrder];

  const result =
    order === 0 ? n : (n / Math.pow(base, order)).toPrecision(precision);

  return htmlSafe(
    `${isNegative ? '-' : ''}${result}${symbol ? ` ${symbol}` : ''}${
      symbol && unit ? '' : ' '
    }${unit}`,
  );
}
