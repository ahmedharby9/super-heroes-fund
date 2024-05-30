import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {RolesEnum} from "../../../auth/enums/roles.enum";
import {RoleDirective} from "../../../shared/directives/app-role.directive";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RoleDirective
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  isLogged = false;
  roleEnum = RolesEnum;

  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService?.isAuthenticated();
    this.authService?.authState$.subscribe((state) => {
      this.isLogged = state.isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);
  }
}
