import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p>&copy; 2026 - Application de Suggestions</p>
    </footer>
  `,
  styles: [`
    footer {
      background-color: #f8f9fa;
      padding: 1rem;
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  `]
})
export class FooterComponent { }