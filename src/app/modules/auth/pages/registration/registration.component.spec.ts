import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationComponent } from './registration.component';
import { AuthService } from '../../services/auth.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    toastr = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toastr }
      ]
    }).overrideComponent(RegistrationComponent,{}).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    const expectedFormValue = {
      profile: {
        fullName: null,
        age: null,
        gender: null,
        email: null,
        phone: null,
        city: null,
        address: null,
        summary: null
      },
      userAccount: {
        username: null,
        password: null,
        confirmPassword: null
      }
    };
    expect(component.registrationForm.value).toEqual(expectedFormValue);
  });

  it('should not submit with empty form', () => {
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should submit with valid form and display the success message', () => {
    const mockFormValue:any = {
      profile: {
        fullName: 'Test User',
        age: 25,
        gender: 'Male',
        email: 'test@test.com',
        phone: '1234567890',
        city: 'Test City',
        address: 'Test Address',
        summary: 'Test Summary'
      },
      userAccount: {
        username: 'testuser',
        password: 'testpassword',
        confirmPassword: 'testpassword'
      }
    };
    authService.register.and.returnValue(of({}));
    component.registrationForm.setValue(mockFormValue);
    component.onSubmit();
    delete mockFormValue.userAccount.confirmPassword;
    expect(authService.register).toHaveBeenCalledWith(mockFormValue);
    expect(toastr.success).toHaveBeenCalledWith('Registration successful !');
  });

  it('should not submit with invalid form', () => {
    const mockFormValue = {
      profile: {
        fullName: 'Test User',
        age: 17, // age is less than 18
        gender: 'Male',
        email: 'test@test.com',
        phone: '1234567890',
        city: 'Test City',
        address: 'Test Address',
        summary: 'Test Summary'
      },
      userAccount: {
        username: 'testuser',
        password: 'testpassword',
        confirmPassword: 'testpassword'
      }
    };
    component.registrationForm.setValue(mockFormValue);
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
  });
});
