import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetsResolver } from './resolvers/planets-resolver';
import { PlanetResolver } from './resolvers/planet-resolver';
import { PlanetComponent } from './planet/planet.component';
import { AddEditPlanetComponent } from './add-edit-planet/add-edit-planet.component';


const routes: Routes = [
  {
    path: '',
    component: PlanetsComponent,
    resolve: { planets: PlanetsResolver }
  },
  {
    path: 'planet-details/:id',
    component: PlanetComponent,
    resolve: {
      planet: PlanetResolver
    }
  },
  {
    path: 'add-planet',
    component: AddEditPlanetComponent,
    data: {
      isEdit: false
    }
  },
  {
    path: 'edit-planet/:id',
    component: AddEditPlanetComponent,
    resolve: {
      planet: PlanetResolver
    },
    data: {
      isEdit: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
