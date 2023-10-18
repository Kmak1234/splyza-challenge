import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getLoginUser(){
    const loginUserApi = environment.backendUrl + '/api/users/self';
    return this.http.get<User>(loginUserApi).pipe(
      map((loginUser) => {
        localStorage.setItem('loginUser', JSON.stringify(loginUser));
        console.log('user logged in', loginUser);
        return loginUser;
      })
    )
  }

  getActiveUser() {
    const loginUser = localStorage.getItem('loginUser');

    if(loginUser) return JSON.parse(loginUser);
  }
}
