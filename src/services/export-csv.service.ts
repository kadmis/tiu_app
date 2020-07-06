import { Injectable } from '@angular/core';
import { Planet } from 'src/models/planet';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'

@Injectable({
  providedIn: 'root'
})
export class ExportCSVService {

  constructor() { }

  exportAsCSV(data: Array<Planet>) {
    let csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Planety',
      useBom: true,
      noDownload: false,
      headers: ["ID planety", "Nr. planety", "Nazwa", "Opis", "Ścieżka do zdj."]
    };

    new AngularCsv(JSON.stringify(data), "Planety-export", csvOptions);
  }
}
