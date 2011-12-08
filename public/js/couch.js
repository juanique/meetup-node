(function() {
  var CouchCollection, CouchModel;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  CouchModel = (function() {

    __extends(CouchModel, Backbone.Model);

    function CouchModel() {
      CouchModel.__super__.constructor.apply(this, arguments);
    }

    CouchModel.prototype.url = function() {};

    return CouchModel;

  })();

  CouchCollection = (function() {

    __extends(CouchCollection, Backbone.Collection);

    function CouchCollection() {
      CouchCollection.__super__.constructor.apply(this, arguments);
    }

    CouchCollection.prototype.model = CouchModel;

    CouchCollection.prototype.url = "/api/app/all_docs";

    return CouchCollection;

  })();

  window.CouchModel = CouchModel;

  window.CouchCollection = CouchCollection;

}).call(this);
