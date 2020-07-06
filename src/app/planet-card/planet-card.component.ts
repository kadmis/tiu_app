import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.css']
})
export class PlanetCardComponent implements OnInit {

  @Input() planet: Planet;

  constructor
  (
    private snackBar: MatSnackBar, 
    private planetService: PlanetsService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  onDelete() {
    this.planetService
    .deletePlanet(this.planet.id)
    .pipe(first())
    .subscribe(success=>{
      if(success) {
        this.openSnackBar("Poprawnie usunięto planetę",3000);
      }
      else {
        this.openSnackBar("Nie udało się usunąć planety",3000);
      }
    });
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Ok', {duration: duration, verticalPosition: 'top'});
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
