<template>
  <main class="bg-[#1D1616] min-h-screen w-screen text-white flex pt-16">
    <aside class="w-1/5 bg-[#241B1B] p-6 border-r border-[#333]">
      <h2 class="text-2xl font-bold mb-6">Categories</h2>
      <ul class="space-y-4">
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition"
            @click="filterCategory('vinyl')"
          >
            Vinyl
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition"
            @click="filterCategory('cd')"
          >
            CD
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition"
            @click="filterCategory('merch')"
          >
            Merch
          </button>
        </li>
        <li>
          <button
            class="w-full text-left p-2 rounded hover:bg-[#633131] transition"
            @click="filterCategory('all')"
          >
            All
          </button>
        </li>
      </ul>
    </aside>

    <section class="flex-1 p-8">
      <h1 class="text-4xl font-bold mb-8">Products</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          @click="goToProduct(product)"
          class="bg-[#2A1F1F] cursor-pointer p-4 rounded-xl shadow hover:scale-105 transition transform flex flex-col"
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
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();

const goToProduct = (product) => {
  const slug = slugify(product.name + "-" + product.category);
  router.push(`/product/${slug}`);
};

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

const filterCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  if (selectedCategory.value === "all") return products.value;
  return products.value.filter(
    (product) => product.category === selectedCategory.value
  );
});
</script>
