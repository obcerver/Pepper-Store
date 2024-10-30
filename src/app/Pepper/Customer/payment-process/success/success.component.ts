import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { MessengerService } from 'src/app/Pepper/Service/messenger.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  timeLeft: number = 20;//Variable that amount of time (seconds) before componen auto redirect
  interval;//Variable that hold interval for timer countdown

  myAngularxQrCode = "";//Variable to store link to claiming point process
  custName = ""//Variable to store currently purchasing customer's name
  stampUrl = ""//Variable to store the full link to claiming point process with route parameter

  public stampAvailable = JSON.parse(localStorage.getItem('stampAvailable'))//Array to store stamp/QR Code's data
  public userArray = JSON.parse(localStorage.getItem('userInfo'))//Array to store customer's data
  public stampId = JSON.parse(localStorage.getItem('stampId'))//Array to store latest QR Code's Id

  constructor(private router: Router, private msg: MessengerService) { }

  ngOnInit(): void {

    //Loop to check which customer is currently buying pepper
    for(let i=0; i<this.userArray.length; i++) {
      if(this.userArray[i].userId === this.msg.getUserId()) {
        this.custName = this.userArray[i].userName
        break;
      }
    }

    //Completing the link for claiming point process for generated QR Code
    this.myAngularxQrCode = 'http://localhost:4200/pointClaim';
    this.stampUrl = this.myAngularxQrCode + "/" + this.stampId
    
    //Push generated QR Code's Id to array that store all stamp's data
    this.stampAvailable.push({
      stampId: this.stampId,
      userId: this.msg.getUserId()
    })
    localStorage.setItem('stampAvailable',JSON.stringify(this.stampAvailable))

    //Updating latest QR Code's Id for new QR Code 
    let stampId = JSON.parse(localStorage.getItem('stampId')) + 1 
    localStorage.removeItem('stampId')
    localStorage.setItem('stampId',stampId.toString())

    // //A timer of 20 seconds is created
    // const timer = setTimeout(() => {
    //   //After user spent 20 sceonds on the page, the web will be automatically routed to cart page
    //   this.router.navigate(['/cart']);
    // }, 20000);  

    // //Detect if user were to change the age bfore 20 seconds timer run out
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     //The timer will be stop to avoid page automitaclly routed to cart page
    //     clearTimeout(timer)
    //   }
    // });

    // //Timer that be used to display in html on how long does the user still have before it routed automatically
    // this.interval = setInterval(() => {
    //   if(this.timeLeft > 0) {
    //     this.timeLeft--;
    //   } else {
    //     this.timeLeft = 60;
    //   }
    // },1000)
  }

  //Route the page back to cart's page
  returnCart() {
    this.router.navigateByUrl('/cart')
  }

}
