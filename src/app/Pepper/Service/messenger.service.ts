import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  public cartItemList = JSON.parse(localStorage.getItem('pepperCart'))//Array to store pepper's in cart
  userId = 0//Variable that store passing customer's Id from a component to another component

  public payMethod = new BehaviorSubject('Select a Payment Method')//Default payment method

  constructor(public router: Router) { }

  //Hold the selected payment method, keep the method in a variable
  sendPayment(payment: string) {
    this.payMethod.next(payment)
  }

  //Return the variable that hold the payment method
  getPayment() {
    return this.payMethod.asObservable()
  }

  //Get customer Id from a component that send it
  sendUserId(userId) {
    this.userId = userId
  }

  //Send customer Id to component that call the method
  getUserId() {
    return this.userId
  }

  //Function to locate the index of a matching item in another array
  findWithAttr(array, attr, value) {

    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;//Return the index
        }
    }
    return -1;

  }

  //Method to reload current component to make sure data updated
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //Method to reload a specific component to make sure data updated
  reloadBackComponent(route) {
    let currentUrl = route;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}