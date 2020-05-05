import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private baseUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getPlanet(id: number): Observable<Planet> {
    return this.httpClient.get<Planet>(`${this.baseUrl}planets/${id}`);
  }

  getPlanets(): Observable<Array<Planet>> {
    return this.httpClient.get<Array<Planet>>(`${this.baseUrl}planets`);
  }

  addPlanet(planet: Planet): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}planets/add`, planet);
  }

  updatePlanet(planet: Planet): Observable<Planet> {
    return this.httpClient.put<Planet>(`${this.baseUrl}planets/update`, planet);
  }

  deletePlanet(id: number): void {
    this.httpClient.delete(`${this.baseUrl}planets/delete/${id}`);
  }
}
