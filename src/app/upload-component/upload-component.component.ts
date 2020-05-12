import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PlanetsService } from 'src/services/planets.service';
import { first } from 'rxjs/operators';
import { UploadResult } from 'src/models/upload-result';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css']
})
export class UploadComponentComponent implements OnInit {
  uploadResult: UploadResult;
  @Output() uploadFinished = new EventEmitter();
 
  constructor(private planetService: PlanetsService) { }
 
  ngOnInit() {
  }
 
  public uploadFile(files) {
    if (files.length === 0) {
      return;
    }
 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.planetService
    .uploadImage(formData)
    .pipe(first())
    .subscribe(result=>{
      this.uploadResult = result;
      if(result.success) {
        this.uploadFinished.emit(result.filePath);
      }      
    }); 
  }

}
