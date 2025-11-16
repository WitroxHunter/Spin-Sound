<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from "lucide-vue-next";
import { useCart } from "~/composables/useCart";
import Popup from "~/components/Popup.vue";
import { loadStripe } from "@stripe/stripe-js";

const route = useRoute();
const slug = route.params.slug;
const id = slug.split("-")[0];
const { data: product } = await useFetch(`/api/product/${id}`);
const token = useCookie("auth_token");
const { addToCart } = useCart();

const quantity = ref(1);
const selectedImage = ref(0);
const isWishlisted = ref(false);

const additionalImages = ref([
  product.value?.image,
  product.value?.image,
  product.value?.image,
]);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};

const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: product.value.name,
      text: `Check out ${product.value.name} by ${product.value.artist}`,
      url: window.location.href,
    });
  }
};

const showPopup = ref(false);
const popupMessage = ref("");

const handleAddToCart = (product, quantity) => {
  addToCart(product, quantity);
  popupMessage.value = `✅ ${product.name} added to cart!`;
  showPopup.value = true;
};

const config = useRuntimeConfig();
const stripePromise = loadStripe(config.public.STRIPE_PUBLISHABLE_KEY);

async function proceedToCheckout() {
  try {
    const stripe = await stripePromise;
    const { id } = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        products: [
          {
            ...product.value,
            quantity: quantity.value,
          },
        ],
      },
    });

    console.log("Checkout session created with ID:", id);
    await stripe.redirectToCheckout({ sessionId: id });
  } catch (err) {
    console.error("Checkout error:", err);
    alert("There was an error processing your checkout. Please try again.");
  }
}
</script>

<template>
  <div class="bg-[#1D1616] min-h-screen text-white pt-16">
    <div v-if="product" class="max-w-7xl mx-auto px-4 py-8">
      <nav class="text-sm text-[#c1c1c1] mb-8">
        <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-white">Products</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink
          :to="`/products/${product.category}`"
          class="hover:text-white capitalize"
          >{{ product.category }}</NuxtLink
        >
        <span class="mx-2">/</span>
        <span class="text-white">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-4">
          <div
            class="bg-[#2A2A2A] rounded-lg overflow-hidden border border-[#4A4A4A]"
          >
            <img
              :src="additionalImages[selectedImage] || product.image"
              :alt="product.name"
              class="w-full h-96 lg:h-[500px] object-contain bg-[#3A3A3A]"
            />
          </div>

          <div class="flex gap-2 overflow-x-auto">
            <button
              v-for="(image, index) in additionalImages.filter((img) => img)"
              :key="index"
              @click="selectedImage = index"
              :class="[
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition',
                selectedImage === index
                  ? 'border-[#633131]'
                  : 'border-[#4A4A4A] hover:border-[#633131]',
              ]"
            >
              <img
                :src="image"
                :alt="`${product.name} view ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div class="inline-flex">
            <span
              class="bg-[#633131] text-white px-3 py-1 rounded-full text-sm font-medium capitalize"
            >
              {{ product.category }}
            </span>
          </div>

          <div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-2">
              {{ product.name }}
            </h1>
            <p class="text-xl text-[#c1c1c1]">by {{ product.artist }}</p>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex">
              <Star
                v-for="i in 5"
                :key="i"
                :class="[
                  'w-5 h-5',
                  i <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-400',
                ]"
              />
            </div>
            <span class="text-[#c1c1c1]">(4.0) • 127 reviews</span>
          </div>

          <div class="text-3xl font-bold text-[#633131]">
            ${{ product.price }}
          </div>

          <div class="flex items-center gap-4">
            <span class="text-lg">Quantity:</span>
            <div class="flex items-center border border-[#4A4A4A] rounded-lg">
              <button
                @click="decreaseQuantity"
                class="px-3 py-2 hover:bg-[#4A4A4A] transition"
                :disabled="quantity === 1"
              >
                -
              </button>
              <span class="px-4 py-2 min-w-[3rem] text-center">{{
                quantity
              }}</span>
              <button
                @click="increaseQuantity"
                class="px-3 py-2 hover:bg-[#4A4A4A] transition"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="handleAddToCart(product, quantity)"
              class="flex-1 bg-[#633131] hover:bg-[#582c2c] text-white px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart class="w-5 h-5" />
              Add to Cart
            </button>
            <button
              @click="proceedToCheckout()"
              class="flex-1 bg-white hover:bg-gray-300 text-[#1D1616] px-8 py-4 rounded-lg font-semibold transition cursor-pointer"
            >
              Buy Now
            </button>
          </div>

          <div class="flex gap-4">
            <button
              @click="toggleWishlist"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition',
                isWishlisted
                  ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  : 'border-[#4A4A4A] text-[#c1c1c1] hover:border-[#633131] hover:text-white',
              ]"
            >
              <Heart
                :class="isWishlisted ? 'fill-current' : ''"
                class="w-5 h-5"
              />
              {{ isWishlisted ? "Wishlisted" : "Add to Wishlist" }}
            </button>
            <button
              @click="shareProduct"
              class="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4A4A4A] text-[#c1c1c1] hover:border-[#633131] hover:text-white transition"
            >
              <Share2 class="w-5 h-5" />
              Share
            </button>
          </div>

          <div class="space-y-6 pt-6 border-t border-[#4A4A4A]">
            <div>
              <h3 class="text-xl font-semibold mb-3">Description</h3>
              <p class="text-[#c1c1c1] leading-relaxed">
                {{
                  product.description ||
                  "A classic album that defined a generation. Experience the timeless music that continues to inspire artists and fans worldwide. This high-quality pressing ensures you hear every note as the artists intended."
                }}
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">Details</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-[#c1c1c1]">Artist:</span>
                  <span class="ml-2 text-white">{{ product.artist }}</span>
                </div>
                <div>
                  <span class="text-[#c1c1c1]">Category:</span>
                  <span class="ml-2 text-white capitalize">{{
                    product.category
                  }}</span>
                </div>
                <div>
                  <span class="text-[#c1c1c1]">Format:</span>
                  <span class="ml-2 text-white">{{
                    product.category === "vinyl"
                      ? "LP Vinyl"
                      : product.category === "cd"
                      ? "Compact Disc"
                      : "Physical Media"
                  }}</span>
                </div>
                <div>
                  <span class="text-[#c1c1c1]">Condition:</span>
                  <span class="ml-2 text-white">New</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">Shipping & Returns</h3>
              <div class="text-[#c1c1c1] space-y-2 text-sm">
                <p>• Free shipping on orders over $50</p>
                <p>• Standard delivery: 3-5 business days</p>
                <p>• Express delivery available</p>
                <p>• 30-day return policy</p>
                <p>• Items must be unopened for full refund</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-bold mb-8">You Might Also Like</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-[#2A2A2A] rounded-lg overflow-hidden border border-[#4A4A4A] hover:border-[#633131] transition group"
          >
            <div class="aspect-square bg-[#3A3A3A]">
              <div
                class="w-full h-full bg-[#633131] flex items-center justify-center text-white font-semibold"
              >
                Related Product {{ i }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold group-hover:text-[#633131] transition">
                Related Album {{ i }}
              </h3>
              <p class="text-[#c1c1c1] text-sm">Artist Name</p>
              <p class="text-[#633131] font-bold mt-2">$29.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#633131] mx-auto mb-4"
        ></div>
        <p class="text-[#c1c1c1]">Loading product...</p>
      </div>
    </div>
  </div>
  <Popup :message="popupMessage" :show="showPopup" @close="showPopup = false" />
</template>
