<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const slug = route.params.slug;

const id = slug.split("-")[0];

const { data: product } = await useFetch(`/api/product/${id}`);
</script>

<template>
  <main
    class="bg-[#1D1616] w-screen min-h-screen text-white relative overflow-hidden flex items-center justify-center"
  >
    <div v-if="product">
      <h1 class="text-3xl font-bold">{{ product.name }}</h1>
      <img :src="product.image" :alt="product.name" class="w-64 my-4" />
      <p>{{ product.description }}</p>
      <p class="mt-2 font-semibold">{{ product.price }} $</p>
      <p class="text-sm text-gray-400">by {{ product.artist }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </main>
</template>
