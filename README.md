#  return-deep-diff

Small immutable function returning an object representing the difference between to objects.

## Installation

```
npm install -S return-deep-diff
```

## Usage

```js
const objOne = {
  a: 1,
  b: {
    c: 2,
    d: 3
  },
  e: 4
}

const objTwo = {
  a: 1,
  b: {
    c: 2,
    d: 30,
    f: 50
  },
  e: 40 
}

console.log(objOne, objTwo)
/*
returns:
  {
    b: {
      d: 30
    },
    e: 40
  }
*/

console.log(objOne, objTwo, true)
/*
returns:
  {
    b: {
      d: 30
      f: 50
    },
    e: 40
  }
*/
```

The two objects must share the exact same structure, which is defined by the first object. If a key is present in the second but not the first object, it will not be present in the diff object unless `keepNewKeys` equals `true`.
The function does not mutate neither the first nor the second object.