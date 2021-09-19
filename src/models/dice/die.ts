export default class Die {
  value: number = 0;

  rolled = false;

  faces: number;

  constructor(faces: number) {
    this.faces = faces;
  }

  roll() {
    this.rolled = true;
    this.value = Math.floor(Math.random() * this.faces);
  }
}
