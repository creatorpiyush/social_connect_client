import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();
  formValue!: FormGroup;
  err: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    // localStorage check
    // console.warn(localStorage.getItem('email'));
    if (localStorage.getItem('email') !== null) {
      this.router.navigate(['/']);
    }

    this.formValue = this.formBuilder.group({
      username: [''],
      password: [''],
    });

    this.formValue.valueChanges.subscribe((data) => {
      this.loginModel.username = data.username;
      this.loginModel.password = data.password;
    });
  }

  login() {
    this.http
      .post('http://54.67.127.149.nip.io/api/v1/users/login', this.loginModel)
      .subscribe(
        (res: any) => {
          // console.warn(res);
          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);
          localStorage.setItem('role', res.role);
          return this.router.navigate(['/']);
        },
        (err) => {
          // console.warn(err);
          this.err = err.error.message;
        }
      );
  }
}
