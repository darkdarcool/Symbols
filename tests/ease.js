class Vegetable {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  
  getInformation() {
    return `This ${this.name} is ${this.color}.`;
  }
}