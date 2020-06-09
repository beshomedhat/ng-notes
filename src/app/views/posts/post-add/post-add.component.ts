import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean;
  constructor(private postsService: PostsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router:Router
    ) { }

  ngOnInit(){
    this.buildAddForm();
  }

  onSubmit(){
    this.submitted = true;

    if(this.addForm.invalid)
    {
      return this.toastr.error("enter your data", 'Error', { timeOut: 3000, closeButton: true, progressBar: true});
    }
    this.postsService.add(this.addForm.value).subscribe(
      res =>{
      this.toastr.success('Item added successfuly', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
      this.router.navigate(['../admin/posts'])
    },
    err =>{
      this.toastr.error(err.statusText, 'Error', { timeOut: 3000, closeButton: true, progressBar: true});
    });

  }
  // to access inputs
  get f(){ return this.addForm.controls; }


  buildAddForm(){
    this.addForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

}
