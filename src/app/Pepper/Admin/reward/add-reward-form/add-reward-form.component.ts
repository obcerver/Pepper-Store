import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { RewardService } from './../../../Service/reward.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-reward-form',
  templateUrl: './add-reward-form.component.html',
  styleUrls: ['./add-reward-form.component.scss']
})
export class AddRewardFormComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private msg: MessengerService,
              private rewardService: RewardService,
              private router:Router,
              private snackBar: MatSnackBar,) { }
  
  addRewardForm: FormGroup//FormBuilder to add Reward

  //Variable to store base64 of image from form
  imageURL: string
  private base64textString:String="";

  ngOnInit(): void {
    this.addReward()//Initialize add Reward form
  }

  //Form to Add New reward
  addReward() {
    this.addRewardForm = this.fb.group({
      adminId: 1,
      rewardId: JSON.parse(localStorage.getItem('rewardId')),
      rewardName: ['', Validators.required],
      rewardPic: ['', Validators.required],
      rewardPrice: ['', Validators.required],
    });
  }

  //Preview image chosen from the Add reward Form
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
    
    //Add the value of rewardPic to the form as base64textString 
    this.addRewardForm.patchValue({
      rewardPic: this.base64textString
    })
    
  }

  user: any = {}
  
  //Method to send completed form to service to add new Reward
  formSubmit() {
    this.rewardService.addReward(this.addRewardForm)//Call method from service to add new Reward

    //Auto Increment Reward Id for new Reward
    let rewardId = JSON.parse(localStorage.getItem('rewardId')) + 1
    localStorage.removeItem('rewardId')
    localStorage.setItem('rewardId',rewardId.toString())

    //Snackbar to notify user that new reward has been added
    this.snackBar.open('successfully Added New reward', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
      });
    
    //Reload component to make sure data updated
    this.msg.reloadComponent()
  }

  //Route to add Reward form's page
  showAdd() {
    this.router.navigateByUrl('/addReward')
  }

  //Route to list of pepper's page
  showEdit() {
    this.router.navigateByUrl('/editReward')
  }

}
