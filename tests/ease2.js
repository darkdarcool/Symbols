class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("Hello " + this.name + "!")
  }
  sayBye() {
    console.log("Bye bye " + this.name + "!")
  }
  sayScrew() {
    console.log("Screw you " + this.name + "!")
  }
}

let person = new Person("John Doe")

person.sayScrew()

let e = () => {
  
}