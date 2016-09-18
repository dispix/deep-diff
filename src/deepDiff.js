export default function deepDiff (obj1, obj2) {
  const diff = {}

  Object.keys(obj1).forEach((key) => {
    if (typeof obj1[key] === 'object') {
      diff[key] = deepDiff(obj1[key], obj2[key])
      return
    }

    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key]
      return
    }
  })

  return diff
}
