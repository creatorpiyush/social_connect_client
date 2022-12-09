import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterModel } from './register.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerModel: RegisterModel = new RegisterModel();
  formValue!: FormGroup;
  err: any = null;

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) this.router.navigateByUrl('/');

    this.formValue = this.FormBuilder.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
      firstName: [''],
      lastName: [''],
      username: [''],
    });

    this.formValue.valueChanges.subscribe((data) => {
      this.registerModel.email = data.email;
      this.registerModel.password = data.password;
      this.registerModel.confirmPassword = data.confirmPassword;
      this.registerModel.firstName = data.firstName;
      this.registerModel.lastName = data.lastName;
      this.registerModel.username = data.username;
    });
  }

  register() {
    this.http
      .post('http://54.67.127.149.nip.io:4000/api/v1/users/register', this.registerModel)
      .subscribe((res: any) => {
        // console.log(res);
        this.router.navigateByUrl('/login');
      });
  }
}
