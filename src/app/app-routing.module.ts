import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetsResolver } from './resolvers/planets-resolver';
import { PlanetResolver } from './resolvers/planet-resolver';
import { PlanetComponent } from './planet/planet.component';
import { AddEditPlanetComponent } from './add-edit-planet/add-edit-planet.component';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'planets',
    component: PlanetsComponent,
    resolve: { result: PlanetsResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'planet-details/:id',
    component: PlanetComponent,
    resolve: {
      planet: PlanetResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add-planet',
    component: AddEditPlanetComponent,
    data: {
      isEdit: false,
      roles:["Admin","SuperUser"]
    },
    canActivate: [AuthGuard,RoleGuard],
  },
  {
    path: 'edit-planet/:id',
    component: AddEditPlanetComponent,
    resolve: {
      planet: PlanetResolver
    },
    data: {
      isEdit: true,
      roles:["Admin","SuperUser"]
    },
    canActivate: [AuthGuard,RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
