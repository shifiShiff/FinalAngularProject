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
  getAllStudentCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`http://localhost:3000/api/courses/student/${localStorage.getItem('userId')}`);
  
  }
  
  

  getlessons(courseId:number|undefined){
    return this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`)

  }
  
  addCourse(data:any){
    return this.http.post('http://localhost:3000/api/courses',data)

  }

  updateCourse(updateData:any,selctedCours:number|undefined|null ){
    return this.http.put(`http://localhost:3000/api/courses/${selctedCours}`, updateData, {

    })
  }

  deleteCourse(id:number|undefined){
    return this.http.delete(`http://localhost:3000/api/courses/${id}`, {

    })
  }

  addlesson(updateData:any,selctedCours:number|undefined|null){
    return this.http.post(`http://localhost:3000/api/courses/${selctedCours}/lessons`, updateData, {

    })
  }

  updateLesson(updateData:any,selctedCours:number|undefined|null,selectedlesson:number|undefined|null){
   return this.http.put(`http://localhost:3000/api/courses/${selctedCours}/lessons/${selectedlesson}`, updateData, {

    })
  }

  deleteLesson(Cid:number|undefined,Lid:number|undefined){
   return this.http.delete(`http://localhost:3000/api/courses/${Cid}/lessons/${Lid}`, {

    })
  }

  joinCourse(id:number| undefined, userId:string|null){
   return this.http.post(`http://localhost:3000/api/courses/${id}/enroll`,{userId})
  }

  leaveCourse(id:number| undefined, userId:string|null){
    return this.http.delete(`http://localhost:3000/api/courses/${id}/unenroll`,{body: {userId}})
   }
}
