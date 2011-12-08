(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define([], function() {
    var Test, Tests;
    Test = (function() {

      __extends(Test, Backbone.Model);

      function Test() {
        Test.__super__.constructor.apply(this, arguments);
      }

      return Test;

    })();
    Tests = (function() {

      __extends(Tests, Backbone.Collection);

      function Tests() {
        Tests.__super__.constructor.apply(this, arguments);
      }

      Tests.prototype.model = Test;

      Tests.prototype.url = '/test';

      return Tests;

    })();
    return {
      Test: Test,
      Tests: Tests
    };
  });

}).call(this);
