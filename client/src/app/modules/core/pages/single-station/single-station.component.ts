import {Component, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {delay, flatMap, map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {InspectionResult, InspectionsInterface} from "../../types/inspectionsInterface";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {StationsForm} from "../../types/stationsForm";
import {ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle, ChartComponent} from "ng-apexcharts";
import {InspectionsForm} from "../../types/inspectionsForm";

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-single-station",
  templateUrl: "./single-station.component.html",
  styleUrls: ["./single-station.component.scss"]
})
export class SingleStationComponent implements OnInit, OnDestroy {
  station: StationsInterface = new StationsForm();
  inspections: Array<InspectionsInterface> = new Array<InspectionsForm>();
  @ViewChild("chart", {static: false}) pieChart: ChartComponent;
  public pieOptions: Partial<PieChartOptions>;
  @ViewChild("chart", {static: false}) columnChart: ChartComponent;
  public columnOptions: Partial<BarChartOptions>;
  @ViewChild("chart", {static: false}) barChart: ChartComponent;
  public barOptions: Partial<BarChartOptions>;
  private stationSubscription: Subscription;
  private inspectionSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              @Inject("StationsAPIService") private stationsService: StationsAPIService,
              @Inject("InspectionsAPIService") private inspectionsService: InspectionsAPIService) {
    this.pieOptions = {
      title: {
        text: "Výsledky prohlídek",
        margin: 30
      },
      series: [0, 0, 0],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Způsobilé", "Částečně způsobilé", "Nezpůsobilé"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom",
            }
          }
        }
      ]
    };

    this.columnOptions = {
      series: [
        {
          name: "Kontrol",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [
          "Led",
          "Úno",
          "Bře",
          "Dub",
          "Kvě",
          "Čvn",
          "Čvc",
          "Srp",
          "Zář",
          "Řij",
          "Lis",
          "Pro"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false
        }
      },
      title: {
        text: "Počet kontrol podle měsíce",
        floating: false,
        offsetY: 320,
        margin: 30,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };

    this.barOptions = {
      series: [
        {
          name: "Kontrol",
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          },
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [
          "Po",
          "Út",
          "St",
          "Čt",
          "Pá",
          "St",
          "Ne"
        ]
      },
      title: {
        text: "Počet kontrol podle dne v týdne",
        floating: false,
        offsetY: 320,
        margin: 30,
        align: "center",
        style: {
          color: "#444"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      }
    };
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.stationSubscription = this.activatedRoute.paramMap
      .pipe(map(p => p.get("stationId"), delay(100)),
        flatMap(stationId => this.stationsService.getStationById(Number(stationId))))
      .subscribe(station => {
          this.station = station;
          console.log("Subscribed to: ", station)
        }
      );

    this.inspectionSubscription = this.activatedRoute.paramMap
      .pipe(map(p => p.get("stationId"), delay(100)),
        flatMap(stationId => this.inspectionsService.getInspectionsByStationId(Number(stationId))))
      .subscribe(inspections => {
          this.inspections = inspections;

          //update dataseries for piechart (inspection result)
          this.pieOptions.series = [this.inspections.filter(inspection => inspection.inspectionResult == InspectionResult.PASSED).length,
            this.inspections.filter(inspection => inspection.inspectionResult == InspectionResult.PARTLY_PASSED).length,
            this.inspections.filter(inspection => inspection.inspectionResult == InspectionResult.FAILED).length];

          //update dataseries for columnchart (monthly count)
          this.columnOptions.series = [{
            name: "Kontrol",
            data: [
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 0)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 1)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 2)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 3)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 4)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 5)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 6)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 7)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 8)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 9)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 10)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == 11)).length
            ]
          }];

          //update dataseries for barchart (weekday count)
          this.barOptions.series = [{
            name: "Kontrol",
            data: [
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 1)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 2)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 3)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 4)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 5)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 6)).length,
              this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == 0)).length
            ]
          }];

          console.log("Subscribed to: ", inspections);
        }
      );
  }
}
