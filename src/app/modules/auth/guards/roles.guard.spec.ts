import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {rolesGuard} from './roles.guard';

describe('rolesGuard', () => {
  let router: Router;
  let toastr: ToastrService;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    const toastrMock = {
      warning: jasmine.createSpy('warning')
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: ToastrService, useValue: toastrMock}
      ]
    });

    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
  });

  it('should redirect to login if user is not authenticated', () => {
    const routeMock: any = {
      data: {requiredRoles: ['admin']}
    };
    const stateMock: any = {};
    localStorage.removeItem('userInfo');
    TestBed.runInInjectionContext(() => rolesGuard(routeMock, stateMock));
    expect(toastr.warning).toHaveBeenCalledWith('You must login to the system to access the page.!');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to manage if user does not have required role', () => {
    const routeMock: any = {
      data: {requiredRoles: ['admin']}
    };
    const stateMock: any = {};

    localStorage.setItem('userInfo', JSON.stringify({role: {name: 'user'}}));
    TestBed.runInInjectionContext(() => rolesGuard(routeMock, stateMock));

    expect(toastr.warning).toHaveBeenCalledWith('You are not authorized to access this page');
    expect(router.navigate).toHaveBeenCalledWith(['/manage']);
  });

  it('should allow access if user has required role', () => {
    const routeMock: any = {
      data: {requiredRoles: ['admin']}
    };
    const stateMock: any = {};

    localStorage.setItem('userInfo', JSON.stringify({role: {name: 'admin'}}));
    const rGuard = TestBed.runInInjectionContext(() => rolesGuard(routeMock, stateMock));
    expect(rGuard).toBeTrue();
  });

  it('should allow access if no roles are required', () => {
    const routeMock: any = {
      data: {}
    };
    const stateMock: any = {};

    localStorage.setItem('userInfo', JSON.stringify({role: {name: 'user'}}));
    const rGuard = TestBed.runInInjectionContext(() => rolesGuard(routeMock, stateMock));
    expect(rGuard).toBeTrue();
  });
});
