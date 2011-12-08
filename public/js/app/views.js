(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['jquery'], function($) {
    var CandidateView, QuestionView, QuestionsView, SessionView, StandardView;
    StandardView = (function() {

      __extends(StandardView, Backbone.View);

      function StandardView() {
        StandardView.__super__.constructor.apply(this, arguments);
      }

      StandardView.prototype.initialize = function() {
        _.bindAll(this, "render");
        this.collection.bind("reset", this.render);
        return this.template = _.template($("#" + this.model_name).html());
      };

      StandardView.prototype.render = function() {
        return $(this.el).html(this.template(this.model.toJSON()));
      };

      return StandardView;

    })();
    SessionView = (function() {

      __extends(SessionView, StandardView);

      function SessionView() {
        SessionView.__super__.constructor.apply(this, arguments);
      }

      SessionView.prototype.model_name = "session";

      return SessionView;

    })();
    QuestionView = (function() {

      __extends(QuestionView, StandardView);

      function QuestionView() {
        QuestionView.__super__.constructor.apply(this, arguments);
      }

      QuestionView.prototype.model_name = "question";

      return QuestionView;

    })();
    CandidateView = (function() {

      __extends(CandidateView, StandardView);

      function CandidateView() {
        CandidateView.__super__.constructor.apply(this, arguments);
      }

      CandidateView.prototype.model_name = "candidate";

      return CandidateView;

    })();
    QuestionsView = (function() {

      __extends(QuestionsView, Backbone.View);

      function QuestionsView() {
        QuestionsView.__super__.constructor.apply(this, arguments);
      }

      QuestionsView.prototype.initialize = function() {
        _.bindAll(this, "render");
        this.model.bind("change", this.render);
        return this.template = _.template($("#questions").html());
      };

      QuestionsView.prototype.render = function() {
        var $children;
        var _this = this;
        $(this.el).html(this.template({}));
        $children = this.$('.children');
        return this.collection.each(function(child) {
          var view;
          view = new QuestionView({
            model: child,
            collection: _this.collection
          });
          return $children.append(view.render());
        });
      };

      return QuestionsView;

    })();
    return {
      SessionView: SessionView,
      QuestionView: QuestionView,
      CandidateView: CandidateView,
      QuestionsView: QuestionsView
    };
  });

}).call(this);
