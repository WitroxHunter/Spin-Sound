export function useCart() {
  const token = useCookie("auth_token");

  async function fetchCart(): Promise<any[]> {
    try {
      if (!token.value) throw new Error("Missing auth token");

      const data = await $fetch<{ cart: any[] }>("/api/cart", {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      return data.cart || [];
    } catch (err) {
      console.error("Cart fetch error:", err);
      return [];
    }
  }

  async function addToCart(product: any, quantity = 1) {
    try {
      if (!token.value) throw new Error("Missing auth token");

      const plainProduct = product.value || product;

      const res = await $fetch("/api/cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: { product: plainProduct, quantity },
      });

      console.log("Added to cart:", res);
      return res;
    } catch (err) {
      console.error("Cart add error:", err);
      throw err;
    }
  }

  async function removeFromCart(id: string | number) {
    try {
      if (!token.value) throw new Error("Missing auth token");

      const res = await $fetch("/api/cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: {
          action: "remove",
          product: { id },
        },
      });

      console.log("Removed from cart:", res);
      return res;
    } catch (err) {
      console.error("Cart remove error:", err);
      throw err;
    }
  }

  async function decrementItem(id: string | number) {
    try {
      if (!token.value) throw new Error("Missing auth token");

      const res = await $fetch("/api/cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: {
          action: "decrement",
          product: { id },
        },
      });

      console.log("Decremented item:", res);
      return res;
    } catch (err) {
      console.error("Cart decrement error:", err);
      throw err;
    }
  }

  return {
    fetchCart,
    addToCart,
    removeFromCart,
    decrementItem,
  };
}
