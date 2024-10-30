import { MessengerService } from 'src/app/Pepper/Service/messenger.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Pepper/Other/header/header.component';
import { CardComponent } from './Pepper/Customer/item/card/card.component';
import { CarouselComponent } from './Pepper/Other/carousel/carousel.component';
import { CartComponent } from './Pepper/Customer/cart/cart.component';
import { PaymentComponent } from './Pepper/Customer/payment-process/payment/payment.component';
import { AppRoutingModule } from './app-routing.module';
import { CheckoutComponent } from './Pepper/Customer/payment-process/checkout/checkout.component';
import { SuccessComponent } from './Pepper/Customer/payment-process/success/success.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './Pepper/Other/dialog/dialog.component';
import { AddFormComponent } from './Pepper/Admin/pepper/add-form/add-form.component';
import { EditFormComponent } from './Pepper/Admin/pepper/edit-form/edit-form.component';
import { EditFormDialogComponent } from './Pepper/Admin/pepper/edit-form-dialog/edit-form-dialog.component';
import { PurchasedComponent } from './Pepper/Admin/purchased-pepper/purchased/purchased.component';
import { PurchasedDetailsDialogComponent } from './Pepper/Admin/purchased-pepper/purchased-details-dialog/purchased-details-dialog.component';
import { StampCardComponent } from './Pepper/Customer/reward-point/stamp-card/stamp-card.component';
import { UserFormDialogComponent } from './Pepper/Customer/user-form-dialog/user-form-dialog.component';
import { UserStampComponent } from './Pepper/Customer/reward-point/user-stamp/user-stamp.component';
import { AddRewardFormComponent } from './Pepper/Admin/reward/add-reward-form/add-reward-form.component';
import { EditRewardComponent } from './Pepper/Admin/reward/edit-reward/edit-reward.component';
import { EditRewardFormComponent } from './Pepper/Admin/reward/edit-reward-form/edit-reward-form.component';
import { ClaimRewardComponent } from './Pepper/Customer/reward-point/claim-reward/claim-reward.component';
import { UserLoginComponent } from './Pepper/Customer/user-login/user-login.component';
import { AdminLoginComponent } from './Pepper/Admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    CarouselComponent,
    CartComponent,
    PaymentComponent,
    CheckoutComponent,
    SuccessComponent,
    DialogComponent,
    AddFormComponent,
    EditFormComponent,
    EditFormDialogComponent,
    PurchasedComponent,
    PurchasedDetailsDialogComponent,
    StampCardComponent,
    UserFormDialogComponent,
    UserStampComponent,
    AddRewardFormComponent,
    EditRewardComponent,
    EditRewardFormComponent,
    ClaimRewardComponent,
    UserLoginComponent,
    AdminLoginComponent,
  ],

  entryComponents: [
    EditFormDialogComponent  
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgbModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    QuillModule,
    NgxQrcodeStylingModule,
  ],
  providers: [MessengerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
