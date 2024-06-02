import { Component} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../services/token/token.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', passwordHash: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService

  ) {

  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next:(res)=> {
        this.tokenService.token = res.token as string;
        this.router.navigate(['wishlists']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors){
          this.errorMsg = err.error.validationErrors;
        }else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);

  }
}
