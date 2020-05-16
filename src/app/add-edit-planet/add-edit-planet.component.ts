import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Planet } from 'src/models/planet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanetsService } from 'src/services/planets.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-planet',
  templateUrl: './add-edit-planet.component.html',
  styleUrls: ['./add-edit-planet.component.css']
})
export class AddEditPlanetComponent implements OnInit {

  isEdit: boolean;
  planet: Planet;

  form: FormGroup;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private planetService: PlanetsService, private router: Router) {
    this.route.data.pipe(first()).subscribe(result => {
      this.isEdit = result.isEdit;
      if(result.isEdit)
        this.planet = result.planet;
      else
        this.planet = new Planet();
    });
  }

  ngOnInit(): void {   
    this.initForm(); 
  }

  initForm() {
    let controls: any = {
      "name":new FormControl(this.planet.name, [Validators.required, Validators.maxLength(50)]),
      "planetNumber":new FormControl(this.planet.planetNumber, [Validators.pattern("^[0-9]*$"), Validators.required]),
      "description":new FormControl(this.planet.description)
    };

    this.form = new FormGroup(controls);
  }

  getFormField(field: string) {
    return this.form.get(field);
  }

  submitChanges() {
    this.planet.name = this.form.controls["name"].value;
    this.planet.planetNumber = ((Number)(this.form.controls["planetNumber"].value));
    this.planet.description = this.form.controls["description"].value;

    if(this.isEdit) {
      this.planetService
      .updatePlanet(this.planet)
      .subscribe(result => {
        this.openSnackBar(`Zaktualizowano ${result.name}`,3000);
        this.router.navigateByUrl(`planet-details/${result.id}`);
      });
    }
    else {
      this.planetService
      .addPlanet(this.planet)
      .subscribe(id => {
        this.openSnackBar(`Dodano ${this.planet.name}`,3000);
        this.router.navigateByUrl(`planet-details/${id}`);
      });
    }
  }

  uploadFinished(filePath: string) {
    this.planet.imagePath = filePath;
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Ok', {duration: duration, verticalPosition: 'top'});
  }

}
