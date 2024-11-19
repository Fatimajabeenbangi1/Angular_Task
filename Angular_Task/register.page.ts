import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  interests: string[] = [];
  addressType: string = 'home';
  photo: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
      age: [25],
      addressType: ['home'],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
    });
  }

  onPhotoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // Add validation for 310x325 px size
    this.photo = URL.createObjectURL(file);
  }

  addInterest(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value.trim();
    if (input) {
      this.interests.push(input);
      (event.target as HTMLInputElement).value = '';
    }
  }

  removeInterest(interest: string) {
    this.interests = this.interests.filter((i) => i !== interest);
  }

  onAddressChange(type: string) {
    this.addressType = type;
  }

  onSubmit() {
    const formData = { ...this.registerForm.value, photo: this.photo, interests: this.interests };
    this.userService.createUser(formData).subscribe((user) => {
      this.router.navigate(['/profile', user.id]);
    });
  }
}
