var express = require('express');
var Cache = require('./cache.js')
var MailServer = require('./mailserver.js');

var cache = new Cache();
var mailServer = new MailServer(cache);
var app = express();

//todo make cleaner
app.get('/mail', function(req, res){
 var searchParams = {};
 var from = req.query.from;
 var to = req.query.to;
 var subject = req.query.subject;

 if (typeof from != 'undefined') {
  searchParams['from'] = from;
 }

 if (typeof to != 'undefined') {
  searchParams['to'] = to;
 }

 if (typeof subject != 'undefined') {
  searchParams['subject'] = subject;
 }
//end
 var result = cache.search(searchParams);
 res.send(result);
});

app.get('/mail/:id', function(req, res){
 var id = req.params.id;
 var result = cache.read(id)
 res.send(result);
});

app.get('/mail/:id/html', function(req, res){
 var id = req.params.id;
 var result = cache.read(id)
 res.send(result.html);
});

app.get('/mail/delete/:id', function(req, res){
 var id = req.params.id;
 mailServer.remove(id);
 cache.delete(id);
 res.send('deleted mail with id' + req.params.id);

});

app.get('/mail/delete/all', function(req, res){
 mailServer.removeAll();
 cache.clear();
 res.send('deleted all mail');

});


var queryStringToSearchParams(querystring)
{

}


app.listen(3000);


