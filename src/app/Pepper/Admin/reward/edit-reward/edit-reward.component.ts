import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { RewardService } from './../../../Service/reward.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditRewardFormComponent } from '../edit-reward-form/edit-reward-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../Other/dialog/dialog.component';

@Component({
  selector: 'app-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.scss']
})
export class EditRewardComponent implements OnInit {

  constructor(public dialog: MatDialog, 
              private router:Router, 
              private rewardService: RewardService,
              private msg: MessengerService,
              private sanitizer: DomSanitizer,
              public snackBar: MatSnackBar,) { }

  public rewardArray = JSON.parse(localStorage.getItem('rewardItems'))//Array to store reward's data

  imgSource//Store base64 image that has been change to image (sanitized)


  ngOnInit(): void {}

  //Convert base64testString(rewardPic data) to viewable image
  convertBase64(i) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.rewardArray[i].rewardPic}`);
    return this.imgSource
  }

  //Open form to edit data of chosen Reward
  openEditForm(reward, index) {
    let dialogRef = this.dialog.open(EditRewardFormComponent, {
      data: {reward, index},
      autoFocus: false,
      maxHeight: '90vh', 
      panelClass: 'custom-dialog-container'
    });
  }

  //Method to delete Reward
  removeReward(reward) {

    //Confirmation notifications will open 
    let dialogRef = this.dialog.open(DialogComponent);

    //Condition if user want to delete the item
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){

        this.rewardService.removeReward(this.rewardArray, reward)//Call method from service to delete Reward

        //Notifications to alert that the reward has been deleted from the cart
        this.snackBar.open("Reward has been deleted from the system", 'Close', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: ['error']
          });
          
          this.msg.reloadComponent()//Reload component to make sure data updated
          this.dialog.closeAll()
      }
    });
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
