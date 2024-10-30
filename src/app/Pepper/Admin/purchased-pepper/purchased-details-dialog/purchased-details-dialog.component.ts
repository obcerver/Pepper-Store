import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchased-details-dialog',
  templateUrl: './purchased-details-dialog.component.html',
  styleUrls: ['./purchased-details-dialog.component.scss']
})
export class PurchasedDetailsDialogComponent implements OnInit {

  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data
  userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data
  purchasedPepper = JSON.parse(localStorage.getItem('purchasedPepper'))//Array to store purchased pepper's data

  imgSource//Store base64 image that has been change to image (sanitized)

  user//Variable to store buyer's data
  pepper//Variable to store purchased pepper's data
  purchased//Variable to store other purchasing's data

  constructor(private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {purchasedId, pepperId, userId}, ) { }

  ngOnInit(): void {

    //Get the pepper's data based on its Id
    for(let i=0; i<this.pepperArray.length; i++) {
      if(this.pepperArray[i].pepperId === this.data.pepperId) {
        this.pepper = this.pepperArray[i]
      }
    }

    //Get the buyer's data based on its Id
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.data.userId) {
        this.user = this.userArray[i]
      }
    }

    //Get the purchased's data based on its Id
    for(let i=0; i<this.purchasedPepper.length; i++) {
      if(this.purchasedPepper[i].purchasedId === this.data.purchasedId) {
        this.purchased = this.purchasedPepper[i]
      }
    }
  }

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64() {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.pepper.pepperPic}`);
    return this.imgSource
  }

}
