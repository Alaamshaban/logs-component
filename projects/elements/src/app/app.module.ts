import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';


import { createCustomElement } from '@angular/elements';
import { LogsComponent, LogsModule, } from 'logs-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LogsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap(): void {
    const element = createCustomElement(LogsComponent, { injector: this.injector });
    if (!customElements.get('logs-component')) {
      customElements.define('logs-component', element);
    }
  }
}
