'use strict'

import arrayEquals from './utils/arrayEquals'

/**
 *
 *  Return an object containing the keys that have different values in
 *  two structuraly similar objects.
 *  @method  deepDiff
 *  @param   {Object}   obj1                 First object
 *  @param   {Object}   obj2                 Second object, keys that have different values from
 *                                            their counterpart in obj1 will be returned
 *  @param   {Boolean}  [keepNewKeys=false]  If set to true, keys that doesn't exist in obj2 but
 *                                            exist in obj2 will be returned.
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
    if (!obj1.hasOwnProperty(key)) {
      if (keepNewKeys) {
        diff[key] = obj2[key]
      }
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

      if (!(obj1[key] instanceof Object)) {
        diff[key] = obj2[key]

        return
      }

      diff[key] = deepDiff(obj1[key], obj2[key], keepNewKeys)

      //  Don't keep trace of a null key if it was generated by a recursive use of deepDiff.
      if (diff[key] === null) {
        delete diff[key]
      }

      return
    }

    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key]
    }
  })

  // If there's no difference between the two objects, return null
  if (Object.keys(diff).length === 0) {
    return null
  }

  return diff
}

export default deepDiff
