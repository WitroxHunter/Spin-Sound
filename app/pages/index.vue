<template>
  <div>
    <!-- Hero -->
    <main
      class="relative w-full min-h-screen text-white overflow-hidden flex items-center justify-center"
    >
      <video
        autoplay
        muted
        loop
        playsinline
        class="absolute w-full h-full object-cover"
      >
        <source src="@/assets/images/bg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <!-- Overlay -->
      <div class="absolute inset-0 backdrop-blur-sm bg-[#1a1717]/60"></div>

      <div
        class="relative z-10 w-full h-screen flex items-center justify-center float-left"
      >
        <div class="text-center flex flex-col items-center justify-center">
          <h1 class="text-7xl font-bold mb-4">Spin'n Sound</h1>
          <p class="text-xl mb-4 text-[#d7d7d7] sm:w-2/3">
            Your choice for the best music related products. Whether its vinyl
            records, CDs, Merchandise - we've got you covered.
          </p>
          <div class="flex gap-4">
            <NuxtLink
              class="relative overflow-hidden bg-[#241a16] text-white rounded-xl transition-colors flex items-center justify-center px-16 py-4 group"
              to="/products/all"
              passHref
            >
              <span
                class="absolute inset-0 bg-[#1D1616] w-0 group-hover:w-full transition-all duration-300"
              ></span>
              <span class="relative font-semibold">Shop now!</span>
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="cursor-pointer py-4 px-8 bg-[#ffffff]/10 rounded-xl hover:bg-[#ffffff26] transition"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <img
          src="/assets/images/scroll-down-icon.svg"
          alt="Scroll Down Icon"
          class="h-[36px] w-auto animate-bounce"
        />
      </div>
    </main>

    <!-- Product Categories Section -->
    <!-- Product Categories Section -->
    <section
      class="bg-[#1D1616] py-16 flex flex-col justify-center px-4 sm:px-8"
    >
      <div class="max-w-[1400px] mx-auto w-full">
        <h2 class="text-4xl font-bold text-white text-center mb-12">
          Shop by Category
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="category in categories"
            :key="category.id"
            class="group cursor-pointer w-full"
          >
            <NuxtLink :to="`/products/${category.link}`">
              <div
                class="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-[#633131] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#633131]/20"
              >
                <!-- Background image -->
                <img
                  :src="`/images/${category.img}`"
                  :alt="category.name"
                  class="absolute inset-0 w-full h-full object-cover"
                />

                <!-- Gradient overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-b from-[#633131]/70 to-[#1d1616]/90"
                ></div>

                <!-- Text content at the bottom -->
                <div class="absolute bottom-0 w-full p-4 text-center">
                  <h3 class="text-white font-semibold text-xl">
                    {{ category.name }}
                  </h3>
                  <p class="text-[#c1c1c1] text-sm mb-2">
                    {{ category.description }}
                  </p>
                  <div
                    class="bg-[#ffffff1a] rounded-lg p-2 text-xs text-white inline-block"
                  >
                    {{ category.count }} products
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ChevronRight, ChevronLeft } from "lucide-vue-next";

const categories = ref([
  {
    id: 1,
    name: "Vinyl Records",
    link: "vinyl",
    img: "vinyl-cat.jpg",
    icon: "💿",
    description: "Classic and modern vinyl records",
    count: 1247,
  },
  {
    id: 2,
    name: "CDs",
    link: "cd",
    img: "cd.webp",
    icon: "💽",
    description: "Digital audio compact discs",
    count: 856,
  },
  {
    id: 3,
    name: "Merchandise",
    link: "merch",
    img: "merch.webp",
    icon: "👕",
    description: "T-shirts, posters & collectibles",
    count: 423,
  },
  {
    id: 4,
    name: "All products",
    link: "",
    img: "gramophone.jpg",
    icon: "🎧",
    description: "Browse our entire catalog",
    count: 189,
  },
]);

const popularProducts = ref([]);

const carouselContainer = ref(null);

const scrollLeft = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};

onMounted(() => {
  carouselContainer.value = document.querySelector(".overflow-x-auto");
});

const { data: db_products } = await useFetch("/api/products");

const allProducts = db_products.value?.products || [];
popularProducts.value = [
  allProducts[0],
  allProducts[3],
  allProducts[5],
  allProducts[7],
  allProducts[9],
  allProducts[12],
  allProducts[15],
];

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
</script>
