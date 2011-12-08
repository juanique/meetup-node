define [], () ->
    
    class Candidate extends Backbone.Model
        
    class Question extends Backbone.Model

    class Questions extends Backbone.Collection
        model: Question

    class Session extends Backbone.Model

    return {
        Candidate: Candidate
        Question: Question
        Questions: Questions
        Session: Session
    }