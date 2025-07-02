// src/lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility สำหรับรวม className (ต้อง install clsx และ tailwind-merge)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format วันที่เป็นภาษาไทย
export function formatDateThai(date: Date | string): string {
  const d = new Date(date);
  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  
  const day = d.getDate();
  const month = thaiMonths[d.getMonth()];
  const year = d.getFullYear() + 543; // แปลงเป็นพุทธศักราช
  
  return `${day} ${month} ${year}`;
}

// Format วันเวลาแบบเต็ม
export function formatDateTimeThai(date: Date | string): string {
  const d = new Date(date);
  const dateStr = formatDateThai(d);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  
  return `${dateStr} ${hours}:${minutes} น.`;
}

// คำนวณจำนวนวันที่เหลือ
export function getDaysRemaining(targetDate: Date | string): number {
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

// ตรวจสอบว่าเกินกำหนดหรือไม่
export function isOverdue(dueDate: Date | string): boolean {
  return getDaysRemaining(dueDate) < 0;
}

// Format รหัสนักศึกษา
export function formatStudentId(id: string): string {
  if (id.length === 7) {
    return `${id.slice(0, 2)}-${id.slice(2)}`;
  }
  return id;
}

// Generate รหัสคำขอยืม
export function generateBorrowRequestId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `BR${year}${month}${random}`;
}

// Mock authentication (ในการใช้งานจริงควรเรียก API)
export async function mockLogin(studentId: string, password: string) {
  // จำลองการเรียก API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (studentId === '6606276' && password === 'Aa1234567') {
    return {
      success: true,
      user: {
        id: '1',
        studentId: '6606276',
        name: 'สมชาย ใจดี',
        role: 'user',
        faculty: 'วิทยาลัยแพทยศาสตร์'
      }
    };
  } else if (studentId === 'admin' && password === 'Admin123') {
    return {
      success: true,
      user: {
        id: '2',
        studentId: 'admin',
        name: 'แอดมิน ระบบ',
        role: 'admin',
        faculty: 'สำนักงานสวัสดิการสุขภาพ'
      }
    };
  }
  
  return {
    success: false,
    error: 'รหัสนักศึกษา/บุคลากร หรือรหัสผ่านไม่ถูกต้อง'
  };
}

// Set cookie สำหรับเก็บข้อมูล user
export function setUserCookie(user: any) {
  // ในการใช้งานจริงควรใช้ httpOnly cookie หรือ secure session
  if (typeof window !== 'undefined') {
    document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=86400`; // 1 วัน
  }
}

// Get user จาก cookie
export function getUserFromCookie() {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    
    if (userCookie) {
      try {
        const userData = userCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(userData));
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

// Clear user cookie (logout)
export function clearUserCookie() {
  if (typeof window !== 'undefined') {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}