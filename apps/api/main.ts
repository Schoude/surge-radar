import { Hono } from 'hono';

const app = new Hono();

app.get('/screener/pillars-momentum', async (c) => {
  const body = {
    columns: [
      'ticker-view',
      'close',
      'type',
      'typespecs',
      'pricescale',
      'minmov',
      'fractional',
      'minmove2',
      'currency',
      'premarket_change',
      'float_shares_outstanding_current',
      'relative_volume_10d_calc',
      'premarket_volume',
      'sector.tr',
      'market',
      'sector',
      'country.tr',
      'country_code_fund',
    ],
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
    range: [0, 100],
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

  const res = await fetch('https://scanner.tradingview.com/america/scan?label-product=popup-screener-stock', {
    headers: {
      accept: 'application/json',
      'content-type': 'text/plain;charset=UTF-8',
    },
    body: JSON.stringify(body),
    method: 'POST',
  });

  const data = await res.json();

  return c.json(data);
});

export type AppType = typeof app;

Deno.serve(app.fetch);
