import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAPIService } from '../../services/user-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatButtonModule,MatFormFieldModule
    ,MatInputModule,MatSelectModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  
    signUpForm: FormGroup;
  
    constructor(private fb: FormBuilder, private http: HttpClient,  private userService:UserAPIService ) {
      this.signUpForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        role: ['', Validators.required]
      });
    }
  
    signUp() {
      if (this.signUpForm.valid) {
        this.userService.Sign(this.signUpForm.value)
        
      }
    }
}
