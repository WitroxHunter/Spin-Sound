interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  artist?: string;
  category?: string;
  genre?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ServerCartResponse {
  cart: CartItem[];
}

export function useCart() {
  const token = useCookie<string | null>("auth_token");

  function getGuestCart(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem("guest_cart") || "[]");
    } catch {
      return [];
    }
  }

  function saveGuestCart(cart: CartItem[]): void {
    localStorage.setItem("guest_cart", JSON.stringify(cart));
  }

  async function fetchCart(): Promise<CartItem[]> {
    try {
      if (!token.value) {
        return getGuestCart();
      }

      const data = await $fetch<ServerCartResponse>("/api/cart", {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      return data.cart || [];
    } catch (err) {
      console.error("Cart fetch error:", err);
      return [];
    }
  }

  async function addToCart(
    product: Product,
    quantity = 1
  ): Promise<CartItem[]> {
    try {
      if (!token.value) {
        // GUEST
        const cart = getGuestCart();
        const index = cart.findIndex((item) => item.id === product.id);

        if (index !== -1) {
          const item = cart[index];
          if (item) {
            item.quantity += quantity;
          }
        } else {
          cart.push({ ...product, quantity });
        }

        saveGuestCart(cart);
        console.log("Added to localStorage cart:", product.name);
        return cart;
      }

      // AUTHENTICATED
      const plainProduct = (product as any).value ?? product;

      const res = await $fetch<ServerCartResponse>("/api/cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: { product: plainProduct, quantity },
      });

      console.log("Added to server cart:", res);
      return res.cart;
    } catch (err) {
      console.error("Cart add error:", err);
      throw err;
    }
  }

  async function removeFromCart(id: string): Promise<CartItem[]> {
    try {
      if (!token.value) {
        const cart = getGuestCart().filter((item) => item.id !== id);
        saveGuestCart(cart);
        console.log("Removed from localStorage cart:", id);
        return cart;
      }

      const res = await $fetch<ServerCartResponse>("/api/cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: { action: "remove", product: { id } },
      });

      console.log("Removed from server cart:", res);
      return res.cart;
    } catch (err) {
      console.error("Cart remove error:", err);
      throw err;
    }
  }

  async function decrementItem(id: string): Promise<CartItem[]> {
    try {
      if (!token.value) {
        const cart = getGuestCart();
        const index = cart.findIndex((item) => item.id === id);
        if (index !== -1) {
          const item = cart[index];
          if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) cart.splice(index, 1);
            saveGuestCart(cart);
          }
        }
        console.log("Decremented local item:", id);
        return cart;
      }

      const res = await $fetch<ServerCartResponse>("/api/cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: { action: "decrement", product: { id } },
      });

      console.log("Decremented server item:", res);
      return res.cart;
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
