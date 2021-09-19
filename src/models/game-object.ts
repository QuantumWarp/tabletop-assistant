import GameMacro from './game-macro';

export default class GameObject {
  name: string;

  description: string;

  value: any;

  macros: GameMacro[];

  constructor(
    name: string,
    description: string,
    value: any,
    ...macros: GameMacro[]
  ) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.macros = macros;
  }
}
