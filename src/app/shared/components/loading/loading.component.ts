import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="loading-overlay" 
      *ngIf="isLoading"
      [@fadeInOut]
    >
      <div class="loading-content">
        <div class="spinner-container">
          <div class="spinner"></div>
          <div class="spinner-glow"></div>
        </div>
        <p class="loading-text">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--overlay-bg);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
      color: var(--text-primary);
    }

    .spinner-container {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
    }

    .spinner {
      width: 80px;
      height: 80px;
      border: 4px solid var(--accent-color);
      border-top: 4px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      position: relative;
      z-index: 2;
    }

    .spinner::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      width: 80px;
      height: 80px;
      border: 4px solid transparent;
      border-bottom: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 0.5s linear infinite reverse;
    }

    .spinner-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 2s ease-in-out infinite;
    }

    .loading-text {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0;
      opacity: 0.8;
      animation: fadeInOut 2s ease-in-out infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
    }

    @keyframes fadeInOut {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Loading amazing games...';
}