(function() {
  var app, express, forwardRequest, http, proxy, routes, sys, url;

  express = require("express");

  routes = require("./routes");

  http = require("http");

  sys = require("sys");

  url = require("url");

  app = module.exports = express.createServer();

  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.compiler({
      src: __dirname + "/public",
      enable: ["coffeescript"]
    }));
    return app.use(express.static(__dirname + "/public"));
  });

  app.configure("development", function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure("production", function() {
    return app.use(express.errorHandler());
  });

  app.get("/", routes.index);

  proxy = function(request, response) {
    var proxy_request, proxy_url;
    proxy_url = "/" + request.params[0];
    proxy = http.createClient(5984, '127.0.0.1');
    proxy_request = proxy.request(request.method, proxy_url, request.headers);
    proxy_request.addListener("response", function(proxy_response) {
      proxy_response.addListener("data", function(chunk) {
        return response.write(chunk, "binary");
      });
      proxy_response.addListener("end", function() {
        return response.end();
      });
      return response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });
    request.addListener("data", function(chunk) {
      return proxy_request.write(chunk, "binary");
    });
    return request.addListener("end", function() {
      return proxy_request.end();
    });
  };

  app.get(/^\/api\/(.*)/, function(request, response) {
    var uri;
    uri = {
      port: "5984",
      pathname: "/" + request.params[0],
      host: "127.0.0.1"
    };
    return forwardRequest(request, response, uri);
  });

  app.post(/^\/api\/(.*)/, function(request, response) {
    var uri;
    uri = {
      port: "5984",
      pathname: "/" + request.params[0],
      host: "127.0.0.1"
    };
    return forwardRequest(request, response, uri);
  });

  app.listen(3000);

  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

  forwardRequest = function(inRequest, inResponse, uri) {
    var headers, out, outRequest, path;
    sys.log(inRequest.method + " " + uri);
    uri = url.parse(uri);
    out = http.createClient(uri.port || 44384, uri.hostname);
    path = uri.pathname + (uri.search || "");
    headers = inRequest.headers;
    headers["host"] = uri.hostname + ":" + (uri.port || 44384);
    headers["x-forwarded-for"] = inRequest.connection.remoteAddress;
    headers["referer"] = "http://" + uri.hostname + ":" + (uri.port || 44384) + "/";
    outRequest = out.request(inRequest.method, path, headers);
    out.on_("error", function(e) {
      return unknownError(inResponse, e);
    });
    outRequest.on_("error", function(e) {
      return unknownError(inResponse, e);
    });
    inRequest.on_("data", function(chunk) {
      return outRequest.write(chunk);
    });
    return inRequest.on_("end", function() {
      outRequest.on_("response", function(outResponse) {
        delete outResponse.headers["transfer-encoding"];
        if (outResponse.statusCode === 503) {
          return error(inResponse, "db_unavailable", "Database server not available.", 502);
        }
        inResponse.writeHead(outResponse.statusCode, outResponse.headers);
        outResponse.on_("data", function(chunk) {
          return inResponse.write(chunk);
        });
        return outResponse.on_("end", function() {
          return inResponse.end();
        });
      });
      return outRequest.end();
    });
  };

}).call(this);
