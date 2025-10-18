import { NextResponse } from 'next/server';

function rand(base: number, spread: number) {
  return Math.round((base + (Math.random() - 0.5) * spread) * 100) / 100;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') ?? '7d';
  const points = range === '24h' ? 24 : range === '7d' ? 14 : range === '30d' ? 30 : 45;
  const now = Date.now();

  const base = 100 + Math.random() * 40;
  const series = Array.from({ length: points }, (_, i) => ({
    t: now - (points - i) * 24 * 3600 * 1000,
    v: rand(base + Math.sin(i / 3) * 10, 8),
  }));

  const res = {
    stats: {
      users: `${Math.floor(12000 + Math.random() * 3000).toLocaleString()}`,
      usersDelta: `+${(Math.random() * 8 + 1).toFixed(1)}%`,
      conversion: `${(Math.random() * 4 + 2).toFixed(2)}%`,
      conversionDelta: `${(Math.random() * 1 - 0.5).toFixed(1)}%`,
      mrr: `$${(120 * 1000 + Math.random() * 25_000).toLocaleString()}`,
      mrrDelta: `+${(Math.random() * 6 + 1).toFixed(1)}%`,
      nps: `${Math.floor(55 + Math.random() * 10)}`,
      npsDelta: `+${(Math.random() * 3 + 0.5).toFixed(1)}`,
    },
    series,
  };

  return NextResponse.json(res, { headers: { 'Cache-Control': 'no-store' } });
}
