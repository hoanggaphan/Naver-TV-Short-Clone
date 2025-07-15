import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Danh sách các route cần bảo vệ
    const protectedRoutes = ['/profile', '/upload']
    const isProtectedRoute = protectedRoutes.some(route =>
        nextUrl.pathname.startsWith(route)
    )

    // Nếu truy cập trang được bảo vệ mà chưa login
    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/', nextUrl)) // nếu có trang login nên redirect sang trang login
    }

    //   // Nếu đã login mà truy cập trang login
    //   if (isLoggedIn && nextUrl.pathname === '/login') {
    //     return NextResponse.redirect(new URL('/dashboard', nextUrl))
    //   }

    return NextResponse.next()
})

export const config = {
    matcher: [
        // Bảo vệ tất cả routes trừ các file static và API routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
