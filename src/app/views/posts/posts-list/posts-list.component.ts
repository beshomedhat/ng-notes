import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  items: any = [];
  constructor(private postsService: PostsService,
     private modelService: NgbModal,
     private toastr: ToastrService
     ) { }

  ngOnInit(): void {
    this.getAll();
  }

  // get all posts
  getAll(){
    this.postsService.getAll().subscribe(res => {
      this.items = res;
    })
  }
  // Delete Item
  deleteItem( id){
    
    this.postsService.delete(id).subscribe(res =>{
      this.toastr.success('Item deleted successfuly', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
      this.getAll();
    },
    err =>{
      this.toastr.error(err.statusText, 'Error', { timeOut: 3000, closeButton: true, progressBar: true});
    }
    )
  }


}
