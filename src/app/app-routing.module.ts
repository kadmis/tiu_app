import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetsResolver } from './resolvers/planets-resolver';
import { PlanetResolver } from './resolvers/planet-resolver';
import { PlanetComponent } from './planet/planet.component';


const routes: Routes = [
  {
    path: 'planets',
    component: PlanetsComponent,
    resolve: {
      planets: PlanetsResolver
    }
  },
  {
    path: 'planet/:id',
    component: PlanetComponent,
    resolve: {
      planet: PlanetResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
