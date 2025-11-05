import { connectDB } from "../utils/mongodb";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const db = await connectDB();
    const body = await readBody(event);

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

    const user = await db.collection("users").findOne({ email: decoded.email });
    if (!user) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    if (body.action === "remove") {
      await db
        .collection("users")
        .updateOne(
          { email: decoded.email },
          { $pull: { cart: { id: body.product.id } } }
        );
    } else if (body.action === "decrement") {
      const existingItem = user.cart.find((i) => i.id === body.product.id);
      if (!existingItem) {
        throw createError({
          statusCode: 404,
          statusMessage: "Product not in cart",
        });
      }

      if (existingItem.quantity > 1) {
        await db
          .collection("users")
          .updateOne(
            { email: decoded.email, "cart.id": body.product.id },
            { $inc: { "cart.$.quantity": -1 } }
          );
      } else {
        await db
          .collection("users")
          .updateOne(
            { email: decoded.email },
            { $pull: { cart: { id: body.product.id } } }
          );
      }
    } else {
      const existingItem = user.cart.find(
        (item) => item.id === body.product.id
      );

      if (existingItem) {
        await db
          .collection("users")
          .updateOne(
            { email: decoded.email, "cart.id": body.product.id },
            { $inc: { "cart.$.quantity": 1 } }
          );
      } else {
        await db
          .collection("users")
          .updateOne(
            { email: decoded.email },
            { $push: { cart: { ...body.product, quantity: 1 } } }
          );
      }
    }

    const updatedUser = await db
      .collection("users")
      .findOne({ email: decoded.email }, { projection: { cart: 1, _id: 0 } });

    return {
      success: true,
      cart: updatedUser.cart,
    };
  } catch (err) {
    console.error("Cart error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Server error",
    });
  }
});
