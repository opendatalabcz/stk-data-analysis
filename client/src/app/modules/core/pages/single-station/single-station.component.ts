import {Component, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {delay, flatMap, map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {InspectionResult, InspectionsInterface} from "../../types/inspectionsInterface";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {StationsForm} from "../../types/stationsForm";
import {ChartComponent} from "ng-apexcharts";
import {InspectionsForm} from "../../types/inspectionsForm";
import {BarChartOptions, PieChartOptions} from "../../types/charts/ChartOptions";

/**
 * parseWorkingHours - parser for station's working hours: string -> dictionary
 */
function parseWorkingHours(workingHoursString: string) {
  let workingHours = [];

  workingHoursString.split(', ').forEach(day => {
    workingHours.push({key: day.split(' ')[0], value: day.split(' ')[1]})
  });

  return workingHours;
}

/**
 * compare - comparator for inspections by hour of record
 */
function compare(a: InspectionsInterface, b: InspectionsInterface) {
  if (new Date(a.inspectionDate).getHours() > new Date(b.inspectionDate).getHours()) return 1;
  if (new Date(b.inspectionDate).getHours() > new Date(a.inspectionDate).getHours()) return -1;

  return 0;
}

/**
 * countSuspiciousDays - function which calculates days with suspicious inspections density
 */
function countSuspiciousDays(inspections: InspectionsInterface[]) {
  let aprxCountByWeekday = {};
  let result = [];
  let res = [];

  for (let i = 0; i <= 6; i++)
    aprxCountByWeekday[i] = inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == i)).length / 52;

  inspections.forEach(inspection => {
    let date = new Date(inspection.inspectionDate);
    result.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  });

  let days = result.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
  let items = Object.keys(days).map(function (key) {
    return [key, days[key]];
  });

  items.forEach(day => {
    if (aprxCountByWeekday[(new Date(day[0])).getDay()] < day[1] * 0.6)
      res.push(new Date(day[0]));
  });

  return res;
}

/**
 * countInvalidDates - function which calculates inspections recorded with invalid date
 */
function countInvalidDates(inspections: InspectionsInterface[]) {
  let result = 0;

  inspections.forEach(inspection => {
    let date = new Date(inspection.firstRegistrationDate);

    if (date.getFullYear() < 1917)
      result++;
  });

  return result;
}

/**
 * getPopularBrands - function which returns the most popular vehicle brands
 */
function getPopularBrands(inspections: InspectionsInterface[]) {
  let brands = [];

  inspections.forEach(inspection => {
    brands.push(inspection.vehicleBrand)
  });

  let popular = brands.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
  let items = Object.keys(popular).map(function (key) {
    return [key, popular[key]];
  });
  items = items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items.slice(0, items.length > 12 ? 12 : items.length)
}

/**
 * countOutOfWorkingHours - function to count inspections recorded out of station's working hours
 */
function countOutOfWorkingHours(workingHours: any[], inspections: InspectionsInterface[]) {
  let result = 0;
  let days = {};

  for (let i = 0; i < workingHours.length; i++) {
    if (i == 6)
      days[0] = workingHours[i].value
    else
      days[i + 1] = workingHours[i].value
  }

  inspections.forEach(inspection => {
    let date = new Date(inspection.inspectionDate);
    if (days[date.getDay()] == undefined)
      result++;
    else {
      let match = days[date.getDay()].match(/(\d):(\d\d)-(\d\d):(\d\d)/);
      let minH = match[1]
      let maxH = match[3]
      let maxM = match[4]

      if ((date.getHours() < minH) || (date.getHours() > maxH))
        result++;
      else if ((date.getHours() == maxH) && (date.getMinutes() >= maxM))
        result++;
    }
  });

  return result;
}

@Component({
  selector: "app-single-station",
  templateUrl: "./single-station.component.html",
  styleUrls: ["./single-station.component.scss"]
})

/**
 * SingleStationComponent represents a page which is dedicated to a single stations
 */
export class SingleStationComponent implements OnInit, OnDestroy {
  public station: StationsInterface = new StationsForm();
  public inspections: Array<InspectionsInterface> = new Array<InspectionsForm>();
  public workingHours = [];
  public outOfWorkingHours = 0;
  public invalidDates = 0;
  public popularBrands = [];
  public suspiciousDays = [];
  @ViewChild("chart") pieChart: ChartComponent;
  public pieOptions: Partial<PieChartOptions>;
  @ViewChild("chart") monthChart: ChartComponent;
  public monthOptions: Partial<BarChartOptions>;
  @ViewChild("chart") dayChart: ChartComponent;
  public dayOptions: Partial<BarChartOptions>;
  @ViewChild("chart") hourChart: ChartComponent;
  public hourOptions: Partial<BarChartOptions>;
  @ViewChild("chart") brandChart: ChartComponent;
  public brandOptions: Partial<PieChartOptions>;
  private stationSubscription: Subscription;
  private inspectionSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              @Inject("StationsAPIService") private stationsService: StationsAPIService,
              @Inject("InspectionsAPIService") private inspectionsService: InspectionsAPIService) {
    this.pieOptions = {
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

    this.brandOptions = {
      series: [0, 0, 0],
      chart: {
        width: 500,
        height: 700,
        type: "pie"
      },
      labels: [],
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
      ],
      dataLabels: {
        enabled: false
      }
    };

    this.monthOptions = {
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
        position: "bottom",
        labels: {
          offsetY: 0,
          show: true
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
      }
    };

    this.dayOptions = {
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
        enabled: false
      },
      xaxis: {
        categories: [
          "Po",
          "Út",
          "St",
          "Čt",
          "Pá",
          "So",
          "Ne"
        ]
      }
    };

    this.hourOptions = {
      series: [
        {
          name: "Kontrol",
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        type: "bar",
        height: 500
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
        enabled: false
      },
      xaxis: {
        categories: []
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
          console.log("Subscribed to: ", station);
          this.workingHours = parseWorkingHours(this.station.workingHours);
        }
      );

    this.inspectionSubscription = this.activatedRoute.paramMap
      .pipe(map(p => p.get("stationId"), delay(100)),
        flatMap(stationId => this.inspectionsService.getInspectionsByStationId(Number(stationId))))
      .subscribe(inspections => {
          this.inspections = inspections;
          this.outOfWorkingHours = countOutOfWorkingHours(this.workingHours, this.inspections);
          this.invalidDates = countInvalidDates(this.inspections);
          this.popularBrands = getPopularBrands(this.inspections);
          this.suspiciousDays = countSuspiciousDays(this.inspections);

          //update dataseries for piechart (inspection result)
          this.pieOptions.series = [this.inspections.filter(inspection => inspection.inspectionResult == InspectionResult.PASSED).length,
            this.inspections.filter(inspection => inspection.inspectionResult == InspectionResult.PARTLY_PASSED).length,
            this.inspections.filter(inspection => inspection.inspectionResult == InspectionResult.FAILED).length];

          //update dataseries for columnchart (monthly count)
          let array = []
          for (let i = 0; i < 12; i++)
            array.push(this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getMonth() == i)).length)

          this.monthOptions.series = [{
            name: "Kontrol",
            data: array
          }];

          //update dataseries for barchart (weekday count)
          this.dayOptions.series = [{
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

          //update dataseries for barchart (hourly count)
          array = []
          let labels = []
          let minHour = (new Date(this.inspections.sort(compare)[0].inspectionDate)).getHours();
          let maxHour = (new Date(this.inspections.sort(compare)[this.inspections.length - 1].inspectionDate)).getHours();

          for (let i = minHour; i <= maxHour; i++) {
            labels.push(i)
            array.push(this.inspections.filter(inspection => (new Date(inspection.inspectionDate).getHours() == i)).length)
          }

          this.hourOptions.xaxis.categories = labels;
          this.hourOptions.series = [{
            name: "Kontrol",
            data: array
          }];

          //update dataseries for piechart (popular brands)
          array = [];
          labels = [];
          let total = 0;
          this.popularBrands.forEach(brand => {
            array.push(brand[1]);
            labels.push(brand[0]);
            total += brand[1];
          });

          if ((inspections.length - total) > 0) {
            array.push(inspections.length - total);
            labels.push('OTHER');
          }

          this.brandOptions.series = array;
          this.brandOptions.labels = labels;
        }
      );
  }
}
