// src/types/equipment.ts

export type EquipmentStatus = 'available' | 'borrowed' | 'maintenance' | 'damaged';

export interface Equipment {
  id: string;
  code: string;           // เช่น BP001
  name: string;           // ชื่ออุปกรณ์
  category: string;       // หมวดหมู่
  description?: string;   // รายละเอียด
  image?: string;         // รูปภาพ
  status: EquipmentStatus;
  location?: string;      // ตำแหน่งที่เก็บ
  borrowedBy?: string;    // studentId ของผู้ยืม
  borrowedDate?: Date;    // วันที่ยืม
  expectedReturnDate?: Date; // วันที่ต้องคืน
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  description?: string;
}