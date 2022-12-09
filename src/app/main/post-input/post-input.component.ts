import { ApiService } from './../shared/api.service';
import { PostModel } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css'],
})
export class PostInputComponent implements OnInit {
  postForm: any;
  postData: any;
  username: any = localStorage.getItem('username');
  postModel: PostModel = new PostModel();
  err: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    // take post input
    if (localStorage.getItem('email') === null)
      this.router.navigateByUrl('/login');
  }

  setValue() {
    // send form data for post
    this.postModel.postText = this.postData;
    this.postModel.postedBy = this.username;
    this.postThePost();
  }

  // send post to backend
  postThePost() {
    this.api.createPost(this.postModel).subscribe(
      (res) => {
        // console.log(res);
        // return this.router.navigate(['/']);
        return window.location.reload();
      },
      (err) => {
        this.err = err.error;
        // console.log(this.err);
      }
    );
  }
}
