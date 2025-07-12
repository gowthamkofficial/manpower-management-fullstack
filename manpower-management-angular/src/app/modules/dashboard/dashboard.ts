import { Component } from '@angular/core';
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
  imports: [CommonModule,SharedModule],
})
export class Dashboard {
  // Pie Chart
  public pieChartOptions: Partial<ChartOptions> = {
    series: [44, 33, 23],
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['IT', 'HR', 'Finance'],
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

  // Bar Chart 1: Top Paid Employees
  public topPaidChartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'CTC',
        data: [1200000, 1100000, 950000, 870000, 850000],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    title: {
      text: 'Top 5 Highest Paid Employees',
    },
    xaxis: {
      categories: ['John', 'Priya', 'Alex', 'Ravi', 'Meena'],
    },
  };

  // Bar Chart 2: Employees by District
  public districtChartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Employees',
        data: [40, 35, 25, 20, 10],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    title: {
      text: 'Employee Count by District',
    },
    xaxis: {
      categories: ['Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem'],
    },
  };

  // Bar Chart 3: Avg Salary by Department
  public deptSalaryChartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Average Salary',
        data: [700000, 550000, 500000, 450000],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    title: {
      text: 'Average Salary by Department',
    },
    xaxis: {
      categories: ['IT', 'HR', 'Sales', 'Finance'],
    },
  };
}
