import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: any = false;

  username: any = localStorage.getItem('username');

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.isLogin = true;
    }
  }

  userPage(username: any) {
    window.location.href = `http://54.67.127.149.nip.io:4200/users/${username}`;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
