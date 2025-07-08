import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-department-dialog',
  imports: [SharedModule],
  templateUrl: './create-department-dialog.html',
  styleUrl: './create-department-dialog.scss',
})
export class CreateDepartmentDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDepartmentDialog>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const deptData = this.form.value;
      // You can handle the API call here or return data to parent
      this.dialogRef.close(deptData);
    }
  }
}
