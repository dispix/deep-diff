function arrayEquals (arr1, arr2) {
  if (!(arr1 instanceof Array)) {
    throw new TypeError('arrayEqual 1st parameter must be an array')
  }

  if (!(arr2 instanceof Array)) {
    return false
  }

  if (arr1.length !== arr2.length) {
    return false
  }

  for (var i = 0, l = arr1.length; i < l; i++) {
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      if (!arr1[i].equals(arr2[i])) {
        return false
      }
    } else if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

function deepDiff (obj1, obj2, keepNewKeys = false) {
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
      if (obj2[key] instanceof Array) {
        if (!arrayEquals(obj2[key], obj1[key])) {
          diff[key] = obj2[key]
        }

        return
      }

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

export default deepDiff
