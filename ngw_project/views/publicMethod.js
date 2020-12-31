var express = require('express');
var publicMethod = express.Router();
var http = require('http');
var api = express.Router();
var querystring = require('querystring');
var fs = require('fs');
var util = require('util');
var cookie = require('cookie');
var cookisParse = require('cookie-parser');
var config = require('../../config.js');

global.ipaddress = config.ipaddress;
global.port = config.port;

var obj = {
    http_post: function(post_content, address, token, func) {
        var opt_data = JSON.stringify(post_content);
        var options = {
            host: ipaddress,
            port: port,
            path: address,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-cn',
                'Accept': '*/*',
                "token": token || ''
            }
        };
        var req = http.request(options, function(res) {
            var chunks = '';
            res.on('data', function(chunk) {
                chunks += chunk;
            });
            res.on('end', function() {
                func(chunks);
            });
        });
        req.on('error', function(err) {
            console.log('err:', err);
        });
        req.write(opt_data);
        req.end();
    },
    http_put: function(put_content, address, token, func) {
        var opt_data = JSON.stringify(put_content);
        var options = {
            host: ipaddress,
            port: port,
            path: address,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-cn',
                'Accept': '*/*',
                "token": token || ''
            }
        };
        var req = http.request(options, function(res) {
            var chunks = '';
            res.on('data', function(chunk) {
                chunks += chunk;
            });
            res.on('end', function() {
                func(chunks);
            });
        });

        req.on('error', function(err) {
            console.log('err:', err);
        });
        req.write(opt_data);
        req.end();
    },
    http_get: function(get_content, address, token, func) {
        var path = address;
        if (get_content == "" || get_content == undefined) {
            var path = address.trim();
        } else {
            var data = querystring.stringify(JSON.parse(get_content));
            var path = address + "?" + data;
        }
        var options = {
            hostname: ipaddress,
            port: port,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-cn',
                'Accept': '*/*',
                "token": token || ''
            }
        };
        var req = http.request(options, function(res) {
            var chunks = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                chunks += chunk;
            });
            res.on('end', function() {
                var data = null;
                func(chunks.toString());
            });
        });
        req.on('error', function(e) {
            console.log('错误：' + e.message);
        });
        req.end();
    },
    http_delete: function(post_content, address, token, func) {
        var opt_data = JSON.stringify(post_content);
        var options = {
            host: ipaddress,
            port: port,
            path: address,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-cn',
                'Accept': '*/*',
                "token": token || ''
            }
        };
        var req = http.request(options, function(res) {
            var chunks = '';
            res.on('data', function(chunk) {
                chunks += chunk;
            });
            res.on('end', function() {
                func(chunks);
            });
        });
        req.on('error', function(err) {
            console.log('err:', err);
        });
        req.write(opt_data);
        req.end();
    }
}
module.exports = obj;
