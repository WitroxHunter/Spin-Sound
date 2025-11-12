// server/utils/mongodb.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let client;
let clientPromise;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    // możesz dodać opcje dodatkowe jeśli potrzebujesz
  });
  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

export async function connectDB() {
  const client = await clientPromise;
  // nie wywołujemy client.connect() tutaj ponownie
  return client.db("spinnsound");
}

export async function getProducts() {
  const db = await connectDB();
  const products = await db.collection("products").find({}).toArray();
  console.log(`Products retrieved: ${products.length}`);
  return products;
}

/**
 * getProductById - expects id to be number-like (string "2" or number 2)
 * Because your documents have `id` as NumberInt, we cast to Number before querying.
 */
export async function getProductById(id) {
  if (id === undefined || id === null) return null;

  // Jeśli id przychodzi jako '2' (string) -> zamień na number
  const numId = typeof id === "number" ? id : Number(id);

  if (Number.isNaN(numId)) {
    console.warn("getProductById called with non-numeric id:", id);
    return null;
  }

  const db = await connectDB();
  const product = await db.collection("products").findOne({ id: numId });
  return product;
}
