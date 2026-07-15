import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/videos/:path*', '/img/:path*', '/fonts/:path*', '/audio/:path*'],
}

const BLOCKED_AGENTS = /bot|crawler|spider|scraper|wget|curl|python|java|go-http|headless/i
const VALID_REFERERS = /gourav9211|vercel\.net|localhost|vercel-app/

export function middleware(request) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''

  if (BLOCKED_AGENTS.test(userAgent)) {
    return new NextResponse('Access Denied', { status: 403 })
  }

  if (referer && !VALID_REFERERS.test(referer) && !VALID_REFERERS.test(origin)) {
    return new NextResponse('Hotlinking Not Allowed', { status: 403 })
  }

  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  response.headers.set('Referrer-Policy', 'no-referrer')

  if (pathname.match(/\.(mp4|webm|ogg)$/)) {
    response.headers.set('Content-Type', 'video/mp4')
    response.headers.set('Accept-Ranges', 'bytes')
  }

  return response
}
