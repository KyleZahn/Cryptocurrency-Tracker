import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  bitcoin: number;
  ether: number;
  litecoin: number;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

/*
  Creates a user object with all information filled in with the user to be passed to the API.
*/
  onRegisterSubmit() {
    const user = {
      email: this.email,
      username: this.username,
      password: this.password,
      bitcoin: this.bitcoin,
      ether: this.ether,
      litecoin: this.litecoin
    }

/*
  Confirms that the user has filled in the proper fields.
*/
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all of the fields.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }


/*
  Validate that the email entered by the user matches proper formatting.
*/
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter a valid email.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }


/*
  Registers the user, if successful navigates to login page. If unsuccessful, displays error message.
*/
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can log in.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Registration unsuccessful', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}


