import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mustMatch } from 'src/app/core/helpers/mustMatch';
import { passwordValidator } from 'src/app/core/helpers/validator';
import { UpdatePasswordRequest } from 'src/app/data/models/UpdatePasswordRequest';
import { UserService } from 'src/app/data/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  //Password form
  passwordForm: FormGroup;

  //Flag for if it is submitted
  isSubmitted = false;

  //User token
  token: string;

  //Email
  email: string;

  //Flag to show error
  showError = false;

  //Update password model
  updatePasswordModel: UpdatePasswordRequest;

  //Error message
  error: string;

  //Flag for loading gif
  isLoading: boolean = false;

  //Flag for server error
  serverError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  //Create password form
  ngOnInit() {
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', passwordValidator],
        confirmPassword: ['', passwordValidator],
      },
      {
        validator: mustMatch('password', 'confirmPassword'),
      }
    );

    this.route.queryParams.subscribe((params) => {
      //the token that was made in the backend, and placed in the url
      const token = params['token'];
      //user email
      const email = params['email'];
      this.token = token;
      this.email = email;
      //it wont be possible to change ur password if there isnt a valid token
    });
  }

  /**
   *  @description Displays the update form if you forget your password
   */
  get updateFormControls() {
    return this.passwordForm.controls;
  }

  /**
   * @description When you click the submit button
   * @returns true or false
   */
  onSubmit() {
    this.isSubmitted = true;
    this.serverError = false;
    this.isLoading = true;

    //if password is empty, no request to the api is send
    Object.keys(this.passwordForm.controls).forEach((key) =>
      this.passwordForm
        .get(key)
        .setValue(this.passwordForm.get(key).value.trim())
    );

    if (this.passwordForm.invalid) {
      this.isLoading = false;
      return;
    }

    var controls = this.updateFormControls;
    //making an object with a new password
    this.updatePasswordModel = new UpdatePasswordRequest(
      this.email,
      this.token,
      controls.password.value
    );
    //send the new object to the backand to save in the database
    this.userService.resetPassword(this.updatePasswordModel).subscribe(
      (data) => {
        this.router.navigate(['/authentication/change-message']);
      },
      (error) => {
        this.isLoading = false;
        this.showError = true;
        this.error = error;
        this.serverError = true;
      }
    );
  }
}
