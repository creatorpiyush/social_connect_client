import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersData: any = null;
  username: any = localStorage.getItem('username');
  isFollower: any = false;
  userToShow: any = null;
  apiUrl = environment.apiUrl;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') === null)
      this.router.navigateByUrl('/login');

    return this.users();
  }

  users() {
    this.http
      .get(`${this.apiUrl}/api/v1/users/`)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
      .subscribe((res: any) => {
        this.usersData = res;

        return this.router.navigateByUrl(`/users`);
      });
  }

  // follow user
  followUser(followedUser: any) {
    this.apiService
      .followUser(this.username, followedUser)
      .subscribe((res: any) => {
        window.location.reload();
        return;
      });
  }

  // unfollow user
  unfollowUser(followedUser: any) {
    this.apiService
      .unfollowUser(this.username, followedUser)
      .subscribe((res: any) => {
        window.location.reload();
        return;
      });
  }
}
