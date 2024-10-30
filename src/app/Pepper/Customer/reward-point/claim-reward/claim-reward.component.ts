import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claim-reward',
  templateUrl: './claim-reward.component.html',
  styleUrls: ['./claim-reward.component.scss']
})
export class ClaimRewardComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, 
              public router: Router,
              public actRouter: ActivatedRoute,
              public snackBar: MatSnackBar,) { }

  rewardArray = JSON.parse(localStorage.getItem('rewardItems'))//Array to store reward's data
  userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data

  userId//Variable to store customer's Id capture from route parameter
  user//Variable to store customer's data that want to redeem reward

  imgSource//Store base64 image that has been change to image (sanitized)

  ngOnInit(): void {
    this.userId = parseInt(this.actRouter.snapshot.paramMap.get('userId'))//Capture customer's Id from route paramaeter

    //Loop to store the data of customer that want to redeem reward
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.userId) {
        this.user = this.userArray[i] 
      }
    }
  }

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64(i) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.rewardArray[i].rewardPic}`);
    return this.imgSource
  }

  //Method to update customer's data after redeem reward
  claimReward(reward) {
    //Loop to find customer in customer's array
    for(let i=0; i < this.userArray.length; i++) {
      if(this.user.userId === this.userArray[i].userId) {      
        this.userArray[i].coupon = this.userArray[i].coupon - reward.rewardPrice//Deduct customer's coupon according to the reward's coupon price
        localStorage.setItem('userInfo', JSON.stringify(this.userArray))
      }
    }

    //Notification to notify customer successfully redeem a reward
    this.snackBar.open("successfully redeem the reward!", 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    //Route back to customer's dashboard page
    this.router.navigate(['/users', this.userId])
  }
}
