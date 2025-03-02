import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Course } from '../../models/Course';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Lesson } from '../../models/lesson';
import { MatListModule } from '@angular/material/list';
import { UserAPIService } from '../../services/user-api.service';
import { CoursesApiService } from '../../services/courses-api.service';

@Component({
  selector: 'app-my-courses',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule
    , MatInputModule, MatSelectModule, MatIconModule, MatExpansionModule, MatListModule
  ],  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {

  user: User | null = null;
  courses: Course[] = [];
  userId: string | null = '';
  lesson: Lesson[] = [];

  constructor(private http: HttpClient, private userService: UserAPIService, private courseService: CoursesApiService) { }


  ngOnInit(): void {

    this.userId = localStorage.getItem("userId");

    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(res => {
        this.user = res;
      })
    }

//לשלוף קורסים לפי הUSERID
    this.courseService.getAllCourses().subscribe({
        next: (courses) => {
          console.log(courses);
          this.courses = courses;
          this.loadlesson();
        },
        error: (err) => {
          console.error('Error fetching courses', err);
        }
      });

  }

  loadlesson() {
    this.courses.forEach(course => {

     this.courseService.getlessons(course.id).subscribe({
        next: (lessons) => {
          course.lessons = lessons; 
        },
        error: (err) => {
          console.error(`Error fetching lessons for course ${course.id}`, err);
        }
      });
    });
  }

}
