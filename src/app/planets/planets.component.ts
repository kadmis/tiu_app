import { Component, OnInit, ViewChild } from '@angular/core';
import { Planet } from 'src/models/planet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from 'src/services/planets.service';

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

  dataSubscription: Subscription;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.planets.sort = this.sort;
  }

  @ViewChild(MatPaginator) set matPaginator(pg: MatPaginator) {
    this.paginator = pg;
    this.planets.paginator = this.paginator;
  }

  constructor(private service: PlanetsService, private route: ActivatedRoute) {
    this.dataSubscription = this.route.data.subscribe(data => {
      this.planets = new MatTableDataSource(data.planets);
    });
  }

  ngOnInit(): void {
  }

}
