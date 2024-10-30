import { Component, OnInit } from '@angular/core';
import { Pepper } from '../../../model/pepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  user = 0//Variable to store indicator for current role used for navbar

  constructor(private router:Router) {}

  ngOnInit(): void {

    //Condition to reload page in order to display navbar according to roles chosen
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      window.location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    localStorage.setItem('userNav',this.user.toString())
  }

  //Route user to admin login page
  adminPage() {
    this.router.navigateByUrl('/adminLogin')
  }

  //Route to list of pepper page for customer and set navbar to customer's navbar
  custPage() {
    this.router.navigateByUrl('/pepperList')
    let num = 2
    localStorage.setItem('userNav',num.toString())
    localStorage.setItem('startRole','reload')
  }

}
