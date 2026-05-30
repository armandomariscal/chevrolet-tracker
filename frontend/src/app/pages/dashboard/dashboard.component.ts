import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

declare var webix: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `<div
    #dashboardContainer
    class="dashboard-layout-container"
  ></div>`,
  styles: [
    `
      .dashboard-layout-container {
        width: 100%;
        height: 100vh;
      }
    `,
  ],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dashboardContainer', { static: true }) container!: ElementRef;
  private uiInstance: any;

  ngAfterViewInit() {
    this.uiInstance = webix.ui({
      container: this.container.nativeElement,
      view: 'layout',
      rows: [
        {
          view: 'toolbar',
          css: 'webix_dark',
          cols: [
            {
              view: 'label',
              label: 'Chevrolet Tracker - Dashboard',
            },
            {},
          ],
        },
        {
          view: 'datatable',
          id: 'workItemsTable',
          autoConfig: true,
          url: 'http://localhost:3000/work-items',
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
