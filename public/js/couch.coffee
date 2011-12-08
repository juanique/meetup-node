class CouchModel extends Backbone.Model
    idAttribute : "_id"
    url : ->
        if @id
            return "/api/questions/#{@_id}"
        return "/api/questions/"

class CouchCollection extends Backbone.Collection
    model : CouchModel
    url : "/api/questions/_design/all/_view/documents"

    parse : (data) ->
        return _.pluck(data.rows,"value")

window.CouchModel = CouchModel
window.CouchCollection = CouchCollection
