import { PostModel } from './../post-input/post.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts!: Array<PostModel> | [];

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.api.getPostsForHomePage().subscribe((data) => {
      // console.log(data);
      this.posts = data;
    });
  }

  likePost(id: string) {
    // console.log(id);
    const username = localStorage.getItem('username');
    this.api.likePost(id, username).subscribe((data) => {
      // console.log(data);
      window.location.reload();
      return data;
    });
  }
}
