import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { SignInService } from '../sign-in.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit{
  darkMode: boolean = false
  hide: boolean = true
  constructor(private formBuilder: FormBuilder, public http: HttpClient, private router: Router, public signInService: SignInService, private themeService: ThemeService) { }
  signinForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  checkForm: FormGroup = this.formBuilder.group({
    remember: false
  })

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((themeStatus: boolean) => {
      this.darkMode = themeStatus
    }); 
  }

  signIn() {
      if(!this.signinForm.invalid) {
        const userSignIn = {
          email: this.signinForm.get('email')!.value, 
          password: this.signinForm.get('password')!.value
      }
      console.log(userSignIn)
      
      this.http.post<{ token : string }>('http://localhost:8080/api/signin', userSignIn).subscribe({
        next: response => {
          console.log('Backend successfully reached: ', response)
          const token = response.token
          if(this.checkForm.get('remember')!.value === true) {
            localStorage.setItem('token', token)
          }
          this.signInService.signIn()
          this.signInService.setEmail(this.signinForm.get('email')!.value)
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: err => {
          console.error('Error: ', err)

          if(err.error.error === "could not find email") {
            this.signinForm.get('email')!.setErrors({
              'invalidEmail': true
            })
          }
          else if(err.error.error === "wrong password") {
            this.signinForm.get('password')!.setErrors({
              'incorrectPassword': true
            })
          }
        }
      });
    }
  }
}
