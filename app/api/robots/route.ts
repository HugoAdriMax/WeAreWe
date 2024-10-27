import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(`User-agent: *
Disallow: /api/
Allow: /
Sitemap: https://www.tolly.fr/api/sitemap`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}