import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

import { AuthService } from '../../../core/services/auth.service';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ThemeToggleComponent],
  template: `
    <div class="register-container">
      <div class="register-wrapper" [@slideIn]>
        <div class="register-card glass-effect">
          <div class="register-image">
            <div class="image-overlay">
              <div class="floating-elements">
                <div class="floating-element" *ngFor="let i of [1,2,3,4,5,6]" [style.animation-delay]="i * 0.3 + 's'"></div>
              </div>
            </div>
          </div>
          
          <div class="register-form-section">
            <div class="form-container" [@fadeInUp]>
              <header class="register-header">
                <div class="logo-container" [@bounceIn]>
                  <img src="assets/images/logo-sm.png" alt="Free Games Logo" class="logo">
                </div>
                <h1 class="gradient-text">Join Free Games</h1>
                <p class="subtitle">Create your account and start gaming</p>
              </header>

              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
                <div class="form-row">
                  <div class="form-group" [@slideInLeft]>
                    <div class="input-container">
                      <i class="fas fa-user input-icon"></i>
                      <input
                        type="text"
                        formControlName="first_name"
                        class="form-control"
                        [class.is-invalid]="isFieldInvalid('first_name')"
                        [class.is-valid]="isFieldValid('first_name')"
                        placeholder="First Name"
                        autocomplete="given-name"
                      >
                    </div>
                    <div class="error-messages" *ngIf="isFieldInvalid('first_name')" [@slideDown]>
                      <small class="error-text" *ngIf="registerForm.get('first_name')?.errors?.['required']">
                        <i class="fas fa-exclamation-circle"></i> First name is required
                      </small>
                      <small class="error-text" *ngIf="registerForm.get('first_name')?.errors?.['minlength'] || registerForm.get('first_name')?.errors?.['maxlength']">
                        <i class="fas fa-exclamation-circle"></i> Name must be 2-20 characters
                      </small>
                    </div>
                  </div>

                  <div class="form-group" [@slideInRight]>
                    <div class="input-container">
                      <i class="fas fa-user input-icon"></i>
                      <input
                        type="text"
                        formControlName="last_name"
                        class="form-control"
                        [class.is-invalid]="isFieldInvalid('last_name')"
                        [class.is-valid]="isFieldValid('last_name')"
                        placeholder="Last Name"
                        autocomplete="family-name"
                      >
                    </div>
                    <div class="error-messages" *ngIf="isFieldInvalid('last_name')" [@slideDown]>
                      <small class="error-text" *ngIf="registerForm.get('last_name')?.errors?.['required']">
                        <i class="fas fa-exclamation-circle"></i> Last name is required
                      </small>
                      <small class="error-text" *ngIf="registerForm.get('last_name')?.errors?.['minlength'] || registerForm.get('last_name')?.errors?.['maxlength']">
                        <i class="fas fa-exclamation-circle"></i> Name must be 2-20 characters
                      </small>
                    </div>
                  </div>
                </div>

                <div class="form-group" [@slideInLeft]>
                  <div class="input-container">
                    <i class="fas fa-envelope input-icon"></i>
                    <input
                      type="email"
                      formControlName="email"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('email')"
                      [class.is-valid]="isFieldValid('email')"
                      placeholder="Email Address"
                      autocomplete="email"
                    >
                  </div>
                  <div class="error-messages" *ngIf="isFieldInvalid('email')" [@slideDown]>
                    <small class="error-text" *ngIf="registerForm.get('email')?.errors?.['required']">
                      <i class="fas fa-exclamation-circle"></i> Email is required
                    </small>
                    <small class="error-text" *ngIf="registerForm.get('email')?.errors?.['email']">
                      <i class="fas fa-exclamation-circle"></i> Please enter a valid email
                    </small>
                  </div>
                </div>

                <div class="form-group" [@slideInRight]>
                  <div class="input-container">
                    <i class="fas fa-lock input-icon"></i>
                    <input
                      [type]="showPassword ? 'text' : 'password'"
                      formControlName="password"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('password')"
                      [class.is-valid]="isFieldValid('password')"
                      placeholder="Password"
                      autocomplete="new-password"
                    >
                    <button
                      type="button"
                      class="password-toggle"
                      (click)="togglePassword()"
                      [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                    >
                      <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div class="error-messages" *ngIf="isFieldInvalid('password')" [@slideDown]>
                    <small class="error-text" *ngIf="registerForm.get('password')?.errors?.['required']">
                      <i class="fas fa-exclamation-circle"></i> Password is required
                    </small>
                    <small class="error-text" *ngIf="registerForm.get('password')?.errors?.['pattern']">
                      <i class="fas fa-exclamation-circle"></i> Password must be at least 8 characters with letters and numbers
                    </small>
                  </div>
                </div>

                <div class="form-group" [@slideInLeft]>
                  <div class="input-container">
                    <i class="fas fa-calendar input-icon"></i>
                    <input
                      type="number"
                      formControlName="age"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('age')"
                      [class.is-valid]="isFieldValid('age')"
                      placeholder="Age"
                      min="10"
                      max="80"
                    >
                  </div>
                  <div class="error-messages" *ngIf="isFieldInvalid('age')" [@slideDown]>
                    <small class="error-text" *ngIf="registerForm.get('age')?.errors?.['required']">
                      <i class="fas fa-exclamation-circle"></i> Age is required
                    </small>
                    <small class="error-text" *ngIf="registerForm.get('age')?.errors?.['min'] || registerForm.get('age')?.errors?.['max']">
                      <i class="fas fa-exclamation-circle"></i> Age must be between 10 and 80
                    </small>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn-gradient register-btn"
                  [disabled]="registerForm.invalid || isLoading"
                  [@buttonPulse]="registerForm.valid"
                >
                  <span *ngIf="!isLoading">
                    <i class="fas fa-user-plus"></i> Create Account
                  </span>
                  <span *ngIf="isLoading" class="loading-content">
                    <i class="fas fa-spinner fa-spin"></i> Creating Account...
                  </span>
                </button>

                <div class="error-message" *ngIf="errorMessage" [@shake]>
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ errorMessage }}
                </div>

                <div class="success-message" *ngIf="successMessage" [@slideDown]>
                  <i class="fas fa-check-circle"></i>
                  {{ successMessage }}
                </div>
              </form>

              <footer class="register-footer">
                <p>
                  Already have an account?
                  <a routerLink="/login" class="login-link">
                    Sign In <i class="fas fa-arrow-right"></i>
                  </a>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
      
      <app-theme-toggle></app-theme-toggle>
    </div>
  `,
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.8s 0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.3)' }),
        animate('0.6s 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, height: 0, transform: 'translateY(-10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, height: '*', transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, height: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('buttonPulse', [
      state('true', style({ transform: 'scale(1)' })),
      state('false', style({ transform: 'scale(1)' })),
      transition('false => true', [
        animate('0.2s ease-in-out', style({ transform: 'scale(1.02)' })),
        animate('0.2s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('shake', [
      transition(':enter', [
        style({ transform: 'translateX(0)' }),
        animate('0.5s', style({ transform: 'translateX(-5px)' })),
        animate('0.1s', style({ transform: 'translateX(5px)' })),
        animate('0.1s', style({ transform: 'translateX(-5px)' })),
        animate('0.1s', style({ transform: 'translateX(5px)' })),
        animate('0.1s', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(80)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.successMessage = 'Account created successfully! Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = response.errors?.email?.message || response.message || 'Registration failed. Please try again.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
          this.isLoading = false;
          console.error('Registration error:', error);
        }
      });
    }
  }
}