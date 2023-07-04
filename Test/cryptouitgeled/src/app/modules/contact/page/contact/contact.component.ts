import { Component, OnInit } from '@angular/core';
import { emailValidator } from 'src/app/core/helpers/validator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContactService } from '../../../../data/services/contact/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../../../data/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
/**
 * @description This component represent the contact form user can send to the admin or administration.
 */
export class ContactComponent implements OnInit {
  //The contact form with fields and validators.
  contactForm: FormGroup;

  //Flag if the form is submitted.
  isSubmitted = false;

  //Flag for loading gif
  isLoading: boolean = false;

  //Flag for server error
  serverError: boolean = false;

  isSuccessVerzonden: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Building the form with all the fields and validators.
    this.contactForm = this.formBuilder.group({
      email: ['', emailValidator],
      subject: [''],
      message: [''],
    });
  }

  /**
   * @returns all the contact form controls.
   */
  get contactFormControls() {
    return this.contactForm.controls;
  }

  /**
   * @description actions taken when the form is submitted.
   */
  onSubmit() {
    this.serverError = false;
    this.isLoading = true;
    this.isSubmitted = true;

    //Trim all the fields
    Object.keys(this.contactForm.controls).forEach((key) =>
      this.contactForm.get(key).setValue(this.contactForm.get(key).value.trim())
    );

    //Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    var contactModel = this.getContactModel();

    this.contactService.sendMail(contactModel).subscribe(
      (data) => {
        this.isLoading = false;
        this.isSuccessVerzonden = true;
        //this.router.navigate(['/']);
      },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.serverError = true;
      }
    );
  }

  /**
   * @returns a contact model with all the data from the contact form fields.
   */
  getContactModel() {
    var controls = this.contactFormControls;

    var model = new Contact(
      controls.email.value,
      controls.message.value,
      controls.subject.value,
    );
    return model;
  }

  
}
