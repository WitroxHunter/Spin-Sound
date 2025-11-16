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
            <span class="text-sm">{{
              expandedCategory === "vinyl" ? "−" : "+"
            }}</span>
          </button>
          <ul v-if="expandedCategory === 'vinyl'" class="ml-4 mt-2 space-y-1">
            <li v-for="genre in genres" :key="genre">
              <button
                class="w-full text-left p-2 text-sm rounded hover:bg-[#633131] transition"
                :class="{
                  'bg-[#633131]':
                    selectedCategory === 'vinyl' && selectedGenre === genre,
                }"
                @click="filterCategoryAndGenre('vinyl', genre)"
              >
                {{ genre }}
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition flex items-center justify-between"
            :class="{ 'bg-[#633131]': selectedCategory === 'cd' }"
            @click="handleCategoryClick('cd')"
          >
            CD
            <span class="text-sm">{{
              expandedCategory === "cd" ? "−" : "+"
            }}</span>
          </button>
          <ul v-if="expandedCategory === 'cd'" class="ml-4 mt-2 space-y-1">
            <li v-for="genre in genres" :key="genre">
              <button
                class="w-full text-left p-2 text-sm rounded hover:bg-[#633131] transition"
                :class="{
                  'bg-[#633131]':
                    selectedCategory === 'cd' && selectedGenre === genre,
                }"
                @click="filterCategoryAndGenre('cd', genre)"
              >
                {{ genre }}
              </button>
            </li>
          </ul>
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
          :key="product?.id"
          class="bg-[#2A1F1F] cursor-pointer p-4 rounded-xl shadow hover:scale-105 transition transform flex flex-col"
        >
          <NuxtLink
            :to="`/product/${slugify(
              product?.id + '-' + product.name + '-' + product.category
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
            <div class="mt-4 flex items-center justify-between">
              <span class="text-lg font-bold">{{ product.price }}$</span>
              <button
                class="px-4 py-2 bg-[#633131] rounded-lg hover:bg-[#7a3b3b] transition"
              >
                Add to cart
              </button>
            </div>
          </NuxtLink>
        </div>
      </div>

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
const expandedCategory = ref(null);
const sortBy = ref("name-asc");
const itemsPerPage = ref(12);
const currentPage = ref(1);

const genres = ref(["Hip Hop", "Rock", "Jazz", "Electronic"]);

const toggleCategory = (category) => {
  if (expandedCategory.value === category) {
    expandedCategory.value = null;
  } else {
    expandedCategory.value = category;
  }
};

const handleCategoryClick = (category) => {
  if (selectedCategory.value === category) {
    toggleCategory(category);
  } else {
    filterCategory(category);
    navigateTo(`/products/${category}`);
  }
};

const handleAllClick = () => {
  filterCategory("all");
  navigateTo("/products");
};

const handleMerchClick = () => {
  filterCategory("merch");
  navigateTo("/products/merch");
};

const filterCategory = (category) => {
  selectedCategory.value = category;
  selectedGenre.value = null;
  expandedCategory.value = null;
  currentPage.value = 1;
};

const filterCategoryAndGenre = (category, genre) => {
  selectedCategory.value = category;
  selectedGenre.value = genre;
  currentPage.value = 1;
  navigateTo(
    `/products/${category}/${genre.toLowerCase().replace(/\s+/g, "-")}`
  );
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

onMounted(() => {
  const category = route.params.category;
  const genreParam = route.params.genre;

  if (category && ["vinyl", "cd"].includes(category)) {
    selectedCategory.value = category;
    expandedCategory.value = category;

    if (genreParam) {
      const displayGenre = genreParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      if (genres.value.includes(displayGenre)) {
        selectedGenre.value = displayGenre;
      } else {
        navigateTo(`/products/${category}`);
      }
    }
  } else {
    navigateTo("/products");
  }
});
watch([selectedCategory, selectedGenre, sortBy, itemsPerPage], () => {
  currentPage.value = 1;
});
</script>
