// ไฟล์: src/components/layout/Navbar.tsx
'use client';

import styles from './Navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getUserFromCookie, clearUserCookie } from '@/lib/utils';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // ดึงข้อมูล user จาก cookie
    const userData = getUserFromCookie();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    // ลบ cookie และ redirect ไปหน้า login
    clearUserCookie();
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link href="/" className={styles.logoSection}>
          <img 
            src="/logo.png" 
            alt="RSU Logo" 
            className={styles.logo}
          />
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>คลินิกเวชกรรม มหาวิทยาลัยรังสิต</span>
            <span className={styles.logoSubtitle}>ระบบยืม-คืน อุปกรณ์การแพทย์</span>
          </div>
        </Link>

        {/* Menu Section */}
        <div className={styles.menuSection}>
          {/* Public Menu */}
          <Link href="/equipment" className={styles.menuItem}>
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>อุปกรณ์ทั้งหมด</span>
          </Link>

          {user && (
            <>
              {/* User Menu */}
              {user.role === 'user' && (
                <>
                  <Link href="/user/borrow" className={styles.menuItem}>
                    <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>ยืมอุปกรณ์</span>
                  </Link>
                  <Link href="/user/history" className={styles.menuItem}>
                    <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>ประวัติการยืม</span>
                  </Link>
                </>
              )}

              {/* Admin Menu */}
              {user.role === 'admin' && (
                <>
                  <Link href="/admin" className={styles.menuItem}>
                    <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/admin/borrow-requests" className={styles.menuItem}>
                    <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>คำขอยืม</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* User Section */}
        <div className={styles.userSection}>
          {user ? (
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>
                  {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
                </span>
              </div>
              <div className={styles.userDropdown}>
                <Link href={user.role === 'admin' ? '/admin/profile' : '/user/profile'} className={styles.dropdownItem}>
                  <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  โปรไฟล์
                </Link>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link href="/login" className={styles.loginButton}>
                เข้าสู่ระบบ
              </Link>
              <Link href="/register" className={styles.registerButton}>
                ลงทะเบียน
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}