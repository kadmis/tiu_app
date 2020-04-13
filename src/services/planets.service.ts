import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planets: Planet[] =
  [
    new Planet(1, 'Merkury', 'Najmniejsza i najbliższa Słońca planeta Układu Słonecznego.', 'assets/mercury.jpg'),
    new Planet(2, 'Wenus', 'Druga pod względem odległości od Słońca planeta Układu Słonecznego.', 'assets/venus.jpg'),
    new Planet(3, 'Ziemia', 'Trzecia, licząc od Słońca, oraz piąta pod względem wielkości planeta Układu Słonecznego.', 'assets/earth.jpg'),
    new Planet(4, 'Mars', 'Czwarta od Słońca planeta Układu Słonecznego.', 'assets/mars.jpg'),
    new Planet(5, 'Jowisz', 'Piąta w kolejności od Słońca i największa planeta Układu Słonecznego', 'assets/jupiter.jpg'),
    new Planet(6, 'Saturn', 'Szósta planeta Układu Słonecznego pod względem odległości od Słońca, druga po Jowiszu pod względem masy i wielkości', 'assets/saturn.jpg'),
    new Planet(7, 'Uran', 'Siódma od Słońca planeta Układu Słonecznego, trzecia pod względem wielkości i czwarta pod względem masy.', 'assets/uranus.jpg'),
    new Planet(8, 'Neptun', 'Ósma, najdalsza od Słońca planeta w Układzie Słonecznym, czwarta pod względem średnicy i trzecia pod względem masy', 'assets/neptune.jpg')
  ];

  private dataSource = new BehaviorSubject(this.planets);
  data = this.dataSource.asObservable();

  constructor() { }
}
