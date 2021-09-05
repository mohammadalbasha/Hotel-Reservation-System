let io ;
 module.exports =  {
     init :(server) => {
        io = require('socket.io')(server, {
            cors: {
              origin: "http://localhost:3000",
              credentials: true
            }});
        return io;
     },
     getIo : () => {
        if (io) return io;
        throw Error ('io not connected');

     }

 }