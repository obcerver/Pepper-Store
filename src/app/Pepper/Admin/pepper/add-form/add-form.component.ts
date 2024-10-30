import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PepperService } from 'src/app/Pepper/Service/pepper.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  addForm: FormGroup//FormBuilder to add Pepper
  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data
  userNav = JSON.parse(localStorage.getItem('userNav'))//Variable to store user's current role

  status//Variable to store status of a pepper
  currentRate=0//Variable to store the current rate of a pepper

  //Variable to store base64 of image from form
  imageURL: string
  private base64textString:String="";

  constructor(private fb: FormBuilder, 
              private pepperService: PepperService,
              private msg: MessengerService, 
              private router:Router,
              private snackBar: MatSnackBar,) { }

  ngOnInit(): void {

    //Condition to reload page in order to display navbar according to roles chosen
    if(localStorage.getItem('startRole') != null) {
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        window.location.reload() 
      } else {
        localStorage.removeItem('foo') 
        localStorage.removeItem('startRole') 
      }
    }

    this.addPepper()//Initialize add Pepper form
    this.statusNow()//Initialize method to translate boolean input to readable status
  }

  //Method to translate boolean input to readable status
  statusNow() {
    //'Available' status will be displayed if the pepper's status is true
    if(this.addForm.get('pepperStatus').value === true) {
      this.status = "Available"
    }

    //'Unavailable' status will be displayed if the pepper's status is false
    else if(this.addForm.get('pepperStatus').value === false) {
      this.status = "Unavailable"
    }
  }

  //Form to Add New Pepper
  addPepper() {

    //Condition to use this form builder if this is the first pepper
    if(JSON.parse(localStorage.getItem('pepperId')) === 1) {
      this.addForm = this.fb.group({
        adminId: 1,
        pepperId: JSON.parse(localStorage.getItem('pepperId')),
        pepperName: ['', Validators.required],
        pepperPic: ['', Validators.required],
        pepperDesc: ['', Validators.required],
        modelSKU: ['', Validators.required],
        pepperPositions: JSON.parse(localStorage.getItem('pepperId')),//User pepper Id as pepper Positions
        pepperStatus: false,
        pepperManufacturer: ['', Validators.required],
        pepperColour: ['', Validators.required],
        pepperSpiciness: ['', Validators.required],
        pepperQty: 0,
        pepperOrder: 0,
        pepperPrice: ['', Validators.required],
        pepperWeight: ['', Validators.required],
        pepperLength: ['', Validators.required],
        pepperWidth: ['', Validators.required],
        pepperHeight: ['', Validators.required],
      });
    }

    //Condition to use this form builder if this is the not the first pepper
    //This condition needed to make sure pepper positions does not exceed number of pepper
    else {
      this.addForm = this.fb.group({
        adminId: 1,
        pepperId: JSON.parse(localStorage.getItem('pepperId')),
        pepperName: ['', Validators.required],
        pepperPic: ['', Validators.required],
        pepperDesc: ['', Validators.required],
        modelSKU: ['', Validators.required],
        pepperPositions: this.pepperArray.length + 1,//Use the length of array that store all pepper to determine its positions
        pepperStatus: false,
        pepperManufacturer: ['', Validators.required],
        pepperColour: ['', Validators.required],
        pepperSpiciness: ['', Validators.required],
        pepperQty: 0,
        pepperOrder: 0,
        pepperPrice: ['', Validators.required],
        pepperWeight: ['', Validators.required],
        pepperLength: ['', Validators.required],
        pepperWidth: ['', Validators.required],
        pepperHeight: ['', Validators.required],
      });
    }
    
  }

  //Preview image chosen from the Add Pepper Form
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
    this.addForm.patchValue({
      pepperPic: this.base64textString
    })
    
  }
  
  //Method to send completed form to service to add new Pepper
  formSubmit() {
    this.pepperService.addPepper(this.addForm)//Call method from service to add new Pepper

    //Auto Increment Pepper Id for new Pepper
    let pepperId = JSON.parse(localStorage.getItem('pepperId')) + 1
    localStorage.removeItem('pepperId')
    localStorage.setItem('pepperId',pepperId.toString())

    //Snackbar to notify user that new pepper has been added
    this.snackBar.open('successfully Added New Pepper', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
      });
    
    //Reload component to make sure data updated
    this.msg.reloadComponent()
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
