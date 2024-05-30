import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {passwordMatchValidator} from "../../../shared/validators/password-match.fn";
import {AuthService} from "../../services/auth.service";
import {GenderEnum} from "../../enums/gender.enum";
import {Router} from "@angular/router";
import {ValidationMessageDirective} from "../../../shared/directives/validation-message.directive";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageDirective],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  genderEnum = GenderEnum;

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly toastr: ToastrService) {
  }

  ngOnInit() {

    this.registrationForm = new FormGroup({
      profile: new FormGroup({
        'fullName': new FormControl(null, Validators.required),
        'age': new FormControl(null, [Validators.required, Validators.min(18), Validators.max(80)]),
        'gender': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.email]),
        'phone': new FormControl(null),
        'city': new FormControl(null),
        'address': new FormControl(null),
        'summary': new FormControl(null),
      }),
      userAccount: new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl(null, [Validators.required, passwordMatchValidator])
      })
    }, {validators: passwordMatchValidator});

  }

  getProfileControl(name: string): AbstractControl {
    return this.registrationForm.get(`profile.${name}`)!;
  }

  getUsrAccountControl(name: string): AbstractControl {
    return this.registrationForm.get(`userAccount.${name}`)!;
  }

  onSubmit() {

    if (this.registrationForm.valid) {
      const payload = this.registrationForm.value;
      delete payload.userAccount.confirmPassword;
      this.authService.register(payload).subscribe((res: any) => {
        this.toastr.success('Registration successful !');
        this.router.navigate(['/auth/login']);
      })
    }
  }
}
