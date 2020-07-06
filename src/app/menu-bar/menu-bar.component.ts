import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAddingAllowed(): boolean {
    return this.authService.isAdmin() || this.authService.isSuperuser();
  }

}
