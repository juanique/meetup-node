define ['jquery'], ($) ->
    
    class StandardView extends Backbone.View
        
        initialize: ()->
            _.bindAll @, "render"
            @collection.bind "reset", @render
            @template = _.template($("#"+@model_name).html())

        render: ()->
            $(@el).html @template @model.toJSON()

    
    class SessionView extends StandardView
        model_name: "session"
        
    class QuestionView extends StandardView
        model_name: "question"

    class CandidateView extends StandardView
        model_name: "candidate"
    
    class QuestionsView extends Backbone.View
        
        initialize: () ->
            _.bindAll @, "render"
            @model.bind "change", @.render
            @template = _.template($("#questions").html())

        render: () ->
            $(@el).html @template {}
            $children = @$('.children')
            @collection.each (child) =>
                view = new QuestionView {model: child, collection: @collection}
                $children.append view.render()

    return {
        SessionView: SessionView
        QuestionView: QuestionView
        CandidateView: CandidateView
        QuestionsView: QuestionsView
    }