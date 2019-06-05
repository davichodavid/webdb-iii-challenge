const express = require("express");
const helmet = require("helmet");
const cohortsRouter = require("./cohorts/cohorts-router");

const server = express();
server.use(express.json(), helmet());

server.use("/api/cohorts", cohortsRouter);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`"port: ${port}": Good Morning Vietnam!! `);
});
