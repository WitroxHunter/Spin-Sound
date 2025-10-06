import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await MongoClient.connect(process.env.MONGO_URI!);
  const db = client.db("spinnsound");

  const existingUser = await db
    .collection("users")
    .findOne({ email: body.email });
  if (existingUser) return { error: "User already exists" };

  const passwordHash = await bcrypt.hash(body.password, 10);
  const result = await db.collection("users").insertOne({
    email: body.email,
    passwordHash,
    name: body.name || null,
    role: "customer",
  });

  return { success: true, userId: result.insertedId };
});
