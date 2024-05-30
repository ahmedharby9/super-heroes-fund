import {Routes} from '@angular/router';
import {ViewHeroesComponent} from "./modules/heroes/pages/view-heroes/view-heroes.component";
import {MainLayoutComponent} from "./modules/core/pages/main-layout/main-layout.component";
import {authGuard} from "./modules/auth/guards/auth.guard";
import {DashboardLayoutComponent} from "./modules/core/pages/dashboard-layout/dashboard-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ViewHeroesComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routes').then(routes => routes.AuthRoutes)
      }
    ]
  },
  {
    path: 'manage',
    loadChildren: () => import('./modules/heroes/heroes.routes').then(routes => routes.HeroesRoutes)
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
];
