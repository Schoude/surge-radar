const basecolumns = [
  'ticker-view',
  'close',
  'float_shares_outstanding_current',
  'relative_volume_10d_calc',
  'premarket_volume',
  'sector.tr',
  'country.tr',
];

const premarketColumns = [...basecolumns, 'premarket_change', 'premarket_gap'];

export const PILLARS_MOMENTUM = {
  columns: premarketColumns,
  filter: [
    { left: 'close', operation: 'in_range', right: [2, 20] },
    { left: 'premarket_change', operation: 'greater', right: 20 },
    {
      left: 'float_shares_outstanding_current',
      operation: 'eless',
      right: 25000000,
    },
    { left: 'is_primary', operation: 'equal', right: true },
  ],
  ignore_unknown_fields: false,
  options: { lang: 'en' },
  sort: {
    sortBy: 'premarket_change',
    sortOrder: 'desc',
  },
  markets: ['america'],
  // Filters out non-stocks
  filter2: {
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
  },
};

export const HIGHEST_GAINERS = {
  columns: premarketColumns,
  filter: [
    { left: 'premarket_change', operation: 'greater', right: 20 },
    { left: 'is_primary', operation: 'equal', right: true },
  ],
  ignore_unknown_fields: false,
  options: { lang: 'en' },
  sort: { sortBy: 'premarket_change', sortOrder: 'desc' },
  markets: ['america'],
  filter2: {
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
                  { expression: { left: 'typespecs', operation: 'has', right: ['common'] } },
                ],
              },
            },
            {
              operation: {
                operator: 'and',
                operands: [
                  { expression: { left: 'type', operation: 'equal', right: 'stock' } },
                  { expression: { left: 'typespecs', operation: 'has', right: ['preferred'] } },
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
      { expression: { left: 'typespecs', operation: 'has_none_of', right: ['pre-ipo'] } },
    ],
  },
};
