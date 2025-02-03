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
  userForm: FormGroup;
  userTypes = ['Admin', 'Manager', 'Employee'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userType: ['', Validators.required],
      adminCode: ['', Validators.nullValidator],
      managerId: ['', Validators.nullValidator],
      employeeId: ['', Validators.nullValidator]
    });

    this.onUserTypeChange();
  }

  onUserTypeChange() {
    this.userForm.get('userType')?.valueChanges.subscribe((selectedType) => {
      this.clearValidations();
      if (selectedType === 'Admin') {
        this.userForm.get('adminCode')?.setValidators(Validators.required);
      } else if (selectedType === 'Manager') {
        this.userForm.get('managerId')?.setValidators(Validators.required);
      } else if (selectedType === 'Employee') {
        this.userForm.get('employeeId')?.setValidators(Validators.required);
      }
      this.userForm.get('adminCode')?.updateValueAndValidity();
      this.userForm.get('managerId')?.updateValueAndValidity();
      this.userForm.get('employeeId')?.updateValueAndValidity();
    });
  }

  clearValidations() {
    this.userForm.get('adminCode')?.clearValidators();
    this.userForm.get('managerId')?.clearValidators();
    this.userForm.get('employeeId')?.clearValidators();
    this.userForm.get('adminCode')?.updateValueAndValidity();
    this.userForm.get('managerId')?.updateValueAndValidity();
    this.userForm.get('employeeId')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted:', this.userForm.value);
  }
}
