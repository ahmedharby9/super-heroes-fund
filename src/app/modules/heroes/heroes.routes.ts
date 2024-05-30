import {ViewHeroesComponent} from "./pages/view-heroes/view-heroes.component";
import {authGuard} from "../auth/guards/auth.guard";
import {RolesEnum} from "../auth/enums/roles.enum";
import {AddHeroComponent} from "./pages/add-hero/add-hero.component";
import {rolesGuard} from "../auth/guards/roles.guard";
import {HeroProfileComponent} from "./pages/hero-profile/hero-profile.component";
import {Routes} from "@angular/router";
import {DashboardLayoutComponent} from "../core/pages/dashboard-layout/dashboard-layout.component";

export const HeroesRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: ViewHeroesComponent
      },
      {
        path: 'add',
        component: AddHeroComponent,
        canActivate: [rolesGuard],
        data: {
          requiredRoles: [RolesEnum.ADMIN]
        }
      },
      {
        path: 'profile/:id',
        component: HeroProfileComponent,
        canActivate: [authGuard],
        data: {
          requiredRoles: [RolesEnum.ADMIN, RolesEnum.HERO]
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
