// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// กำหนด path ที่ต้อง login
const protectedPaths = ['/user', '/admin'];

// กำหนด path ที่ admin เท่านั้นที่เข้าได้
const adminPaths = ['/admin'];

// path ที่ login แล้วไม่ควรเข้า
const authPaths = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // จำลองการดึง user จาก cookie/session
  // ในการใช้งานจริงควรใช้ JWT หรือ session management library
  const userCookie = request.cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  // ถ้าเป็น protected path และยังไม่ login
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!user) {
      // redirect ไปหน้า login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // ถ้าเป็น admin path แต่ user ไม่ใช่ admin
    if (adminPaths.some(path => pathname.startsWith(path)) && user.role !== 'admin') {
      // redirect ไปหน้า user
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }

  // ถ้า login แล้วพยายามเข้า auth paths
  if (authPaths.some(path => pathname.startsWith(path)) && user) {
    // redirect ตาม role
    const redirectPath = user.role === 'admin' ? '/admin' : '/user';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // ถ้าเข้า root path (/)
  if (pathname === '/') {
    if (!user) {
      // ถ้ายังไม่ login ไปหน้า login
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      // ถ้า login แล้ว redirect ตาม role
      const redirectPath = user.role === 'admin' ? '/admin' : '/user';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

// กำหนด path ที่ middleware จะทำงาน
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|equipment).*)',
  ],
};