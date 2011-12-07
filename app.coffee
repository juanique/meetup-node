express = require("express")
routes = require("./routes")
http = require("http")


app = module.exports = express.createServer()
app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.compiler(
    src: __dirname + "/public"
    enable: [ "coffeescript" ]
  )
  app.use express.static(__dirname + "/public")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

app.get "/", routes.index

app.get /^\/api\/(.*)/, (request, response) ->
    proxy_url = "/"+request.params[0]
    proxy = http.createClient(5984, '127.0.0.1')
    proxy_request = proxy.request(request.method, proxy_url, request.headers)
    proxy_request.addListener "response", (proxy_response) ->
        proxy_response.addListener "data", (chunk) ->
            response.write chunk, "binary"

        proxy_response.addListener "end", ->
            response.end()

        response.writeHead proxy_response.statusCode, proxy_response.headers

    request.addListener "data", (chunk) ->
        proxy_request.write chunk, "binary"

    request.addListener "end", ->
        proxy_request.end()


app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
