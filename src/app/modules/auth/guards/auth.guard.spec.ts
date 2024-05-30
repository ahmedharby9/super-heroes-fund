import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {authGuard} from "./auth.guard";

describe('AuthGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    toastrService = jasmine.createSpyObj('ToastrService', ['warning']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: authService},
        {provide: ToastrService, useValue: toastrService},
        {provide: Router, useValue: router},
      ],
    });
  });

  it('should allow navigation when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    const aGuard = TestBed.runInInjectionContext(() => authGuard(({} as ActivatedRouteSnapshot), ({} as RouterStateSnapshot)));
    expect(aGuard).toBeTrue();
  });

  it('should not allow navigation when user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    const aGuard = TestBed.runInInjectionContext(() => authGuard(({} as ActivatedRouteSnapshot), ({} as RouterStateSnapshot)));
    expect(aGuard).toBeFalse();
    expect(toastrService.warning).toHaveBeenCalledWith('You must login to the system to access the page.!');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
