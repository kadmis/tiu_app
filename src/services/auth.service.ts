import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthResult } from 'src/models/auth-result';
import { Credentials } from 'src/models/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:5001/api/authorization';
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(credentials: Credentials): Observable<AuthResult> {
    return this.httpClient.post<AuthResult>(`${this.baseUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');

    this.router.navigateByUrl('');
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(token);
    return token && !isExpired;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getCurrentUserRoles(): string[] {
    let roles = localStorage.getItem('roles');

    if(!roles)
      return [];
      
    let rolesArray = roles.split(',');
    return rolesArray;
  }

  getCurrentUserId(): number {
    let userId = localStorage.getItem('user-id');
    return Number.parseInt(userId);
  }

  isAdmin(): boolean {
    let roles = this.getCurrentUserRoles();
    return roles.includes("Admin");
  }

  isSuperuser(): boolean {
    let roles = this.getCurrentUserRoles();
    return roles.includes("SuperUser");
  }
}
