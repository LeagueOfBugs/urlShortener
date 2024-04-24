import express from "express";
import { nanoid } from "nanoid";
import { addDays, format } from "date-fns";

import { insertDocument, isKeyInDb } from "../services/couchDBService.js";
const app = express();
const port = 3000;

app.use(express.json());

// shorten url
const domain = "https://www.something.com";

app.post("/shortify", (req, res) => {
  const { url, customKey, customExpireDate } = req.body;
  
  const generatedKey = nanoid(8);
  const key = customKey || generatedKey;

  const timestamp = new Date();
  const shortednedUrl = `${domain}/${key}`;
  const date = customExpireDate || 15;
  const expiryDate = addDays(timestamp, date);

  const doc = {
    _id: key,
    originalUrl: url,
    shortenedUrl: shortednedUrl,
    timestamp: format(timestamp, "yyyy-MM-dd"),
    expireDate: format(expiryDate, "yyyy-MM-dd"),
  };

  // check db for existing matches from couchDBService
  if (!isKeyInDb(key)) {
    // save to db from couchDBService
    insertDocument(doc);
  }

  res.send(doc);
});

// redirection of url
app.get("/:key", (req, res) => {});

app.listen(port, () => {
  `listening on port ${port}`;
});
