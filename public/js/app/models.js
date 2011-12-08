(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define([], function() {
    var Candidate, Question, Questions, Session;
    Candidate = (function() {

      __extends(Candidate, Backbone.Model);

      function Candidate() {
        Candidate.__super__.constructor.apply(this, arguments);
      }

      return Candidate;

    })();
    Question = (function() {

      __extends(Question, Backbone.Model);

      function Question() {
        Question.__super__.constructor.apply(this, arguments);
      }

      return Question;

    })();
    Questions = (function() {

      __extends(Questions, Backbone.Collection);

      function Questions() {
        Questions.__super__.constructor.apply(this, arguments);
      }

      Questions.prototype.model = Question;

      return Questions;

    })();
    Session = (function() {

      __extends(Session, Backbone.Model);

      function Session() {
        Session.__super__.constructor.apply(this, arguments);
      }

      return Session;

    })();
    return {
      Candidate: Candidate,
      Question: Question,
      Questions: Questions,
      Session: Session
    };
  });

}).call(this);
