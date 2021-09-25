export default class Die {
  faces: number;

  constructor(faces: number) {
    this.faces = faces;
  }

  roll() {
    return Math.floor(Math.random() * this.faces);
  }
}
