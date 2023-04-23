const server = require("./api/server");

const port = 9000;
const hostname = "127.0.0.1";
// START YOUR SERVER HERE
server.listen(port, () => {
  console.log("Server listening on port", port);
});
