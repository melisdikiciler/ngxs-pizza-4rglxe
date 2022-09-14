import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { PizzaState } from "../pizza/pizza.state";
import { OrderAddPizza } from "./order.actions";
import { Order } from "./order.model";

const defaults = {
  pasta: [],
  pizza: []
};
@State<Order.State>({
  name: "orders",
  defaults: defaults
})
@Injectable()
export class OrderState {
  constructor(private store: Store) {}

  @Selector()
  static pizza({ pizza }: Order.State): string[] {
    return pizza;
  }

  @Action(OrderAddPizza)
  addPizza({ getState, patchState }: StateContext<Order.State>) {
    patchState({
      pizza: [
        ...getState().pizza,
        this.store.selectSnapshot(PizzaState.toppings)
      ]
    });
  }
}
