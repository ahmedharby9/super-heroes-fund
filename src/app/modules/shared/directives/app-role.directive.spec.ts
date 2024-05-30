import { RoleDirective } from './app-role.directive';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { RolesEnum } from "../../auth/enums/roles.enum";
import { AuthService } from "../../auth/services/auth.service";

describe('RoleDirective', () => {
  let directive: RoleDirective;
  let templateRef: TemplateRef<any>;
  let viewContainerRef: ViewContainerRef;
  let authService: AuthService;

  beforeEach(() => {
    templateRef = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    authService = jasmine.createSpyObj('AuthService', ['getUserInfo']);
    directive = new RoleDirective(templateRef, viewContainerRef, authService);
  });

  it('should create embedded view when role matches', () => {
    (authService.getUserInfo as any).and.returnValue({ role: { name: RolesEnum.ADMIN } });
    directive.appRole = [RolesEnum.ADMIN];
    directive.roleCheck();
    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
  });

  it('should clear view when role does not match', () => {
    (authService.getUserInfo as any).and.returnValue({ role: { name: RolesEnum.HERO } });
    directive.appRole = [RolesEnum.ADMIN];
    directive.roleCheck();
    expect(viewContainerRef.clear).toHaveBeenCalled();
  });
  //
  it('should clear view when no role is provided', () => {
    (authService.getUserInfo as any).and.returnValue({ role: { name: RolesEnum.ADMIN } });
    directive.appRole = [];
    directive.roleCheck();
    expect(viewContainerRef.clear).toHaveBeenCalled();
  });

  it('should clear view when user has no role', () => {
    (authService.getUserInfo as any).and.returnValue({});
    directive.appRole = [RolesEnum.ADMIN];
    directive.roleCheck();
    expect(viewContainerRef.clear).toHaveBeenCalled();
  });
});
