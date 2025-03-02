import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Course } from '../../models/Course';
import { CoursesApiService } from '../../services/courses-api.service';

@Component({
  selector: 'app-course-syllabus',
  imports: [MatExpansionModule,MatListModule],
  templateUrl: './course-syllabus.component.html',
  styleUrl: './course-syllabus.component.css'
})
export class CourseSyllabusComponent implements OnInit {
  list: Course[] = [];
  constructor(private courseService:CoursesApiService){}

  ngOnInit(): void {

    this.loadcourses();
  }

  loadcourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        console.log(courses);
        this.list = courses;
        this.loadlesson();
      },
      error: (err) => {
        console.error('Error fetching courses', err);
      }
    });
  }

  loadlesson() {
    this.list.forEach(course => {

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
