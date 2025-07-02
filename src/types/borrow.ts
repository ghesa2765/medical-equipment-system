// src/types/borrow.ts

export type BorrowStatus = 'pending' | 'approved' | 'rejected' | 'borrowed' | 'returned' | 'overdue';

export interface BorrowRequest {
  id: string;
  studentId: string;
  studentName: string;
  equipmentCode: string;
  equipmentName: string;
  borrowDate: Date;
  expectedReturnDate: Date;
  actualReturnDate?: Date;
  purpose: string;
  status: BorrowStatus;
  approvedBy?: string;
  approvedDate?: Date;
  rejectedReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReturnRequest {
  id: string;
  borrowRequestId: string;
  studentId: string;
  equipmentCode: string;
  returnDate: Date;
  condition: 'good' | 'damaged' | 'lost';
  notes?: string;
  confirmedBy?: string;
  confirmedDate?: Date;
  status: 'pending' | 'confirmed' | 'rejected';
}