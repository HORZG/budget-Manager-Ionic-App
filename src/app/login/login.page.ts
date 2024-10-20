import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
allUsersTab = [];
foundUser = {};
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
  }

  Login(loginForm:NgForm) {
    

let login = loginForm.value.email;
let pwd = loginForm.value.password;
this.userService.allUsers().subscribe({
  next : (response)=> {
    this.allUsersTab = [];
    for (let key in response ) {
      this.allUsersTab.push({ id: key, ...response[key] });
      
    }
    console.log(this.allUsersTab)
  },
  error : (error)=> {
    console.log(error)
  }
});
 this.foundUser = this.allUsersTab.find(u => u.Email === login && u.Password === pwd)
 if (this.foundUser) {
  console.log('User found:', this.foundUser);
  this.router.navigate(['/home']); 
} else {
  console.log('User not found or incorrect password');
}
  }
}
