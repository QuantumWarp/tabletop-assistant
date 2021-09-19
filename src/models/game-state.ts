import GameObject from './game-object';

export default class GameState {
  gameObjects: GameObject[];

  constructor(...gameObjects: GameObject[]) {
    this.gameObjects = gameObjects;
  }
}
