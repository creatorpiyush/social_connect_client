import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: any = false;

  apiUrl = environment.apiUrl;

  username: any = localStorage.getItem('username');

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.isLogin = true;
    }
    console.log(this.apiUrl);
  }

  userPage(username: any) {
    window.location.href = `/users/${username}`;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
