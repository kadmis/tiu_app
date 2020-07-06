import { Component, OnInit, OnDestroy } from '@angular/core';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  planet: Planet;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.data.pipe(first()).subscribe(result => {
      this.planet = result.planet;
    });
  }

  ngOnInit(): void {
  }

  isEditingEnabled(): boolean {
    return this.authService.isAdmin() || this.authService.isSuperuser();
  }

}
