import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
} from 'ng-apexcharts';

import { SharedModule } from '../../shared/shared-module';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../core/toaster.service';
import { LoaderService } from '../../core/loader';
import { ApiService } from '../../core/api.service';
import { ApiEndpoints } from '../../../environments/api-endpoints.enum';
import { delay, forkJoin } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  legend?: ApexLegend;
  labels?: string[];
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [CommonModule, SharedModule],
})
export class Dashboard implements OnInit {
  public pieChartOptions!: Partial<ChartOptions>;
  public districtChartOptions!: Partial<ChartOptions>;
  public topPaidChartOptions!: Partial<ChartOptions>;
  public lowestPaidChartOptions!: Partial<ChartOptions>;

  constructor(
    private toaster: ToasterService,
    private loader: LoaderService,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  loadCharts() {
    const pieChart = this.service.get(ApiEndpoints.DASHBOARD_DEPARTMENT_COUNT);
    const districtChart = this.service.get(
      ApiEndpoints.DASHBOARD_EMPLOYEE_BY_DISTRICT
    );
    const topPaidChart = this.service.get(ApiEndpoints.DASHBOARD_TOP_PAID);
    const lowestPaidChart = this.service.get(
      ApiEndpoints.DASHBOARD_LOWEST_PAID
    );

    this.loader.open();

    forkJoin([pieChart, districtChart, topPaidChart, lowestPaidChart])
      .pipe(delay(1000))
      .subscribe({
        next: ([deptRes, districtRes, topPaidRes, lowestPaidRes]: any) => {
          this.loader.close();

          this.pieChartOptions = this.getPieChartOptions(
            deptRes.data.map((item: any) => item.employeeCount),
            deptRes.data.map((item: any) => item.departmentName)
          );

          this.districtChartOptions = this.getBarChartOptions(
            'Employees',
            districtRes.data.map((item: any) => item.employeeCount),
            districtRes.data.map((item: any) => item.district),
            'Employee Count by District'
          );

          this.topPaidChartOptions = this.getBarChartOptions(
            'Amount',
            topPaidRes.data.map((item: any) => item.amount),
            topPaidRes.data.map((item: any) => item.employee),
            'Top Paid Employees'
          );

          this.lowestPaidChartOptions = this.getBarChartOptions(
            'Amount',
            lowestPaidRes.data.map((item: any) => item.amount),
            lowestPaidRes.data.map((item: any) => item.employee),
            'Lowest Paid Employees'
          );
        },
        error: (err) => {
          this.loader.close();
          console.error(err);
          this.toaster.error('Error loading dashboard data.');
        },
      });
  }

  getPieChartOptions(
    series: number[],
    labels: string[]
  ): Partial<ChartOptions> {
    return {
      series: series,
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  getBarChartOptions(
    seriesName: string,
    seriesData: number[],
    categories: string[],
    titleText: string
  ): Partial<ChartOptions> {
    return {
      series: [
        {
          name: seriesName,
          data: seriesData,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: titleText,
      },
      xaxis: {
        categories: categories,
      },
    };
  }
}
