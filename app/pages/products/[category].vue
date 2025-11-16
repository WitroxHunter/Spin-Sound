<template>
  <div class="h-16 w-screen bg-[#241B1B]"></div>

  <div class="md:hidden bg-[#241B1B] border-b border-[#333] p-4">
    <button
      @click="mobileFilterOpen = !mobileFilterOpen"
      class="w-full px-4 py-3 bg-[#633131] rounded-lg hover:bg-[#7a3b3b] transition flex items-center justify-between cursor-pointer text-white"
    >
      <span class="font-semibold">Filter Products</span>
      <span class="text-xl">
        <component :is="mobileFilterOpen ? X : Menu" />
      </span>
    </button>
  </div>

  <main class="bg-[#1D1616] min-h-screen w-screen text-white flex">
    <aside
      :class="[
        'bg-gradient-to-b from-[#241B1B] to-[#1D1616] p-6 border-r border-[#333] md:block',
        mobileFilterOpen
          ? 'fixed inset-0 z-50 w-full md:w-1/5'
          : 'hidden md:block',
      ]"
    >
      <div class="flex justify-end md:hidden mb-4">
        <button
          @click="mobileFilterOpen = false"
          class="text-2xl font-bold px-2 py-1 hover:bg-[#633131] rounded"
        >
          <X />
        </button>
      </div>

      <h2 class="text-2xl font-bold mb-6">Categories</h2>
      <ul class="space-y-2">
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition flex items-center justify-between cursor-pointer"
            :class="{ 'bg-[#633131]': selectedCategory === 'vinyl' }"
            @click="handleCategoryClickMobile('vinyl')"
          >
            Vinyl
            <span class="text-sm">{{
              expandedCategory === "vinyl" ? "−" : "+"
            }}</span>
          </button>
          <ul v-if="expandedCategory === 'vinyl'" class="ml-4 mt-2 space-y-1">
            <li v-for="genre in genres" :key="genre">
              <button
                class="w-full text-left p-2 text-sm rounded hover:bg-[#633131] transition cursor-pointer"
                :class="{
                  'bg-[#633131]':
                    selectedCategory === 'vinyl' && selectedGenre === genre,
                }"
                @click="filterCategoryAndGenreMobile('vinyl', genre)"
              >
                {{ genre }}
              </button>
            </li>
          </ul>
        </li>

        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition flex items-center justify-between cursor-pointer"
            :class="{ 'bg-[#633131]': selectedCategory === 'cd' }"
            @click="handleCategoryClickMobile('cd')"
          >
            CD
            <span class="text-sm">{{
              expandedCategory === "cd" ? "−" : "+"
            }}</span>
          </button>
          <ul v-if="expandedCategory === 'cd'" class="ml-4 mt-2 space-y-1">
            <li v-for="genre in genres" :key="genre">
              <button
                class="w-full text-left p-2 text-sm rounded hover:bg-[#633131] transition cursor-pointer"
                :class="{
                  'bg-[#633131]':
                    selectedCategory === 'cd' && selectedGenre === genre,
                }"
                @click="filterCategoryAndGenreMobile('cd', genre)"
              >
                {{ genre }}
              </button>
            </li>
          </ul>
        </li>

        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition cursor-pointer"
            @click="handleAllClickMobile()"
            :class="{ 'bg-[#633131]': selectedCategory === 'all' }"
          >
            All
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition cursor-pointer"
            @click="handleMerchClickMobile()"
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
          <select
            v-model="sortBy"
            class="bg-[#1D1616] border border-[#333] rounded-lg px-3 py-1 text-sm"
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
            class="bg-[#1D1616] border border-[#333] rounded-lg px-3 py-1 text-sm"
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
            <div class="block">
              <span
                class="text-gray-400 flex-1 px-2 py-1 bg-[#463131] rounded-lg mb-4 mr-1"
              >
                {{ product.artist }}
              </span>
              <span
                class="text-gray-400 flex-1 px-2 py-1 bg-[#463131] rounded-lg mb-4 mr-1"
              >
                {{
                  product.category.toLowerCase() === "cd"
                    ? product.category.toUpperCase()
                    : product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)
                }}
              </span>
              <span
                v-if="product.genre"
                class="text-gray-400 flex-1 px-2 py-1 bg-[#463131] rounded-lg mb-4"
              >
                {{ product.genre }}
              </span>
            </div>
            <span class="text-lg font-bold mt-2 block"
              >{{ product.price }}$</span
            >
          </NuxtLink>

          <button
            @click="handleAddToCart(product, 1)"
            class="absolute bottom-4 right-4 px-4 py-2 bg-[#633131] rounded-lg hover:bg-[#7a3b3b] transition cursor-pointer"
          >
            Add to cart
          </button>
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

  <Popup :message="popupMessage" :show="showPopup" @close="showPopup = false" />
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import Popup from "@/components/Popup.vue";
import { useCart } from "#imports";
import { Menu, X } from "lucide-vue-next";

useHead({ title: "Products | SpinnSound" });

const { addToCart } = useCart();

const mobileFilterOpen = ref(false);
const showPopup = ref(false);
const popupMessage = ref("");

const handleAddToCart = (product, quantity) => {
  addToCart(product, quantity);
  popupMessage.value = `${product.name} has been added to your cart!`;
  showPopup.value = true;
};

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
const products = ref(db_products.value?.products || []);
const selectedCategory = ref("all");
const selectedGenre = ref(null);
const expandedCategory = ref(null);
const sortBy = ref("name-asc");
const itemsPerPage = ref(12);
const currentPage = ref(1);
const genres = ref(["Hip Hop", "Rock", "Jazz", "Electronic"]);

const handleCategoryClickMobile = (category) => {
  expandedCategory.value =
    expandedCategory.value === category ? null : category;
};

const filterCategoryAndGenreMobile = (category, genre) => {
  selectedCategory.value = category;
  selectedGenre.value = genre;
  mobileFilterOpen.value = false;
  expandedCategory.value = null;
  currentPage.value = 1;
  navigateTo(
    `/products/${category}/${genre.toLowerCase().replace(/\s+/g, "-")}`
  );
};

const handleAllClickMobile = () => {
  selectedCategory.value = "all";
  selectedGenre.value = null;
  mobileFilterOpen.value = false;
  expandedCategory.value = null;
  currentPage.value = 1;
  navigateTo("/products");
};

const handleMerchClickMobile = () => {
  selectedCategory.value = "merch";
  selectedGenre.value = null;
  mobileFilterOpen.value = false;
  expandedCategory.value = null;
  currentPage.value = 1;
  navigateTo("/products/merch");
};

const displayTitle = computed(() => {
  if (selectedCategory.value === "all") return "All Products";
  const categoryName =
    selectedCategory.value.charAt(0).toUpperCase() +
    selectedCategory.value.slice(1);
  return selectedGenre.value
    ? `${selectedGenre.value} ${categoryName}s`
    : `${categoryName}s`;
});

const filteredProducts = computed(() => {
  let filtered = products.value;
  if (selectedCategory.value !== "all")
    filtered = filtered.filter((p) => p.category === selectedCategory.value);
  if (selectedGenre.value)
    filtered = filtered.filter(
      (p) => p.genre?.toLowerCase() === selectedGenre.value.toLowerCase()
    );
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

const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / Number(itemsPerPage.value))
);
const paginatedProducts = computed(() =>
  sortedProducts.value.slice(
    (currentPage.value - 1) * itemsPerPage.value,
    (currentPage.value - 1) * itemsPerPage.value + Number(itemsPerPage.value)
  )
);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

onMounted(() => {
  const category = route.params.category;
  if (category && ["vinyl", "cd", "merch"].includes(category)) {
    selectedCategory.value = category;
    if (["vinyl", "cd"].includes(category)) expandedCategory.value = category;
  } else if (!category) selectedCategory.value = "all";
  else navigateTo("/products");
});

watch([itemsPerPage, sortBy, selectedCategory, selectedGenre], () => {
  currentPage.value = 1;
});
</script>
