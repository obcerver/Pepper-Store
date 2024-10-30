import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { MessengerService } from './messenger.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PepperService {

  constructor(private msg: MessengerService, private fb: FormBuilder, private cartService: CartService) { }

  quantityForm: FormGroup//FormBuilder to update Pepper's stock
  cartForm: FormGroup//FormBuilder to add purchased pepper data from cart

  //Method to add new Pepper into the system
  addPepper(addForm) {

    const localStorageContent = localStorage.getItem('pepperItems')
    let peppers

    if(localStorageContent == null) {
      peppers = []
    }

    else {
      peppers = JSON.parse(localStorageContent)
    }

    peppers.push(addForm.value)//Push form contain new pepper data into array of all pepper's data
    localStorage.setItem('pepperItems', JSON.stringify(peppers))
  }

  //Method to edit Pepper
  editPepper(pepperArray, index, editForm){

    pepperArray.splice(index,1);//Remove outdated pepper's data
    localStorage.removeItem('pepperItems')
    pepperArray.push(editForm.value)//Push newly edited pepper's data

    //Sort the array of pepper by the pepperPositions (ascending)
    pepperArray.sort(function(a, b){
      if(a.pepperPositions < b.pepperPositions) { return -1; }
      if(a.pepperPositions > b.pepperPositions) { return 1; }
      return 0;
    })

    localStorage.setItem('pepperItems', JSON.stringify(pepperArray))
  }

  //Method to update pepper's stock after purchasment are made
  updateQuantity(checkOutItem, pepperArray, userId) {

    //Loop to update all pepper in the cart
    for(let i = 0; i < checkOutItem.length; i++) {

      //Form to update pepper's stock
      this.quantityForm = this.fb.group({
        adminId: checkOutItem[i].adminId,
        pepperId: checkOutItem[i].pepperId,
        pepperName: checkOutItem[i].pepperName,
        pepperPic: checkOutItem[i].pepperPic,
        pepperDesc: checkOutItem[i].pepperDesc,
        modelSKU: checkOutItem[i].modelSKU,
        pepperPositions: checkOutItem[i].pepperPositions,
        pepperStatus: checkOutItem[i].pepperStatus,
        pepperManufacturer: checkOutItem[i].pepperManufacturer,
        pepperColour: checkOutItem[i].pepperColour,
        pepperSpiciness: checkOutItem[i].pepperSpiciness,
        pepperQty: checkOutItem[i].pepperQty,
        pepperOrder: 0,
        pepperPrice: checkOutItem[i].pepperPrice,
        pepperWeight: checkOutItem[i].pepperWeight,
        pepperLength: checkOutItem[i].pepperLength,
        pepperWidth: checkOutItem[i].pepperWidth,
        pepperHeight: checkOutItem[i].pepperHeight
      });
      
      pepperArray.splice(this.msg.findWithAttr(pepperArray, 'pepperId', checkOutItem[i].pepperId),1);//Remove outdated pepper
      localStorage.removeItem('pepperItems')
      pepperArray.push(this.quantityForm.value)//Push newly edited pepper

      //Sort the array of pepper by the pepperPositions (ascending)
      pepperArray.sort(function(a, b){
        if(a.pepperPositions < b.pepperPositions) { return -1; }
        if(a.pepperPositions > b.pepperPositions) { return 1; }
        return 0;
      })

    localStorage.setItem('pepperItems', JSON.stringify(pepperArray))
    
    //Capture current date and time for purchased pepper's data
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
  
      //Form to add purchased pepper's data
      this.cartForm = this.fb.group({
        purchasedId: JSON.parse(localStorage.getItem('purchasedId')),
        userId: userId,
        purchasedDate: dateTime,
        pepperId: checkOutItem[i].pepperId,
        pepperOrder: checkOutItem[i].pepperOrder,
        pepperPrice: checkOutItem[i].pepperPrice,
      });

      const localStorageContent = localStorage.getItem('purchasedPepper')

      let purchasedItem

      if(localStorageContent == null) {
        purchasedItem = []
      }

      else {
        purchasedItem = JSON.parse(localStorageContent)
      }

      purchasedItem.push(this.cartForm.value)//Push form contain purchased pepper data into array of all purchased pepper's data

      //Update latest purchased pepper's Id for new purchased pepper's data 
      let purchasedId = JSON.parse(localStorage.getItem('purchasedId')) + 1
      localStorage.setItem('purchasedId',purchasedId.toString())

      localStorage.setItem('purchasedPepper', JSON.stringify(purchasedItem))
    
    }

    this.cartService.removeAllCart()//Call method from service to remove all pepper from cart
  }

  //Method to remove selected pepper from the system
  removePepper(pepperArray, pepper) {
    
    //Deleted pepper will be filtered out from the array that contain data of all peppers
    pepperArray = pepperArray.filter(function(pepperItem){
      return pepperItem.pepperId != pepper.pepperId
    })

    localStorage.setItem('pepperItems', JSON.stringify(pepperArray))
  }
}

