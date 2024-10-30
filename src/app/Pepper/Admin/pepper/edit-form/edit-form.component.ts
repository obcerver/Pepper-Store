import { EditFormDialogComponent } from '../edit-form-dialog/edit-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  constructor(public dialog: MatDialog, private router:Router, private sanitizer: DomSanitizer) { }

  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data
  overlap = false//Variable to store boolean to detect if any pepper's Positions overlapped
  
  imgSource//Store base64 image that has been change to image (sanitized)

  ngOnInit(): void {}

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64(i) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.pepperArray[i].pepperPic}`);
    return this.imgSource
  }

  //Method to translate pepper's Status (in boolean) to readable status
  getPepperStatus(pepperId) {
    for(let i=0; i<this.pepperArray.length; i++) {

      if(this.pepperArray[i].pepperId === pepperId) {

        //Return 'Available' status if pepper's Status is true
        if(this.pepperArray[i].pepperStatus === true) {
          return "Available"
        }

        //Return 'Unavailable' status if pepper's Status is false
        else if(this.pepperArray[i].pepperStatus === false){
          return "Unavailable"
        }
      }
    }
  }

  //Open form to edit data of chosen Pepper
  openEditForm(pepper, index) {
    let dialogRef = this.dialog.open(EditFormDialogComponent, {
      data: {pepper, index},
      autoFocus: false,
      maxHeight: '90vh', 
      panelClass: 'custom-dialog-container'
    });
  }

  //Method to check if a pepper's Positions is overlap with other peppers
  checkOverlap(pepper) {

    for(let i=0; i<this.pepperArray.length; i++) {
      //Condition to avoid the pepper compare with itself
      if(pepper.pepperId != this.pepperArray[i].pepperId){

        //Condition to check if pepper's Positions overlap with other pepper
        if(pepper.pepperPositions === this.pepperArray[i].pepperPositions) {
          return true
        }
      }
      
      else {
        //Return false if does not overlap 
        return false
      }
    }

  }
  
  //Route to add Pepper form's page
  showAdd() {
    this.router.navigateByUrl('/addPepper')
  }

  //Route to list of pepper's page
  showEdit() {
    this.router.navigateByUrl('/editPepper')
  }
}
