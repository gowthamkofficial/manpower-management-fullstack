import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { LoaderService } from '../../../core/loader';
import { ToasterService } from '../../../core/toaster.service';
import { ApiService } from '../../../core/api.service';
import { ApiEndpoints } from '../../../../environments/api-endpoints.enum';
import { HttpParams } from '@angular/common/http';
import { delay } from 'rxjs';

interface Employee {
  employeeId: number;
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
    'action',
  ];

  dataSource: Employee[] = [];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;
  sortField = 'id';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    public loader: LoaderService,
    private toaster: ToasterService,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sortEvent: Sort) => {
      this.sortField = sortEvent.active;
      this.sortDirection = sortEvent.direction.toUpperCase() as 'ASC' | 'DESC';
      this.pageIndex = 0; // reset to first page on sort
      this.getAllEmployee();
    });
  }

  createEmployee(): void {
    this.router.navigate(['/employee/create']);
  }

  viewEmployee(data): void {
    this.router.navigate([`/employee/view/${data?.employeeId}`]);
  }

  updateEmployee(data): void {
    this.router.navigate([`/employee/update/${data?.employeeId}`]);
  }

  getAllEmployee(): void {
    this.loader.open();

    let params: any = {
      page: this.pageIndex ?? 0,
      size: this.pageSize,
      sortField: this.sortField,
      direction: this.sortDirection,
    };

    let queryParams = new HttpParams();
    for (let key in params) {
      if (params[key] != null && params[key] !== '') {
        queryParams = queryParams.append(key, params[key]);
      }
    }

    this.service
      .get(ApiEndpoints.GET_ALL_EMPLOYEES, queryParams)
      .pipe(delay(1000))
      .subscribe({
        next: (res: any) => {
          const response = res.data;

          this.dataSource = response.content.map((emp: any) => ({
            employeeId: emp.employeeId,
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            mobileNumber: emp.mobileNumber,
            employeeCode: `EMP${emp.employeeId}`,
            department: emp.department?.departmentName,
          }));

          this.totalElements = response.totalElements;
          this.pageIndex = response.pageNumber;
          this.pageSize = response.pageSize;

          this.loader.close();
        },
        error: (err) => {
          this.loader.close();
          this.toaster.error(err?.error?.message || 'Failed to load employees');
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllEmployee();
  }
}
