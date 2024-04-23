import nano from "nano";

const couch = nano("http://admin:Andresarias23@127.0.0.1:5984");

const db = couch.db.use("testdb");
async function saveToDb(key) {
  console.log(key);

  try {
    const response = await db.insert(
      { _id: key, test: "test" },
      (err, body) => {
        const { ok } = body;

        if (ok) {
          return response;
        } else {
          console.log("error:", err);
          return err;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// async function destroFromDb(key) {}

// async function destroFromDb(key) {}

async function isKeyInDb(key) {
  const response = await db.get(key, { revs_info: true });
//   console.log(response._id);
  if(response._id) return true
}

export { saveToDb, isKeyInDb };
