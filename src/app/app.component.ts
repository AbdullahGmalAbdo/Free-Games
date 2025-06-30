import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: var(--main-color);
      transition: background-color var(--transition-normal);
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Free Games';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.initializeTheme();
  }
}