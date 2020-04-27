import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {CoreRoutingModule} from "./core-routing.module";
import {CoreLayoutComponent} from "./components/layout/layout.component";
import {CoreHeaderComponent} from "./components/header/header.component";
import {CommonModule} from "@angular/common";
import {StationsComponent} from "./pages/stations/stations.component";
import {StationsAPIService} from "./services/stationsAPIservice";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InspectionsAPIService} from "./services/inspectionsAPIservice";
import {SingleStationComponent} from "./pages/single-station/single-station.component";
import {AngularMaterialModule} from "../material/angular-material.module";
import {NavComponent} from './types/material/nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MdbBtnComponent} from './types/material/mdb-btn/mdb-btn.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MdbWavesEffectComponent} from './types/material/mdb-waves-effect/mdb-waves-effect.component';
import {StatisticsComponent} from "./pages/statistics/statistics.component";
import {MaterialHeaderComponent} from './types/material/material-header/material-header.component';
import {AboutComponent} from "./pages/about/about.component";
import {MatPaginatorComponent} from './types/material/mat-paginator/mat-paginator.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableComponent} from './types/material/mat-table/mat-table.component';
import {MatHeaderCellComponent} from './types/material/mat-header-cell/mat-header-cell.component';
import {MatCellComponent} from './types/material/mat-cell/mat-cell.component';
import {MatColumnDefComponent} from './types/material/mat-column-def/mat-column-def.component';
import {MatHeaderRowComponent} from './types/material/mat-header-row/mat-header-row.component';
import {MatRowComponent} from './types/material/mat-row/mat-row.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {SuspiciousBehaviourComponent} from "./pages/suspicious-behavior/suspicious-behaviour.component";

@NgModule({
  declarations: [
    HomeComponent,
    CoreLayoutComponent,
    CoreHeaderComponent,
    StationsComponent,
    SingleStationComponent,
    NavComponent,
    MdbBtnComponent,
    MdbWavesEffectComponent,
    StatisticsComponent,
    MaterialHeaderComponent,
    AboutComponent,
    MatPaginatorComponent,
    MatTableComponent,
    MatHeaderCellComponent,
    MatCellComponent,
    MatColumnDefComponent,
    MatHeaderRowComponent,
    MatRowComponent,
    SuspiciousBehaviourComponent
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgApexchartsModule
  ],
  providers: [
    {
      provide: "StationsAPIService", useClass: StationsAPIService
    },
    {
      provide: "InspectionsAPIService", useClass: InspectionsAPIService
    }],
  bootstrap: [HomeComponent, StationsComponent, AboutComponent, SingleStationComponent, StatisticsComponent, SuspiciousBehaviourComponent]
})
export class CoreModule {
}
