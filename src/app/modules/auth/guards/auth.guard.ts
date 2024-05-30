import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  let logged = authService.isAuthenticated();
  if (logged) {
    return true;
  }
  toastr.warning('You must login to the system to access the page.!');
  router.navigate(['/login']);
  return false;
};
