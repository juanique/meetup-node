(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['jquery'], function($) {
    var TestView, TestsView;
    TestsView = (function() {

      __extends(TestsView, Backbone.View);

      function TestsView() {
        TestsView.__super__.constructor.apply(this, arguments);
      }

      TestsView.prototype.initialize = function() {
        _.bindAll(this, "render");
        this.collection.bind("reset", this.render);
        return this.template = _.template($("#tests-tmpl").html());
      };

      TestsView.prototype.render = function() {
        var $projects;
        var _this = this;
        this.el.html(this.template({}));
        $projects = this.$('.tests');
        return this.collection.each(function(project) {
          var view;
          view = new ProjectView({
            model: project,
            collection: _this.collection
          });
          return $projects.append(view.render().el);
        });
      };

      return TestsView;

    })();
    TestView = (function() {

      __extends(TestView, Backbone.View);

      function TestView() {
        TestView.__super__.constructor.apply(this, arguments);
      }

      TestView.prototype.initialize = function() {
        _.bindAll(this, "render");
        this.model.bind("change", this.render);
        return this.template = _.template($("#test-tmpl").html());
      };

      TestView.prototype.render = function() {
        return $(this.el).html(this.template(this.model.toJSON()));
      };

      return TestView;

    })();
    return {
      TestsView: TestsView,
      TestView: TestView
    };
  });

}).call(this);
