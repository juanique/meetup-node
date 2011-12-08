
  'class CouchModel extends Backbone.Model\n    url : ->\n        return "/api/"\n\nclass CouchCollection extends Backbone.Collection\n    model : CouchModel\n    url : "/api/app/all_docs"\n\nwindow.CouchModel = CouchModel\nwindow.CouchCollection = CouchCollection';


