import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ValidationErrors} from '@angular/forms';
import {NoConnection} from '../common/errors';


@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  checkEmail(email: string): Promise<boolean> {
    //return Observable.of({ emailTaken: true }).delay(1500);
    return this.http.get('http://localhost:3000').toPromise()
      .then(res => {
        console.log(res.status);
        return res.ok;
      })
      .catch(err => {
        throw new NoConnection();
      });

    //return Observable.of(true).delay(1500);
  }
}
