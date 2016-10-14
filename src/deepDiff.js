/**
 *
 *  Checks if two arrays are strictly equals
 *  @method  arrayEquals
 *  @param   {Array}     arr1  First array
 *  @param   {Array}     arr2  Second array, will be compared to arr1
 *  @return  {Boolean}         True if array are equals, otherwise false
 */
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
      if (!arrayEquals(arr1[i], arr2[i])) {
        return false
      }
    } else if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

/**
 *
 *  Return an object containing the keys that have different values in
 *  two structuraly similar objects.
 *  @method  deepDiff
 *  @param   {Object}   obj1                 First object
 *  @param   {Object}   obj2                 Second object, keys that have different values
 *                                            from their counterpart in obj1 will be returned
 *  @param   {Boolean}  [keepNewKeys=false]  If set to true, keys that doesn't exist in obj2
 *                                            but exist in obj2 will be returned.
 *  @return  {Object}                        A diff object
 */
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

    if (obj1[key] === null || obj2[key] === null) {
      if (obj1[key] !== obj2[key]) {
        diff[key] = obj2[key]
      }
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

      if (diff[key] === null) {
        delete diff[key]
      }

      return
    }

    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key]
      return
    }
  })

  if (Object.keys(diff).length === 0) {
    return null
  }

  return diff
}

export default deepDiff
