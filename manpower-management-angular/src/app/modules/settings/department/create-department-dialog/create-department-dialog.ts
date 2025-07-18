import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/api.service';
import { LoaderService } from '../../../../core/loader';
import { ToasterService } from '../../../../core/toaster.service';
import { ApiEndpoints } from '../../../../../environments/api-endpoints.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-department-dialog',
  imports: [CommonModule, SharedModule],
  templateUrl: './create-department-dialog.html',
  styleUrl: './create-department-dialog.scss',
  providers: [ApiService, LoaderService, ToasterService],
})
export class CreateDepartmentDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDepartmentDialog>,
    private service: ApiService,
    private loader: LoaderService,
    private toaster: ToasterService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const deptData = this.form.value;

      this.loader.open();
      this.service
        .post(ApiEndpoints.CREATE_DEPARTMENT, {
          departmentName: deptData?.name,
        })
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.loader.close();
            this.toaster.success(res?.message);
            this.dialogRef.close(deptData);
          },
          error: (err) => {
            console.log(err);
            this.loader.close();
            this.toaster.success(err?.error?.message);
          },
        });
    }
  }
}
