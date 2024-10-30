import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data

  constructor() { }

  //Method to add new Customer into the system
  addUser(addUserForm) {
    this.userArray.push(addUserForm)
    localStorage.setItem('userInfo', JSON.stringify(this.userArray))
  }

  //Method to edit Customer
  updateUser(userArray, index, editUserForm) {

    userArray.splice(index,1);//Remove outdated customer's data
    userArray.push(editUserForm.value)//Push newly edited customer's data

    //Sort the array of award by the awardId (ascending)
    userArray.sort(function(a, b){
      if(a.userId < b.userdId) { return -1; }
      if(a.userdId > b.userdId) { return 1; }
      return 0;
    })

    localStorage.setItem('userInfo', JSON.stringify(userArray))
  }
}
