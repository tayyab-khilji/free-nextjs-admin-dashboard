import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user is authenticated by looking for session cookie
  const hasSession = request.cookies.has("next-auth.session-token") || 
                     request.cookies.has("__Secure-next-auth.session-token")
  
  // Define public routes that don't require authentication
  const publicRoutes = ["/signin", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Define auth-related routes
  const isAuthRoute = pathname.startsWith("/signin") || pathname.startsWith("/signup")

  // Redirect to signin if accessing protected pages without authentication
  if (!isPublicRoute && !hasSession) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // Redirect to dashboard if accessing auth pages while logged in
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 