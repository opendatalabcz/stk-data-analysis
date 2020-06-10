import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {InspectionsInterface} from "../../types/inspectionsInterface";
import {ChartComponent} from "ng-apexcharts";
import {BarChartOptions, PieChartOptions} from "../../types/charts/ChartOptions";

/**
 * getInvalidDatesByStation - function which calculates how many invalid days has been recorded by each stations
 */
function getInvalidDatesByStation(inspections: InspectionsInterface[]) {
  let stations = [];

  inspections.forEach(inspection => {
    stations.push(inspection.stationId)
  });

  let frequent = stations.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
  let items = Object.keys(frequent).map(function (key) {
    return [key, frequent[key]];
  });
  items = items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items.slice(0, items.length > 5 ? 5 : items.length)
}

/**
 * getPopularBrands - function which returns the most popular vehicle brands in inspections
 */
function getPopularBrands(inspections: InspectionsInterface[]) {
  let brands = [];

  inspections.forEach(inspection => {
    if (inspection.vehicleBrand != '')
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
 * findSuspiciousDays - function which returns average inspections count by weekday
 */
function findSuspiciousDays(inspections: InspectionsInterface[]) {
  let aprxCountByWeekday = {};
  for (let i = 0; i <= 6; i++)
    aprxCountByWeekday[i] = Math.floor(inspections.filter(inspection => (new Date(inspection.inspectionDate).getDay() == i)).length / 52);

  return aprxCountByWeekday;
}

/**
 * countInspectionsByType - function to calculate inspection count by inspection type
 */
function countInspectionsByType(inspections: InspectionsInterface[]) {
  let types = [];

  inspections.forEach(inspection => {
    types.push(inspection.inspectionType)
  });

  let popular = types.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
  let items = Object.keys(popular).map(function (key) {
    return [key, popular[key]];
  });
  items = items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items.slice(0, items.length > 5 ? 5 : items.length)
}

@Component({
  selector: "app-suspicious",
  templateUrl: "./suspicious-behavior.component.html",
  styleUrls: ["./suspicious-behaviour.component.scss"]
})

/**
 * SuspiciousBehaviourComponent represents a page which contains results of dataset analysis
 */
export class SuspiciousBehaviourComponent implements OnInit {
  public invalidDates = [];
  public invalidDatesStations = [];
  public popularBrands = [];
  public capacity = [];
  public inspectionsByStation = {};
  public typesOfInspection = [];

  @ViewChild("chart") brandChart: ChartComponent;
  public brandOptions: Partial<BarChartOptions>;

  @ViewChild("chart") capacityChart: ChartComponent;
  public capacityOptions: Partial<BarChartOptions>;

  @ViewChild("chart") capacityPieChart: ChartComponent;
  public capacityPieOptions: Partial<PieChartOptions>;

  @ViewChild("chart") hourChart: ChartComponent;
  public hourOptions: Partial<BarChartOptions>;

  constructor(@Inject("InspectionsAPIService") private inspectionsService: InspectionsAPIService,
              @Inject("StationsAPIService") private stationService: StationsAPIService) {
    this.brandOptions = {
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
        offsetY: -40,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [],
        position: "bottom",
        labels: {
          offsetY: 0
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
      },
      title: {
        text: "Nejčastější značky automobilů s chybně zadaným datem registrace",
        margin: 30
      }
    };

    this.hourOptions = {
      series: [
        {
          name: "Kontrol",
          data: [11, 2, 5, 7, 31, 839, 544, 118]
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
        offsetY: -40,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ['0:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00', '5:00-6:00', '22:00-23:00', '23:00-24:00'],
        position: "bottom",
        labels: {
          offsetY: 0
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

    this.capacityOptions = {
      series: [],
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
        offsetY: -40,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ["Po",
          "Út",
          "St",
          "Čt",
          "Pá"],
        position: "bottom",
        labels: {
          offsetY: 0
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

    this.capacityPieOptions = {
      series: [],
      chart: {
        width: 450,
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
  }

  ngOnInit(): void {
    this.inspectionsService.getInspectionsWithDateBefore("1917-12-31").subscribe(inspections => {
      this.invalidDates = inspections;
      this.invalidDatesStations = getInvalidDatesByStation(this.invalidDates);
      this.popularBrands = getPopularBrands(this.invalidDates);
      this.capacity = [{key: 3851, value: 2, est: 574443, total: 330000}, {
        key: 3814,
        value: 3,
        est: 364461,
        total: 612000
      },
        {key: 3114, value: 4, est: 426521, total: 624000}, {key: 3234, value: 2, est: 353377, total: 215100}];

      //update dataseries for columnchart (popular brands)
      let array = [];
      let labels = [];
      this.popularBrands.forEach(brand => {
        array.push(brand[1]);
        labels.push(brand[0]);
      });

      this.brandOptions.series = [{
        name: "Kontrol",
        data: array
      }];
      this.brandOptions.xaxis.categories = labels;
    });

    this.inspectionsService.getInspectionsByStationId(3851).subscribe(inspections => {
      this.inspectionsByStation[3851] = inspections;
      this.typesOfInspection = countInspectionsByType(this.inspectionsByStation[3851]);

      //update dataseries for columnchart (suspicious days)
      let array = [];
      let sus = findSuspiciousDays(this.inspectionsByStation[3851]);
      for (let i = 1; i < 6; i++)
        array.push(sus[i]);

      this.capacityOptions.series.push({
        name: "Kontrol na stanici 3851",
        data: array
      });

      //update dataseries for piechart (suspicious days)
      array = [];
      let labels = [];
      let total = 0;
      this.typesOfInspection.forEach(type => {
        array.push(type[1]);
        labels.push(type[0]);
        total += type[1];
      });

      if ((this.inspectionsByStation[3851].length - total) > 0) {
        array.push(this.inspectionsByStation[3851].length - total);
        labels.push('jiný');
      }

      this.capacityPieOptions.series = array;
      this.capacityPieOptions.labels = labels;
    });

    this.inspectionsService.getInspectionsByStationId(3234).subscribe(inspections => {
      this.inspectionsByStation[3234] = inspections;

      //update dataseries for columnchart (suspicious days)
      let array = [];
      let sus = findSuspiciousDays(this.inspectionsByStation[3234]);
      for (let i = 1; i < 6; i++)
        array.push(sus[i]);

      this.capacityOptions.series.push({
        name: "Kontrol na stanici 3234",
        data: array
      });
    });
  }
}
