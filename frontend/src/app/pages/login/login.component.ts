import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare var webix: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
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

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngAfterViewInit() {
    const self = this;

    this.uiInstance = webix.ui({
      container: this.container.nativeElement,
      view: 'form',
      id: 'loginForm',
      width: 350,
      rows: [
        {
          view: 'template',
          type: 'header',
          template: 'Chevrolet Tracker',
        },
        {
          view: 'text',
          label: 'Email',
          name: 'email',
          required: true,
        },
        {
          view: 'text',
          type: 'password',
          label: 'Password',
          name: 'password',
          required: true,
        },
        {
          view: 'button',
          value: 'Login',
          css: 'webix_primary',
          click: function () {
            const form = webix.$$('loginForm');
            if (!form.validate()) {
              webix.message({
                type: 'error',
                text: 'Please fill in all required fields.',
              });
              return;
            }

            const payload = form.getValues();

            self.http
              .post<{
                token: string;
              }>('http://localhost:3000/api/auth/login', payload)
              .subscribe({
                next: (response) => {
                  localStorage.setItem('auth_token', response.token);

                  webix.message({
                    type: 'success',
                    text: 'Welcome back! Redirecting to dashboard...',
                  });

                  self.router.navigate(['/dashboard']);
                },
                error: (err) => {
                  console.error('Error de login:', err);
                  webix.message({
                    type: 'error',
                    text:
                      err.error?.message ||
                      'Error auth failed. Please check your credentials and try again.',
                  });
                },
              });
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
