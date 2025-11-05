import { connectDB } from "../utils/mongodb";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const db = await connectDB();

    // 🔐 Pobierz token z nagłówka Authorization
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: "Missing token" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw createError({ statusCode: 403, statusMessage: "Invalid token" });
    }

    const user = await db
      .collection("users")
      .findOne({ email: decoded.email }, { projection: { cart: 1, _id: 0 } });

    return {
      success: true,
      cart: user.cart || [],
    };
  } catch (err) {
    console.error("Cart GET error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Server error",
    });
  }
});
