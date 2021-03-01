import React, { useState, useEffect } from 'react';
var autobahn = require('autobahn');
const Journal = () => 
{
    
    const [socketOpen , setSocketOpen] = useState(false);
    const [log , setLog] = useState('');
    var connection = new autobahn.Connection({
        url: "ws://testassignment.filmdatabox.com:8395/ws",
        realm: "democontrol" 
    });
    const initWebSocket = () => {
        connection.onopen = function (session) {
            // 1) subscribe to a topic
            // function onevent(args) {
            //     console.log("Event:", args[0]);
            // }
            //session.subscribe('com.filmdatabox.democontrol.journal', onevent);
            //session.register('com.filmdatabox.democontrol.journal', journal)
            session.call('com.filmdatabox.democontrol.journal').then(
                function (res) {
                    setLog(res);
                }
            );
        
        }; 
        connection.open();
        setSocketOpen(true);
    }
    useEffect(() => {
        // if(socketOpen)
            initWebSocket();
          }, []);
	  
        return (
          <p>{log}</p>
        );
      
}
export default Journal;