define ['jquery'], ($) ->
    class TestsView extends Backbone.View
        initialize: ()->
            _.bindAll @, "render"
            @collection.bind "reset", @render
            @template = _.template($("#tests-tmpl").html())            
            
        render: () ->
            @el.html @template {}
            $projects = @$('.tests')
            @collection.each (project) =>
                view = new ProjectView {model: project, collection: @collection}
                $projects.append view.render().el
            
            
    class TestView extends Backbone.View
        initialize: () ->
            _.bindAll @, "render"
            @model.bind "change", @.render
            @template = _.template($("#test-tmpl").html())
            
        render: ()->
            $(@el).html @template @model.toJSON()
            
    
    return {TestsView: TestsView, TestView: TestView}