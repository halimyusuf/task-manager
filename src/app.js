import express from "express";
import {
  dbStartUp
} from "./utils/loaders";
const app = express();
import * as route from "./routes/route";
route.route(app);
dbStartUp();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default server