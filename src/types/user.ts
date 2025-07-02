// src/types/user.ts

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  studentId: string;
  email: string;
  name: string;
  role: UserRole;
  faculty: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  studentId: string;
  password: string;
}

export interface RegisterData {
  title: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  faculty: string;
  status: string;
  gender: string;
  password: string;
}