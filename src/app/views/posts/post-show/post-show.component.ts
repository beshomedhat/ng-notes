import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import {ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {
  itemId;
  itemDetails = {};
  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //get item data id
    this.route.params.subscribe(params => {
      this.itemId=params.id;
      this.postsService.getItem(params.id).subscribe(res =>{
        this.itemDetails = res;  
      });
    });
  }
  // Delete Item
  deleteItem( id){
    
    this.postsService.delete(id).subscribe(res =>{
      this.toastr.success('Item deleted successfuly', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
      this.router.navigate(['../admin/posts'])
    },
    err =>{
      this.toastr.error(err.statusText, 'Error', { timeOut: 3000, closeButton: true, progressBar: true});
    }
    )
  }

}
