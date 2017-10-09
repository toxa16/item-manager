import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {EmailInputComponent} from './sign-up/email-input.component';

const routes: Routes = [
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmailInputComponent,
    HomepageComponent,
    PasswordResetComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
