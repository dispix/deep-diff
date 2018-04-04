'use strict'

import deepDiff from '../deepDiff'

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
    } else if (arr1[i] instanceof Object && arr2[i] instanceof Object) {
      if (deepDiff(arr1[i], arr2[i], true) !== null) {
        return false
      }
    } else if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

export default arrayEquals
