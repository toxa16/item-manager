import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {PasswordResetComponent} from './auth/password-reset/password-reset.component';
import {InputComponent} from './auth/input.component';
import {AppRoutingModule} from './app-routing.module';

const routes: Routes = [
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    HomepageComponent,
    PasswordResetComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
