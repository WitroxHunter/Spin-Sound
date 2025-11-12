<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 h-16 flex justify-between items-center p-4 px-6 transition-colors duration-300 text-white border-[#333] border-b',
      scrolled
        ? 'bg-[#1D1616]/95 backdrop-blur-md'
        : 'bg-transparent border-none',
    ]"
  >
    <h1 class="text-2xl font-bold">
      <NuxtLink to="/">Spin'n Sound</NuxtLink>
    </h1>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-16">
      <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
      <NuxtLink to="/products" class="hover:underline">Products</NuxtLink>

      <template v-if="!isLoggedIn">
        <NuxtLink to="/login" class="hover:underline">Log in</NuxtLink>
        <NuxtLink to="/register" class="hover:underline">Sign up</NuxtLink>
      </template>

      <template v-else>
        <button @click="logout" class="hover:underline">Log out</button>
      </template>

      <NuxtLink to="/cart" class="hover:underline">
        <ShoppingCartIcon class="w-6 h-6 cursor-pointer hover:text-gray-300" />
      </NuxtLink>
    </nav>

    <!-- Mobile Hamburger -->
    <div class="md:hidden relative">
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
        <MenuIcon class="w-6 h-6" />
      </button>

      <!-- Mobile Menu Dropdown -->
      <div
        v-show="mobileMenuOpen"
        class="absolute right-0 mt-2 w-48 bg-[#241B1B] rounded-lg shadow-lg overflow-hidden"
      >
        <NuxtLink
          to="/about"
          class="block px-4 py-3 hover:bg-[#633131] transition"
          @click="mobileMenuOpen = false"
          >About</NuxtLink
        >

        <NuxtLink
          to="/products"
          class="block px-4 py-3 hover:bg-[#633131] transition"
          @click="mobileMenuOpen = false"
          >Products</NuxtLink
        >

        <template v-if="!isLoggedIn">
          <NuxtLink
            to="/login"
            class="block px-4 py-3 hover:bg-[#633131] transition"
            @click="mobileMenuOpen = false"
            >Log in</NuxtLink
          >
          <NuxtLink
            to="/register"
            class="block px-4 py-3 hover:bg-[#633131] transition"
            @click="mobileMenuOpen = false"
            >Sign up</NuxtLink
          >
        </template>

        <template v-else>
          <button
            @click="
              logout();
              mobileMenuOpen = false;
            "
            class="w-full text-left px-4 py-3 hover:bg-[#633131] transition"
          >
            Log out
          </button>
        </template>

        <NuxtLink
          to="/cart"
          class="block px-4 py-3 hover:bg-[#633131] transition"
          @click="mobileMenuOpen = false"
        >
          Cart
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuth } from "@/composables/useAuth";
import { ShoppingCartIcon, Menu as MenuIcon } from "lucide-vue-next";

const { isLoggedIn, logout } = useAuth();
const scrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
