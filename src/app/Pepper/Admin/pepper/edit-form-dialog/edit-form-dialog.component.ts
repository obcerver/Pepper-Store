import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Pepper/Other/dialog/dialog.component';
import { PepperService } from 'src/app/Pepper/Service/pepper.service';
import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { CartService } from 'src/app/Pepper/Service/cart.service';


@Component({
  selector: 'app-edit-form-dialog',
  templateUrl: './edit-form-dialog.component.html',
  styleUrls: ['./edit-form-dialog.component.scss']
})
export class EditFormDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private pepperService: PepperService,
              private cartService: CartService,
              private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private msg: MessengerService,
              @Inject(MAT_DIALOG_DATA) public data: {pepper, index},) { }
  
  editForm: FormGroup//FormBuilder to edit Pepper
  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data

  status//Variable to store status of a pepper
  currentRate = this.data.pepper.pepperSpiciness//Variable to store the current rate of pepper

  imgSource//Store base64 image that has been change to image (sanitized)
  
  //Variable to store base64 of image from form
  imageURL: string
  private base64textString:String="";

  ngOnInit(): void {
    this.editPepper()//Initialize edit Pepper form
    this.statusNow()//Initialize method to translate boolean input to readable status
  }
  
  //Method to translate boolean input to readable status
  statusNow() {
    //'Available' status will be displayed if the pepper's status is true
    if(this.editForm.get('pepperStatus').value === true) {
      this.status = "Available"
    }

    //'Unavailable' status will be displayed if the pepper's status is false
    else if(this.editForm.get('pepperStatus').value === false) {
      this.status = "Unavailable"
    }
  }
  
  //Form to edit chosen Pepper
  editPepper() {
    this.editForm = this.fb.group({
      adminId: this.data.pepper.adminId,
      pepperId: this.data.pepper.pepperId,
      pepperName: [this.data.pepper.pepperName, Validators.required],
      pepperPic: [this.data.pepper.pepperPic, Validators.required],
      pepperDesc: [this.data.pepper.pepperDesc, Validators.required],
      modelSKU: [this.data.pepper.modelSKU, Validators.required],
      pepperPositions: [this.data.pepper.pepperPositions, [Validators.required, Validators.max(this.pepperArray.length)]],
      pepperStatus: this.data.pepper.pepperStatus,
      pepperManufacturer: [this.data.pepper.pepperManufacturer, Validators.required],
      pepperColour: [this.data.pepper.pepperColour, Validators.required],
      pepperSpiciness: [this.data.pepper.pepperSpiciness, Validators.required],
      pepperQty: [this.data.pepper.pepperQty, Validators.required],
      pepperOrder: 0,
      pepperPrice: [this.data.pepper.pepperPrice, Validators.required],
      pepperWeight: [this.data.pepper.pepperWeight, Validators.required],
      pepperLength: [this.data.pepper.pepperLength, Validators.required],
      pepperWidth: [this.data.pepper.pepperWidth, Validators.required],
      pepperHeight: [this.data.pepper.pepperHeight, Validators.required],
    });
  }

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64() {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.data.pepper.pepperPic}`);
    return this.imgSource
  }

  //Preview image chosen from the Edit Pepper Form
  selectImg(event) {
    const file = (event.target as HTMLInputElement).files[0];

    // File Preview
    const reader1 = new FileReader();
    reader1.onload = () => {
      this.imageURL = reader1.result as string;
    }
    reader1.readAsDataURL(file)

    const reader2 = new FileReader();
    if (file) {
      reader2.onload =this._handleReaderLoaded.bind(this);

      reader2.readAsBinaryString(file);
    }
  }

  //Change image to base64textString so the image can be store 
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    
    //Add the value of pepperPic to the form as base64textString 
    this.editForm.patchValue({
      pepperPic: this.base64textString
    })
    
  }

  //Method to send completed form to service to edit chosen Pepper
  formSubmit() {
    this.pepperService.editPepper(this.pepperArray, this.data.index, this.editForm)//Call method from service to edit Pepper
    this.cartService.removeFromCart(this.data.pepper)//Call method form service to remove pepper form cart if in the cart
    this.msg.reloadBackComponent('/editPepper')//Reload component to make sure data updated

    //Snackbar is used as notifications to notify that the pepper's data has been updated
    this.snackBar.open(this.data.pepper.pepperName + ' Data is successfully Updated', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    this.dialog.closeAll()
  }

  //Method to delete Pepper
  removePepper() {

    //Confirmation notifications will open 
    let dialogRef = this.dialog.open(DialogComponent);

    //Condition if user want to delete the item
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){

        this.pepperService.removePepper(this.pepperArray, this.data.pepper)//Call method from service to delete Pepper
        this.cartService.removeFromCart(this.data.pepper)//Call method form service to remove pepper form cart if in the cart

        //Notifications to alert that the pepper has been deleted from the cart
        this.snackBar.open("Pepper has been deleted from the system", 'Close', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: ['error']
          });
          
          this.msg.reloadBackComponent('/editPepper')//Reload component to make sure data updated
          this.dialog.closeAll()
      }
    });
  }
}