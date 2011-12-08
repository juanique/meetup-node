define [], () ->
    
    class Test extends Backbone.Model

    class Tests extends Backbone.Collection
        model: Test
        url: '/test'

    return { Test: Test, Tests: Tests}