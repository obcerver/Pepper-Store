import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { CartService } from 'src/app/Pepper/Service/cart.service';
import { PepperService } from 'src/app/Pepper/Service/pepper.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  pepperArray = JSON.parse(localStorage.getItem('pepperItems'))//Array to store pepper's data
  cartArray = []//Array that store pepper in cart data
  blockedList//Variable that store whether all pepper are available or unavailable

  imgSource//Store base64 image that has been change to image (sanitized)
  filterDisp = false//Variable to store the condition to display result of filtering of all pepper
  filterNum//Variable to store number of match pepper with the filter
  filterName//Variable to store name of filter that the user use
  filterValue//Variable that store the category's value
  textDrop = "Sort By"//Variable that store sortation drop down text

  public pepperMan = []//Array that store all of the pepper Manufacturer
  uniqManufacturer = []//Array that store unduplicate pepper Manufacturer

  public pepperSpice = []//Array that store all of the pepper Spiciness
  uniqSpiciness = []//Array that store unduplicate pepper Spiciness

  public pepperColour = []//Array that store all of the pepper Colour
  uniqColour = []//Array that store unduplicate pepper Colour

  constructor(private pepperService: PepperService, 
              private msg: MessengerService, 
              private cartService: CartService,
              private snackBar: MatSnackBar,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(localStorage.getItem('startRole') != null) {
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        window.location.reload() 
      } else {
        localStorage.removeItem('foo') 
        localStorage.removeItem('startRole') 
      }
    }
    
    this.cartArray = this.cartService.getCart()//Call method from service to get current pepper in the cart

    if(this.pepperArray != null) {
      //Update the amount of pepper's stock and its amount in cart
      for(let i = 0; i < this.cartArray.length; i++) {
        //Find matching pepper using its id from two array (pepperArray and cartArray) then get the index of the pepper in pepperArray
        let index = this.msg.findWithAttr(this.pepperArray, 'pepperId', this.cartArray[i].pepperId)
        //Update at card component to show amount of a pepper in the cart
        this.pepperArray[index].pepperOrder = this.cartArray[i].pepperOrder
        //Update at card component to show remainig stock of a pepper available after minus amount of the same pepper in the cart
        this.pepperArray[index].pepperQty = this.pepperArray[index].pepperQty - this.cartArray[i].pepperOrder
      }

      //Extract all of the value of category in all pepper
      for(let i = 0; i < this.pepperArray.length; i++) {
        if(this.pepperArray[i].pepperStatus === true) {
          this.pepperMan.push(this.pepperArray[i].pepperManufacturer)
          this.pepperSpice.push(this.pepperArray[i].pepperSpiciness)
          this.pepperColour.push(this.pepperArray[i].pepperColour)
        }
      }

      //Will determine if all pepper's Status are unavailable
      //If all unavailable, return true
      this.blockedList = this.pepperArray.every(function(pepperItem){
        return pepperItem.pepperStatus === false
      })

      //Remove duplicate value of category
      this.uniqManufacturer = [...new Set(this.pepperMan)]
      this.uniqSpiciness = [...new Set(this.pepperSpice)]
      this.sortNum()//Sort the level of pepper Spiciness to ascending
      this.uniqColour = [...new Set(this.pepperColour)]
    }
  }

  //Method to filter the pepper based on the category chosen by user
  pepperFilter(category, value) {
    this.pepperArray = JSON.parse(localStorage.getItem('pepperItems'))

    //Find and filter the pepper that met the category (pepperSpiciness) 
    //Category ID 1 
    if(category === 1){
      this.pepperArray = this.pepperArray.filter(function(pepperItem){
        if(pepperItem.pepperStatus === true) {
          return pepperItem.pepperSpiciness === value
        }
      })
      this.filterNum = this.pepperArray.length
      this.filterDisp = true
      this.filterName = "Pepper Spiciness"
      this.filterValue = "Spiciness: " + value
    }

    //Find and filter the pepper that met the category (pepperManufacturer) 
    //Category ID 2
    else if(category === 2){
      this.pepperArray = this.pepperArray.filter(function(pepperItem){
        if(pepperItem.pepperStatus === true) {
          return pepperItem.pepperManufacturer === value
        }
      })
      this.filterNum = this.pepperArray.length
      this.filterDisp = true
      this.filterName = "Pepper Manufacturer"
      this.filterValue = "Manufacturer: " + value
    }

    //Find and filter the pepper that met the category (pepperColour) 
    //Category ID 3 
    else if(category === 3){
      this.pepperArray = this.pepperArray.filter(function(pepperItem){
        if(pepperItem.pepperStatus === true) {
          return pepperItem.pepperColour === value
        }
      })
      this.filterNum = this.pepperArray.length
      this.filterDisp = true
      this.filterName = "Pepper Colour"
      this.filterValue = "Colour: " + value
    }
  }

  //Method use to filter the pepper based on the search result
  searchPepper(searchText) {
    this.pepperArray = JSON.parse(localStorage.getItem('pepperItems'))

    //Find and filter the pepper that the search text
    this.pepperArray = this.pepperArray.filter(function(pepperItem){
      if(pepperItem.pepperStatus === true) {
        return pepperItem.pepperName.match(searchText)
      }
    })
      this.filterNum = this.pepperArray.length
      this.filterDisp = true
      this.filterName = "Search"
      this.filterValue = searchText
  } 

  //Method that connected to button to clear all filter
  clearFilter() {
    this.pepperArray = JSON.parse(localStorage.getItem('pepperItems'))
    this.filterDisp = false
  }

  //Convert base64testString(pepperPic data) to viewable image
  convertBase64(i) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.pepperArray[i].pepperPic}`);
    return this.imgSource
  }

  //Add chosen pepper to the cart
  addToCart(pepperItem) {
    this.msg.reloadComponent()//Re initialize the component
    //Use method in Messenger Service to add peppers to cart by sending the data of chosen peppers
    this.cartService.addToCart(pepperItem)

    //SnackBar is used as notifications
    this.snackBar.open(pepperItem.pepperName + ' successfully Added to the Cart', 'Close', {
    duration: 2000,
    verticalPosition: 'bottom',
    panelClass: ['add']
    });

  }

  //Sort the order of displayed Pepper based on the pepperPositions
  sortDefault() {
    this.pepperArray.sort(function(a, b){
      if(a.pepperPositions < b.pepperPositions) { return -1; }
      if(a.pepperPositions > b.pepperPositions) { return 1; }
      return 0;
    })
  }

  //Sort the order of displayed Pepper alphabetically (ascending)
  sortABC() {
    this.pepperArray.sort((a, b) => a.pepperName.localeCompare(b.pepperName))
  }

  //Sort the order of displayed Pepper alphabetically (descending)
  sortCBA() {
    this.sortABC()
    this.pepperArray.reverse()
  }

   //Sort the order of displayed Pepper based on the price (ascending)
  sortLowHigh() {
    this.pepperArray.sort(function(a, b){
      if(a.pepperPrice < b.pepperPrice) { return -1; }
      if(a.pepperPrice > b.pepperPrice) { return 1; }
      return 0;
    })
  }

  //Sort the order of displayed Pepper based on the price (descending)
  sortHighLow() {
    this.sortLowHigh()
    this.pepperArray.reverse()
  }

  //Sort that level display will be ascending
  sortNum() {
    this.uniqSpiciness.sort(function(a, b){
      if(a < b) { return -1; }
      if(a > b) { return 1; }
      return 0;
    })
  }

  //Method to change sortation drop down text
  changeText(text) {
    this.textDrop= text
  }
}
