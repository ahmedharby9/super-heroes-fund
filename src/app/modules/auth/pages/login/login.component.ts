import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ValidationMessageDirective} from "../../../shared/directives/validation-message.directive";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlert,
    ValidationMessageDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  userForm: FormGroup;

  constructor(private readonly authService: AuthService, private readonly router:Router, private readonly toastr: ToastrService){
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  this.authService.logout();
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    this.authService.login(this.userForm.value).subscribe({
      next: () => {
        this.toastr.success('Logged in successfully !');
        setTimeout(() => {
         this.router.navigate(['/manage/']);
        } , 1000);
      },
      error: () => {
        this.toastr.error('Invalid username or password');
      }
    });
  }
}
