<template>
  <header
    class="bg-[#633131] text-white p-4 pr-45 flex justify-between items-center fixed top-0 left-0 w-full z-98 h-16"
  >
    <!-- Logo / nazwa -->
    <h1 class="text-2xl font-bold">Spin'n Sound</h1>

    <!-- Nawigacja -->
    <nav class="flex items-center gap-16">
      <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
      <NuxtLink to="/products" class="hover:underline">Products</NuxtLink>
      <NuxtLink to="/login" class="hover:underline">Log In</NuxtLink>
      <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>

      <!-- Ikonka koszyka -->
      <ShoppingCartIcon class="w-6 h-6 cursor-pointer hover:text-gray-300" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ShoppingCartIcon } from "lucide-vue-next";
</script>
