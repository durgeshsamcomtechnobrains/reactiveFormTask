import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  // Test 2
  userForm: FormGroup;
  userTypes = ['Admin', 'Manager', 'Employee'] as const;

  private controls: { [key in 'Admin' | 'Manager' | 'Employee']: string } = {
    Admin: 'adminCode',
    Manager: 'managerId',
    Employee: 'employeeId'
  };

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userType: ['', Validators.required],
      adminCode: ['', Validators.nullValidator],
      managerId: ['', Validators.nullValidator],
      employeeId: ['', Validators.nullValidator]
    });

    this.onUserTypeChange();
  }

  // Handles changes to userType and sets validators accordingly
  onUserTypeChange() {
    this.userForm.get('userType')?.valueChanges.subscribe((selectedType: 'Admin' | 'Manager' | 'Employee') => {
      this.updateValidators(selectedType);
    });
  }

  // Sets the validators based on userType selection
  private updateValidators(selectedType: 'Admin' | 'Manager' | 'Employee') {
    // Clear all validations first
    this.clearValidations();

    // Set the required validator based on selected type
    const controlName = this.controls[selectedType];
    this.userForm.get(controlName)?.setValidators(Validators.required);

    // Update the validity of the relevant controls
    this.userForm.get('adminCode')?.updateValueAndValidity();
    this.userForm.get('managerId')?.updateValueAndValidity();
    this.userForm.get('employeeId')?.updateValueAndValidity();
  }

  // Clears validators for all form controls
  private clearValidations() {
    ['adminCode', 'managerId', 'employeeId'].forEach(control => {
      this.userForm.get(control)?.clearValidators();
      this.userForm.get(control)?.updateValueAndValidity();
    });
  }

  // Handles form submission
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted:', this.userForm.value);
  }

  //Test 1

  // userForm: FormGroup;
  // userTypes = ['Admin', 'Manager', 'Employee'];

  // constructor(private fb: FormBuilder) {
  //   this.userForm = this.fb.group({
  //     userType: ['', Validators.required],
  //     adminCode: ['', Validators.nullValidator],
  //     managerId: ['', Validators.nullValidator],
  //     employeeId: ['', Validators.nullValidator]
  //   });

  //   this.onUserTypeChange();
  // }

  // onUserTypeChange() {
  //   this.userForm.get('userType')?.valueChanges.subscribe((selectedType) => {
  //     this.clearValidations();
  //     if (selectedType === 'Admin') {
  //       this.userForm.get('adminCode')?.setValidators(Validators.required);
  //     } else if (selectedType === 'Manager') {
  //       this.userForm.get('managerId')?.setValidators(Validators.required);
  //     } else if (selectedType === 'Employee') {
  //       this.userForm.get('employeeId')?.setValidators(Validators.required);
  //     }
  //     this.userForm.get('adminCode')?.updateValueAndValidity();
  //     this.userForm.get('managerId')?.updateValueAndValidity();
  //     this.userForm.get('employeeId')?.updateValueAndValidity();
  //   });
  // }

  // clearValidations() {
  //   this.userForm.get('adminCode')?.clearValidators();
  //   this.userForm.get('managerId')?.clearValidators();
  //   this.userForm.get('employeeId')?.clearValidators();
  //   this.userForm.get('adminCode')?.updateValueAndValidity();
  //   this.userForm.get('managerId')?.updateValueAndValidity();
  //   this.userForm.get('employeeId')?.updateValueAndValidity();
  // }

  // onSubmit() {
  //   if (this.userForm.invalid) {
  //     this.userForm.markAllAsTouched();
  //     return;
  //   }
  //   console.log('Form Submitted:', this.userForm.value);
  // }
}
