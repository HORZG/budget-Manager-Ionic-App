import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  allUsersTab = [];
  foundUser: any = {};
  connectedUser: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(){
    this.router.navigate(['/signup']);
  }
  ngOnInit() {}

  Login(loginForm: NgForm) {
    const login = loginForm.value.email;
    const pwd = loginForm.value.password;

    const hashedPassword = CryptoJS.SHA256(pwd).toString();

    this.userService.allUsers().subscribe({
      next: (response) => {
        
        this.allUsersTab = [];
        for (let key in response) {
          this.allUsersTab.push({ id: key, ...response[key] });
        }

        console.log(this.allUsersTab);

        
        this.foundUser = this.allUsersTab.find(
          (u) => u.Email === login && u.Password === hashedPassword
        );

       
        if (this.foundUser) {
          this.connectedUser = this.foundUser.id;
          console.log('User found:', this.foundUser);

          
          localStorage.setItem('userId', this.connectedUser);

          
          this.router.navigate(['/home']);
        } else {
          console.log('User not found or incorrect password');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
