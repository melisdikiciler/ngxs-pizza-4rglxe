import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Topping } from './pizza/pizza.enums';
import { OrderAddPizza } from './order/order.actions';
import { OrderState } from './order/order.state';
import { PizzaState } from './pizza/pizza.state';
import { PizzaToggleTopping } from './pizza/pizza.actions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  orders$ = this.store.select(OrderState.pizza);

  hasMushroom$ = this.store.select(PizzaState.hasTopping(Topping.Mushroom));

  hasOlive$ = this.store.select(PizzaState.hasTopping(Topping.Olive));

  hasPepperoni$ = this.store.select(PizzaState.hasTopping(Topping.Pepperoni));

  toppings: { [key: string]: Topping } = {
    pepperoni: Topping.Pepperoni,
    mushroom: Topping.Mushroom,
    olive: Topping.Olive,
  };

  constructor(private store: Store) {}

  orderPizza(): void {
    this.store.dispatch(new OrderAddPizza());
  }

  toggleTopping(topping: Topping): void {
    this.store.dispatch(new PizzaToggleTopping(topping));
  }
}
