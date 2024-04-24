import nano from "nano";

const couch = nano("http://admin:Andresarias23@127.0.0.1:5984");

const db = couch.db.use("testdb");
async function insertDocument(key) {
  try {
    const response = await db.insert({ _id: key, testeew: "test" });
    if (response.ok) {
      return response;
    } else {
      throw new Error("Insert operation failed");
    }
  } catch (error) {
    console.log("Error saving document to database:", error);
    throw error;
  }
}

// async function destroFromDb(key) {}

// async function destroFromDb(key) {}

async function isKeyInDb(key) {
  const response = await db.get(key, { revs_info: true });
  //   console.log(response._id);
  if (response._id) return true;
}

export { insertDocument, isKeyInDb };
