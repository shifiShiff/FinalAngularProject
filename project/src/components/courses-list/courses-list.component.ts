import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../../models/Course';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-courses-list',
  imports: [MatCardModule,MatExpansionModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit{
list:Course[]=[];
constructor(private http :HttpClient){
  
}
  ngOnInit(): void {
    
    this.http.get<Course[]>('http://localhost:3000/api/courses').subscribe(c=>{
      this.list=c;
     });
    }

    JoinCourse(id:number| undefined){
    const userId=localStorage.getItem('userId')
    this.http.post(`http://localhost:3000/api/courses/${id}/enroll`,{userId}).subscribe({
      next:res=>{
        console.log("Joined course successfully");
        
      },
      error: err=>{
        alert('Joined course failed, You are already registered for this course.')
      }

     
    });
    }

}
