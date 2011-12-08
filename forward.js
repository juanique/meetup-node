function forwardRequest(inRequest, inResponse, uri) {
    sys.log(inRequest.method + ' ' + uri);

    uri = url.parse(uri);
    var out = http.createClient(uri.port||44384, uri.hostname);
    var path = uri.pathname + (uri.search || '');
    var headers = inRequest.headers;
    headers['host'] = uri.hostname + ':' + (uri.port||44384);
    headers['x-forwarded-for'] = inRequest.connection.remoteAddress;
    headers['referer'] = 'http://' + uri.hostname + ':' + (uri.port||44384) + '/';

    var outRequest = out.request(inRequest.method, path, headers);

    out.on('error', function(e) { unknownError(inResponse, e) });
    outRequest.on('error', function(e) { unknownError(inResponse, e) });

    inRequest.on('data', function(chunk) { outRequest.write(chunk) });
    inRequest.on('end', function() {
        outRequest.on('response', function(outResponse) {
            // nginx does not support chunked transfers for proxied requests
            delete outResponse.headers['transfer-encoding'];

            if (outResponse.statusCode == 503) {
                return error(inResponse, 'db_unavailable', 'Database server not available.', 502);
            }

            inResponse.writeHead(outResponse.statusCode, outResponse.headers);
            outResponse.on('data', function(chunk) { inResponse.write(chunk); });
            outResponse.on('end', function() { inResponse.end(); });
        });
        outRequest.end();
    });
};
