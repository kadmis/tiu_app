import { Component, OnInit, OnDestroy } from '@angular/core';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  planet: Planet;
  
  dataSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(first()).subscribe(result => {
      this.planet = result.planet;
    });
  }

  ngOnInit(): void {
  }

}
