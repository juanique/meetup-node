'''
class CouchModel extends Backbone.Model
    url : ->
        return "/api/"

class CouchCollection extends Backbone.Collection
    model : CouchModel
    url : "/api/app/all_docs"

window.CouchModel = CouchModel
window.CouchCollection = CouchCollection
'''
