import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { PepperService } from 'src/app/Pepper/Service/pepper.service';
import { CartService } from 'src/app/Pepper/Service/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  constructor(private msg: MessengerService,
              private cartService: CartService, 
              private router:Router,
              private pepperService: PepperService,
              private snackBar: MatSnackBar) { }

  cartItem = [];//Array that store pepper in cart data
  pepperArray = []//Array to store pepper's data
  cartTotal = 0;//Variable that store the total price of all item in the cart
  cartDiscount = 0;//Variable to store the discount price of total price
  payMethod :string = '';//Variable to store payment method chosen by user
  paySelected: Boolean = false;//Varaible to store if payment is selected or not
  coupAvailable = false//Variable to store condition if customer eligible to use coupon
  discount = false//Variable to store condition if customer have use their coupon

  userArray = JSON.parse(localStorage.getItem('userInfo'))

  ngOnInit(): void {
    this.cartItem = this.cartService.getCart()//Call method from service to get current pepper in the cart
    this.cartTotal = this.getTotal()//Retrieve total price of all item in the cart
    this.cartDiscount = this.cartTotal * 0.10//10% Discount of total price

    //Get the payment method that has been chosen by the user
    this.msg.getPayment().subscribe(
      (payMethod: string) => {
        //Store the payment method in a variable
        this.payMethod = payMethod

        //Proceed button will be blocked if user stil does not choose payment method
        if(this.payMethod === "Select a Payment Method"){
          this.paySelected = false
        }

        else{
          //Proceed button will be available after user choose a payment method
          this.paySelected = true
        }

      },
    )
    
    //Loop to check if a customer are eligible to use coupon
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.msg.getUserId()) {
        if(this.userArray[i].coupon > 0){
          this.snackBar.open('You have an available Coupon!', 'Close', {
            duration: 10000,
            verticalPosition: 'bottom',
            panelClass: ['add']
          });

          this.coupAvailable = true
          break
        }
      }
    }
  } 

  //Calculate the total price of all item in the cart
  getTotal() {
    //Go through all pepper in the cart and add up all its price*quantity chosen
    this.cartItem.forEach(item => {
      this.cartTotal += (item.pepperOrder * item.pepperPrice)
    })

    return this.cartTotal
  }

  //Method of calculating and displaying if customer has use their coupon
  useCoupon() {
    if(this.discount === false) {
      this.discount = true
      this.cartTotal = this.cartTotal - this.cartDiscount
    }

    else if(this.discount === true) {
      this.discount = false
      this.cartTotal = this.cartTotal + this.cartDiscount
    }
  
  }

  //Method to continue with their purchasement
  goToSuccessOrder() {

    if(this.discount === true) {

      for(let i=0; i<this.userArray.length; i++) {
        if(this.userArray[i].userId === this.msg.getUserId()) {
          this.userArray[i].coupon--
          localStorage.setItem('userInfo', JSON.stringify(this.userArray))
          break
        }
      }
    }

    this.router.navigateByUrl('/order_success')
  }

  //Method to clear item in cart after customer complete their payment
  removeAllItem() {
    this.pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data
    this.pepperService.updateQuantity(this.cartItem, this.pepperArray, this.msg.getUserId())//Call method from service to update pepper's stock 
  }
}
