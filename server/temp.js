const streamTweets = (socket, token) => {
    let stream;
  
    const config = {
      url: streamURL,
      auth: {
        bearer: token,
      },
      timeout: 31000,
    };
  
    try {
      const stream = request.get(config);
  
      stream
        .on("data", (data) => {
          try {
            const json = JSON.parse(data);
            if (json.connection_issue) {
              socket.emit("error", json);
              reconnect(stream, socket, token);
            } else {
              if (json.data) {
                socket.emit("tweet", json);
              } else {
                socket.emit("authError", json);
              }
            }
          } catch (e) {
            socket.emit("heartbeat");
          }
        })
        .on("error", (error) => {
          // Connection timed out
          socket.emit("error", errorMessage);
          reconnect(stream, socket, token);
        });
    } catch (e) {
      socket.emit("authError", authMessage);
    }
  };
  
  const reconnect = async (stream, socket, token) => {
    timeout++;
    stream.abort();
    await sleep(2 ** timeout * 1000);
    streamTweets(socket, token);
  };
  
  io.on("connection", async (socket) => {
    try {
      const token = BEARER_TOKEN;
      io.emit("connect", "Client connected");
      const stream = streamTweets(io, token);
    } catch (e) {
      io.emit("authError", authMessage);
    }
  });
  