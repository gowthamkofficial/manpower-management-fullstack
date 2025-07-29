import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { delay } from 'rxjs';
import { ApiEndpoints } from '../../../../environments/api-endpoints.enum';
import { ApiService } from '../../../core/api.service';
import { getErrorType } from '../../../core/form-validator';
import { LoaderService } from '../../../core/loader';
import { ToasterService } from '../../../core/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  imports: [SharedModule, CommonModule],
  templateUrl: './update.html',
  styleUrl: './update.scss',
})
export class Update implements OnInit {
  employeeForm!: FormGroup;
  departmentList = [];
  employeeId;
  employee;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService,
    private toaster: ToasterService,
    private service: ApiService,
    private router: Router
  ) {
    this.initEmployeeForm();
    this.getAllDepartments();
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

  ngOnInit(): void {}

  getEmployee() {
    this.loader.open();
    this.service
      .get(`${ApiEndpoints.GET_EMPLOYEE_BY_ID}/${Number(this.employeeId)}`)
      .pipe(delay(2000))
      .subscribe({
        next: (res: any) => {
          this.employee = res?.data;
          this.patchForm(res?.data);
          this.loader.close();
        },
        error: (err) => {
          this.employee = null;
          this.toaster.error(err?.error?.message ?? 'Something went wrong!');
        },
      });
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

  patchForm(data: any): void {
    console.log(data?.department,this.departmentList);

    this.employeeForm.patchValue({
      employeeId: data.employeeId ?? 0,
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      email: data.email ?? '',
      mobileNumber: data.mobileNumber ?? '',
      dateOfJoining: data.dateOfJoining ? data.dateOfJoining.split('T')[0] : '',
      department: (data.department?.departmentId) ?? '',
      salary: {
        salaryId: data.salary?.salaryId ?? 0,
        takeHome: data.salary?.takeHome ?? 0,
        deduction: data.salary?.deduction ?? 0,
        ctc: data.salary?.ctc ?? 0,
      },
      address: {
        addressId: data.address?.addressId ?? 0,
        doorNo: data.address?.doorNo ?? '',
        addressLine1: data.address?.addressLine1 ?? '',
        addressLine2: data.address?.addressLine2 ?? '',
        district: data.address?.district ?? '',
        state: data.address?.state ?? '',
        pincode: data.address?.pincode?.toString() ?? '',
      },
    });
console.log(data?.experience,this.employeeForm.value);

    const experienceFormArray = this.employeeForm.get(
      'experience'
    ) as FormArray;
    experienceFormArray.clear();

    (data.experience ?? []).forEach((exp) => {
      experienceFormArray.push(
        new FormGroup({
          experienceId: new FormControl(exp.experienceId ?? 0),
          companyName: new FormControl(
            exp.companyName ?? '',
            Validators.required
          ),
          fromDate: new FormControl(
            exp.fromDate ? exp.fromDate.split('T')[0] : '',
            Validators.required
          ),
          toDate: new FormControl(
            exp.toDate ? exp.toDate.split('T')[0] : '',
            Validators.required
          ),
        })
      );
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
      .post(`${ApiEndpoints.UPDATE_EMPLOYEE}/${this.employeeId}`, payload)
      .pipe(delay(2000))
      .subscribe({
        next: (res) => {
          this.toaster.success('Employee updated successfully');
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
