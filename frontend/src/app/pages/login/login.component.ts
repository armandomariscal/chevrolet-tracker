import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

declare var webix: any;

@Component({
  selector: 'app-login',
  standalone: true,
  template: `<div #loginContainer class="login-window-container"></div>`,
  styles: [
    `
      .login-window-container {
        width: 100%;
        height: 100vh;
        background-color: #2a313a;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('loginContainer', { static: true }) container!: ElementRef;
  private uiInstance: any;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.uiInstance = webix.ui({
      container: this.container.nativeElement,
      view: 'form',
      width: 350,
      rows: [
        {
          view: 'template',
          type: 'header',
          template: 'Chevrolet Tracker',
        },
        {
          view: 'text',
          label: 'User',
          name: 'user',
        },
        {
          view: 'text',
          type: 'password',
          label: 'Password',
          name: 'password',
        },
        {
          view: 'button',
          value: 'Login',
          css: 'webix_primary',
          click: () => {
            this.router.navigate(['/dashboard']);
          },
        },
      ],
    });
  }

  ngOnDestroy() {
    if (this.uiInstance && this.uiInstance.destructor) {
      this.uiInstance.destructor();
    }
  }
}
