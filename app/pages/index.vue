<template>
  <div>
    <!-- Hero Section -->
    <main
      class="bg-[#1D1616] w-screen min-h-screen text-white relative overflow-hidden flex items-center justify-center"
    >
      <!-- Treść strony (logo + tekst + przyciski) -->
      <div class="w-2/5 h-screen flex items-center justify-center float-left">
        <div
          class="relative text-center flex flex-col items-center justify-center"
        >
          <h1 class="text-7xl font-bold mb-4">Spin'n Sound</h1>
          <p class="text-xl mb-8 text-[#c1c1c1]">
            Your choice for the best vinyl & CD records.
          </p>
          <!-- Dwa przyciski obok siebie -->
          <div class="flex gap-4">
            <button
              class="cursor-pointer py-4 px-8 bg-[#633131] border-[#633131] hover:bg-[#582c2c] border-2 rounded-lg transition"
            >
              Shop now!
            </button>
            <NuxtLink
              to="/contact"
              class="cursor-pointer p-4 border-2 border-[#ffffff2d] bg-[#ffffff0a] rounded-lg hover:bg-[#ffffff26] transition"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Vinyl player -->
      <div class="w-3/5 h-screen float-right relative">
        <img
          src="~/assets/images/vinyl-player.png?url"
          alt="Vinyl"
          class="absolute top-0 right-0 h-[100vh] w-auto pointer-events-none transform z-20"
        />
        <!-- Igła -->
        <img
          src="~/assets/images/vinyl-player-igla2.png?url"
          alt="Igła"
          class="absolute top-0 right-0 h-[100vh] w-auto pointer-events-none transform z-99"
        />
        <!-- Obracający się winyl -->
        <img
          src="~/assets/images/vinyl.png?url"
          alt="Vinyl"
          class="absolute top-0 right-0 h-[100vh] -translate-x-1/6 w-auto pointer-events-none spin-slow transform z-30"
        />
      </div>
    </main>

    <!-- Most Popular Products Carousel Section -->
    <section class="bg-[#2A2A2A] py-16 px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-white text-center mb-12">
          Most Popular Products
        </h2>

        <!-- Loading state -->
        <div v-if="!popularProducts.length" class="text-center text-white">
          Loading products...
        </div>

        <!-- Carousel Container -->
        <div v-else class="relative overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{
              transform: `translateX(-${currentSlide * (itemWidth + 20)}px)`,
            }"
          >
            <div
              v-for="product in popularProducts"
              :key="product.id"
              class="flex-shrink-0 w-80 mr-5 bg-[#3A3A3A] rounded-lg overflow-hidden border border-[#4A4A4A] hover:border-[#633131] transition-all duration-300 hover:transform hover:scale-105"
            >
              <NuxtLink
                :to="`/product/${slugify(
                  product.id + '-' + product.name + '-' + product.category
                )}`"
              >
                <!-- Product Image - Full width and height -->
                <div class="w-full aspect-square overflow-hidden">
                  <img
                    :src="product.image || '/placeholder-vinyl.jpg'"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Product Details -->
                <div class="p-6">
                  <h3 class="text-white font-semibold text-lg mb-2">
                    {{ product.name }} |
                    <span class="capitalize">{{ product.category }}</span>
                  </h3>
                  <p class="text-[#c1c1c1] mb-3">{{ product.artist }}</p>
                  <p class="text-[#ffffff] font-bold text-xl">
                    ${{ product.price }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Carousel Navigation -->
          <button
            @click="previousSlide"
            :disabled="currentSlide === 0"
            class="cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#633131] hover:bg-[#582c2c] disabled:bg-[#444] disabled:cursor-not-allowed text-white p-3 rounded-full transition"
          >
            <ChevronLeft />
          </button>
          <button
            @click="nextSlide"
            :disabled="currentSlide >= maxSlides"
            class="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#633131] hover:bg-[#582c2c] disabled:bg-[#444] disabled:cursor-not-allowed text-white p-3 rounded-full transition"
          >
            <ChevronRight />
          </button>
        </div>

        <!-- Carousel Dots -->
        <div
          v-if="popularProducts.length"
          class="flex justify-center mt-8 space-x-2"
        >
          <button
            v-for="(dot, index) in Math.ceil(
              popularProducts.length / itemsPerView
            )"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'cursor-pointer w-3 h-3 rounded-full transition-colors',
              currentSlide === index ? 'bg-[#633131]' : 'bg-[#4A4A4A]',
            ]"
          ></button>
        </div>
      </div>
    </section>

    <!-- Product Categories Section -->
    <section class="bg-[#1D1616] py-16 px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-white text-center mb-12">
          Shop by Category
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="category in categories"
            :key="category.id"
            class="group cursor-pointer"
          >
            <NuxtLink :to="`/products/${category.link}`">
              <div
                class="relative aspect-square rounded-lg overflow-hidden border-2 border-[#633131] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#633131]/20"
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
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
    name: "Other Products",
    link: "",
    img: "gramophone.jpg",
    icon: "🎧",
    description: "Accessories & equipment",
    count: 189,
  },
]);

const { data: db_products } = await useFetch("/api/products");

const allProducts = db_products.value?.products || [];
const popularProducts = ref(
  allProducts.filter((product) => product.id >= 1 && product.id <= 8) // więcej, żeby było co przesuwać
);

const currentSlide = ref(0);
const itemsPerView = ref(1); // domyślnie 1 (na mobile)
const itemWidth = 320; // szerokość karty w px (dostosuj do designu)

// Funkcja ustalająca ilość produktów na ekran w zależności od width
const updateItemsPerView = () => {
  const width = window.innerWidth;
  if (width < 640) {
    itemsPerView.value = 1; // telefony
  } else if (width < 1024) {
    itemsPerView.value = 2; // tablety
  } else if (width < 1440) {
    itemsPerView.value = 3; // mniejsze laptopy
  } else {
    itemsPerView.value = 5; // duże ekrany
  }
};

// obliczanie max slajdów
const maxSlides = computed(() => {
  return Math.max(
    0,
    Math.ceil(popularProducts.value.length / itemsPerView.value) - 1
  );
});

// przesuwanie karuzeli
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++;
  }
};
const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};
const goToSlide = (index) => {
  currentSlide.value = index;
};

// listener resize
onMounted(() => {
  updateItemsPerView();
  window.addEventListener("resize", updateItemsPerView);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsPerView);
});

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
</script>
