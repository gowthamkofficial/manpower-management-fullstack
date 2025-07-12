import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  employeeCode: string;
  department: string;
  status: 'CURRENT' | 'RESIGNED';
}
@Component({
  selector: 'app-list',
  imports: [SharedModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'mobileNumber',
    'employeeCode',
    'department',
    // 'status',
  ];

  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Replace with API data
    this.dataSource.data = Array.from({ length: 50 }).map((_, i) => ({
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `user${i + 1}@email.com`,
      mobileNumber: `98765${10000 + i}`,
      employeeCode: `EMP${100 + i}`,
      department: i % 2 === 0 ? 'HR' : 'IT',
      status: i % 3 === 0 ? 'RESIGNED' : 'CURRENT',
    }));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  createEmployee(): void {
    this.router.navigate(['/employee/create']);
  }
}
