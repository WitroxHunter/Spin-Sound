<template>
  <main
    class="bg-[#1D1616] min-h-screen w-screen text-white flex items-center justify-center p-8"
  >
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold mb-3">Create Account</h1>
        <p class="text-[#c1c1c1]">Join Spin'n Sound to start shopping</p>
      </div>

      <!-- Register Form -->
      <form
        @submit.prevent="onSubmit"
        class="bg-[#2A2A2A] p-8 rounded-lg border-2 border-[#4A4A4A] hover:border-[#633131] transition-all duration-300 shadow-2xl"
      >
        <!-- Success/Error Message -->
        <div
          v-if="komunikat"
          :class="[
            'mb-6 p-4 rounded-lg flex items-start gap-3',
            komunikat.includes('✅')
              ? 'bg-green-900/30 border border-green-700'
              : 'bg-red-900/30 border border-red-700',
          ]"
        >
          <svg
            v-if="komunikat.includes('✅')"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-green-400 flex-shrink-0 mt-0.5"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-red-400 flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-[#888]"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-[#888]"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
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
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            </button>
          </div>
          <p
            v-if="errors.password"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-white">
            Confirm Password
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-[#888]"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full pl-10 pr-12 py-3 rounded-lg bg-[#3A3A3A] border-2 text-white placeholder-[#888] focus:outline-none focus:border-[#633131] transition"
              :class="
                errors.confirmPassword ? 'border-red-500' : 'border-[#4A4A4A]'
              "
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#888] hover:text-white transition"
            >
              <svg
                v-if="!showConfirmPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            </button>
          </div>
          <p
            v-if="errors.confirmPassword"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Terms Agreement -->
        <div class="mb-6">
          <label class="flex items-start gap-3 cursor-pointer group">
            <input
              v-model="form.agreeToTerms"
              type="checkbox"
              class="mt-1 w-4 h-4 accent-[#633131] cursor-pointer"
            />
            <span
              class="text-sm text-[#c1c1c1] group-hover:text-white transition"
            >
              I agree to the
              <a href="/terms" class="text-[#633131] hover:underline"
                >Terms of Service</a
              >
              and
              <a href="/privacy" class="text-[#633131] hover:underline"
                >Privacy Policy</a
              >
            </span>
          </label>
          <p
            v-if="errors.agreeToTerms"
            class="text-red-400 text-sm mt-2 flex items-center gap-1 ml-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {{ errors.agreeToTerms }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-[#633131] hover:bg-[#582c2c] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#633131]/30 flex items-center justify-center gap-2"
        >
          Create Account
        </button>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-[#c1c1c1] text-sm">
            Already have an account?
            <NuxtLink
              to="/login"
              class="text-[#633131] hover:underline font-medium"
            >
              Sign in
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: "",
});

const komunikat = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Walidacja
const validate = () => {
  errors.email = "";
  errors.password = "";
  errors.confirmPassword = "";
  errors.agreeToTerms = "";
  let valid = true;

  if (!form.email) {
    errors.email = "Email is required";
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email address";
    valid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    valid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    valid = false;
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match";
    valid = false;
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms";
    valid = false;
  }

  return valid;
};

// Submit handler z połączeniem do backendu
const onSubmit = async () => {
  if (!validate()) return;

  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        email: form.email,
        password: form.password,
      },
    });

    // zakładam, że backend zwraca { success: true } lub { error: "message" }
    if (res.error) {
      komunikat.value = "❌ " + res.error;
    } else {
      komunikat.value = "✅ Account created successfully!";
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  } catch (err) {
    console.error(err);
    komunikat.value = "❌ " + (err.message || "Registration failed");
  }
};
</script>
