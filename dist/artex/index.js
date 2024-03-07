"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ChatBot = /*#__PURE__*/function () {
  function ChatBot(dataset, temperature) {
    _classCallCheck(this, ChatBot);
    this.dataset = dataset;
    this.temperature = temperature;
    this.pattern_set = this.train(dataset);
  }
  _createClass(ChatBot, [{
    key: "train",
    value: function train(dataset) {
      var patterns = [];
      var _loop = function _loop(key) {
        var pattern = dataset[key].patterns;
        pattern.forEach(function (pat) {
          patterns.push([pat.toLowerCase().split(" "), key]);
        });
      };
      for (var key in dataset) {
        _loop(key);
      }
      return patterns;
    }
  }, {
    key: "findMatch",
    value: function findMatch(query) {
      var matched = [];
      this.pattern_set.forEach(function (pattern) {
        var count = 0;
        query.forEach(function (word) {
          pattern[0].includes(word) ? count++ : "";
        });
        matched.push(count);
      });
      return matched;
    }
  }, {
    key: "calculator",
    value: function calculator(query, matchList) {
      var _this = this;
      var percentile = [];
      matchList.forEach(function (matchCount, ind) {
        var dataset_length = _this.pattern_set[ind][0].length;
        var query_length = query.length;
        var percentage = matchCount / Math.max(dataset_length, query_length) * 100;
        percentile.push([percentage, _this.pattern_set[ind][1]]);
      });
      if (percentile.every(function (pair) {
        return pair[0] === 0;
      })) {
        return [-1];
      }
      var uniqueSet = new Set(percentile.map(JSON.stringify));
      var uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      return uniqueArray;
    }
  }, {
    key: "filter",
    value: function filter(percentageList) {
      var _this2 = this;
      var filteredList1 = percentageList.filter(function (elem) {
        return elem[0] >= _this2.temperature;
      });
      if (filteredList1.length == 0) {
        return -1;
      }
      var per = [];
      var cur_per = filteredList1[0][0];
      filteredList1.forEach(function (el) {
        if (el[0] == cur_per) {
          per.push(el);
        }
        if (el[0] > cur_per) {
          per = [el];
          cur_per = el[0];
        }
      });
      return per;
    }
  }, {
    key: "getResponse",
    value: function getResponse(filter) {
      var _this3 = this;
      if (filter.length > 1) {
        var resp = [];
        filter.forEach(function (fil) {
          var resp_array = _this3.dataset[fil[1]].responses;
          var randomIndex = Math.floor(Math.random() * resp_array.length);
          var respon = resp_array[randomIndex];
          resp.push(respon);
        });
        var final_resp = resp.join(" or ");
        return "Do you mean ".concat(final_resp, "?");
      } else {
        var resp_array = this.dataset[filter[0][1]].responses;
        return resp_array[Math.floor(Math.random() * resp_array.length)];
      }
    }
  }, {
    key: "chat",
    value: function chat(query) {
      var tokenisedQuery = query.toLowerCase().split(" ");
      var matched = this.findMatch(tokenisedQuery);
      var percent = this.calculator(tokenisedQuery, matched);
      if (percent == -1) {
        return "Unable to understand your question.";
      }
      var filter = this.filter(percent);
      if (filter == -1) {
        return "Unable to understand your question. Please clarify properly";
      }
      var response = this.getResponse(filter);
      return response;
    }
  }]);
  return ChatBot;
}();
