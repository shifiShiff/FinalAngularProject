import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { Course } from '../../models/Course';
import { CoursesApiService } from '../../services/courses-api.service';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [CommonModule, MatListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatExpansionModule],
  templateUrl: './teacher-page.component.html',
  styleUrl: './teacher-page.component.css'
})
export class TeacherPageComponent implements OnInit {

  list: Course[] = [];
  showFormAdd: boolean = false;
  showFormUpdate: boolean = false;
  selctedCours: number | null | undefined = null;
  courseForm!: FormGroup;
  index: number = 0;
  ShowAddLesson: boolean = false;
  ShowUpdateLesson:boolean=false;
  selectedlesson: number | null | undefined = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private courseService: CoursesApiService) {

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
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


  addCourse() {
    if (this.courseForm.valid) {
      // this.http.post('http://localhost:3000/api/courses', this.courseForm.value, {

      // }).subscribe({
      //   next: res =>{ console.log('Success:', res),
      //     this.loadcourses();
      //     this.courseForm.reset();

      //   },
      //   error: err => console.error('Error:', err)
      // });
      // this.showFormAdd = false
      
      this.courseService.addCourse(this.courseForm.value).subscribe({
        
          next: res =>{ console.log('Success:', res),
            this.loadcourses();
            this.courseForm.reset();
  
          },
          error: err => console.error('Error:', err)
        });
        this.showFormAdd = false

    }
  }

  UpdateForm(id: number | undefined) {
    this.selctedCours = id;
    this.showFormUpdate = true;


  }

  updateCourse() {
    if (this.courseForm.valid) {
      const updateData = {
        ...this.courseForm.value,
        teacherId: localStorage.getItem('userId')
      };
      this.http.put(`http://localhost:3000/api/courses/${this.selctedCours}`, updateData, {

      }).subscribe({
        next: res => {
          console.log('Success:', res),
          this.courseForm.reset();
          this.loadcourses();

        },
        error: err => console.error('Error:', err)
      });
      this.showFormUpdate = false
      this.selctedCours = null;

    }

  }


  deleteCourse(id: number | undefined) {

    this.http.delete(`http://localhost:3000/api/courses/${id}`, {

    }).subscribe({
      next: res => {
        console.log('Success:', res),
        this.loadcourses();

      },
      error: err => console.error('Error:', err)
    });

  }


  ShowAddlessonForm(id: number | undefined) {
    this.ShowAddLesson = true;
    this.selctedCours = id;
  }

  AddlessonForm() {

    if (this.courseForm.valid) {

      const updateData = {
        // ...this.courseForm.value,
        title: this.courseForm.value.title,
        content: this.courseForm.value.description
      };

      this.http.post(`http://localhost:3000/api/courses/${this.selctedCours}/lessons`, updateData, {

      }).subscribe({
        next: res => {
          console.log('Success:', res),
          this.courseForm.reset();
          this.loadcourses();

        },
        error: err => console.error('Error:', err)
      });
      this.ShowAddLesson = false
      this.selctedCours = null;

    }
  }




  UpdateFormlesson(Cid: number | undefined, Lid:number | undefined) {
    this.selctedCours = Cid;
    this.selectedlesson=Lid
    this.ShowUpdateLesson = true;


  }

  updatelesson() {
    if (this.courseForm.valid) {
      const updateData = {
        title: this.courseForm.value.title,
        content: this.courseForm.value.description,
        courseId:this.selctedCours
      };
      this.http.put(`http://localhost:3000/api/courses/${this.selctedCours}/lessons/${this.selectedlesson}`, updateData, {

      }).subscribe({
        next: res => {
          console.log('Success:', res),
          this.courseForm.reset();
          this.loadcourses();

        },
        error: err => console.error('Error:', err)
      });
      this.ShowUpdateLesson = false
      this.selctedCours = null;
      this.selectedlesson = null;

    }

  }

  deletelesson(Cid: number | undefined,Lid: number | undefined) {

    this.http.delete(`http://localhost:3000/api/courses/${Cid}/lessons/${Lid}`, {

    }).subscribe({
      next: res => {
        console.log('Success:', res),
        this.loadcourses();

      },
      error: err => console.error('Error:', err)
    });

  }

}

