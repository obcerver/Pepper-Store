import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { RewardService } from './../../../Service/reward.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PepperService } from 'src/app/Pepper/Service/pepper.service';

@Component({
  selector: 'app-edit-reward-form',
  templateUrl: './edit-reward-form.component.html',
  styleUrls: ['./edit-reward-form.component.scss']
})
export class EditRewardFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {reward, index},
              private fb: FormBuilder, 
              private msg: MessengerService,
              private rewardService: RewardService,
              private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,) { }

  editRewardForm: FormGroup//FormBuilder to edit Reward
  public rewardArray = JSON.parse(localStorage.getItem('rewardItems'))//Array to store reward's data

  imgSource//Store base64 image that has been change to image (sanitized)

  //Variable to store base64 of image from form
  imageURL: string
  private base64textString:String="";

  ngOnInit(): void {
    this.editReward()//Initialize edit Reward form
  }

  //Form to edit chosen Reward
  editReward() {
    this.editRewardForm = this.fb.group({
      adminId: this.data.reward.adminId,
      rewardId: this.data.reward.rewardId,
      rewardName: [this.data.reward.rewardName, Validators.required],
      rewardPic: [this.data.reward.rewardPic, Validators.required],
      rewardPrice: [this.data.reward.rewardPrice, Validators.required],
    });
    
  }

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64() {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.data.reward.rewardPic}`);
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
    this.editRewardForm.patchValue({
      rewardPic: this.base64textString
    })
    
  }

  //Method to send completed form to service to edit chosen Reward
  onSubmit() {
    this.rewardService.editReward(this.rewardArray, this.data.index, this.editRewardForm)//Call method from service to edit Reward
    this.msg.reloadBackComponent('/editReward')//Reload component to make sure data updated

    //Snackbar is used as notifications to notify that the pepper's data has been updated
    this.snackBar.open(this.data.reward.rewardName + ' Data is successfully Updated', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    this.dialog.closeAll()
  }
}
