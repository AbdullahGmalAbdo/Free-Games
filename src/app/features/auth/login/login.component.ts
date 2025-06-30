import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

import { AuthService } from '../../../core/services/auth.service';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ThemeToggleComponent],
  template: `
    <div class="login-container">
      <div class="login-wrapper" [@slideIn]>
        <div class="login-card glass-effect">
          <div class="login-image">
            <div class="image-overlay">
              <div class="floating-elements">
                <div class="floating-element" *ngFor="let i of [1,2,3,4,5]" [style.animation-delay]="i * 0.5 + 's'"></div>
              </div>
            </div>
          </div>
          
          <div class="login-form-section">
            <div class="form-container" [@fadeInUp]>
              <header class="login-header">
                <div class="logo-container" [@bounceIn]>
                  <img src="assets/images/logo-sm.png" alt="Free Games Logo" class="logo">
                </div>
                <h1 class="gradient-text">Welcome Back</h1>
                <p class="subtitle">Sign in to discover amazing free games</p>
              </header>

              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form" [@staggerForm]="loginForm.value">
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
                    <small class="error-text" *ngIf="loginForm.get('email')?.errors?.['required']">
                      <i class="fas fa-exclamation-circle"></i> Email is required
                    </small>
                    <small class="error-text" *ngIf="loginForm.get('email')?.errors?.['email']">
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
                      autocomplete="current-password"
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
                    <small class="error-text" *ngIf="loginForm.get('password')?.errors?.['required']">
                      <i class="fas fa-exclamation-circle"></i> Password is required
                    </small>
                    <small class="error-text" *ngIf="loginForm.get('password')?.errors?.['pattern']">
                      <i class="fas fa-exclamation-circle"></i> Password must be at least 8 characters with letters and numbers
                    </small>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn-gradient login-btn"
                  [disabled]="loginForm.invalid || isLoading"
                  [@buttonPulse]="loginForm.valid"
                >
                  <span *ngIf="!isLoading">
                    <i class="fas fa-sign-in-alt"></i> Sign In
                  </span>
                  <span *ngIf="isLoading" class="loading-content">
                    <i class="fas fa-spinner fa-spin"></i> Signing In...
                  </span>
                </button>

                <div class="error-message" *ngIf="errorMessage" [@shake]>
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ errorMessage }}
                </div>
              </form>

              <footer class="login-footer">
                <p>
                  New to Free Games?
                  <a routerLink="/register" class="register-link">
                    Create Account <i class="fas fa-arrow-right"></i>
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
  styleUrls: ['./login.component.scss'],
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
        animate('0.5s 0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.5s 0.8s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
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
    ]),
    trigger('staggerForm', [
      transition('* => *', [
        query('.form-group', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
          this.isLoading = false;
          console.error('Login error:', error);
        }
      });
    }
  }
}