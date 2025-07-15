import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create',
  templateUrl: './create.html',
  styleUrls: ['./create.scss'],
  imports: [CommonModule, SharedModule],
})
export class Create implements OnInit {
  employeeForm!: FormGroup;

  ngOnInit(): void {
    this.initEmployeeForm();
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

      department: new FormGroup({
        departmentId: new FormControl(0, Validators.required),
        departmentName: new FormControl('', Validators.required),
        status: new FormControl('ACTIVE', Validators.required),
      }),

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

  get experience(): FormArray {
    return this.employeeForm.get('experience') as FormArray;
  }

  addExperience(): void {
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
      return;
    }

    console.log('Employee Form Submitted:', this.employeeForm.value);
    // Submit logic here
  }

  getErrorType(
    control: FormControl | null,
    label: string,
    verb: string,
    suffix: string
  ): string {
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${label} is required`;
    if (control.errors['email']) return `Enter a valid ${label}`;
    if (control.errors['pattern']) return `Enter a valid ${label}`;
    return `${label} is invalid`;
  }
}
