import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { Observable } from 'rxjs';
import { PlanetFilters } from 'src/models/filters/planet-filters';
import { FilteringAndPagingResult } from 'src/models/filtering-and-paging-result';
import { AuthService } from 'src/services/auth.service';

@Injectable({ providedIn: 'root' })
export class PlanetsResolver implements Resolve<FilteringAndPagingResult> {

  constructor(private service: PlanetsService, private authService: AuthService) {}

  resolve(): Observable<FilteringAndPagingResult> {
    let savedFilters = JSON.parse(localStorage.getItem('filters'+this.authService.getCurrentUserId())); 
    let planetsFilters: PlanetFilters;

    if(savedFilters) {
      planetsFilters = savedFilters;    
    }
    else {
      planetsFilters = new PlanetFilters();
    }
    return this.service.getFiltered(planetsFilters,this.service.pageSize,this.service.pageNumber);
  }
}
