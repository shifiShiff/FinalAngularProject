import { Lesson } from "./lesson";


export interface Course {
    id?: number;
    title: string;
    description: string;
    teacherId: number;
    lessons:Lesson[]|null;
  }