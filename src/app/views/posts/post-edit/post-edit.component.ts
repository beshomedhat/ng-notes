import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  editForm: FormGroup;
  submitted: boolean;
  itemId;
  itemDetails = {};
  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    
    this.buildEditForm();
    //get item data id
    this.route.params.subscribe(params => {
      this.itemId=params.id;
      this.postsService.getItem(params.id).subscribe(res =>{
        this.itemDetails = res;  
      });
    });
    
  }
  // to access inputs
  get f(){ return this.editForm.controls; }
  buildEditForm(){
    this.editForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.editForm.invalid)
    {
      return this.toastr.error("enter your data", 'Error', { timeOut: 3000, closeButton: true, progressBar: true});
    }
    this.postsService.update(this.editForm.value, this.itemId).subscribe(
      res =>{
      this.toastr.success('Item updated successfuly', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
      this.router.navigate(['../admin/posts'])
    },
    err =>{
      this.toastr.error(err.statusText, 'Error', { timeOut: 3000, closeButton: true, progressBar: true});
    });    
  }

}
