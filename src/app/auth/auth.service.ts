import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import {NoConnection} from '../common/errors';
import {User} from './user';
import {mockUsers} from './mock-users';

@Injectable()
export class AuthService {

  private users: User[] = mockUsers;
  private latency = 1500;

  checkEmail(email: string): Observable<boolean> {

    /*return this.http.get('http://localhost:3000')
      .map(res => {
        console.log(res.status);
        return res.ok;
      })
      .catch(err => {
        throw new Error();
      });*/

    const foundUser = this.users.find(user => user.email === email);
    return Observable.of(!foundUser).delay(this.latency);
  }

  signUp(email: string, password: string): Observable<null> {
    const newUser: User = { email, password };
    this.users.push(newUser);
    return Observable.of(null).delay(this.latency);
  }
}
