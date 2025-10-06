<template>
  <main
    class="bg-[#1D1616] min-h-screen w-screen text-white flex items-center justify-center p-8"
  >
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold mb-3">Log in</h1>
        <p class="text-[#c1c1c1]">Welcome back to Spin'n Sound</p>
      </div>

      <!-- Login Form -->
      <form
        @submit.prevent="onSubmit"
        class="bg-[#2A2A2A] p-8 rounded-lg border-2 border-[#4A4A4A] hover:border-[#633131] transition-all duration-300 shadow-2xl"
      >
        <!-- Message -->
        <div
          v-if="komunikat"
          :class="[
            'mb-6 p-4 rounded-lg flex items-start gap-3',
            komunikat.includes('✅')
              ? 'bg-green-900/30 border border-green-700'
              : 'bg-red-900/30 border border-red-700',
          ]"
        >
          <span
            :class="
              komunikat.includes('✅') ? 'text-green-200' : 'text-red-200'
            "
          >
            {{ komunikat }}
          </span>
        </div>

        <!-- Email Field -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-white">
            Email Address
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <Mail class="w-5 h-5 text-[#888]" />
            </div>
            <input
              v-model="form.email"
              type="text"
              placeholder="you@example.com"
              class="w-full pl-10 pr-4 py-3 rounded-lg bg-[#3A3A3A] border-2 text-white placeholder-[#888] focus:outline-none focus:border-[#633131] transition"
              :class="errors.email ? 'border-red-500' : 'border-[#4A4A4A]'"
            />
          </div>
          <p
            v-if="errors.email"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            {{ errors.email }}
          </p>
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <Lock class="w-5 h-5 text-[#888]" />
            </div>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full pl-10 pr-12 py-3 rounded-lg bg-[#3A3A3A] border-2 text-white placeholder-[#888] focus:outline-none focus:border-[#633131] transition"
              :class="errors.password ? 'border-red-500' : 'border-[#4A4A4A]'"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#888] hover:text-white transition"
            >
              <EyeOff v-if="showPassword" class="w-5 h-5" />
              <Eye v-else class="w-5 h-5" />
            </button>
          </div>
          <p
            v-if="errors.password"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-[#633131] hover:bg-[#582c2c] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#633131]/30 flex items-center justify-center gap-2"
        >
          Log in
        </button>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-[#c1c1c1] text-sm">
            Don’t have an account?
            <NuxtLink
              to="/register"
              class="text-[#633131] hover:underline font-medium"
            >
              Sign up
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const komunikat = ref("");
const showPassword = ref(false);

const validate = () => {
  errors.email = "";
  errors.password = "";
  let valid = true;

  if (!form.email) {
    errors.email = "Email is required";
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
    valid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    valid = false;
  }

  return valid;
};

import { useCookie } from "#app";

const onSubmit = async () => {
  if (!validate()) return;

  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: form.email,
        password: form.password,
      },
    });

    if (res.error) {
      komunikat.value = "❌ " + res.error;
    } else {
      komunikat.value = "✅ Login successful!";

      // 🔒 zapisz token w cookie (widoczny po stronie SSR)
      const token = useCookie("auth_token", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 dni
        sameSite: "strict",
        secure: true,
      });
      token.value = res.token;

      // zapisz też dane użytkownika, jeśli chcesz
      const user = useCookie("user");
      user.value = JSON.stringify(res.user);

      setTimeout(() => {
        navigateTo("/"); // lepsze niż window.location.href
      }, 1000);
    }
  } catch (err) {
    console.error(err);
    komunikat.value = "❌ Login failed";
  }
};
</script>
