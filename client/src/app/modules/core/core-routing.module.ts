import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CoreLayoutComponent} from "./components/layout/layout.component";
import {HomeComponent} from "./pages/home/home.component";
import {StationsComponent} from "./pages/stations/stations.component";
import {SingleStationComponent} from "./pages/single-station/single-station.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";
import {AboutComponent} from "./pages/about/about.component";
import {SuspiciousBehaviourComponent} from "./pages/suspicious-behaviour/suspicious-behaviour.component";

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
    path: "statistics",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        component: StatisticsComponent
      }
    ]
  },
  {
    path: "suspicious",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        component: SuspiciousBehaviourComponent
      },
      {
        path: ":stationId",
        component: SingleStationComponent
      },
      {
        path: "stations",
        component: StationsComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
