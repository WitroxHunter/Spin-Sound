import { getProducts } from "../utils/mongodb";

export default defineEventHandler(async (event) => {
  try {
    const products = await getProducts();
    console.log("Products fetched successfully:", products);
    return { products };
  } catch (err) {
    console.error(err);
    throw createError({ statusCode: 500, statusMessage: "DB error" });
  }
});
