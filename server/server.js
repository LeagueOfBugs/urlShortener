import express from "express";
import { nanoid } from "nanoid";
import { addDays, format } from "date-fns";
import cors from "cors";
import {
  insertDocument,
  isKeyTaken,
  findDocument,
  deleteKey,
} from "../service/couchDBService.js";
import { urlValidator } from "../utils/urlValidator.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const domain = "http://localhost:3000";

// Shorten Url
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

// Delete key
app.delete("/delete/:key", async (req, res) => {
  const { key } = req.params;

  const response = await deleteKey(key);

  if (response) {
    res.send("Key successfully deleted");
  } else {
    res.send("Something went wrong deleting your key");
  }
});

// retreive docs with key
app.post("/retrieve/:key", async (req, res) => {
  const { key } = req.params;
  const document = await findDocument(key);
  if (document) {
    res.send(document);
  } else {
    res.send(false);
  }
});

// redirection
app.get("/:key", async (req, res) => {
  const { key } = req.params;

  // Find key in db
  const document = await findDocument(key);

  // if key is not found redirect to home
  if (!document) {
    res.redirect(301, "http://www.localhost:5173");
  } else {
    // redirect to original URL
    res.redirect(301, document.originalUrl);
  }
});

app.listen(port, () => {
  `listening on port ${port}`;
});
