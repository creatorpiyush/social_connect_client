import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://54.67.127.149.nip.io/api/v1/';

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get(`${this.url}posts`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPostsForHomePage() {
    return this.http
      .get(`${this.url}posts/home/${localStorage.getItem('username')}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getPostById(id: string) {
    return this.http.get(`${this.url}posts/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createPost(post: any) {
    return this.http.post<any>(`${this.url}posts/create`, post).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updatePost(id: string, post: any) {
    return this.http.put(`${this.url}posts/${id}`, post).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deletePost(id: string) {
    return this.http.delete(`${this.url}posts/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // get post from following users
  getFollowingPosts() {
    return this.http.get(`${this.url}posts/following`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // get post from following users
  getFollowingPostsByUserId(id: string) {
    return this.http.get(`${this.url}posts/following/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // like post
  likePost(id: string, username: any) {
    return this.http.put(`${this.url}posts/like/${id}`, { username }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // follow a user
  followUser(username: any, followedUser: any) {
    return this.http
      .put(`${this.url}profile/follow/${username}/${followedUser}`, {})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // unfollow a user
  unfollowUser(username: any, followedUser: any) {
    return this.http
      .put(`${this.url}profile/unfollow/${username}/${followedUser}`, {})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
