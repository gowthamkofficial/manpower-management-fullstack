import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateDepartmentDialog } from './create-department-dialog/create-department-dialog';
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
  displayedColumns: string[] = ['id', 'name', 'shortCode', 'actions'];

  dataSource = new MatTableDataSource<Department>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Mock data — replace with API call
    const departments: any[] = [
      { id: 1, name: 'HR', shortCode: 'HR' },
      { id: 2, name: 'Development', shortCode: 'DEV' },
      { id: 3, name: 'Marketing', shortCode: 'MKT' },
    ];

    this.dataSource.data = departments;
    this.dataSource.paginator = this.paginator;
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateDepartmentDialog, {
      width: '400px',
    });
  }
}
