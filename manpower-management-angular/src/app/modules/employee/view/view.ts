import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { LoaderService } from '../../../core/loader';
import { ToasterService } from '../../../core/toaster.service';
import { ApiEndpoints } from '../../../../environments/api-endpoints.enum';
import { delay } from 'rxjs';

@Component({
  selector: 'app-view',
  imports: [SharedModule],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View implements OnInit {
  employeeId;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public loader: LoaderService,
    private toaster: ToasterService,
    private service: ApiService
  ) {
    this.activatedRoute.params.subscribe({
      next: (res: any) => {
        this.employeeId = res?.id;
        this.getEmployee();
      },
      error: (err) => {
        this.toaster.error(err?.error?.message ?? 'Something went wrong!');
      },
    });
  }

  ngOnInit(): void {
    // this.getEmployee();
  }

  getEmployee() {
    this.loader.open();
    this.service
      .get(`${ApiEndpoints.GET_EMPLOYEE_BY_ID}/${Number(this.employeeId)}`)
      .pipe(delay(2000))
      .subscribe({
        next: (res: any) => {
          this.employee = res?.data;
          this.loader.close();
        },
        error: (err) => {
          this.employee = null;
          this.toaster.error(err?.error?.message ?? 'Something went wrong!');
        },
      });
  }

  employee: any = {
    firstName: 'Gowtham',
    lastName: 'K',
    email: 'gowtham@example.com',
    mobileNumber: '9876543210',
    employeeCode: 'EMP001',
    department: 'Angular Developer',
    status: 'CURRENT',
    dateOfJoining: new Date('2023-06-01'),

    address: {
      doorNo: '123',
      addressLine1: 'Main Street',
      addressLine2: 'Anna Nagar',
      district: 'Chennai',
      state: 'Tamil Nadu',
      pincode: 600001,
    },

    salary: {
      ctc: 800000,
      takeHome: 600000,
      hikeDate: new Date('2024-06-01'),
    },

    experience: [
      {
        companyName: 'ABC Corp',
        fromDate: new Date('2020-01-01'),
        toDate: new Date('2022-12-31'),
        role: 'Frontend Developer',
      },
      {
        companyName: 'XYZ Pvt Ltd',
        fromDate: new Date('2018-05-01'),
        toDate: new Date('2019-12-31'),
        role: 'UI Intern',
      },
    ],
  };
}
