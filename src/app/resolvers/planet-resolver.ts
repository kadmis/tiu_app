import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlanetsService } from 'src/services/planets.service';

@Injectable({ providedIn: 'root' })
export class PlanetResolver implements Resolve<Planet> {

  constructor(private service: PlanetsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Planet> {
    const id = Number.parseInt(route.paramMap.get('id'));
    return this.service.getPlanet(id);
  }
}
