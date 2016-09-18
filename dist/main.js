'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = deepDiff;
function deepDiff(obj1, obj2) {
  var diff = {};

  Object.keys(obj1).forEach(function (key) {
    if (_typeof(obj1[key]) === 'object') {
      diff[key] = deepDiff(obj1[key], obj2[key]);
      return;
    }

    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
      return;
    }
  });

  return diff;
}
