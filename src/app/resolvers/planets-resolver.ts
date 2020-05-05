import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanetsResolver implements Resolve<Array<Planet>> {

  constructor(private service: PlanetsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Planet>> {
    return this.service.getPlanets();
  }
}
