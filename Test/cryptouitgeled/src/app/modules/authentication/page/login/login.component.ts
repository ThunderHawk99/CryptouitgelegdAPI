import { TokenDTO } from './../../../../data/models/dto/tokenDTO';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { emailValidator } from 'src/app/core/helpers/validator';
import { AuthenticationService } from 'src/app/data/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
/**
 * LoginComponent: Via this component users are able to login with their email and password
 */
export class LoginComponent implements OnInit {
  //This loginform contains the email and password
  loginForm: FormGroup;

  //Flag for loading gif
  isLoading = false;

  //Flag if request is submitted
  isSubmitted = false;

  //Flag if there is error
  isError = false;

  //Flag for server error
  serverError: boolean = false;

  welcomeText = 'Welkom terug!'

  //Convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      const paramsObject = { ...params.keys, ...params };
      const value = paramsObject['origin']
      if(value){
        this.welcomeText = 'Uw account werd successvol aangemaakt! Probeer eens in te loggen.'
      }
    }
  );
    //Setting up validators
    this.loginForm = this.formBuilder.group({
      email: ['', emailValidator],
      password: ['', Validators.required],
    });
  }

  /**
   * @description Actions taken when clicked on 'Log in'.
   */
  onSubmit() {
    this.isError = false;
    this.isLoading = true;
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      this.loginInvalidActions();
    } else {
      this.loginValidActions();
    }
  }

  /**
   * @description Actions taken when the login failed.
   */
  loginInvalidActions() {
    this.isLoading = false;
  }

  /**
   * @description Actions taken when the login is valid.
   */
  loginValidActions() {
    this.isError = false;
    this.serverError = false;
    this.authenticationService
      .login(this.form.email.value, this.form.password.value)
      .subscribe((tokenResponse: TokenDTO) => {
        this.isLoading = false;
        this.ngZone.run(() => { this.router.navigate(['/']); })
      },error => {
        this.isError = true;
        this.isLoading = false;
      })
  }
}
