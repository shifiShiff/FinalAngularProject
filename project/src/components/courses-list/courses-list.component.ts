import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../../models/Course';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoursesApiService } from '../../services/courses-api.service';

@Component({
  selector: 'app-courses-list',
  imports: [MatCardModule,MatExpansionModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit{
list:Course[]=[];
constructor(private http :HttpClient,private CourseService:CoursesApiService){
  
}
  ngOnInit(): void {
    
    // this.http.get<Course[]>('http://localhost:3000/api/courses').subscribe(c=>{
    //   this.list=c;
    //  });
   this.CourseService.getAllCourses().subscribe(res=>{
      this.list=res;
     });
    }

    JoinCourse(id:number| undefined){
    const userId=localStorage.getItem('userId')
    this.CourseService.joinCourse(id,userId).subscribe({
      next:res=>{
        console.log("Joined course successfully");
        alert('Joined course successfully')
        
      },
      error: err=>{
        alert('Joined course failed, You are already registered for this course.')
      }
      
    });
    }


    LeaveCourse(id:number| undefined){
      const userId=localStorage.getItem('userId')
      this.CourseService.leaveCourse(id,userId).subscribe({
        next:res=>{
          console.log("unenroll course successfully");
          alert('unenroll course successfully')
          
        },
        error: err=>{
          alert('leave course failed, You are dont register to for this course.')
        }

      });
      }

}
