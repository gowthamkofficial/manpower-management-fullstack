import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-view',
  imports: [SharedModule],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View {
  employee = {
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
