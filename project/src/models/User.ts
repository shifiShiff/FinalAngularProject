export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
  }