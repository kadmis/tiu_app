import { Component, OnInit, ViewChild } from '@angular/core';
import { Planet } from 'src/models/planet';
import { PlanetsService } from 'src/services/planets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planets: MatTableDataSource<Planet>;
  columns = ['planetNumber', 'name', 'image'];

  displayTable: boolean = true;
  displayGrid: boolean;

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.planets.sort = this.sort;
  }

  @ViewChild(MatPaginator) set matPaginator(pg: MatPaginator) {
    this.paginator = pg;
    this.planets.paginator = this.paginator;
  }

  constructor(private planetService: PlanetsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.planetService.getPlanets().subscribe(result => {
      this.planets = new MatTableDataSource<Planet>(result);
    });
  }

  openSnackBar(planetDescription: string) {
    this.snackBar.open(planetDescription, 'Ok', {duration: 10000, verticalPosition: 'top'});
  }

}
