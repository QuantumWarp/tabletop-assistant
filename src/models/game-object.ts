import GameMacro from './game-macro';

export default class GameObject {
  key: string;

  name: string;

  description: string;

  value: any;

  macros: GameMacro[];

  constructor(
    key: string,
    name: string,
    description: string,
    value: any,
    ...macros: GameMacro[]
  ) {
    this.key = key;
    this.name = name;
    this.description = description;
    this.value = value;
    this.macros = macros;
  }
}
