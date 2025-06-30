import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle"
      (click)="toggleTheme()"
      [@rotateIcon]="currentTheme"
      [attr.aria-label]="'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' theme'"
    >
      <i [class]="iconClass"></i>
    </button>
  `,
  styles: [`
    .theme-toggle {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      border: none;
      background: var(--primary-gradient);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      box-shadow: var(--shadow-medium);
      transition: all var(--transition-normal);
      z-index: 1000;
    }

    .theme-toggle:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: var(--shadow-heavy);
    }

    .theme-toggle:active {
      transform: translateY(0) scale(0.95);
    }

    @media (max-width: 768px) {
      .theme-toggle {
        width: 3rem;
        height: 3rem;
        font-size: 1rem;
        bottom: 1rem;
        right: 1rem;
      }
    }
  `],
  animations: [
    trigger('rotateIcon', [
      state('dark', style({ transform: 'rotate(0deg)' })),
      state('light', style({ transform: 'rotate(180deg)' })),
      transition('dark <=> light', animate('0.3s ease-in-out'))
    ])
  ]
})
export class ThemeToggleComponent {
  currentTheme: string = 'dark';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  get iconClass(): string {
    return this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}