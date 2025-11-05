export function useCart() {
  const token = useCookie("auth_token");

  async function addToCart(product: Ref<Object>, quantity: number) {
    try {
      if (!token.value) {
        throw new Error("Missing auth token");
      }

      const res = await $fetch("/api/cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          product,
          quantity,
        },
      });

      console.log("Added to cart:", res);
      return res;
    } catch (err) {
      console.error("Cart add error:", err);
      throw err;
    }
  }

  return {
    addToCart,
  };
}
