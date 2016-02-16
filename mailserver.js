var Cache = require('./cache.js')
var ms = require('smtp-tester');

function MailServer(cache) {
    var mailServer = ms.init(9025);
    var handler = function (addr, id, email) {
        cache.create(id, email);
        console.log("new mail with id: " + id);
    };

    mailServer.bind(handler);
}

module.exports = MailServer;



