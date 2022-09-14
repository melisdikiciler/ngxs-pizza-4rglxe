import { Topping } from "./pizza.enums";

export class PizzaToggleTopping {
  static readonly type = "[Pizza] Toggle Topping";

  constructor(public payload: Topping) {}
}
