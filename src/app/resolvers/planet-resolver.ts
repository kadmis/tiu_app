import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlanetsService } from 'src/services/planets.service';

@Injectable({ providedIn: 'root' })
export class PlanetResolver implements Resolve<Planet> {

  constructor(private service: PlanetsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Planet> {
    const id = Number(route.paramMap.get('id'));
    return this.service.getPlanet(id);
  }
}
