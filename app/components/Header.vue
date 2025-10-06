<template>
  <header
    class="bg-[#633131] text-white p-4 pr-45 flex justify-between items-center fixed top-0 left-0 w-full z-98 h-16"
  >
    <h1 class="text-2xl font-bold">
      <NuxtLink to="/">Spin'n Sound</NuxtLink>
    </h1>

    <nav class="flex items-center gap-16">
      <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
      <NuxtLink to="/products" class="hover:underline">Products</NuxtLink>

      <!-- Pokazuj logowanie tylko, jeśli NIE zalogowany -->
      <template v-if="!isLoggedIn">
        <NuxtLink to="/login" class="hover:underline">Log In</NuxtLink>
        <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
      </template>

      <!-- Pokazuj wylogowanie tylko, jeśli zalogowany -->
      <template v-else>
        <button @click="logout" class="hover:underline">Log out</button>
      </template>

      <NuxtLink to="/cart" class="hover:underline">
        <ShoppingCartIcon class="w-6 h-6 cursor-pointer hover:text-gray-300" />
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { ShoppingCartIcon } from "lucide-vue-next";

const { isLoggedIn, logout } = useAuth();
</script>
