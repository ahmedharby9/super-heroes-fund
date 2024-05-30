import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {RolesEnum} from "../../auth/enums/roles.enum";
import {AuthService} from "../../auth/services/auth.service";

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnInit, OnDestroy {
  @Input() appRole!: RolesEnum[];
  private destroy$ = new Subject();

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
     this.roleCheck();


  }

  roleCheck() {
    if (this.appRole.includes(this.authService.getUserInfo()?.role?.name)) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
