import { Route } from '@angular/router';
import { MainLayoutComponent } from 'src/core/main-layout/main-layout.component';
import { gameListRoutes } from 'src/routes/games-page/game-list.routes';


export const appRoutes: Route[] = [
    {
        path:'',
        component:MainLayoutComponent,
        children:[...gameListRoutes]
    }
];
