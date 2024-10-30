import { UserService } from './../../Service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessengerService } from '../../Service/messenger.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {

  userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data
  addUserForm: FormGroup//FormBuilder to add new User

  //Variable for password's input
  hide = true;
  hide1 = true;
  hide2 = true;

  //Variable to store condition for login and registration error's notification
  loginAlert = false
  passwordAlert = false
  registerAlert = false
  passwordSame = true

  constructor(public msg: MessengerService, 
              private userService: UserService,
              private fb: FormBuilder, 
              public router: Router, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.addUser()//Initialize add Customer form
  }

  //Form to add Customer
  addUser() {
    this.addUserForm = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')),
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      coupon: 0,
      stampCard: 0,
    });
  }

  //Method to check if customer is exist during login 
  checkUser(userName, userPassword) {

    let user//Variable store currently logging in customer

    let userExist = false
    let nameExist = false
    this.passwordAlert = false
    this.loginAlert = false

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
        this.passwordAlert = true
        console.log(this.passwordAlert);
      }
    }

    //If logging in customer does not exist
    else if(nameExist === false) {
      this.loginAlert = true
    }

    //Process if customer's name exist and password matched
    if(userExist === true) {
      this.dialog.closeAll()
      this.msg.sendUserId(user.userId)//Call method from service to pass customer's Id
      this.router.navigateByUrl('/checkout')
    }
  }

  //Method to check if new customer is available during registration  
  onSubmit(rePassword) {
    let userExist = false
    this.registerAlert = false
    this.passwordSame = true

    //Loop to check if new customer's name has already been taken
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userName === this.addUserForm.get('userName').value) {
        userExist = true
        break;
      }
    }

    //If customer's name has already been taken
    if(userExist === true) {
      this.registerAlert = true
    }

    //Check if new password and confirmation password(re enter password) match
    else if(this.addUserForm.get('userPassword').value != rePassword) {
      this.passwordSame = false
    }

    //Process if new customer's name is available and new password match confirmation password(re enter password)
    else{
      this.registerAlert = false

      this.userService.addUser(this.addUserForm.value)//Call method form service to add new customer
      this.dialog.closeAll()
      this.msg.sendUserId(this.addUserForm.get('userId').value)//Call method from service to pass customer's Id

      //Update latest customer's Id for new customer
      let userId = JSON.parse(localStorage.getItem('userId')) + 1 
      localStorage.removeItem('userId')
      localStorage.setItem('userId',userId.toString())

      this.router.navigateByUrl('/checkout')
    }
  }

}
