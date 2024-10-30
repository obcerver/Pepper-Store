import { Component, OnInit } from '@angular/core';
import { PurchasedDetailsDialogComponent } from '../purchased-details-dialog/purchased-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.scss']
})
export class PurchasedComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  purchasedPepper = JSON.parse(localStorage.getItem('purchasedPepper'))//Array to store purchased peppers' data
  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data

  textDrop = "Sort By"//Variable that store sortation drop down text

  ngOnInit(): void {}
  
  //Method to sort an array(number)
  sortNumber(attr) {
    this.purchasedPepper.sort(function(a, b){
      if(a[attr] < b[attr]) { return -1; }
      if(a[attr] > b[attr]) { return 1; }
      return 0;
    })
  }

  //Method to sort an array(number) in reverse
  reverseSortNumber(attr) {
    this.sortNumber(attr)
    this.purchasedPepper.reverse()
  }

  //Method to sort purchased pepper in totalPrice ascendingly
  sortTotalPrice() {
    this.purchasedPepper.sort(function(a, b){
      if(a.pepperPrice*a.pepperOrder < b.pepperPrice*b.pepperOrder) { return -1; }
      if(a.pepperPrice*a.pepperOrder > b.pepperPrice*b.pepperOrder) { return 1; }
      return 0;
    })
  }

  //Method to sort purchased pepper in totalPrice descendingly
  reverseSortTotalPrice() {
    this.sortTotalPrice()
    this.purchasedPepper.reverse()
  }


  //Method to display a pepper's name according to its Id
  getPepperName(pepperId) {
    for(let i=0; i<this.pepperArray.length;i++) {
      if(this.pepperArray[i].pepperId === pepperId) {
        return this.pepperArray[i].pepperName
      }
    }
  }

  //Method that open a dialog that contain purchased's pepper in more detail
  openDetails(purchasedId, pepperId, userId) {
    let dialogRef = this.dialog.open(PurchasedDetailsDialogComponent, {
      //Pass the pepper chosen and its index in the pepper array
      data: {purchasedId, pepperId, userId},
      autoFocus: false,
      maxHeight: '90vh', 
      panelClass: 'custom-dialog-container'
    });
  }

  //Method to change sortation drop down text
  changeText(text) {
    this.textDrop= text
  }
}
