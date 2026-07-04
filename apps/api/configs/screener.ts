const baseColumns = [
  'ticker-view',
  'close',
  'float_shares_outstanding_current',
  'relative_volume_10d_calc',
  'premarket_volume',
  'sector.tr',
  'country.tr',
  'country_code_fund',
];

const premarketColumns = [...baseColumns, 'premarket_change', 'premarket_gap'];
const sort = { sortBy: 'premarket_change', sortOrder: 'desc' };

const commonFilter2 = {
  operator: 'and',
  operands: [
    {
      operation: {
        operator: 'or',
        operands: [
          {
            operation: {
              operator: 'and',
              operands: [
                { expression: { left: 'type', operation: 'equal', right: 'stock' } },
                {
                  expression: {
                    left: 'typespecs',
                    operation: 'has',
                    right: ['common'],
                  },
                },
              ],
            },
          },
          {
            operation: {
              operator: 'and',
              operands: [
                { expression: { left: 'type', operation: 'equal', right: 'stock' } },
                {
                  expression: {
                    left: 'typespecs',
                    operation: 'has',
                    right: ['preferred'],
                  },
                },
              ],
            },
          },
          {
            operation: {
              operator: 'and',
              operands: [{ expression: { left: 'type', operation: 'equal', right: 'dr' } }],
            },
          },
          {
            operation: {
              operator: 'and',
              operands: [
                { expression: { left: 'type', operation: 'equal', right: 'fund' } },
                {
                  expression: {
                    left: 'typespecs',
                    operation: 'has_none_of',
                    right: ['etf', 'mutual'],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      expression: {
        left: 'typespecs',
        operation: 'has_none_of',
        right: ['pre-ipo'],
      },
    },
  ],
};

const createScreenerConfig = (filter: Array<Record<string, unknown>>) => ({
  columns: premarketColumns,
  filter,
  ignore_unknown_fields: false,
  options: { lang: 'en' },
  sort,
  markets: ['america'],
  filter2: commonFilter2,
});

export const PILLARS_MOMENTUM = createScreenerConfig([
  { left: 'close', operation: 'in_range', right: [2, 20] },
  { left: 'premarket_change', operation: 'greater', right: 20 },
  {
    left: 'float_shares_outstanding_current',
    operation: 'eless',
    right: 25000000,
  },
  { left: 'is_primary', operation: 'equal', right: true },
]);

export const HIGHEST_GAINERS = createScreenerConfig([
  { left: 'premarket_change', operation: 'greater', right: 20 },
  { left: 'is_primary', operation: 'equal', right: true },
]);
