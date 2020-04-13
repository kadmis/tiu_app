import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/models/planet';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.css']
})
export class PlanetCardComponent implements OnInit {

  @Input() planet: Planet;

  constructor() { }

  ngOnInit(): void {
  }

}
