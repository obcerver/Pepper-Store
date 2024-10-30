import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList = JSON.parse(localStorage.getItem('pepperCart'))//Array to store pepper's in cart
  public productList = new BehaviorSubject<any>([]);//Use in deliever next new pepper

  constructor() { }

  //Add chosen pepper into cart Array
  addToCart(pepper) {

    let pepperAdded = false//Variable that store condition if the pepper is already added

    //Check if a pepper is already in the cart
    for(let i in this.cartItemList) {
      if(this.cartItemList[i].pepperId === pepper.pepperId) {
        //If the pepper is already exist, add the number of pepper in cart and reduce number of quantity/stock
        this.cartItemList[i].pepperOrder++
        this.cartItemList[i].pepperQty--

        pepperAdded = true;//Notify that the pepper already exist
        break;
      }
    }

    //If not, new object(pepper) will be push in the cart Array
    if(!pepperAdded) {
      //Add the number of pepper in cart and reduce number of quantity/stock
      pepper.pepperOrder++
      pepper.pepperQty--
      this.cartItemList.push(pepper)//Store the pepper's data into array that contain data about pepper in the cart
  
    }

    localStorage.setItem('pepperCart', JSON.stringify(this.cartItemList))
    //Handler for each deivered pepper
    this.productList.next(pepper)
  }

  //Return the array that hold the pepper in the cart
  getCart() {
    return this.cartItemList
  }

  //Method to remove chosen pepper form the cart
  removeFromCart(pepper) {

    this.cartItemList.forEach( (item, index) => {
      if(item.pepperId === pepper.pepperId) this.cartItemList.splice(index,1);
    });

    localStorage.setItem('pepperCart', JSON.stringify(this.cartItemList))
  }

  //Method to remove all pepper in the cart
  removeAllCart() {
    this.cartItemList.splice(0,this.cartItemList.length)
    localStorage.setItem('pepperCart', JSON.stringify(this.cartItemList))
  }
}
