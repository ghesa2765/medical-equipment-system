export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const;

export const EQUIPMENT_STATUS = {
  AVAILABLE: 'available',
  BORROWED: 'borrowed',
  MAINTENANCE: 'maintenance',
  DAMAGED: 'damaged'
} as const;

export const BORROW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  BORROWED: 'borrowed',
  RETURNED: 'returned',
  OVERDUE: 'overdue'
} as const;

export const EQUIPMENT_CATEGORIES = [
  { id: '1', name: 'เครื่องวัดสัญญาณชีพ', description: 'อุปกรณ์วัดความดัน ชีพจร อุณหภูมิ' },
  { id: '2', name: 'อุปกรณ์ตรวจร่างกาย', description: 'หูฟัง ไฟฉาย ค้อนเคาะ' },
  { id: '3', name: 'อุปกรณ์ทำแผล', description: 'ชุดทำแผล กรรไกร ปากคีบ' },
  { id: '4', name: 'อุปกรณ์ช่วยเดิน', description: 'ไม้เท้า ไม้ค้ำ วอล์คเกอร์' },
  { id: '5', name: 'อุปกรณ์ฉุกเฉิน', description: 'ถังออกซิเจน เครื่อง AED' }
];

export const STATUS_COLORS = {
  equipment: {
    available: 'bg-green-100 text-green-800',
    borrowed: 'bg-yellow-100 text-yellow-800',
    maintenance: 'bg-orange-100 text-orange-800',
    damaged: 'bg-red-100 text-red-800',
  },
  borrow: {
    pending: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    borrowed: 'bg-yellow-100 text-yellow-800',
    returned: 'bg-gray-100 text-gray-800',
    overdue: 'bg-red-100 text-red-800',
  }
};

export const STATUS_TEXT = {
  equipment: {
    available: 'ว่าง',
    borrowed: 'ถูกยืม',
    maintenance: 'ซ่อมบำรุง',
    damaged: 'ชำรุด',
  },
  borrow: {
    pending: 'รออนุมัติ',
    approved: 'อนุมัติแล้ว',
    rejected: 'ไม่อนุมัติ',
    borrowed: 'กำลังยืม',
    returned: 'คืนแล้ว',
    overdue: 'เกินกำหนด',
  }
};
