import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailRequest } from 'src/app/data/models/emailRequest';
import { UserService } from 'src/app/data/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  //Email form group
  emailForm: FormGroup;

  //Flag if it is submitted
  submitted = false;

  //Flag for errors
  error: boolean = false;

  //Flag for server errors
  serverError: boolean = false;

  //Flag to the message
  showMessage = false;

  //Flag for the loading gif
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    //Building the email form
    this.emailForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  /**
   * @description Actions taken when the form is being submitted
   */
  onSubmit() {
    //If email is empty, than there wont be a request send to change the password
    if (this.emailForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = false;
    this.serverError = false;

    //filled in email
    var email = this.emailForm.controls.email.value;
    //Define EmailRequest object
    const emrq = new EmailRequest(email);
    //request send to the api
    this.userService.forgotPassword(emrq).subscribe(
      (data) => {
        this.isLoading = false;
        this.router.navigate(['/authentication/message']);
      },
      (error) => {
        this.isLoading = false;
        if (error.error.emailNotFound) {
          this.error = true;
        } else {
          this.serverError = true;
        }
      }
    );
  }
}
