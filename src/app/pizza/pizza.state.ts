import { Injectable } from "@angular/core";
import {
  Action,
  createSelector,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  Store
} from "@ngxs/store";
import { PizzaToggleTopping } from "./pizza.actions";
import { Topping } from "./pizza.enums";
import { Pizza } from "./pizza.model";

@State<Pizza.State>({
  name: "pizza",
  defaults: {
    toppings: new Set()
  }
})
@Injectable()
export class PizzaState implements NgxsOnInit {
  constructor(private store: Store) {}

  @Selector()
  static toppings({ toppings }: Pizza.State): string {
    return Array.from(toppings).join(", ");
  }

  static hasTopping(topping: Topping) {
    return createSelector(
      [PizzaState],
      ({ toppings }: Pizza.State) => toppings.has(topping)
    );
  }

  ngxsOnInit() {
    console.log(this.store.snapshot());
  }

  @Action(PizzaToggleTopping)
  toggleTopping(
    { getState, setState }: StateContext<Pizza.State>,
    { payload }: PizzaToggleTopping
  ) {
    const toppings = new Set(getState().toppings);

    if (toppings.has(payload)) toppings.delete(payload);
    else toppings.add(payload);

    setState({ toppings });
  }
}
