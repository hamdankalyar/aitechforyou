# Later: for...in and classes

Removed from `javascript-for-in` on September 15, 2026. It needs classes, `new`, and prototypes, which are OOP lessons. Add it back there.

## Section content

- **A class** is a blueprint for making objects.
- **engine = "working"** inside the class is called a field.
- **A field is not stored on the class.** It is an instruction: give every object made with new an engine property.
- **new car()** builds an object from the blueprint and runs that instruction.
- **car.engine is undefined** because the class only holds the instruction. The object made with new has engine.

```js
class car {
  engine = "working";
}
console.log(car.engine); // undefined
console.log(new car().engine); // working
```

- **Object.create(car)** makes car1 inherit from the class itself, not from an object made with new. The class has no engine property, so car1 has none to inherit.

```js
class car {
  engine = "working";
}
const car1 = Object.create(car);
car1.speed = 100;
console.log(typeof car); // function
console.log(car1.speed); // 100
console.log(car1.engine); // undefined
```

- **A class is a special kind of function**, so Node's console prints car1 as Function { speed: 100 }.
- **Car.prototype** is the object that every car made with new inherits from. engine is not stored there either.
- **Object.create(Car.prototype)** makes car1 inherit from that object. engine is still missing, so both loops list only speed.

```js
class Car {
  engine = "working";
}
const car1 = Object.create(Car.prototype);
car1.speed = 100;
for (const key in car1) {
  console.log("for in", key); // for in speed
}
for (const prop of Object.keys(car1)) {
  console.log("for of", prop); // for of speed
}
```

- **A plain object** as the prototype works differently. Its engine property is inherited, so for...in lists it.

## Original notes

```js
class car { engine="working" }
const car1 = Object.create(car);
car1.speed = 100;
console.log(car1); // Function { speed: 100 }
```

The result `Function { speed: 100 }` indicates that car1 is an instance of a function rather than an object. car is a class, which is a special type of function. Object.create() with a class creates a new object that inherits from the class's prototype, but it does not instantiate the class itself.

```js
class Car {
  engine = "working";
}
const car1 = Object.create(Car.prototype);
car1.speed = 100;
console.log(car1);
for (let key in car1) { console.log("for in", key); }       // for in speed
for (let prop of Object.keys(car1)) { console.log("for of", prop); } // for of speed
```

The notes say class properties are "part of the prototype". Class fields are written onto each instance by `new`, so they are not on the prototype. Correct this when the section returns.

## Simpler version for the OOP section

With `new`, engine is written onto car1 itself, so both loops agree:

```js
class Car {
  engine = "working";
}
const car1 = new Car();
car1.speed = 100;
for (const key in car1) console.log("for in", key);              // for in engine, for in speed
for (const prop of Object.keys(car1)) console.log("for of", prop); // for of engine, for of speed
```
