import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/Pepper/Service/messenger.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payMethod: string = ''//Variable that hold the payment method
  custName = ""//Variable to store currently purchasing customer's name

  public userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data

  constructor(private msg:MessengerService) { }

  ngOnInit(): void {

    //Loop to check which customer is currently buying pepper
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.msg.getUserId()) {
        this.custName = this.userArray[i].userName
        break;
      }
    }
  }

  //If user choose credit/debit card as payment method
  crdr() {
    this.payMethod = "Credit/Debit Card"
    this.msg.sendPayment(this.payMethod)
  }

  //If user choose online banking as payment method
  online() {
    this.payMethod = "Online Banking"
    this.msg.sendPayment(this.payMethod)
  }

  //If user choose Cash On Delivery as payment method
  cod() {
    this.payMethod = "Cash On Delivery"
    this.msg.sendPayment(this.payMethod)
  }

}
