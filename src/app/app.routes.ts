import { Route } from '@angular/router';
import { AuthLayoutComponent } from 'src/core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from 'src/core/main-layout/main-layout.component';
import { gameListRoutes } from 'src/routes/games-page/game-list.routes';


export const appRoutes: Route[] = [
    {
        path:'',
        component:MainLayoutComponent,
        children:[...gameListRoutes]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../routes/auth/auth.routes').then((r) => r.AUTH_ROUTES),
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
];
