import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  template: `Home Page`,
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/sign-in']);
  }
}
