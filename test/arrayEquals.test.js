import arrayEquals from '../src/utils/arrayEquals'

describe('arrayEquals', () => {
  const arrOne = [1, { two: 2 }, true, [1, 2, 3]]

  const arrTwo = [1, { three: 2 }, true, [1, 2, 3]]

  const arrThree = [1, { three: 2 }]

  const arrFour = [1, { three: 2 }, true, [1, 2, 3]]

  const arrFive = [1, { three: 2 }]

  it('should return false if the arrays are different', () => {
    expect(arrayEquals(arrOne, arrTwo)).toEqual(false)
    expect(arrayEquals(arrOne, arrThree)).toEqual(false)
    expect(arrayEquals(arrOne, arrFour)).toEqual(false)
    expect(arrayEquals(arrOne, true)).toEqual(false)
  })

  it('should return true if the arrays are equals', () => {
    expect(arrayEquals(arrOne, arrOne)).toEqual(true)
    expect(arrayEquals(arrThree, arrFive)).toEqual(true)
  })

  it('should throw an error if the first parameter is not an array', () => {
    expect(() => arrayEquals({}, arrOne)).toThrowError(TypeError)
  })

  it('should return false if the second parameter is not an array', () => {
    expect(arrayEquals(arrOne, {})).toEqual(false)
  })
})
