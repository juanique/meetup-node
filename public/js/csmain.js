
  define(['jquery', 'cs!oversight/models', 'cs!oversight/views', 'backbone-couchdb'], function($, models, views) {
    var projects;
    Backbone.couch_connector.config.base_url = 'http://localhost:5984';
    Backbone.couch_connector.config.db_name = "oversight";
    Backbone.couch_connector.config.ddoc_name = "backbone";
    Backbone.couch_connector.config.viewName = "byCollection";
    Backbone.couch_connector.config.global_changes = true;
    projects = new models.Projects;
    projects.fetch();
    debugger;
  });
