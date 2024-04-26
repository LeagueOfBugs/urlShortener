import express from "express";
import { nanoid } from "nanoid";
import { addDays, format } from "date-fns";

import {
  insertDocument,
  isKeyTaken,
  findDocument,
  deleteKey,
} from "../services/couchDBService.js";
const app = express();
const port = 3000;

app.use(express.json());

const domain = "https://www.something.com";

app.post("/shortify", (req, res) => {
  const { url, customKey, customExpireDate } = req.body;

  const generatedKey = nanoid(8);
  const key = customKey || generatedKey;

  const timestamp = new Date();
  const shortenedUrl = `${domain}/${key}`;
  const date = customExpireDate || 15;
  const expiryDate = addDays(timestamp, date);

  // document with metadata
  const doc = {
    _id: key,
    originalUrl: url,
    shortenedUrl: shortenedUrl,
    timestamp: format(timestamp, "yyyy-MM-dd"),
    expireDate: format(expiryDate, "yyyy-MM-dd"),
  };

  // check db for existing matches from couchDBService
  if (isKeyTaken(key)) {
    // save to db from couchDBService
    insertDocument(doc);
  }

  res.send(doc);
});

// redirection of url
app.get("/delete/:key", (req, res) => {
  const { key } = req.params;

  deleteKey(key);
  
});

app.get("/:key", async (req, res) => {
  const { key } = req.params;

  // Find key in db
  const document = await findDocument(key);

  // redirect to original URL
  res.redirect(301, document.originalUrl);
});

app.listen(port, () => {
  `listening on port ${port}`;
});
