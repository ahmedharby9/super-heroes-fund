import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {DashboardLayoutComponent} from './dashboard-layout.component';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({

      providers: [
        provideRouter([]),
        {provide: AuthService, useValue: authService},
      ]
    }).overrideComponent(DashboardLayoutComponent, {}).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on AuthService when onLogout is called', () => {
    spyOn(window, 'setTimeout');
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });

});
