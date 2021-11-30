import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseurl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getUsersWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseurl+'admin/users-with-roles');
  }

  updateUserRoles(username:string, roles:string[]){
    return this.http.post(this.baseurl+'admin/edit-roles/'+username +'?roles='+ roles,{});
  }

  getPhotosForApproval(){
    return this.http.get<Photo[]>(this.baseurl+'admin/photos-to-moderate')
  }

  approvePhoto(photoId:number){
    return this.http.post(this.baseurl+'admin/approve-photo/' + photoId,{});
  }

  removePhoto(photoId:number){
    return this.http.post(this.baseurl+'admin/remove-photo/' + photoId,{});
  }
}
