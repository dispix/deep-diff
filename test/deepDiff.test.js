import deepDiff from '../src/deepDiff'

describe('deepDiff', () => {
  const objOne = {
    a: 1,
    b: {
      c: 2,
      d: 3
    },
    e: 4,
    f: true,
    g: [1, 'two', 3, 'four'],
    h: [1, 'two', 3, 'four'],
    i: true,
    j: null,
    k: 'blue',
    l: [[0, 1], [2, 3]],
    m: 'one',
    n: {
      a: 1,
      b: {},
      c: 'one'
    }
  }

  const objTwo = {
    a: 1,
    b: {
      c: 2,
      d: 30,
      f: 50
    },
    e: 40,
    f: true,
    g: [1, 'two', 3, 'four'],
    h: [1, 'owt', 3, 'four'],
    i: false,
    j: null,
    k: null,
    l: [[0, 1], [2, 4]],
    m: {
      a: 1,
      b: 2
    },
    n: {
      a: 1,
      b: {},
      c: {
        d: 'one'
      }
    }
  }

  const expected = {
    b: {
      d: 30
    },
    e: 40,
    h: [1, 'owt', 3, 'four'],
    i: false,
    k: null,
    l: [[0, 1], [2, 4]],
    m: {
      a: 1,
      b: 2
    },
    n: {
      c: {
        d: 'one'
      }
    }
  }

  const expectedWithNewKeys = {
    b: {
      d: 30,
      f: 50
    },
    e: 40,
    h: [1, 'owt', 3, 'four'],
    i: false,
    k: null,
    l: [[0, 1], [2, 4]],
    m: {
      a: 1,
      b: 2
    },
    n: {
      c: {
        d: 'one'
      }
    }
  }

  it('should return the diff object between two objects', () => {
    expect(deepDiff(objOne, objTwo)).toEqual(expected)
  })

  it('should include new keys when the third parameter is true', () => {
    expect(deepDiff(objOne, objTwo, true)).toEqual(expectedWithNewKeys)
  })

  it('should throw a new TypeError if the first parameter is not an object', () => {
    const wrongParam = JSON.stringify(objOne)

    // The test will not pass by trying:
    // `expect(deepDiff(wrongParam, objTwo)).toThrowError(TypeError)
    expect(() => deepDiff(wrongParam, objTwo)).toThrowError(TypeError)
  })

  it('should throw a new TypeError if the second parameter is not an object', () => {
    const wrongParam = JSON.stringify(objTwo)

    // The test will not pass by trying:
    // `expect(deepDiff(objOne, wrongParam)).toThrowError(TypeError)
    expect(() => deepDiff(objOne, wrongParam)).toThrowError(TypeError)
  })

  it('should not throw an error if the third parameter is not a boolean', () => {
    let wrongParam = JSON.stringify(objOne)

    expect(deepDiff(objOne, objTwo, wrongParam)).toEqual(expectedWithNewKeys)

    wrongParam = null

    expect(deepDiff(objOne, objTwo, wrongParam)).toEqual(expected)
  })

  it('should not mutate the objects or reference one of the parameters', () => {
    expect(deepDiff(objOne, objTwo)).not.toBe(objOne)
    expect(deepDiff(objOne, objTwo)).not.toBe(objTwo)
  })

  it('should return null if there is no difference between objects', () => {
    expect(deepDiff(objOne, objOne)).toBe(null)
  })

  it('should behave correctly with an empty object as first parameter', () => {
    expect(deepDiff({}, { a: { b: 2 } })).toEqual(null)
    expect(deepDiff({}, { a: { b: 2 } }, true)).toEqual({ a: { b: 2 } })
  })
})
