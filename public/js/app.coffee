define ['jquery', 'app/models', 'app/views', 'backbone-couchdb'], ($, models, views) ->
    #Backbone = @Backbone
    ###
    Backbone.couch_connector.config.base_url = '/api'
    Backbone.couch_connector.config.db_name = "app"
    Backbone.couch_connector.config.ddoc_name = "backbone"
    Backbone.couch_connector.config.viewName = "byCollection"
    Backbone.couch_connector.config.global_changes = true
    ###
    cand = new models.Candidate( {name: 'Seba', email: 'sacuna@gmail.com'})
    q1 = new models.Question( { body: 'This is question 1'})
    q2 = new models.Question( { body: 'This is question 2'})
    q3 = new models.Question( { body: 'This is question 3'})
    
    q_coll = new models.Questions([q1,q2,q3])
    q_coll_view = new views.QuestionsView({collection: q_coll, model: models.Question})
    q_coll_view.render()
    
    $("body").append q_coll_view.el