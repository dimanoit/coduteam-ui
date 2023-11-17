import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class ThemeService {
  private currentTheme = signal(this.getInitTheme());
  isLightTeam = computed(() => this.currentTheme() === 'lara-light-blue');

  switchTheme() {
    this.currentTheme.set(
      this.currentTheme() === 'lara-light-blue'
        ? 'lara-dark-blue'
        : 'lara-light-blue',
    );

    this.loadTheme();
  }

  loadTheme() {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `assets/themes/${this.currentTheme()}/theme.css`;
      localStorage.setItem('theme', this.currentTheme());
    }
  }

  getInitTheme() {
    return localStorage.getItem('theme') || 'lara-light-blue';
  }
}
