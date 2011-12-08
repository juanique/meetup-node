express = require("express")
routes = require("./routes")
http = require("http")
querystring = require("querystring")


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

proxy = (request, response) ->
    proxy_url = "/"+request.params[0]
    post_data = JSON.stringify(request.body)
    post_options =
        host: '127.0.0.1',
        port: '5984',
        path: proxy_url,
        method: request.method,
        headers:
            'Content-Type': 'application/json',
            'Content-Length': post_data.length

    post_req = http.request post_options, (proxy_response) ->
        #res.setEncoding('utf8')
        proxy_response.addListener "data", (chunk) ->
            console.log "acaaaa :"+chunk
            response.write chunk, "binary"

        proxy_response.addListener "end", ->
            response.end()

        response.writeHead proxy_response.statusCode, proxy_response.headers

    post_req.write(post_data)
    post_req.end()
    
'''
proxy = (request, response) ->
    console.log "Handling new request"
    proxy_url = "/"+request.params[0]
    console.log "Redirecting to "+proxy_url
    proxy = http.createClient(5984, '127.0.0.1')


    proxy_request = proxy.request(request.method, proxy_url, request.headers)

    proxy_request.addListener "response", (proxy_response) ->
        console.log "got response from proxy "

        proxy_response.addListener "data", (chunk) ->
            console.log "acaaaa :"+chunk
            response.write chunk, "binary"

        proxy_response.addListener "end", ->
            response.end()

        response.writeHead proxy_response.statusCode, proxy_response.headers

    request.addListener "data", (chunk) ->
        console.log "writing to proxy "+chunk

        proxy_request.write chunk, "binary"

    request.addListener "end", ->
        console.log "end of data"

        proxy_request.end()
'''

app.get /^\/api\/(.*)/, (request, response) ->
    proxy(request, response)
app.post /^\/api\/(.*)/, (request, response) ->
    proxy(request, response)
    #response.send(querystring.stringify(request.body))
    #post_proxy(request, response)


app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env

forwardRequest = (inRequest, inResponse, uri) ->
  sys.log inRequest.method + " " + uri
  uri = url.parse(uri)
  out = http.createClient(uri.port or 44384, uri.hostname)
  path = uri.pathname + (uri.search or "")
  headers = inRequest.headers
  headers["host"] = uri.hostname + ":" + (uri.port or 44384)
  headers["x-forwarded-for"] = inRequest.connection.remoteAddress
  headers["referer"] = "http://" + uri.hostname + ":" + (uri.port or 44384) + "/"
  outRequest = out.request(inRequest.method, path, headers)
  out.on_ "error", (e) ->
    unknownError inResponse, e
  
  outRequest.on_ "error", (e) ->
    unknownError inResponse, e
  
  inRequest.on_ "data", (chunk) ->
    outRequest.write chunk
  
  inRequest.on_ "end", ->
    outRequest.on_ "response", (outResponse) ->
      delete outResponse.headers["transfer-encoding"]
      
      return error(inResponse, "db_unavailable", "Database server not available.", 502)  if outResponse.statusCode == 503
      inResponse.writeHead outResponse.statusCode, outResponse.headers
      outResponse.on_ "data", (chunk) ->
        inResponse.write chunk
      
      outResponse.on_ "end", ->
        inResponse.end()
    
    outRequest.end()
