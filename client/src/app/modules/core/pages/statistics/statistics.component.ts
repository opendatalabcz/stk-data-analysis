import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {ChartComponent} from "ng-apexcharts";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {EmissionControlResult, InspectionResult} from "../../types/inspectionsInterface";
import {ColumnChartOptions, PieChartOptions} from "../../types/charts/ChartOptions";

/**
 * countAvgPriceByRegion - function to calculate average inspection prices by region
 */
function countAvgPriceByRegion(stations: StationsInterface[], ev: Boolean) {
  let prices = {};
  let counts = {};
  let avgPrices = {};

  stations.forEach(station => {
    let price = ev ? station.evInspectionPrice : station.inspectionPrice;
    if (price != 0) {
      if (prices[station.region] == undefined) {
        prices[station.region] = price;
        counts[station.region] = 1;
      } else {
        prices[station.region] += price;
        counts[station.region] += 1;
      }
    }
  });

  for (let key in prices)
    avgPrices[key] = Math.floor(prices[key] / counts[key]);

  return avgPrices;
}

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"]
})

/**
 * StatisticsComponent represents a page which contains inpections statistics
 */
export class StatisticsComponent implements OnInit {
  public monthcount: Map<string, number> = new Map();
  public months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  public stations: Array<StationsInterface> = [];
  public avgPriceByRegion = {};
  public avgPriceByRegionEv = {};
  public results = [];
  public resultsEmission = [];
  public resultTypes = [InspectionResult.PASSED, InspectionResult.PARTLY_PASSED, InspectionResult.FAILED]
  public resultTypesEmission = [EmissionControlResult.PASSED, EmissionControlResult.PARTLY_PASSED, EmissionControlResult.FAILED, EmissionControlResult.NOT_MEASURED]

  @ViewChild("chart") columnChart: ChartComponent;
  public columnOptions: Partial<ColumnChartOptions>;

  @ViewChild("chart") pricesChart: ChartComponent;
  public pricesOptions: Partial<ColumnChartOptions>;

  @ViewChild("chart") pricesChartEv: ChartComponent;
  public pricesOptionsEv: Partial<ColumnChartOptions>;

  @ViewChild("chart") pieChart: ChartComponent;
  public pieOptions: Partial<PieChartOptions>;

  @ViewChild("chart") pieChartEmission: ChartComponent;
  public pieOptionsEmission: Partial<PieChartOptions>;

  @ViewChild("chart") resultByRegionChart: ChartComponent;
  public resultByRegionOptions: Partial<ColumnChartOptions>;

  constructor(@Inject("InspectionsAPIService") private inspectionsService: InspectionsAPIService,
              @Inject("StationsAPIService") private stationService: StationsAPIService) {
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

    this.pieOptionsEmission = {
      series: [0, 0, 0],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Způsobilé", "Nebylo měřeno", "Částečně způsobilé", "Nezpůsobilé"],
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
        },
        formatter(val: number, opts?: any): string {
          return `${val.toString().slice(0, 3)} ${val.toString().slice(3, 6)}`
        }
      },
      xaxis: {
        categories: [
          "Leden",
          "Únor",
          "Březen",
          "Duben",
          "Květen",
          "Červen",
          "Červenec",
          "Srpen",
          "Září",
          "Řijen",
          "Listopad",
          "Prosinec"
        ],
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

    this.pricesOptions = {
      series: [
        {
          name: "Kč",
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

    this.pricesOptionsEv = {
      series: [
        {
          name: "Kč",
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

    this.resultByRegionOptions = {
      series: [{
        name: 'Způsobilé',
        data: [373001, 370060, 242811, 89903, 202196, 143994, 326461, 192724, 179455, 229275, 513265, 185815, 181414, 239654]
      }, {
        name: 'Částečně způsobilé',
        data: [19443, 18965, 16934, 5628, 17766, 9546, 20018, 12396, 13947, 17169, 30371, 14423, 12551, 16587]
      }, {
        name: 'Nezpůsobilé',
        data: [1310, 1893, 2164, 832, 2308, 1026, 2153, 1716, 2115, 1836, 3055, 1619, 1201, 2455]
      }],
      xaxis: {
        categories: ['Hlavní město Praha', 'Jihomoravský kraj', 'Jihočeský kraj', 'Karlovarský kraj',
          'Královéhradecký kraj', 'Liberecký kraj', 'Moravskoslezský kraj', 'Olomoucký kraj',
          'Pardubický kraj', 'Plzeňský kraj', 'Středočeský kraj', 'Vysočina', 'Zlínský kraj', 'Ústecký kraj']
      },
      chart: {
        type: "bar",
        height: 500,
        stacked: true
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
      }
    };
  }

  ngOnInit(): void {
    this.resultTypes.forEach(result => {
      this.inspectionsService.getInspectionsByResult(result).subscribe(count => {
        this.results.push(count)

        if (this.results.length == 3) {
          this.pieOptions.series = this.results.sort(function compare(a: number, b: number) {
            return b - a;
          });
        }
      })
    });

    this.resultTypesEmission.forEach(result => {
      this.inspectionsService.getInspectionsByEmissionResult(result).subscribe(count => {
        this.resultsEmission.push(count)

        if (this.resultsEmission.length == 4) {
          this.pieOptionsEmission.series = this.resultsEmission.sort(function compare(a: number, b: number) {
            return b - a;
          });
        }
      })
    });

    this.months.forEach(month => {
      this.inspectionsService.getInspectionsByMonth(month).subscribe(count => {
        this.monthcount.set(month, count);

        if (this.monthcount.size == 12)
          this.columnOptions.series = [{
            name: "Kontrol",
            data: [
              this.monthcount.get("01"), this.monthcount.get("02"), this.monthcount.get("03"), this.monthcount.get("04"),
              this.monthcount.get("05"), this.monthcount.get("06"), this.monthcount.get("07"), this.monthcount.get("08"),
              this.monthcount.get("09"), this.monthcount.get("10"), this.monthcount.get("11"), this.monthcount.get("12")
            ]
          }];

        console.log(month + ": " + count);
      });
    });

    this.stationService.getStations().subscribe(stations => {
      this.stations = stations;
      console.log(stations);
      this.avgPriceByRegion = countAvgPriceByRegion(this.stations, false);
      this.avgPriceByRegionEv = countAvgPriceByRegion(this.stations, true);

      let array = []
      let labels = []
      for (let key in this.avgPriceByRegion) {
        labels.push(key);
        array.push(this.avgPriceByRegion[key]);
      }

      this.pricesOptions.series = [{
        name: 'Kč',
        data: array
      }];
      this.pricesOptions.xaxis.categories = labels;

      array = [];
      for (let key in this.avgPriceByRegionEv) {
        labels.push(key);
        array.push(this.avgPriceByRegionEv[key]);
      }

      this.pricesOptionsEv.series = [{
        name: 'Kč',
        data: array
      }];
      this.pricesOptionsEv.xaxis.categories = labels;
    });
  }
}
