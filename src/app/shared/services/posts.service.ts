import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 

  constructor(private http: HttpClient) { }

  // Get All Items
  getAll(){
    return this.http.get(`${ environment.apiUrl }/posts`);
  }
  // Delete Item
  delete(id){
    return this.http.delete(`${ environment.apiUrl }/posts/${id}`);
  }
  //add new item

  add(data){
    return this.http.post(`${ environment.apiUrl }/posts`,data);
  }
  //get item

  getItem(id){
    return this.http.get(`${ environment.apiUrl }/posts/${id}`);
  }

  //update new item

  update(data, id){
    return this.http.put(`${ environment.apiUrl }/posts/${id}`,data);
  }


}
