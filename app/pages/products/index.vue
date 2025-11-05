<template>
  <main class="bg-[#1D1616] min-h-screen w-screen text-white flex pt-16">
    <aside class="w-1/5 bg-[#241B1B] p-6 border-r border-[#333]">
      <h2 class="text-2xl font-bold mb-6">Categories</h2>
      <ul class="space-y-2">
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition flex items-center justify-between"
            :class="{ 'bg-[#633131]': selectedCategory === 'vinyl' }"
            @click="handleCategoryClick('vinyl')"
          >
            Vinyl
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition flex items-center justify-between"
            :class="{ 'bg-[#633131]': selectedCategory === 'cd' }"
            @click="handleCategoryClick('cd')"
          >
            CD
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition"
            @click="handleAllClick()"
            :class="{ 'bg-[#633131]': selectedCategory === 'all' }"
          >
            All
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition"
            @click="handleMerchClick()"
            :class="{ 'bg-[#633131]': selectedCategory === 'merch' }"
          >
            Merch
          </button>
        </li>
      </ul>
    </aside>
    <section class="flex-1 p-8">
      <h1 class="text-4xl font-bold mb-4">{{ displayTitle }}</h1>

      <!-- Sorting and Pagination Controls -->
      <div class="flex items-center gap-6 mb-8 p-4 bg-[#2A1F1F] rounded-lg">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium">Sort by:</label>
          <select
            v-model="sortBy"
            class="bg-[#1D1616] border border-[#333] rounded px-3 py-1 text-sm"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium">Items per page:</label>
          <select
            v-model="itemsPerPage"
            class="bg-[#1D1616] border border-[#333] rounded px-3 py-1 text-sm"
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="relative bg-[#2A1F1F] cursor-pointer p-4 rounded-xl shadow hover:scale-105 transition transform flex flex-col"
        >
          <NuxtLink
            :to="`/product/${slugify(
              product.id + '-' + product.name + '-' + product.category
            )}`"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="rounded-lg mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-400 flex-1">
              {{ product.artist }} {{ product.description }}
            </p>
            <span class="text-lg font-bold">{{ product.price }}$</span>
          </NuxtLink>

          <button
            @click="addToCart(product, 1)"
            class="absolute bottom-4 right-4 px-4 py-2 bg-[#633131] rounded-lg hover:bg-[#7a3b3b] transition"
          >
            Add to cart
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-4 mt-8"
      >
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-[#633131] rounded-lg hover:bg-[#7a3b3b] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div class="flex items-center gap-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 rounded',
              currentPage === page
                ? 'bg-[#7a3b3b] text-white'
                : 'bg-[#2A1F1F] text-gray-300 hover:bg-[#633131]',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-[#633131] rounded-lg hover:bg-[#7a3b3b] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useCart } from "#imports";

const { addToCart } = useCart();

const route = useRoute();

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const { data: db_products } = await useFetch("/api/products");
console.log("Fetched products:", db_products.value);

const products = ref(db_products.value?.products || []);
const selectedCategory = ref("all");
const selectedGenre = ref(null);
const sortBy = ref("name-asc");
const itemsPerPage = ref(12);
const currentPage = ref(1);

// Available genres
const genres = ref([
  "Hip Hop",
  "Rock",
  "Jazz",
  "Pop",
  "Electronic",
  "Classical",
  "R&B",
  "Country",
  "Reggae",
  "Blues",
]);

const handleCategoryClick = (category) => {
  navigateTo(`/products/${category}`);
};

const handleAllClick = () => {
  filterCategory("all");
  navigateTo("/products");
};

const handleMerchClick = () => {
  filterCategory("merch");
  navigateTo("/products/merch");
};

const displayTitle = computed(() => {
  if (selectedCategory.value === "all") {
    return "All Products";
  } else if (selectedGenre.value) {
    const categoryName =
      selectedCategory.value.charAt(0).toUpperCase() +
      selectedCategory.value.slice(1);
    return `${selectedGenre.value} ${categoryName}s`;
  } else {
    const categoryName =
      selectedCategory.value.charAt(0).toUpperCase() +
      selectedCategory.value.slice(1);
    return `${categoryName}s`;
  }
});

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory.value
    );
  }

  if (selectedGenre.value) {
    filtered = filtered.filter(
      (product) =>
        product.genre &&
        product.genre.toLowerCase() === selectedGenre.value.toLowerCase()
    );
  }

  return filtered;
});

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value];

  switch (sortBy.value) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case "price-desc":
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    default:
      return sorted;
  }
});

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Initialize selected category as "all" for this page
onMounted(() => {
  selectedCategory.value = "all";
});

// Reset to first page when filters change
watch([selectedCategory, selectedGenre, sortBy, itemsPerPage], () => {
  currentPage.value = 1;
});
</script>
