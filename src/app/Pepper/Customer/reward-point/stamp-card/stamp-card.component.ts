import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})
export class StampCardComponent implements OnInit {

  public userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data
  public stampAvailable = JSON.parse(localStorage.getItem('stampAvailable'))//Array to store stamp/QR Code's data

  stampId = 0//Variable to store currently scanned QR Code's Id
  stampClaimed = false//Variable to store condition if the QR Code scanned has already been scanned or not

  constructor(public router: Router, public actRouter: ActivatedRoute, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.stampId = parseInt(this.actRouter.snapshot.paramMap.get('stampId'))//Capture stamp/QR Code's Id from route paramaeter
    
    //Loop to check availability of the QR Code scanned
    for(let i=0; i<this.stampAvailable.length; i++) {

      //Find stamp/QR Code's Id in array that store available stamp/QR Code
      if(this.stampAvailable[i].stampId === this.stampId) {

        for(let j=0; j<this.userArray.length; j++) {
          if(this.userArray[j].userId === this.stampAvailable[i].userId) {

            //Give point to customer that scanned the QR Code
            this.userArray[j].stampCard++
            this.userArray[j].stampCard = this.userArray[j].stampCard + 24
          }
        }

        localStorage.setItem('userInfo', JSON.stringify(this.userArray))

        //Remove scanned QR code from array that store available stamp/QR Code
        this.stampAvailable.splice(i,1);
        localStorage.setItem('stampAvailable',JSON.stringify(this.stampAvailable))
        this.stampClaimed = true
        break;
      }
    }

    //Notification if QR Code scanned is available
    if(this.stampClaimed === true) {
      this.availableStamp()
    }

    //Notification if QR Code scanned has been used
    else {
      this.expiredStamp()
    }
  }

  //Notification if QR Code scanned is available
  availableStamp() {
    this.snackBar.open('Successfully Claimed your Stamp!', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    this.router.navigateByUrl('userLogin')
  }

  //Notification if QR Code scanned has been used
  expiredStamp() {
    this.snackBar.open('This Stamp has been Claimed!', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['error']
    });

    this.router.navigateByUrl('/pepperList')
  }
}
