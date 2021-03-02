
var autobahn = require('autobahn');
var connection = new autobahn.Connection({
    url: "ws://testassignment.filmdatabox.com:8395/ws",
    realm: "democontrol"
});

connection.onopen = function (session, details) {
    var journal = function (args) {
        console.log(args[0]);
    }

    // 1) subscribe to a topic
    // function onevent(args) {
    //     console.log("Event:", args[0]);
    // }
    session.subscribe('com.filmdatabox.democontrol.journal', journal);
    //session.register('com.filmdatabox.democontrol.journal', journal)
    session.call('com.filmdatabox.democontrol.journal').then(
        function (res) {
            //setLog(res);
            console.log(res);
        }, session.log);

};
connection.open();
