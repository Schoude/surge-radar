import { Hono } from 'hono';
import { HIGHEST_GAINERS, PILLARS_MOMENTUM } from './configs/screener.ts';

const app = new Hono();

app.get('/screener/pillars-momentum', async (c) => {
  const body = PILLARS_MOMENTUM;

  const res = await fetch(
    'https://scanner.tradingview.com/america/scan?label-product=popup-screener-stock',
    {
      headers: {
        accept: 'application/json',
        'content-type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(body),
      method: 'POST',
    },
  );

  const data = await res.json();

  return c.json(data);
});

app.get('/screener/highest-gainers', async (c) => {
  const body = HIGHEST_GAINERS;

  const res = await fetch(
    'https://scanner.tradingview.com/america/scan?label-product=popup-screener-stock',
    {
      headers: {
        accept: 'application/json',
        'content-type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(body),
      method: 'POST',
    },
  );

  const data = await res.json();

  return c.json(data);
});

Deno.serve(app.fetch);
