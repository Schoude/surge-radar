import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { HIGHEST_GAINERS, PILLARS_MOMENTUM } from './configs/screener.ts';

interface TVScreenerMeta {
  description: string;
  exchange: string;
  kind: string;
  'kind-delay': number;
  logo: { logoid: string; style: string } | null;
  logoid: string;
  name: string;
  type: string;
  typespecs: string[];
}

interface TVScreenerColumn {
  s: string;
  d: [TVScreenerMeta, number, number, number, number, string, string, string, number, number];
}

interface TVResponse {
  totalCount: number;
  data: TVScreenerColumn[];
}

export interface ScreenerRow {
  ticker: string;
  exchange: string;
  name: string;
  close: number;
  premarketChange: number;
  premarketVolume: number;
  float: number;
  relativeVolume10d: number;
  sector: string;
  country: string;
  logoUrl: string;
  flagUrl: string;
}

function toScreenerRow(data: TVResponse): ScreenerRow[] {
  return data.data.map((item) => {
    const [
      meta,
      close,
      float,
      relativeVolume10d,
      premarketVolume,
      sector,
      country,
      countryCode,
      premarketChange,
    ] = item.d;

    let logoUrl = '';
    let flagUrl = '';

    if (meta.logoid !== '') {
      logoUrl = `https://s3-symbol-logo.tradingview.com/${meta.logoid}.svg`;
    }

    if (countryCode !== '') {
      flagUrl = `https://s3-symbol-logo.tradingview.com/country/${countryCode}.svg`;
    }

    return {
      ticker: meta.name,
      name: meta.description,
      exchange: meta.exchange,
      close,
      premarketChange,
      premarketVolume,
      float,
      relativeVolume10d,
      sector,
      country,
      logoUrl,
      flagUrl,
    };
  });
}

const app = new Hono();
app.use('*', cors());

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

  const data = (await res.json()) as TVResponse;

  return c.json(toScreenerRow(data));
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

  const data = (await res.json()) as TVResponse;

  return c.json(toScreenerRow(data));
});

app.get('/news/:exchange_ticker', async (c) => {
  const id = c.req.param('exchange_ticker');

  const url = `https://news-mediator.tradingview.com/public/news-flow/v2/news?filter=lang%3Aen&filter=symbol:${id}&client=chart&streaming=false&user_prostatus=non_pro`;

  const res = await fetch(url);

  const data = await res.json();

  return c.json(data);
});

Deno.serve(app.fetch);
