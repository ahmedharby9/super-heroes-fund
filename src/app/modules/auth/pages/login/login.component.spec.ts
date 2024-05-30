import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    toastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toastr }
      ]
    }).overrideComponent(LoginComponent,{}).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.userForm.value).toEqual({ username: null, password: '' });
  });

  it('should not submit with empty form', () => {
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should submit with valid form and display the success message', () => {
    authService.login.and.returnValue(of({}));
    component.userForm.setValue({ username: 'test', password: 'test' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ username: 'test', password: 'test' });
    expect(toastr.success).toHaveBeenCalledWith('Logged in successfully !');
  });

  it('should submit with valid form and show error on failure', () => {
    authService.login.and.returnValue(throwError(''));
    component.userForm.setValue({ username: 'test', password: 'test' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ username: 'test', password: 'test' });
    expect(toastr.error).toHaveBeenCalledWith('Invalid username or password');
  });
});
