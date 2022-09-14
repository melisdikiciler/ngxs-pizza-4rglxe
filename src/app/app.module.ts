import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

import { PizzaState } from './pizza/pizza.state';
import { OrderState } from './order/order.state';

import { OrderHandler } from './order/order.handler';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([PizzaState, OrderState]),
    NgxsResetPluginModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [OrderHandler],
      useFactory: noop,
      multi: true,
    },
  ],
})
export class AppModule {}

export function noop() {
  return function () {};
}
