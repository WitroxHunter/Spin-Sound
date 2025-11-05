<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from "lucide-vue-next";
import { useCart } from "~/composables/useCart";
import Popup from "~/components/Popup.vue";

const route = useRoute();
const slug = route.params.slug;
const id = slug.split("-")[0];
const { data: product } = await useFetch(`/api/product/${id}`);
const token = useCookie("auth_token");
const { addToCart } = useCart();

// Reactive state
const quantity = ref(1);
const selectedImage = ref(0);
const isWishlisted = ref(false);

// Mock additional images (you can replace with real data)
const additionalImages = ref([
  product.value?.image,
  product.value?.image, // Could be back cover
  product.value?.image, // Could be detail shots
]);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const buyNow = () => {
  // Direct purchase logic here
  console.log(`Buying ${quantity.value} of ${product.value.name} now`);
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};

const shareProduct = () => {
  // Share functionality
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
</script>

<template>
  <div class="bg-[#1D1616] min-h-screen text-white">
    <!-- Navigation Bar -->
    <nav class="bg-[#2A2A2A] border-b border-[#4A4A4A] p-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-white hover:text-[#633131] transition"
        >
          <ArrowLeft class="w-5 h-5" />
          Back to Shop
        </NuxtLink>
        <h1 class="text-2xl font-bold">Spin'n Sound</h1>
        <div class="w-24"></div>
        <!-- Spacer for centering -->
      </div>
    </nav>

    <div v-if="product" class="max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumb -->
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
        <!-- Product Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div
            class="bg-[#2A2A2A] rounded-lg overflow-hidden border border-[#4A4A4A]"
          >
            <img
              :src="additionalImages[selectedImage] || product.image"
              :alt="product.name"
              class="w-full h-96 lg:h-[500px] object-contain bg-[#3A3A3A]"
            />
          </div>

          <!-- Thumbnail Images -->
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

        <!-- Product Details -->
        <div class="space-y-6">
          <!-- Category Badge -->
          <div class="inline-flex">
            <span
              class="bg-[#633131] text-white px-3 py-1 rounded-full text-sm font-medium capitalize"
            >
              {{ product.category }}
            </span>
          </div>

          <!-- Product Title -->
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-2">
              {{ product.name }}
            </h1>
            <p class="text-xl text-[#c1c1c1]">by {{ product.artist }}</p>
          </div>

          <!-- Rating (Mock - you can replace with real data) -->
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

          <!-- Price -->
          <div class="text-3xl font-bold text-[#633131]">
            ${{ product.price }}
          </div>

          <!-- Quantity Selector -->
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

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="handleAddToCart(product, quantity)"
              class="flex-1 bg-[#633131] hover:bg-[#582c2c] text-white px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <ShoppingCart class="w-5 h-5" />
              Add to Cart
            </button>
            <button
              @click="buyNow"
              class="flex-1 bg-white hover:bg-gray-100 text-[#1D1616] px-8 py-4 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>
          </div>

          <!-- Secondary Actions -->
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

          <!-- Product Details Tabs/Sections -->
          <div class="space-y-6 pt-6 border-t border-[#4A4A4A]">
            <!-- Description -->
            <div>
              <h3 class="text-xl font-semibold mb-3">Description</h3>
              <p class="text-[#c1c1c1] leading-relaxed">
                {{
                  product.description ||
                  "A classic album that defined a generation. Experience the timeless music that continues to inspire artists and fans worldwide. This high-quality pressing ensures you hear every note as the artists intended."
                }}
              </p>
            </div>

            <!-- Specifications -->
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

            <!-- Shipping Info -->
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

      <!-- Related Products Section -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold mb-8">You Might Also Like</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <!-- Mock related products - replace with real data -->
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

    <!-- Loading State -->
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
