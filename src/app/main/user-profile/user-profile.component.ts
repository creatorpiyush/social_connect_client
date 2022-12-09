import { ApiService } from './../shared/api.service';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: any = localStorage.getItem('username');
  userData: any = null;
  userToShow: any = null;
  isFollower: any = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') === null)
      this.router.navigateByUrl('/login');
    this.route.params.subscribe((params) => {
      this.userToShow = params['username'];
    });

    return this.userProfile(this.userToShow);
  }

  userProfile(username: any) {
    this.http
      .get(`http://54.67.127.149.nip.io:4000/api/v1/profile/${username}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
      .subscribe((res: any) => {
        this.userData = res;
        if (this.username !== this.userToShow) {
          if (this.isFollowing(this.username)) {
            this.isFollower = true;
          }
        }

        return this.router.navigateByUrl(`/users/${username}`);
      });
  }

  // check if user is following
  isFollowing(followedUser: any) {
    return (
      this.userData?.followers?.find(
        (user: any) => user.username === followedUser
      ).username === followedUser
    );
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
