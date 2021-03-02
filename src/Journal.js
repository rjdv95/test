import React, { useState, useEffect } from 'react';
var autobahn = require('autobahn');
const Journal = () => {

    const [socketOpen, setSocketOpen] = useState(false);
    const [log, setLog] = useState([]);
    const temp = [];
    var connection = new autobahn.Connection({
        url: "ws://testassignment.filmdatabox.com:8395/ws",
        realm: "democontrol"
    });
    const initWebSocket = () => {
        connection.onopen = function (session) {
            var journal = function (args) {
                setLog(args[0]);
            }
            session.subscribe('com.filmdatabox.democontrol.journal', journal);
            // session.register('com.filmdatabox.democontrol.journal', journal)
            session.call('com.filmdatabox.democontrol.journal').then(
                function (res) {
                    setLog(res)
                }
            );

        };
        connection.open();
        setSocketOpen(true);
    }
    // useEffect(() => {
    //     //window.location.reload(false)
    // }, [log])

    useEffect(() => {
        initWebSocket();
    }, []);

    return (
        log.map(i => <div>{i}</div>)

    );

}
export default Journal;