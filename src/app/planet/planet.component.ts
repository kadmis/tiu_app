import { Component, OnInit, OnDestroy } from '@angular/core';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit, OnDestroy {

  planet: Planet;
  isEdit: boolean;
  
  dataSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.dataSubscription = this.route.data.subscribe(result => {
      this.planet = result.planet;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
