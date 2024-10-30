import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data
  hide = true;//Variable for password's input

  constructor(public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  //Check the account of customer that logginng in
  checkUser(userName, userPassword) {

    let user//Variable store currently logging in customer

    let nameExist = false
    let userExist = false

     //Loop to store the data of customer that logging in to their account
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userName === userName) {
        user = this.userArray[i]
        nameExist = true
        break;
      }
    }

    //If logging in customer exist
    if(nameExist === true) {

      //If the customer's password is correct
      if(user.userPassword === userPassword) {
        userExist = true
      }

      //If the customer's password is incorrect
      else {
        //Noticiation to notify customer that password is incorrect
        this.snackBar.open("Incorrect password", 'Close', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: ['error']
        });
      }
    }

    //If logging in customer does not exist
    else if(nameExist === false) {
      //Noticiation to notify customer that username does not exist
      this.snackBar.open("User's Name does not exist", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['error']
      });
    }

    //Route if customer account validated
    if(userExist === true) {
      this.router.navigate(['/users', user.userId])
    }
  }

}
