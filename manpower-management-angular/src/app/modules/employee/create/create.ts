import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';
import { CommonModule } from '@angular/common';
import { getErrorType } from '../../../core/form-validator';
import { LoaderService } from '../../../core/loader';
import { ToasterService } from '../../../core/toaster.service';
import { ApiService } from '../../../core/api.service';
import { ApiEndpoints } from '../../../../environments/api-endpoints.enum';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'create',
  templateUrl: './create.html',
  styleUrls: ['./create.scss'],
  imports: [CommonModule, SharedModule],
})
export class Create implements OnInit {
  employeeForm!: FormGroup;
  departmentList = [];

  constructor(
    private loader: LoaderService,
    private toaster: ToasterService,
    private service: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initEmployeeForm();
    this.getAllDepartments();
  }
  getAllDepartments() {
    this.service.get(ApiEndpoints.GET_DEPARTMENTS).subscribe({
      next: (res: any) => {
        this.departmentList = res?.data ?? [];
      },
      error: (err) => {
        this.departmentList = [];
      },
    });
  }
  initEmployeeForm() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(0),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/),
      ]),
      dateOfJoining: new FormControl('', Validators.required),

      department: new FormControl('', [Validators.required]),
      salary: new FormGroup({
        salaryId: new FormControl(0),
        takeHome: new FormControl(0, Validators.required),
        deduction: new FormControl(0, Validators.required),
        ctc: new FormControl(0, Validators.required),
      }),

      address: new FormGroup({
        addressId: new FormControl(0),
        doorNo: new FormControl('', Validators.required),
        addressLine1: new FormControl('', Validators.required),
        addressLine2: new FormControl(''),
        district: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{6}$/),
        ]),
      }),

      experience: new FormArray([
        new FormGroup({
          experienceId: new FormControl(0),
          fromDate: new FormControl('', Validators.required),
          toDate: new FormControl('', Validators.required),
          companyName: new FormControl('', Validators.required),
        }),
      ]),
    });
  }

  get form() {
    return this.employeeForm.controls;
  }

  get addressForm() {
    return (this.employeeForm.get('address') as FormGroup).controls;
  }

  get salaryForm() {
    return (this.employeeForm.get('salary') as FormGroup).controls;
  }

  get experience(): FormArray {
    return this.employeeForm.get('experience') as FormArray;
  }

  addExperience(): void {
    const exp = this.employeeForm.get('experience') as FormArray;

    if (exp.invalid) {
      this.toaster.warning('Kindly provide the required fields');
      return;
    }

    this.experience.push(
      new FormGroup({
        experienceId: new FormControl(0),
        fromDate: new FormControl('', Validators.required),
        toDate: new FormControl('', Validators.required),
        companyName: new FormControl('', Validators.required),
      })
    );
  }

  removeExperience(index: number): void {
    this.experience.removeAt(index);
  }

  submit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.toaster.warning('Kindly provide the required fields');
      return;
    }

    const raw = this.employeeForm.value;

    // 🔹 Convert date to YYYY-MM-DD
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    };

    const payload = {
      ...raw,
      dateOfJoining: formatDate(raw.dateOfJoining),

      department: {
        departmentId: raw.department,
      },

      address: {
        ...raw.address,
        pincode: String(raw.address.pincode),
      },

      salary: {
        ...raw.salary,
      },

      experience: raw.experience.map((exp: any) => ({
        ...exp,
        fromDate: formatDate(exp.fromDate),
        toDate: formatDate(exp.toDate),
      })),
    };

    this.service
      .post(ApiEndpoints.CREATE_EMPLOYEE, payload)
      .pipe(delay(2000))
      .subscribe({
        next: (res) => {
          this.toaster.success('Employee created successfully');
          this.employeeForm.reset();
          this.router.navigate(['/employee/list']);
        },
        error: (err) => {
          this.toaster.error('Failed to create employee');
        },
      });
  }

  getErrorType(control, label, type, number?: any) {
    return getErrorType(control, label, type, number);
  }
}
