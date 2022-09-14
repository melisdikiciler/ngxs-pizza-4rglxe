import { Topping } from './pizza.enums';

export namespace Pizza {
  export interface State {
    toppings: Set<Topping>;
  }
}
