import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-create',
  imports: [SharedModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  employeeForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      employeeCode: ['', Validators.required],
      department: ['', Validators.required],
      status: ['', Validators.required],
      dateOfJoining: [null],

      address: this.fb.group({
        doorNo: [''],
        addressLine1: [''],
        addressLine2: [''],
        district: [''],
        state: [''],
        pincode: [''],
      }),

      salary: this.fb.group({
        ctc: [''],
        takeHome: [''],
        hikeDate: [null],
      }),

      experience: this.fb.array([]),
    });
  }

  get experienceControls(): FormArray {
    return this.employeeForm.get('experience') as FormArray;
  }

  addExperience() {
    const expGroup = this.fb.group({
      companyName: [''],
      fromDate: [null],
      toDate: [null],
      role: [''],
    });
    this.experienceControls.push(expGroup);
  }

  removeExperience(index: number) {
    this.experienceControls.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form Submitted:', this.employeeForm.value);
      // submit to backend here
    }
  }
}
