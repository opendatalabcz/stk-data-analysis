import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {ApexChart, ApexTitleSubtitle, ChartComponent} from "ng-apexcharts";

export type ColumnChartOptions = {
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
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit {
  title = "STK";
  monthcount: Map<string, number> = new Map();
  months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  @ViewChild("chart", {static: false}) columnChart: ChartComponent;
  public columnOptions: Partial<ColumnChartOptions>;

  constructor(@Inject("InspectionsAPIService") private inspectionsService: InspectionsAPIService) {
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
  }

  ngOnInit(): void {
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
  }
}
