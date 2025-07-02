'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { getUserFromCookie } from '@/lib/utils';
import { User } from '@/types/user';

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = getUserFromCookie();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <Layout role="user">
      <h1>ยินดีต้อนรับ {user?.name || 'ผู้ใช้'}</h1>
      <p>นี่คือหน้าแดชบอร์ดสำหรับผู้ใช้ทั่วไป</p>
    </Layout>
  );
}
