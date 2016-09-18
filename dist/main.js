'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = deepDiff;
function deepDiff(obj1, obj2) {
  var keepNewKeys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) !== 'object') {
    throw new TypeError('First parameter must be an object');
  }

  if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) !== 'object') {
    throw new TypeError('Second parameter must be an object');
  }

  var diff = {};
  var keep = Boolean(keepNewKeys);

  Object.keys(obj2).forEach(function (key) {
    if (!obj1[key] && !keep) {
      return;
    }

    if (_typeof(obj2[key]) === 'object') {
      diff[key] = deepDiff(obj1[key], obj2[key], keep);
      return;
    }

    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
      return;
    }
  });

  return diff;
}
