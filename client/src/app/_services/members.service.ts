import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

//Get token from localStorage
const httpOptions = {
  headers: new HttpHeaders({
    Authorization :"Bearer " + JSON.parse(localStorage.getItem("user"))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  //this is api so we need HttpClient
  constructor(private http: HttpClient) { }

  getMembers() {
    //Return member array
    return this.http.get<Member[]>(this.baseUrl + "users", httpOptions)
  }
  getMember(username) {
    return this.http.get<Member>(this.baseUrl + "users/" + username, httpOptions) //httpOptions is the
  }
}
