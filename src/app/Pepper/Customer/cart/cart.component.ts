import { CartService } from './../../Service/cart.service';
import { DialogComponent } from '../../Other/dialog/dialog.component';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { PepperService } from '../../Service/pepper.service';
import { MessengerService } from '../../Service/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  constructor(private msg: MessengerService,
              private cartService: CartService, 
              private snackBar: MatSnackBar,
              public dialog:MatDialog,
              private sanitizer: DomSanitizer) { }
  
  cartItem = [];//Array that store pepper in cart data
  cartTotal = 0;//Variable that store the total price of all item in the cart
  
  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data
  currentPepperQty//Variable to store the quantity of a pepper in the cart

  imgSource//Store base64 image that has been change to image (sanitized)

  ngOnInit(): void {
    this.cartItem = this.cartService.getCart()//Call method from service to get current pepper in the cart
    this.cartTotal = this.getTotal()//Retrieve total price of all item in the cart
  }  

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64(pepperId) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.cartItem[pepperId].pepperPic}`);
    return this.imgSource
  }

  //Calculate the total price of all item in the cart
  getTotal() {
    //Go through all pepper in the cart and add up all its price*quantity chosen
    this.cartItem.forEach(item => {
      this.cartTotal += (item.pepperOrder * item.pepperPrice)
    })
    return this.cartTotal
  }

  //Add the quantity of an item in the cart
  addQty(pepper) {

    //Loop to find and store the stock of selected pepper so that it can be use as error handler if pepper in the cart exceed its stock
    for(let i=0; i<this.cartItem.length; i++) {
      let index = this.msg.findWithAttr(this.pepperArray, 'pepperId', pepper.pepperId)
      this.currentPepperQty = this.pepperArray[index].pepperQty
    }

    //Error notifications will pop up (snackbar) if quantity of an item in the cart exceeded the item's stock
    if(pepper.pepperOrder >= this.currentPepperQty) {
      this.snackBar.open(pepper.pepperName + " quantity has reach its limit", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['error']
        });
    
    }

    else {
      //The total price of an item will be deducted form the total price of the cart
      this.cartTotal = this.cartTotal - (pepper.pepperOrder * pepper.pepperPrice)
      //Quantity of the item chosen will increase
      pepper.pepperOrder = pepper.pepperOrder + 1
      pepper.pepperQty = pepper.pepperQty - 1
      //The total price of the cart will be updated by adding new total price of the item
      this.cartTotal = this.cartTotal + (pepper.pepperOrder * pepper.pepperPrice)
    }

    //Update the pepper in the cart in the localStorage
    localStorage.setItem('pepperCart', JSON.stringify(this.cartItem))
  }

  //Reduce the quantity of an item in the cart
  minusQty(pepper) {
    

    //Error notifications will pop up if quantity of an item in the cart is less than one
    if(pepper.pepperOrder === 1) {
      this.snackBar.open(pepper.pepperName + " quantity can't be less than one", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['error']
        });

    }
    
    else {
      //The total price of an item will be deducted form the total price of the cart
      this.cartTotal = this.cartTotal - (pepper.pepperOrder * pepper.pepperPrice)
      //Quantity of the item chosen will decrease
      pepper.pepperOrder= pepper.pepperOrder - 1
      pepper.pepperQty = pepper.pepperQty + 1
      //The total price of the cart will be updated by adding new total price of the item
      this.cartTotal = this.cartTotal + (pepper.pepperOrder * pepper.pepperPrice)
    }
    //Update the pepper in the cart in the localStorage
    localStorage.setItem('pepperCart', JSON.stringify(this.cartItem))
  }

  //Chosen pepper will be deleted from the cart
  removePepper(pepper) {

    //Confirmation notifications will open 
    let dialogRef = this.dialog.open(DialogComponent);

    //Condition if user want to delete the item
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){

        this.cartTotal = this.cartTotal - (pepper.pepperOrder * pepper.pepperPrice)//The total price of the item will be deducted

        this.cartService.removeFromCart(pepper)//Call method from service to delete Pepper from the cart
        this.msg.reloadComponent()//Reload component to make sure data updated

        //Notifications to alert that the pepper has been deleted from the cart
        this.snackBar.open(pepper.pepperName + " has been deleted from the cart", 'Close', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: ['error']
          });

      }
    });
  }

  //Open User Login/Registration before proceeding to payment
  goToPayment() {
    this.dialog.open(UserFormDialogComponent, {
      autoFocus: false,
      height: '75vh', 
      maxHeight: '100vh', 
      maxWidth: '100vw',
      panelClass: 'memo-edit'
    });
  }

}
