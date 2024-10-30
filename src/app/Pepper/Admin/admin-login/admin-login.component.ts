import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  hide = true;

  constructor(public router: Router, 
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {}
  
  //Method to evaluate admin's password
  checkAdmin(adminPassword) {

    //If user key in correct password
    //Route to admin page and set navbar to admin's navbar
    if(adminPassword === '123'){
      this.router.navigateByUrl('/addPepper')
      let num = 1
      localStorage.setItem('userNav',num.toString())
      localStorage.setItem('startRole','reload')
    }


    //If user key in incorrect password
    else {
      this.snackBar.open("Incorrect password", 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        panelClass: ['error']
      });
    }
  }
}
