import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadResult } from 'src/models/upload-result';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private baseUrl = 'https://localhost:5001/api/planets';

  constructor(private httpClient: HttpClient) { }

  getPlanet(id: number): Observable<Planet> {
    return this.httpClient.get<Planet>(`${this.baseUrl}/${id}`);
  }

  getPlanets(): Observable<Array<Planet>> {
    return this.httpClient.get<Array<Planet>>(`${this.baseUrl}`);
  }

  addPlanet(planet: Planet): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}/add`, planet);
  }

  updatePlanet(planet: Planet): Observable<Planet> {
    return this.httpClient.put<Planet>(`${this.baseUrl}/update`, planet);
  }

  deletePlanet(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/delete/${id}`);
  }

  uploadImage(data: FormData) : Observable<UploadResult> {
    return this.httpClient.post<UploadResult>(`${this.baseUrl}/upload-image`,data);
  }
}
