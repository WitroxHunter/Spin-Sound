import { getProductById } from "../../utils/mongodb";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const product = await getProductById(Number(id));
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  return product;
});
