import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class ThemeService {
  private currentTheme = signal(this.getInitTheme());
  isLightTeam = computed(() => this.currentTheme() === 'soho-light');

  switchTheme() {
    this.currentTheme.set(
      this.currentTheme() === 'soho-light' ? 'soho-dark' : 'soho-light',
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
    return localStorage.getItem('theme') || 'soho-light';
  }
}
