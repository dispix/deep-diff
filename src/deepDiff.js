export default function deepDiff (obj1, obj2, keepNewKeys = false) {
  if (typeof obj1 !== 'object') {
    throw new TypeError('First parameter must be an object')
  }

  if (typeof obj2 !== 'object') {
    throw new TypeError('Second parameter must be an object')
  }

  const diff = {}

  Object.keys(obj2).forEach((key) => {
    if (!obj1.hasOwnProperty(key) && !keepNewKeys) {
      return
    }

    if (typeof obj2[key] === 'object') {
      diff[key] = deepDiff(obj1[key], obj2[key], keepNewKeys)
      return
    }

    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key]
      return
    }
  })

  return diff
}
