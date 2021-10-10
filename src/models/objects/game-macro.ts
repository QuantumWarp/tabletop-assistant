export default class GameMacro {
  name: string;

  action: (state: any) => any;

  constructor(
    name: string,
    action: (state: any) => any,
  ) {
    this.name = name;
    this.action = action;
  }
}
