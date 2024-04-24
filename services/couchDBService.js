import nano from "nano";

const couch = nano("http://admin:Andresarias23@127.0.0.1:5984");

const db = couch.db.use("testdb");
async function insertDocument(doc) {
  try {
    const response = await db.insert(doc);
    if (!response.ok) {
      throw new Error("Insert operation failed");
    }
  } catch (error) {
    console.log("Error saving document to database:", error);
    throw error;
  }
}

// async function destroFromDb(key) {}

async function isKeyInDb(key) {
  try {
    const response = await db.get(key, { revs_info: true });
    if (response._id) return true;
  } catch (error) {
    return false;
  }
}

export { insertDocument, isKeyInDb };
