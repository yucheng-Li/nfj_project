
var express, model, pc, httpMethod, formidable, fs, xlsx, querystring;

express = require('express');

model = require('model');

httpMethod = require('./publicMethod');

pc = express.Router();

formidable = require('formidable');

fs = require('fs');

xlsx = require('node-xlsx');

var cookisParse = require('cookie-parser');

querystring = require('querystring');

function parseSessionId(req) {
    var Cookies = {};
    var parts = "";
    if (req.headers.cookie != null) {
        req.headers.cookie.split(';').forEach(l => {
            parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    return Cookies["sessionId"];
}

//post
pc.post('/postMethod', function(req, res) {
    httpMethod.http_post(req.body.data, req.body.method, parseSessionId(req), function(data) {
        res.send(data);
    });
});

//get
pc.get('/getMethod', function(req, res) {
    httpMethod.http_get(req.query.data, req.query.method, parseSessionId(req), function(data) {
        res.send(data);
    });
});

//delete
pc.delete('/deleteMethod', function(req, res) {
    httpMethod.http_delete(req.body.data, req.body.method, parseSessionId(req), function(data) {
        res.send(data);
    });
});

//put
pc.put('/putMethod', function(req, res) {
    httpMethod.http_put(req.body.data, req.body.method, parseSessionId(req), function(data) {
        res.send(data);
    });
});

//export
pc.get('/exportMethod', function(req, res) {
    if (req.query.data) {
        var query_data = querystring.stringify(JSON.parse(req.query.data));
        var down_file = "http://" + ipaddress + ':' + port + req.query.method + '?' + query_data + '&sessionId=' + parseSessionId(req);
    } else {
        var down_file = "http://" + ipaddress + ':' + port + req.query.method + '?' + '&sessionId=' + parseSessionId(req);
    }
    res.send({
        data: down_file
    });
});


