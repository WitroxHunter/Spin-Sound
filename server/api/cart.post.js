const addToCart = async () => {
  try {
    await $fetch("/api/cart", {
      method: "POST",
      body: {
        productId: product.value.id,
        quantity: quantity.value,
      },
    });
    console.log("Added to cart");
  } catch (err) {
    console.error("Add to cart failed", err);
  }
};
