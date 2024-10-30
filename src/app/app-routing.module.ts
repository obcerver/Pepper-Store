import { AdminLoginComponent } from './Pepper/Admin/admin-login/admin-login.component';
import { UserLoginComponent } from './Pepper/Customer/user-login/user-login.component';
import { ClaimRewardComponent } from './Pepper/Customer/reward-point/claim-reward/claim-reward.component';
import { AddRewardFormComponent } from './Pepper/Admin/reward/add-reward-form/add-reward-form.component';
import { UserStampComponent } from './Pepper/Customer/reward-point/user-stamp/user-stamp.component';
import { StampCardComponent } from './Pepper/Customer/reward-point/stamp-card/stamp-card.component';
import { PurchasedComponent } from './Pepper/Admin/purchased-pepper/purchased/purchased.component';
import { AddFormComponent } from './Pepper/Admin/pepper/add-form/add-form.component';
import { SuccessComponent } from './Pepper/Customer/payment-process/success/success.component';
import { CheckoutComponent } from './Pepper/Customer/payment-process/checkout/checkout.component';
import { CarouselComponent } from './Pepper/Other/carousel/carousel.component';
import { CartComponent } from './Pepper/Customer/cart/cart.component';
import { CardComponent } from './Pepper/Customer/item/card/card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFormComponent } from './Pepper/Admin/pepper/edit-form/edit-form.component';
import { EditRewardComponent } from './Pepper/Admin/reward/edit-reward/edit-reward.component';


const routes: Routes = [
  { path: 'pepperList', component: CardComponent},
  { path: 'cart', component: CartComponent},
  { path: 'addPepper', component: AddFormComponent},
  { path: 'editPepper', component: EditFormComponent},
  { path: 'home', component: CarouselComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'order_success', component: SuccessComponent},
  { path: 'purchasedList', component: PurchasedComponent},
  { path: 'pointClaim/:stampId', component: StampCardComponent},
  { path: 'users/:userId', component: UserStampComponent},
  { path: 'userLogin', component: UserLoginComponent},
  { path: 'addReward', component: AddRewardFormComponent},
  { path: 'editReward', component: EditRewardComponent },
  { path: 'claimReward/:userId', component: ClaimRewardComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }