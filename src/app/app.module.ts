import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'; 
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, NgModel, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PlanetCardComponent } from './planet-card/planet-card.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetComponent } from './planet/planet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddEditPlanetComponent } from './add-edit-planet/add-edit-planet.component';
import { UploadComponentComponent } from './upload-component/upload-component.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MainComponent } from './main/main.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    PlanetCardComponent,
    PlanetsComponent,
    PlanetComponent,
    AddEditPlanetComponent,
    UploadComponentComponent,
    LoginComponent,
    MenuBarComponent,
    MainComponent,
    BottomBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    [AuthGuard,RoleGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
