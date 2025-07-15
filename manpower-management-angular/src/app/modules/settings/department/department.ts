import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateDepartmentDialog } from './create-department-dialog/create-department-dialog';
import { LoaderService } from '../../../core/loader';
import { ToasterService } from '../../../core/toaster.service';
import { ApiService } from '../../../core/api.service';
import { ApiEndpoints } from '../../../../environments/api-endpoints.enum';
import { delay } from 'rxjs';
import { EditDepartment } from './edit-department/edit-department';
export interface Department {
  id: number;
  name: string;
  shortCode: string; // 🔹 Add this
}

@Component({
  selector: 'app-department',
  imports: [SharedModule],
  templateUrl: './department.html',
  styleUrl: './department.scss',
})
export class Department implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource = new MatTableDataSource<Department>([]);

  constructor(
    private dialog: MatDialog,
    public loader: LoaderService,
    private toaster: ToasterService,
    private service: ApiService
  ) {}

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.loader.open();
    this.service
      .get(ApiEndpoints.GET_DEPARTMENTS)
      .pipe(delay(1000))
      .subscribe({
        next: (res: any) => {
          this.dataSource.data = res?.data ?? [];
          this.loader.close();
        },
        error: (err) => {
          this.dataSource.data = [];
          this.loader.close();
          this.toaster.error(err?.error?.message ?? 'Something went wrong!');
        },
      });
  }

  openCreateDialog() {
    const dialogRef = this.dialog
      .open(CreateDepartmentDialog, {
        width: '500px',
        height: '250px',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getAllDepartments();
        }
      });
  }

  openEditDialog(data) {
    const dialogRef = this.dialog
      .open(EditDepartment, {
        width: '500px',
        height: '250px',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getAllDepartments();
        }
      });
  }
}
