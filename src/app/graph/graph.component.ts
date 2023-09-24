import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  isBarChart: boolean = true; // Track the chart type
  isLoading: boolean = true; // Track loading status
  constructor(
    private dataService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show(); // inititally loader will show while fetching data
    this.dataService.getData().subscribe((data) => {
      this.chartOptions = this.getBarChartOptions(data); // Set initial chart to bar chart
      this.spinner.hide();
      this.isLoading = false; // stop loading once data is shown
    });
  }

  toggleChartType(event: any) {
    console.log(event.target.innerHTML);
    if (event.target.innerHTML !== 'Convert to bar Chart') {
      document.querySelectorAll('#toggleBtn')[0].innerHTML =
        'Convert to bar Chart';
    } else {
      document.querySelectorAll('#toggleBtn')[0].innerHTML =
        'Convert to pie Chart';
    }
    this.isBarChart = !this.isBarChart;

    // Update chart options based on the selected chart type
    if (this.isBarChart) {
      this.dataService.getData().subscribe((data) => {
        this.chartOptions = this.getBarChartOptions(data);
      });
    } else {
      this.dataService.getData().subscribe((data) => {
        this.chartOptions = this.getPieChartOptions(data);
      });
    }
  }

  private getBarChartOptions(data: any): Highcharts.Options {
    // when user chooses for bar chart
    return {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Bar Chart',
      },
      xAxis: {
        categories: data.categories,
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          type: 'bar',
          data: data.map((val: { value: any }) => {
            return val.value;
          }),
        },
      ],
    };
  }

  private getPieChartOptions(data: any): Highcharts.Options {
    // when user chooses for pie chart
    return {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Pie Chart',
      },
      series: [
        {
          type: 'pie',
          data: data.map((val: { value: any }) => {
            return val.value;
          }),
        },
      ],
    };
  }
}
