import { UserDTO } from './../../../../data/models/dto/userDTO';
import { UserService } from 'src/app/data/services/user/user.service';
import { UserSaveDTO } from './../../../../data/models/dto/userSaveDTO';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/data/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //Register student component
  registerStudentComponent: any;
  @ViewChild('registerStudent') set contentStudent(content: ElementRef) {
    if (content) {
      this.registerStudentComponent = content;
    }
  }

  //Register company component
  registerCompanyComponent: any;
  @ViewChild('registerCompany') set content(content: ElementRef) {
    if (content) {
      this.registerCompanyComponent = content;
    }
  }

  //Flag if user is student
  isStudent = true;

  //Flag for loading gif
  isLoading = false;

  //Flag for error
  isError = false;

  //Flag for email already taken error
  isErrorEmailAlreadyTaken = false;

  //Flag for username already taken error
  isErrorUserNameAlreadyTaken = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  /**
   * @description Switch the form component
   * @param bool True or false
   */
  onClickRegister(bool) {
    this.resetErrors();
    this.isStudent = bool;
  }

  /**
   * @description Register the user
   * @param model The model with data from the form
   */
  onRegister(userReadyToPay: UserSaveDTO) {
    this.resetErrors();
    this.setLoading(true);
    this.userService.getUserByUsername(userReadyToPay.username).subscribe((userDTO: UserDTO) => {
      console.log(userDTO)
      if(!userDTO){
        this.userService.getUserByEmail(userReadyToPay.email).subscribe((userDTO: UserDTO) => {
          if(!userDTO){
            this.authenticationService.userReadyToPay = userReadyToPay;
            this.router.navigate(['/authentication/payment']);
          }else{
            this.isErrorEmailAlreadyTaken = true;
            this.setLoading(false)
          }
        })
      }else{
        this.isErrorUserNameAlreadyTaken = true;
        this.setLoading(false)
      }
    })
  }

  //Sets error flag to true
  catchServerError() {
    this.isError = true;
  }

  /**
   * Checks if there is an error, if there is an error it will be set on true to show the error message
   * @param error true or false
   */
  handleErrorMessage(error) {
    if (error === "emailIsAlreadyUsed") {
      this.isErrorEmailAlreadyTaken = true;
    }
    if(error === "usernameIsAlreadyUsed") {
      this.isErrorUserNameAlreadyTaken = true;
    }
  }
  /**
   * Sets all the error messages on false
   */
  resetErrors() {
    this.isError = false;
    this.isErrorEmailAlreadyTaken = false;
    this.isErrorUserNameAlreadyTaken = false;
  }

  /**
   * Set loading gif if it needs to be displayed
   * @param boolean true or false
   */
  setLoading(boolean) {
    this.isLoading = boolean;
    if (
      this.registerStudentComponent != undefined &&
      this.registerStudentComponent != null
    ) {
      this.registerStudentComponent.isLoading = boolean;
    }
    if (
      this.registerCompanyComponent != undefined &&
      this.registerCompanyComponent != null
    ) {
      this.registerCompanyComponent.isLoading = boolean;
    }
  }
}
