import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  console.log("Connected to MongoDB");
  return client.db("spinnsound");
}

export async function getProducts() {
  const db = await connectDB();
  const products = await db.collection("products").find({}).toArray();
  console.log("Products retrieved:", products);
  return products;
}

export async function getProductById(id) {
  const db = await connectDB();
  return await db.collection("products").findOne({ id });
}
