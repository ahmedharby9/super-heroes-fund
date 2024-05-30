import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export const rolesGuard: CanActivateFn = (route, state) => {
  const requiredRoles = route.data['requiredRoles'];
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (requiredRoles && requiredRoles.length) {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo')!);
    if (!userInfo) {
      toastr.warning('You must login to the system to access the page.!');
      router.navigate(['/login']);
      return false;
    }
    if (!requiredRoles.includes(userInfo.role.name)) {
      toastr.warning('You are not authorized to access this page');
      router.navigate(['/manage']);
      return false;
    }
  }
  return true;
};

