import { Component, OnInit, ViewChild } from '@angular/core';
import { Planet } from 'src/models/planet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetsService } from 'src/services/planets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planets: MatTableDataSource<Planet>;
  columns = ['planetNumber', 'name', 'image','actions'];

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

  constructor(private service: PlanetsService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
    this.route.data.subscribe(data => {
      this.planets = new MatTableDataSource(data.planets);
    });
  }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.service.deletePlanet(id).pipe(first()).subscribe(result=>{
      if(result) {
        this.openSnackBar("Usunieto element",3000);
      }
      else {
        this.openSnackBar("Usuwanie nie powiodlo sie",3000);
      }      
    });
  }

  onShowDetails(id: number) {
    this.router.navigateByUrl(`planet-details/${id}`);
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Ok', {duration: duration, verticalPosition: 'top'});
  }

}
