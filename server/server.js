import express from "express";
import { nanoid } from "nanoid";

import { saveToDb, isKeyInDb } from "../services/couchDBService.js";
const app = express();
const port = 3000;
// import couchDBService from "../services/couchDBService";
app.use(express.json());

// shorten url
const domain = "https://www.something.com";
app.post("/shortify", (req, res) => {
  const { url } = req.body;
  const key = nanoid(8);
  // console.log(nanoid(8));
  // create key for original url
  const shortednedUrl = `${domain}/${key}`;
  
  // check db for existing matches from couchDBService
  
  // save to db from couchDBService
  const test = isKeyInDb('qn5gxRPy');
  console.log(`test: `, test)
  res.send(shortednedUrl);
});

// redirection of url
app.get("/:key", (req, res) => {});

app.listen(port, () => {
  `listening on port ${port}`;
});
