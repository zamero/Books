import { User } from '../types/index.js';
import bcrypt from 'bcryptjs';

export const sampleUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    password: await bcrypt.hash('password123', 10),
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date('2024-01-01'),
    isActive: true
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    password: await bcrypt.hash('password123', 10),
    firstName: 'Jane',
    lastName: 'Smith',
    createdAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '3',
    email: 'admin@library.com',
    password: await bcrypt.hash('admin123', 10),
    firstName: 'Library',
    lastName: 'Admin',
    createdAt: new Date('2024-01-01'),
    isActive: true
  }
];