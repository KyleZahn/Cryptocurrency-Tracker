import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

/*
  Changes the user's bitcoin value within the MongoDB database.
*/
  bitcoinChange(bitcoin) {
    const body = { bitcoin };
    return this.postAuth('users/bitcoin', body);
  }

/*
  Takes in user object, makes a POST request to register the user in the MongoDB database.
*/
  registerUser(user) {
    return this.postNoAuth('users/register', user)
    .map(res => res.json ());
  }

/*
  Takes in user object, makes a POST request to authenticate the user.
*/
  authenticateUser(user) {
    return this.postNoAuth('users/authenticate', user)
      .map(res => res.json());
  }

/*
  Returns the proper user profile based on who is currently logged in.
*/
  getProfile() {
    return this.get('users/profile');
  }

/*
  Stores the js token and respective user in the browser's localStorage.
*/
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

/*
  Function for obtaining the js token from localStorage.
*/
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

/*
  Loads the user's js token and authorizes the user.
*/
  get(url) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/' + url, {headers: headers})
      .map(res => res.json());
  }

/*
  POST request with authentication used to change the user's bitcoin amount.
*/
  postAuth(url, body) {
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/' + url, body, { headers: headers });
  }

/*
  Post request with no authentication used to register users and send authentication requests.
*/
  postNoAuth(url, body) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/' + url, body, { headers: headers });
  }

/*
  Confirms that the js token exists and has not expired.
*/
  loggedIn() {
    return tokenNotExpired('id_token');
  }

/*
  Logs the user out by declaring the user and js token as null. Also clears localStorage.
*/
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
