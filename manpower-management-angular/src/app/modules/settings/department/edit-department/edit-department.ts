import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiEndpoints } from '../../../../../environments/api-endpoints.enum';
import { ApiService } from '../../../../core/api.service';
import { LoaderService } from '../../../../core/loader';
import { ToasterService } from '../../../../core/toaster.service';

@Component({
  selector: 'app-edit-department',
  imports: [SharedModule],
  templateUrl: './edit-department.html',
  styleUrl: './edit-department.scss',
})
export class EditDepartment implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDepartment>,
    private service: ApiService,
    private loader: LoaderService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form?.get('name').setValue(this.data?.departmentName ?? '');
  }

  submit() {
    if (this.form.valid) {
      const deptData = this.form.value;

      this.loader.open();
      this.service
        .post(`${ApiEndpoints.UPDATE_DEPARTMENT}/${this.data?.departmentId}`, {
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
