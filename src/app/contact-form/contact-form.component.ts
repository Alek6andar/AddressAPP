import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact?: Contact;
  contactForm!: FormGroup;
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/)]]
    });

    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  saveContact(): void {
    this.isFormSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    const contact: Contact = this.contactForm.value;

    if (this.contact) {
      this.contactService.updateContact(this.contact.id, contact).subscribe(() => {
        // Handle success
      });
    } else {
      this.contactService.createContact(contact).subscribe(() => {
        // Handle success
      });
    }
  }
}

