import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {InputComponent} from './input.component';
import {AuthService} from './auth.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    InputComponent,
    PasswordResetComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
