import { Injectable } from "@angular/core";
import { Actions, ofActionSuccessful, Store } from "@ngxs/store";
import { OrderAddPizza } from "./order.actions";
import { StateReset } from "ngxs-reset-plugin";
import { PizzaState } from "../pizza/pizza.state";

@Injectable({
  providedIn: "root"
})
export class OrderHandler {
  constructor(actions$: Actions, store: Store) {
    actions$
      .pipe(ofActionSuccessful(OrderAddPizza))
      .subscribe(() => store.dispatch(new StateReset(PizzaState)));
  }
}
