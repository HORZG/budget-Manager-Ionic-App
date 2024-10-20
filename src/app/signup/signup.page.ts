import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

const password = 'your-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit() {
  }


  SignUp(SignUpForm:NgForm){

    
let p1 = SignUpForm.value.password1 ;
let p2 = SignUpForm.value.password2 ;
let  FirstName = SignUpForm.value.firstname 
let LastName = SignUpForm.value.lastname 
let email = SignUpForm.value.email


    if (p1 === p2) {

const hashedPassword = CryptoJS.SHA256(p1).toString(); console.log('Hashed Password:', hashedPassword);
    let newUser = {
    Firstname : FirstName,
    Lastname : LastName,
    Email : email,
    Password : hashedPassword,
    }
    const userPayload = { ...newUser };
    console.log(userPayload)

    this.userService.SignUp(userPayload).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error) =>{
        console.log(error)
      }
    })
    alert('Registred')
    SignUpForm.reset();
  }
  else {
    alert('Password doesn t match');
  }

}

}
