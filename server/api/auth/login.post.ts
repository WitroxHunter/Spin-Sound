import { connectDB } from "../../utils/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = await connectDB();

  const user = await db.collection("users").findOne({ email: body.email });
  if (!user) return { error: "Invalid credentials" };

  const match = await bcrypt.compare(body.password, user.passwordHash);
  if (!match) return { error: "Invalid credentials" };

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    token,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
});
