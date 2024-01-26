import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidator } from "../../validators/confirm-password"
import { NgIf } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});
  data: any
  fetchErrorMsg: string = ''

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword')
      });


  }

  handleReactiveForm() {
    if (this.myForm.valid) {
      this.authService.signup(this.myForm.value).subscribe(
        data => {
          this.data = data
          this.fetchErrorMsg = ''
          this.router.navigate(['/login']);
        },
        error => {
          this.fetchErrorMsg = error.error.error.msg
        });
    } else {
      console.log("Form is invalid");
    }
  }
}
