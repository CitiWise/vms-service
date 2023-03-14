import "reflect-metadata";

import dotenv from "dotenv";
import * as http from "http";

import app from "./app";
import { Database } from "./typeorm/dbCreateConnection";
import { logger } from "./utils/logger";

dotenv.config({ path: "../.env " });

const main = async () => {
  const PORT = process.env.PORT;

  // init database
  const database = new Database();
//   const conn = await database.getConnection("default");

  const server = http.createServer(app);

  server.listen(PORT, async () => {
    logger.info(`listening on port ${PORT}`);
  });

  server.on("error", async (err) => {
    if (err) {
      logger.error("Server crashed while listening", err);
      throw err;
    }
  });

  server.on("close", async () => {
    logger.warn("Closing server connection");
  });

  async function commonErrorHandler(err) {
    logger.warn("SOMETHING BROKE!!");
    logger.error(err);
   

    process.exit(0);
  }

  process.on("SIGINT", commonErrorHandler);
  process.on("unhandledRejection", commonErrorHandler);
  process.on("uncaughtException", commonErrorHandler);

  process.on("exit", async () => {
    logger.warn("Process exit detected!!");
  });
};

// // @ts-ignore
// if (cluster.isPrimary) {
//     const num_cpus = os.cpus().length;

//     for (let i = 0; i < num_cpus; i++) {
//         cluster.fork();
//     }

//     // if any cluster dies, fork a new one
//     cluster.on('exit', () => {
//         cluster.fork();
//     });
// } else {
//     main();
// }
