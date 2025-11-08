<template>
  <div class="bg-[#1D1616] min-h-screen">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-12">
      <!-- Empty Cart State -->
      <div v-if="cartItems.length === 0" class="text-center py-20">
        <div
          class="bg-[#2A2A2A] rounded-lg p-12 border border-[#4A4A4A] max-w-md mx-auto"
        >
          <ShoppingCartIcon class="w-16 h-16 mx-auto mb-6 text-[#633131]" />

          <h2 class="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p class="text-[#c1c1c1] mb-8">
            Add some amazing vinyl records or CDs to get started!
          </p>
          <NuxtLink
            to="/products"
            class="inline-block py-3 px-8 bg-[#633131] hover:bg-[#582c2c] text-white rounded-lg transition"
          >
            Browse Products
          </NuxtLink>
        </div>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items List -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-[#2A2A2A] rounded-lg p-6 border border-[#4A4A4A] hover:border-[#633131] transition"
          >
            <div class="flex gap-6">
              <!-- Product Image -->
              <div
                class="w-32 h-32 flex-shrink-0 bg-[#3A3A3A] rounded-lg overflow-hidden"
              >
                <img
                  :src="item.image || '/placeholder-vinyl.jpg'"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Product Details -->
              <div class="flex-grow">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="text-xl font-semibold text-white mb-1">
                      {{ item.name }}
                    </h3>
                    <p class="text-[#c1c1c1] text-sm mb-1">{{ item.artist }}</p>
                    <p class="text-[#888] text-xs capitalize">
                      {{ item.category }}
                    </p>
                  </div>
                  <button
                    @click="removeItem(item.id)"
                    class="text-[#c1c1c1] hover:text-[#633131] transition"
                    title="Remove from cart"
                  >
                    <Trash class="w-6 h-6" />
                  </button>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center justify-between mt-4">
                  <div
                    class="flex items-center gap-3 bg-[#3A3A3A] rounded-lg p-1"
                  >
                    <button
                      @click="decrementQuantity(item.id)"
                      class="w-8 h-8 flex items-center justify-center text-white hover:bg-[#4A4A4A] rounded transition"
                      :disabled="item.quantity <= 1"
                      :class="{
                        'opacity-50 cursor-not-allowed': item.quantity <= 1,
                      }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span class="text-white font-semibold w-8 text-center">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="incrementQuantity(item.id)"
                      class="w-8 h-8 flex items-center justify-center text-white hover:bg-[#4A4A4A] rounded transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                  <p class="text-2xl font-bold text-white">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div
            class="bg-[#2A2A2A] rounded-lg p-6 border border-[#4A4A4A] sticky top-8"
          >
            <h2 class="text-2xl font-bold text-white mb-6">Order Summary</h2>

            <!-- Price Breakdown -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-[#c1c1c1]">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-[#c1c1c1]">
                <span>Shipping</span>
                <span>{{
                  shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`
                }}</span>
              </div>
              <div class="flex justify-between text-[#c1c1c1]">
                <span>Tax (estimated)</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t border-[#4A4A4A] pt-4">
                <div class="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="mb-6">
              <div class="flex gap-2">
                <input
                  v-model="promoCode"
                  type="text"
                  placeholder="Promo code"
                  class="flex-grow bg-[#3A3A3A] border border-[#4A4A4A] rounded-lg px-4 py-2 text-white placeholder-[#888] focus:outline-none focus:border-[#633131]"
                />
                <button
                  @click="applyPromo"
                  class="px-4 py-2 bg-[#4A4A4A] hover:bg-[#5A5A5A] text-white rounded-lg transition"
                >
                  Apply
                </button>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToCheckout"
              class="w-full py-4 bg-[#633131] hover:bg-[#582c2c] text-white font-semibold rounded-lg transition mb-4 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              Proceed to Checkout
            </button>

            <p class="text-xs text-center text-[#888]">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { ShoppingCartIcon, Trash } from "lucide-vue-next";
import { useCart } from "#imports";

const { fetchCart, removeFromCart, decrementItem, addToCart } = useCart();
const token = useCookie("auth_token");

// Loading cart items
const cartItems = ref([]);

onMounted(async () => {
  try {
    cartItems.value = await fetchCart();
    console.log("Cart items loaded:", cartItems.value);
  } catch (err) {
    console.error("Cart fetch failed:", err);
  }
});

// Calculations
const promoCode = ref("");

const totalItems = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const shipping = computed(() => (subtotal.value > 50 ? 0 : 5.99));
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + shipping.value + tax.value);

// Cart actions
// Remove
async function removeItem(id) {
  try {
    await removeFromCart(id);
    cartItems.value = cartItems.value.filter((i) => i.id !== id);
  } catch (err) {
    console.error("Remove item failed:", err);
  }
}

// Increment
async function incrementQuantity(id) {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) item.quantity++;
  try {
    await addToCart(item, 1);
  } catch (err) {
    console.error("Increment failed:", err);
  }
}

// Decrement
async function decrementQuantity(id) {
  const item = cartItems.value.find((i) => i.id === id);
  if (!item) return;

  try {
    await decrementItem(id);
    if (item.quantity > 1) item.quantity--;
    else cartItems.value = cartItems.value.filter((i) => i.id !== id);
  } catch (err) {
    console.error("Decrement failed:", err);
  }
}

// Promo
function applyPromo() {
  if (promoCode.value) {
    alert(`Promo code "${promoCode.value}" applied!`);
  }
}

const config = useRuntimeConfig();
const stripePromise = loadStripe(config.public.STRIPE_PUBLISHABLE_KEY);

async function proceedToCheckout() {
  try {
    console.log("Initiating checkout with items:", cartItems.value);
    const { id } = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        products: cartItems.value,
        total: total.value,
      },
    });
    console.log("Checkout session created with ID:", id);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  } catch (err) {
    console.error("Checkout error:", err);
    alert("There was an error processing your checkout. Please try again.");
  }
}
</script>
