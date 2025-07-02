// src/lib/mock-data.ts

import { User } from '@/types/user';
import { Equipment } from '@/types/equipment';
import { BorrowRequest } from '@/types/borrow';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    studentId: '6606276',
    email: '6606276@rsu.ac.th',
    name: 'สมชาย ใจดี',
    role: 'user',
    faculty: 'วิทยาลัยแพทยศาสตร์',
    phone: '0812345678',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    studentId: 'admin',
    email: 'admin@rsu.ac.th',
    name: 'แอดมิน ระบบ',
    role: 'admin',
    faculty: 'สำนักงานสวัสดิการสุขภาพ',
    phone: '0898765432',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    studentId: '6606277',
    email: '6606277@rsu.ac.th',
    name: 'สมหญิง รักเรียน',
    role: 'user',
    faculty: 'คณะพยาบาลศาสตร์',
    phone: '0856789012',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

// Mock Equipment
export const mockEquipment: Equipment[] = [
  {
    id: '1',
    code: 'BP001',
    name: 'เครื่องวัดความดันโลหิต',
    category: 'เครื่องวัดสัญญาณชีพ',
    description: 'เครื่องวัดความดันแบบดิจิตอล ยี่ห้อ Omron',
    status: 'available',
    location: 'ตู้ A1 ชั้น 2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    code: 'ST001',
    name: 'หูฟังแพทย์ (Stethoscope)',
    category: 'อุปกรณ์ตรวจร่างกาย',
    description: 'หูฟังแพทย์ Littmann Classic III',
    status: 'borrowed',
    location: 'ตู้ B1 ชั้น 1',
    borrowedBy: '6606276',
    borrowedDate: new Date('2024-12-20'),
    expectedReturnDate: new Date('2024-12-27'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-20')
  },
  {
    id: '3',
    code: 'TH001',
    name: 'ปรอทวัดไข้ดิจิตอล',
    category: 'เครื่องวัดสัญญาณชีพ',
    description: 'ปรอทวัดไข้แบบดิจิตอล วัดทางหน้าผาก',
    status: 'available',
    location: 'ตู้ A1 ชั้น 1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    code: 'OX001',
    name: 'เครื่องวัดออกซิเจนปลายนิ้ว',
    category: 'เครื่องวัดสัญญาณชีพ',
    description: 'Pulse Oximeter สำหรับวัด SpO2',
    status: 'maintenance',
    location: 'ตู้ A1 ชั้น 3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-15')
  },
  {
    id: '5',
    code: 'CR001',
    name: 'ไม้ค้ำยัน (Crutches)',
    category: 'อุปกรณ์ช่วยเดิน',
    description: 'ไม้ค้ำยันอลูมิเนียม ปรับระดับได้',
    status: 'available',
    location: 'ห้องเก็บอุปกรณ์ใหญ่',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Mock Borrow Requests
export const mockBorrowRequests: BorrowRequest[] = [
  {
    id: '1',
    studentId: '6606276',
    studentName: 'สมชาย ใจดี',
    equipmentCode: 'ST001',
    equipmentName: 'หูฟังแพทย์ (Stethoscope)',
    borrowDate: new Date('2024-12-20'),
    expectedReturnDate: new Date('2024-12-27'),
    purpose: 'ใช้ในการฝึกปฏิบัติวิชา Physical Examination',
    status: 'borrowed',
    approvedBy: 'admin',
    approvedDate: new Date('2024-12-20'),
    createdAt: new Date('2024-12-19'),
    updatedAt: new Date('2024-12-20')
  },
  {
    id: '2',
    studentId: '6606277',
    studentName: 'สมหญิง รักเรียน',
    equipmentCode: 'BP001',
    equipmentName: 'เครื่องวัดความดันโลหิต',
    borrowDate: new Date('2024-12-22'),
    expectedReturnDate: new Date('2024-12-29'),
    purpose: 'ใช้ในการทำ Project วิชา Community Nursing',
    status: 'pending',
    createdAt: new Date('2024-12-22'),
    updatedAt: new Date('2024-12-22')
  },
  {
    id: '3',
    studentId: '6606277',
    studentName: 'สมหญิง รักเรียน',
    equipmentCode: 'TH001',
    equipmentName: 'ปรอทวัดไข้ดิจิตอล',
    borrowDate: new Date('2024-12-15'),
    expectedReturnDate: new Date('2024-12-18'),
    actualReturnDate: new Date('2024-12-18'),
    purpose: 'ใช้ในกิจกรรมออกหน่วยแพทย์',
    status: 'returned',
    approvedBy: 'admin',
    approvedDate: new Date('2024-12-15'),
    createdAt: new Date('2024-12-14'),
    updatedAt: new Date('2024-12-18')
  }
];

// Helper functions to get data
export const getUserByStudentId = (studentId: string): User | undefined => {
  return mockUsers.find(user => user.studentId === studentId);
};

export const getEquipmentByCode = (code: string): Equipment | undefined => {
  return mockEquipment.find(equipment => equipment.code === code);
};

export const getBorrowRequestsByStudentId = (studentId: string): BorrowRequest[] => {
  return mockBorrowRequests.filter(request => request.studentId === studentId);
};

export const getPendingBorrowRequests = (): BorrowRequest[] => {
  return mockBorrowRequests.filter(request => request.status === 'pending');
};