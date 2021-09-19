import State from "./game-state";

export default class Macro {
  name: string;
  action: (state: State) => any;

  constructor(
    name: string,
    action: (state: State) => any,
  ) {
    this.name = name;
    this.action = action;
  }
}