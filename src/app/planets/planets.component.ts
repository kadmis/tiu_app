import { Component, OnInit, ViewChild } from '@angular/core';
import { Planet } from 'src/models/planet';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetsService } from 'src/services/planets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import { PlanetFilters } from 'src/models/filters/planet-filters';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dictionary } from 'src/models/dictionary';
import { ExportCSVService } from 'src/services/export-csv.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planets: MatTableDataSource<Planet>;
  planetsFilters: PlanetFilters;

  pageSize: number;
  pageNumber: number;
  paginatorLength: number;

  filtersForm: FormGroup;
  columns = ['planetNumber', 'name', 'image', 'actions'];
  selectOrderByOpts: Array<Dictionary>;
  selectOrderOpts: Array<Dictionary>;

  displayTable: boolean;
  displayGrid: boolean = true;

  filtersStorageKey: string;

  constructor
  (
    private service: PlanetsService, 
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private authService: AuthService,
    private exportService: ExportCSVService
  ) 
  {
    this.route.data.subscribe(data => {
      this.planets = new MatTableDataSource(data.result.planets);
      this.paginatorLength = data.result.totalItems;     
    });  

    this.filtersStorageKey = 'filters'+this.authService.getCurrentUserId();

    let savedFilters = JSON.parse(localStorage.getItem(this.filtersStorageKey)); 
    if(savedFilters) {
      this.planetsFilters = savedFilters;           
    }
    else {
      this.planetsFilters = new PlanetFilters();
    }

    this.pageSize = this.service.pageSize;
    this.pageNumber = this.service.pageNumber;
  }

  ngOnInit(): void {
    this.initFiltersForm();
  }

  initSelect(): void {
    this.selectOrderByOpts = new Array<Dictionary>(new Dictionary('name','Nazwa'),new Dictionary('planetnumber','Numer'));
    this.selectOrderOpts = new Array<Dictionary>(new Dictionary('asc','Rosnąco'),new Dictionary('desc','Malejąco'));
  }
  initFiltersForm(): void {
    let controls: any = {
      "name":new FormControl(this.planetsFilters.planetName),
      "planetNumberFrom":new FormControl(this.planetsFilters.planetNumberFrom, [Validators.pattern("^[0-9]*$")]),
      "planetNumberTo":new FormControl(this.planetsFilters.planetNumberTo, [Validators.pattern("^[0-9]*$")]),
    };

    this.filtersForm = new FormGroup(controls);

    this.initSelect();
  }
  getFormField(field: string) {
    return this.filtersForm.get(field);
  }

  onPageEvent(pageEvent: PageEvent): void {
    if(pageEvent) {
      this.pageSize = pageEvent.pageSize;
      this.pageNumber = pageEvent.pageIndex+1;
    }
    this.onGetFiltered();   
  }

  onAcceptFormFilters(): void {
    this.planetsFilters.planetName = this.filtersForm.controls['name'].value; 
    this.planetsFilters.planetNumberFrom = this.filtersForm.controls['planetNumberFrom'].value; 
    this.planetsFilters.planetNumberTo = this.filtersForm.controls['planetNumberTo'].value; 

    this.onGetFiltered(); 
  }

  onGetFiltered(): void {       
    this.service.getFiltered(this.planetsFilters, this.pageSize, this.pageNumber)
    .subscribe(result=>{
      this.planets = new MatTableDataSource(result.planets);
      this.paginatorLength = result.totalItems;
    }); 
  }
  
  saveFilters(): void {
    this.planetsFilters.planetName = this.filtersForm.controls['name'].value; 
    this.planetsFilters.planetNumberFrom = this.filtersForm.controls['planetNumberFrom'].value; 
    this.planetsFilters.planetNumberTo = this.filtersForm.controls['planetNumberTo'].value; 
    this.planetsFilters.userId = this.authService.getCurrentUserId();
    
    localStorage.setItem(this.filtersStorageKey ,JSON.stringify(this.planetsFilters));
  }

  clearFilters(): void {
    this.planetsFilters = new PlanetFilters();
    this.filtersForm.reset();
    localStorage.removeItem(this.filtersStorageKey);
    this.onGetFiltered();
  }

  onDelete(id: number): void {
    this.service.deletePlanet(id).pipe(first()).subscribe(result=>{
      if(result) {
        this.openSnackBar("Usunięto element",3000);
      }
      else {
        this.openSnackBar("Usuwanie nie powiodło się",3000);
      }      
    });
  }

  exportToCSV(): void {
    this.service.getFiltered(this.planetsFilters, this.paginatorLength, 1)
    .subscribe(result=>{
      this.exportService.exportAsCSV(result.planets);
    });    
  }

  onShowDetails(id: number) {
    this.router.navigateByUrl(`planet-details/${id}`);
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Ok', {duration: duration, verticalPosition: 'top'});
  }

  isDeletingEnabled(): boolean {
    return this.authService.isAdmin();
  }

  onSwitchViewMode(): void {
    this.displayGrid=!this.displayGrid;
    this.displayTable=!this.displayTable;
  }

}
