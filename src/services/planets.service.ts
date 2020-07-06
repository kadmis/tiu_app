import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { Observable } from 'rxjs';
import { UploadResult } from 'src/models/upload-result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlanetFilters } from 'src/models/filters/planet-filters';
import { stringify } from 'querystring';
import { FilteringAndPagingResult } from 'src/models/filtering-and-paging-result';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private baseUrl = 'https://localhost:5001/api/planets';
  public pageSize: number = 4;
  public pageNumber: number = 1;

  constructor(private httpClient: HttpClient) { }

  getPlanet(id: number): Observable<Planet> {
    return this.httpClient.get<Planet>(`${this.baseUrl}/${id}`);
  }

  getPlanets(): Observable<Array<Planet>> {
    return this.httpClient.get<Array<Planet>>(`${this.baseUrl}`);
  }

  getFiltered(filters: PlanetFilters, pageSize: number, pageNumber: number): Observable<FilteringAndPagingResult> {
    var params = new HttpParams();
    if(filters.planetName) {
      params = params.append('planetName', filters.planetName);
    }   
    if(filters.planetNumberFrom) {
      params = params.append('planetNumberFrom', filters.planetNumberFrom.toString());
    }
    if(filters.planetNumberTo) {
      params = params.append('planetNumberTo', filters.planetNumberTo.toString());
    }    
    if(filters.orderBy) {
      params = params.append('orderBy', filters.orderBy);
    } 
    if(filters.order) {
      params = params.append('order', filters.order);
    }
    params = params.append('pageSize', pageSize.toString());
    params = params.append('pageNumber', pageNumber.toString());
    return this.httpClient.get<FilteringAndPagingResult>(`${this.baseUrl}/filtered`, {params:params});
  }

  addPlanet(planet: Planet): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, planet);
  }

  updatePlanet(planet: Planet): Observable<Planet> {
    return this.httpClient.put<Planet>(`${this.baseUrl}`, planet);
  }

  deletePlanet(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  uploadImage(data: FormData) : Observable<UploadResult> {
    return this.httpClient.post<UploadResult>(`${this.baseUrl}/upload-image`,data);
  }
}
