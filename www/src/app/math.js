var define = define || null;
define(function (require) {
	"use strict";
  return {
		randomBoundedNum: function (low, high) {
			return Math.random() * (high - low) + low;
		}
  };
});