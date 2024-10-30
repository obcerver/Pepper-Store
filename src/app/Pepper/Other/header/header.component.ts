import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { PepperService } from '../../Service/pepper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, 
              public pepperService: PepperService,
              private cartService: CartService, ) { }

  cartItem = []//Array to store pepper in cart's data
  emptyArray = []//Empty array for reset system

  userNav = JSON.parse(localStorage.getItem('userNav'))//Variable to store indicator for current role used for navbar
  num = 1//Initial number for Id

  ngOnInit(): void {
    
    //Automatically reset system if it is first time to use this system
    if(localStorage.getItem('pepperItems') === null) {
      this.reset()
    }
    
    this.cartItem = this.cartService.getCart()//Call method from service to get current pepper in the cart for badge
  }

  //Method to reset every Id and array in the system
  reset() {
    localStorage.setItem('pepperId',this.num.toString())
    localStorage.setItem('purchasedId',this.num.toString())
    localStorage.setItem('userId',this.num.toString())
    localStorage.setItem('stampId',this.num.toString())
    localStorage.setItem('rewardId',this.num.toString())

    localStorage.setItem('pepperItems', JSON.stringify(this.emptyArray))
    localStorage.setItem('purchasedPepper', JSON.stringify(this.emptyArray))
    localStorage.setItem('pepperCart', JSON.stringify(this.emptyArray))
    localStorage.setItem('userInfo', JSON.stringify(this.emptyArray))
    localStorage.setItem('stampAvailable', JSON.stringify(this.emptyArray))
    localStorage.setItem('rewardItems', JSON.stringify(this.emptyArray))

    this.router.navigateByUrl('/home')
  }
}
