'use client'

import styles from './my-requests.module.css'
import { useState } from 'react'

const mockRequests = [
  {
    requestId: 'REQ20250702-001',
    equipmentCode: 'BP001',
    equipmentName: 'เครื่องวัดความดันโลหิต',
    status: 'pending',
    borrowDate: '2025-07-03',
    returnDate: '2025-07-07'
  },
  {
    requestId: 'REQ20250701-004',
    equipmentCode: 'TH003',
    equipmentName: 'เครื่องวัดอุณหภูมิ',
    status: 'approved',
    borrowDate: '2025-07-01',
    returnDate: '2025-07-04'
  },
  {
    requestId: 'REQ20250630-002',
    equipmentCode: 'PO012',
    equipmentName: 'เครื่องวัดออกซิเจนในเลือด',
    status: 'rejected',
    borrowDate: '2025-06-30',
    returnDate: '2025-07-02',
    reason: 'ของไม่เพียงพอ'
  }
]

const statusMap = {
  pending: { label: 'รออนุมัติ', color: '#f59e0b' },
  approved: { label: 'อนุมัติแล้ว', color: '#10b981' },
  rejected: { label: 'ปฏิเสธ', color: '#ef4444' }
}

export default function MyRequestsPage() {
  const [requests] = useState(mockRequests)

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📋 คำขอยืมของฉัน</h1>

      {requests.map((req) => (
        <div key={req.requestId} className={styles.card}>
          <div className={styles.row}>
            <strong>📦 {req.equipmentName}</strong>
            <span
              className={styles.badge}
              style={{ backgroundColor: statusMap[req.status].color }}
            >
              {statusMap[req.status].label}
            </span>
          </div>

          <p>รหัสอุปกรณ์: <code>{req.equipmentCode}</code></p>
          <p>📅 รับของ: {req.borrowDate}</p>
          <p>📆 คืนของ: {req.returnDate}</p>

          {req.status === 'rejected' && (
            <p className={styles.reason}>❗ เหตุผล: {req.reason}</p>
          )}

          <hr className={styles.divider} />
          <p className={styles.requestId}>หมายเลขคำขอ: {req.requestId}</p>
        </div>
      ))}
    </div>
  )
}
