
  define(['jquery', 'app/models', 'app/views', 'backbone-couchdb'], function($, models, views) {
    var tests, testsview;
    Backbone.couch_connector.config.base_url = '/api';
    Backbone.couch_connector.config.db_name = "app";
    Backbone.couch_connector.config.ddoc_name = "backbone";
    Backbone.couch_connector.config.viewName = "byCollection";
    Backbone.couch_connector.config.global_changes = true;
    tests = new models.Tests;
    testsview = new views.TestsView({
      collection: tests
    });
    debugger;
  });
