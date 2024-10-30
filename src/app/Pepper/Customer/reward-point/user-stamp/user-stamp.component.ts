import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { UserService } from './../../../Service/user.service';
import { PepperService } from 'src/app/Pepper/Service/pepper.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchasedDetailsDialogComponent } from 'src/app/Pepper/Admin/purchased-pepper/purchased-details-dialog/purchased-details-dialog.component';

@Component({
  selector: 'app-user-stamp',
  templateUrl: './user-stamp.component.html',
  styleUrls: ['./user-stamp.component.scss']
})
export class UserStampComponent implements OnInit {

  userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data
  purchasedPepper = JSON.parse(localStorage.getItem('purchasedPepper'))//Array to store purchased peppers' data
  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store peppers' data

  userId = 0//Variable to store customer's Id capture from route parameter
  custSession//Variable to store customer's data that access their dashboard page
  index////Variable to store customer's index in array that store all customer'data

  editUserForm: FormGroup//FormBuilder to edit Customer

  //Variable for password's input
  hide1 = true;
  hide2 = true;

  nameExist = false//Variable to store condition if customer's new name has already exist 

  constructor(public router: Router, 
              public snackBar: MatSnackBar, 
              public dialog: MatDialog, 
              public actRouter:ActivatedRoute,
              private fb: FormBuilder,
              public pepper: PepperService,
              public userService: UserService,
              public msg: MessengerService) {}

  ngOnInit(): void {
    this.userId = parseInt(this.actRouter.snapshot.paramMap.get('userId'))//Capture customer's Id from route paramaeter

    //Loop to store the data of customer that access their dashboard page
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.userId) {
        this.custSession = this.userArray[i]
      }
    }

    //Method to filter purchased pepper data according to the buyer/customer Id
    this.purchasedPepper = this.purchasedPepper.filter(item => 
      item.userId === this.userId
    );

    this.editUser()//Initialize edit Customer form
  }

  //Method if customer convert their point to coupon
  redeemCoupon() {
    
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.userId) {
        this.userArray[i].stampCard = this.userArray[i].stampCard  - 10//Update customer's point
        this.userArray[i].coupon++//Update customer's coupon
      }
    }

    localStorage.setItem('userInfo', JSON.stringify(this.userArray))

    //Notify customer that coupon has been successfully claimed
    this.snackBar.open('Successfully Claimed your Coupon!', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    //Reload component to make sure data updated
    this.msg.reloadComponent()
  }

  //Route customer to page that display all available reward
  claimReward() {
    this.router.navigate(['/claimReward', this.userId])
  }

  //Method to get the name of pepper purchased by customer based on its Id
  getPepperName(pepperId) {
    for(let i=0; i<this.pepperArray.length;i++) {
      if(this.pepperArray[i].pepperId === pepperId) {
        return this.pepperArray[i].pepperName
      }
    }
  }

  //Form to edit Customer
  editUser() {
    this.editUserForm = this.fb.group({
      userId: this.custSession.userId,
      userName: [this.custSession.userName, Validators.required],
      userPassword: [this.custSession.userPassword, Validators.required],
      coupon: this.custSession.coupon,
      stampCard: this.custSession.stampCard,
    });
  }

  //Method to open dialog that display details of purchased pepper
  openDetails(purchasedId, pepperId, userId) {
    let dialogRef = this.dialog.open(PurchasedDetailsDialogComponent, {
      //Pass the pepper chosen and its index in the pepper array
      data: {purchasedId, pepperId, userId},
      autoFocus: false,
      maxHeight: '90vh', 
      panelClass: 'custom-dialog-container'
    });
  }

  //Method to send forms to service to update customer's data
  onSubmit(rePassword) {
    let userExist = false

    //Loop to check if new customer's data has already been used
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userName === this.editUserForm.get('userName').value && this.editUserForm.get('userName').value != this.custSession.userName) {
        userExist = true
        break;
      }
    }

    //Notification if the customer's name has been taken
    if(userExist === true) {
      this.snackBar.open("This name already taken", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['error']
      });
    }

    //Notification if new password does not match with confirmation password(re enter password)
    else if(this.editUserForm.get('userPassword').value != rePassword) {
      this.snackBar.open("Password does not match!", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['error']
      });
    }

    //If new customer's name is available
    else{
      this.nameExist = false

      //Loop to to retrieve customer index in array that store all customer's data
      for(let i=0; i<this.userArray.length; i++) {
        if(this.userArray[i].userId === this.custSession.userId) {
          this.index = i
        }
      }
      this.userService.updateUser(this.userArray, this.index, this.editUserForm)//Call method from service to update Customer's data

      //Notification to notify customer that data has been updated
      this.snackBar.open("Successfuly update information!", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['add']
      });

      //Reload component to make sure data updated
      this.msg.reloadComponent()
    }
  }

}
