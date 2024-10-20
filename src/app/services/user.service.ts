import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = "https://gbudget-f4cef-default-rtdb.firebaseio.com/users.json"
  constructor(private http:HttpClient) { }


  SignUp(newUser){
    return this.http.post(this.userURL,newUser)
  }

getUserById(userId){
return this.http.get(`https://gbudget-f4cef-default-rtdb.firebaseio.com/${userId}/users.json`);

}

  Login(user){
return this.http.post(this.userURL+"/user", user)
  }


  allUsers (){
    return this.http.get('https://gbudget-f4cef-default-rtdb.firebaseio.com/users.json')
  }
}
