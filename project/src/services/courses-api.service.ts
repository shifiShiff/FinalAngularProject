import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesApiService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http:HttpClient) { }


  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:3000/api/courses');
  
  }
  
  

  getlessons(courseId:number|undefined){
    return this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`)

  }
  
  addCourse(data:any){
    return this.http.post('http://localhost:3000/api/courses',data)

  }
  
}
