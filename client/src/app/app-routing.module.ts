import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./modules/core/pages/home/home.component";
import {CoreLayoutComponent} from "./modules/core/components/layout/layout.component";
import {StationsComponent} from "./modules/core/pages/stations/stations.component";
import {SingleStationComponent} from "./modules/core/pages/single-station/single-station.component";
import {StatisticsComponent} from "./modules/core/pages/statistics/statistics.component";
import {AboutComponent} from "./modules/core/pages/about/about.component";

const routes: Routes = [
  {
    path: "",
    component: CoreLayoutComponent,
    children: [
      {
        path: "", component: HomeComponent
      }
    ]
  },
  {
    path: "about",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        component: AboutComponent
      }
    ]
  },
  {
    path: "stations",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        component: StationsComponent
      },
      {
        path: ":stationId",
        component: SingleStationComponent
      }
    ]
  },
  {
    path: ":stationId",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        component: SingleStationComponent
      }
    ]
  },
  {
    path: "statistics",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        component: StatisticsComponent
      },
      {
        path: "stations",
        component: StationsComponent
      },
      {
        path: ":stationId",
        component: SingleStationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
