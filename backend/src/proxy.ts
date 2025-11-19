import { NextResponse } from 'next/server'

export async function proxy() {
  // handle preflighted requests
  const res = NextResponse.next();
  res.headers.append('Access-Control-Allow-Origin', '*');
  res.headers.append('Access-Control-Allow-Methods', '*');
  res.headers.append('Access-Control-Allow-Headers', '*');
  return res;
}

export const config = {
  matcher: '/api/:path*',
}

