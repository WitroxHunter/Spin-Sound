import bcrypt from "bcrypt";
import { connectDB } from "../../utils/mongodb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = await connectDB();

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
    cart: [],
    favorites: [],
  });

  return { success: true, userId: result.insertedId };
});
