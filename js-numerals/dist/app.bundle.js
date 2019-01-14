/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/converter */ "./src/lib/converter.ts");
/* harmony import */ var _model_numerical_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/numerical-constants */ "./src/model/numerical-constants.ts");


var converter = new _lib_converter__WEBPACK_IMPORTED_MODULE_0__["Converter"](_model_numerical_constants__WEBPACK_IMPORTED_MODULE_1__["DIGITS"]);
var submit = document.querySelector('button');
var input = document.querySelector('input');
var result = document.querySelector('.result-text');
submit.addEventListener('click', onConvert);
function onConvert() {
    result.textContent = input.value ? converter.convertToWords(input.value) : '';
}


/***/ }),

/***/ "./src/lib/converter.ts":
/*!******************************!*\
  !*** ./src/lib/converter.ts ***!
  \******************************/
/*! exports provided: Converter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Converter", function() { return Converter; });
var Converter = /** @class */ (function () {
    function Converter(DIGITS) {
        this.DIGITS = DIGITS;
    }
    Converter.prototype.convertToWords = function (value) {
        var _this = this;
        var segments = this.splitToSegments(value);
        var converted = segments.map(function (segment) { return _this.convertSegment(Number(segment)); });
        return converted.length > 1 ? this.formatResult(converted) : converted[0];
    };
    Converter.prototype.splitToSegments = function (value) {
        var num = Number(value);
        if (num >= 1100 && num < 2000) {
            this.isSimplified = true;
            return [String(num).slice(0, 2), String(num).slice(2)];
        }
        else {
            this.isSimplified = false;
            return num.toLocaleString('en-US').split(',');
        }
    };
    Converter.prototype.convertSegment = function (segment) {
        return String(segment).length < 3 ? this.getDouble(segment) : this.getTriple(segment);
    };
    Converter.prototype.getDouble = function (num) {
        if (num < 21) {
            return this.DIGITS.lt_21[num];
        }
        else if (num % 10 === 0) {
            return this.DIGITS.round_doubles[num / 10];
        }
        else {
            var parts = String(num).split('');
            return this.DIGITS.round_doubles[parts[0]] + '-' + this.DIGITS.lt_21[parts[1]];
        }
    };
    Converter.prototype.getTriple = function (num) {
        var hundred = Number(String(num).slice(0, 1));
        var rest = Number(String(num).slice(1));
        return this.getDouble(hundred) + " hundred" +
            (Number(rest) > 0 ? " and " + this.getDouble(rest) : '');
    };
    Converter.prototype.formatResult = function (converted) {
        var _this = this;
        var offset = this.isSimplified ? 0 : 1;
        return converted.reverse()
            .map(function (el, i) { return i > 0 ? el + " " + _this.DIGITS.postfix[i + offset] : el; })
            .reverse()
            .filter(function (el) { return !el.includes('zero'); })
            .reduce(function (result, curr, i) {
            return result += i > 0 && !curr.includes('and') ? " and " + curr : " " + curr;
        }, '')
            .trim();
    };
    return Converter;
}());



/***/ }),

/***/ "./src/model/numerical-constants.ts":
/*!******************************************!*\
  !*** ./src/model/numerical-constants.ts ***!
  \******************************************/
/*! exports provided: DIGITS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIGITS", function() { return DIGITS; });
var DIGITS = {
    lt_21: [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
    ],
    round_doubles: [
        '', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ],
    postfix: [
        '', 'hundred', 'thousand', 'million', 'billion', 'trillion'
    ]
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvbnVtZXJpY2FsLWNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE0QztBQUNTO0FBRXJELElBQU0sU0FBUyxHQUFHLElBQUksd0RBQVMsQ0FBQyxpRUFBTSxDQUFDLENBQUM7QUFDeEMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUU1QyxTQUFTLFNBQVM7SUFDaEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2hGLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNWRDtBQUFBO0FBQUE7SUFHRSxtQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBRXZDLGtDQUFjLEdBQWQsVUFBZSxLQUFhO1FBQTVCLGlCQUtDO1FBSkMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFPLElBQUksWUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1FBRWhGLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsbUNBQWUsR0FBZixVQUFnQixLQUFhO1FBQzNCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELGtDQUFjLEdBQWQsVUFBZSxPQUFlO1FBQzVCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELDZCQUFTLEdBQVQsVUFBVSxHQUFXO1FBQ25CLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO0lBQ0gsQ0FBQztJQUVELDZCQUFTLEdBQVQsVUFBVSxHQUFXO1FBQ25CLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUMsT0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFVO1lBQ3pDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsZ0NBQVksR0FBWixVQUFhLFNBQW1CO1FBQWhDLGlCQVVDO1FBVEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekMsT0FBTyxTQUFTLENBQUMsT0FBTyxFQUFFO2FBQ3ZCLEdBQUcsQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssUUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUksRUFBRSxTQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUF2RCxDQUF1RCxDQUFDO2FBQ3ZFLE9BQU8sRUFBRTthQUNULE1BQU0sQ0FBQyxZQUFFLElBQUksUUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFwQixDQUFvQixDQUFDO2FBQ2xDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN0QixhQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVEsSUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFJLElBQU07UUFBdEUsQ0FBc0UsRUFBRSxFQUFFLENBQUM7YUFDNUUsSUFBSSxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQzVERDtBQUFBO0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDcEIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRO0tBQ3ZNO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUTtLQUN0RjtJQUNELE9BQU8sRUFBRTtRQUNQLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVTtLQUM1RDtDQUNGLENBQUMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC50c1wiKTtcbiIsImltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJy4vbGliL2NvbnZlcnRlcic7XHJcbmltcG9ydCB7IERJR0lUUyB9IGZyb20gJy4vbW9kZWwvbnVtZXJpY2FsLWNvbnN0YW50cyc7XHJcblxyXG5jb25zdCBjb252ZXJ0ZXIgPSBuZXcgQ29udmVydGVyKERJR0lUUyk7XHJcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcbmNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtdGV4dCcpO1xyXG5cclxuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Db252ZXJ0KTtcclxuXHJcbmZ1bmN0aW9uIG9uQ29udmVydCgpOiB2b2lkIHtcclxuICByZXN1bHQudGV4dENvbnRlbnQgPSBpbnB1dC52YWx1ZSA/IGNvbnZlcnRlci5jb252ZXJ0VG9Xb3JkcyhpbnB1dC52YWx1ZSkgOiAnJztcclxufVxyXG4iLCJpbXBvcnQgeyBEaWdpdHMgfSBmcm9tICcuLi9tb2RlbC9kaWdpdHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnZlcnRlciB7XHJcbiAgaXNTaW1wbGlmaWVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIERJR0lUUzogRGlnaXRzKSB7IH1cclxuXHJcbiAgY29udmVydFRvV29yZHModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzZWdtZW50cyA9IHRoaXMuc3BsaXRUb1NlZ21lbnRzKHZhbHVlKTtcclxuICAgIGNvbnN0IGNvbnZlcnRlZCA9IHNlZ21lbnRzLm1hcChzZWdtZW50ID0+IHRoaXMuY29udmVydFNlZ21lbnQoTnVtYmVyKHNlZ21lbnQpKSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnZlcnRlZC5sZW5ndGggPiAxID8gdGhpcy5mb3JtYXRSZXN1bHQoY29udmVydGVkKSA6IGNvbnZlcnRlZFswXTtcclxuICB9XHJcblxyXG4gIHNwbGl0VG9TZWdtZW50cyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3QgbnVtID0gTnVtYmVyKHZhbHVlKTtcclxuXHJcbiAgICBpZiAobnVtID49IDExMDAgJiYgbnVtIDwgMjAwMCkge1xyXG4gICAgICB0aGlzLmlzU2ltcGxpZmllZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiBbU3RyaW5nKG51bSkuc2xpY2UoMCwgMiksIFN0cmluZyhudW0pLnNsaWNlKDIpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTaW1wbGlmaWVkID0gZmFsc2U7XHJcbiAgICAgIHJldHVybiBudW0udG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJykuc3BsaXQoJywnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnZlcnRTZWdtZW50KHNlZ21lbnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RyaW5nKHNlZ21lbnQpLmxlbmd0aCA8IDMgPyB0aGlzLmdldERvdWJsZShzZWdtZW50KSA6IHRoaXMuZ2V0VHJpcGxlKHNlZ21lbnQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG91YmxlKG51bTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmIChudW0gPCAyMSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ESUdJVFMubHRfMjFbbnVtXTtcclxuICAgIH0gZWxzZSBpZiAobnVtICUgMTAgPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuRElHSVRTLnJvdW5kX2RvdWJsZXNbbnVtIC8gMTBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcGFydHMgPSBTdHJpbmcobnVtKS5zcGxpdCgnJyk7XHJcbiAgICAgIHJldHVybiB0aGlzLkRJR0lUUy5yb3VuZF9kb3VibGVzW3BhcnRzWzBdXSArICctJyArIHRoaXMuRElHSVRTLmx0XzIxW3BhcnRzWzFdXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRyaXBsZShudW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBodW5kcmVkID0gTnVtYmVyKFN0cmluZyhudW0pLnNsaWNlKDAsIDEpKTtcclxuICAgIGNvbnN0IHJlc3QgPSBOdW1iZXIoU3RyaW5nKG51bSkuc2xpY2UoMSkpO1xyXG5cclxuICAgIHJldHVybiBgJHt0aGlzLmdldERvdWJsZShodW5kcmVkKX0gaHVuZHJlZGAgK1xyXG4gICAgICAoTnVtYmVyKHJlc3QpID4gMCA/IGAgYW5kICR7dGhpcy5nZXREb3VibGUocmVzdCl9YCA6ICcnKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdFJlc3VsdChjb252ZXJ0ZWQ6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuaXNTaW1wbGlmaWVkID8gMCA6IDE7XHJcblxyXG4gICAgcmV0dXJuIGNvbnZlcnRlZC5yZXZlcnNlKClcclxuICAgICAgLm1hcCgoZWwsIGkpID0+IGkgPiAwID8gYCR7ZWx9ICR7dGhpcy5ESUdJVFMucG9zdGZpeFtpICsgb2Zmc2V0XX1gIDogZWwpXHJcbiAgICAgIC5yZXZlcnNlKClcclxuICAgICAgLmZpbHRlcihlbCA9PiAhZWwuaW5jbHVkZXMoJ3plcm8nKSlcclxuICAgICAgLnJlZHVjZSgocmVzdWx0LCBjdXJyLCBpKSA9PlxyXG4gICAgICAgIHJlc3VsdCArPSBpID4gMCAmJiAhY3Vyci5pbmNsdWRlcygnYW5kJykgPyBgIGFuZCAke2N1cnJ9YCA6IGAgJHtjdXJyfWAsICcnKVxyXG4gICAgICAudHJpbSgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgRElHSVRTID0ge1xyXG4gIGx0XzIxOiBbXHJcbiAgICAnemVybycsICdvbmUnLCAndHdvJywgJ3RocmVlJywgJ2ZvdXInLCAnZml2ZScsICdzaXgnLCAnc2V2ZW4nLCAnZWlnaHQnLCAnbmluZScsICd0ZW4nLCAnZWxldmVuJywgJ3R3ZWx2ZScsICd0aGlydGVlbicsICdmb3VydGVlbicsICdmaWZ0ZWVuJywgJ3NpeHRlZW4nLCAnc2V2ZW50ZWVuJywgJ2VpZ2h0ZWVuJywgJ25pbmV0ZWVuJywgJ3R3ZW50eSdcclxuICBdLFxyXG4gIHJvdW5kX2RvdWJsZXM6IFtcclxuICAgICcnLCAnJywgJ3R3ZW50eScsICd0aGlydHknLCAnZm91cnR5JywgJ2ZpZnR5JywgJ3NpeHR5JywgJ3NldmVudHknLCAnZWlnaHR5JywgJ25pbmV0eSdcclxuICBdLFxyXG4gIHBvc3RmaXg6IFtcclxuICAgICcnLCAnaHVuZHJlZCcsICd0aG91c2FuZCcsICdtaWxsaW9uJywgJ2JpbGxpb24nLCAndHJpbGxpb24nXHJcbiAgXVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9