import { UserSaveDTO } from '../../../../data/models/dto/userSaveDTO';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mustMatch } from 'src/app/core/helpers/mustMatch';
import {
  emailValidator,
  passwordValidator,
} from 'src/app/core/helpers/validator';

@Component({
  selector: 'app-register-subscriber',
  templateUrl: './register-subscriber.component.html',
  styleUrls: ['./register-subscriber.component.scss'],
})
export class RegisterSubscriberComponent implements OnInit {

  //Flag if request is submitted
  isSubmitted = false;

  //Flag for loading gif
  @Input() isLoading = false;

  //The form with all its fields and validators
  @Input() studentForm: FormGroup;

  //The eventemitter to emit data to the register component
  @Output()
  register: EventEmitter<UserSaveDTO> = new EventEmitter<UserSaveDTO>();

  //The error message
  error: string;

  //Conventient getter -> returns all the form controls
  get studentFormControls() {
    return this.studentForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Building the form with all the fields and validators.
    this.studentForm = this.formBuilder.group(
      {
        username: [''],
        firstName: [''],
        name: [''],
        email: ['', emailValidator],
        password: ['', passwordValidator],
        confirmPassword: ['', passwordValidator],
      },
      {
        //Password and confirm password have to match.
        validator: mustMatch('password', 'confirmPassword'),
      }
    );
  }

  /**
   * @description Actions taken when the form is submitted.
   */
  onSubmit() {
    this.isSubmitted = true;

    //Trim all the fields
    Object.keys(this.studentForm.controls).forEach((key) =>
      this.studentForm.get(key).setValue(this.studentForm.get(key).value.trim())
    );

    if (this.studentForm.invalid) {
      return;
    }

    //Get the model with all the data from the form.
    var model: UserSaveDTO = this.getStudentFromForm();

    //Emit the model to the register component.
    this.register.emit(model);
  }

  /**
   * @returns a model with all the data from the form fields.
   */
  getStudentFromForm() {
    var controls = this.studentFormControls;
    var model = new UserSaveDTO(
      controls.username.value,
      controls.firstName.value,
      controls.name.value,
      controls.email.value,
      controls.password.value
    );

    return model;
  }
}
