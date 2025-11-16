<template>
  <main
    class="bg-[#1D1616] min-h-screen w-screen text-white flex items-center justify-center p-8"
  >
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold mb-3">Create Account</h1>
        <p class="text-[#c1c1c1]">Join Spin'n Sound to start shopping</p>
      </div>

      <form
        @submit.prevent="onSubmit"
        class="bg-[#2A2A2A] p-8 rounded-lg border-2 border-[#4A4A4A] hover:border-[#633131] transition-all duration-300 shadow-2xl"
      >
        <div
          v-if="komunikat"
          :class="[
            'mb-6 p-4 rounded-lg flex items-start gap-3',
            komunikat.includes('✅')
              ? 'bg-green-900/30 border border-green-700'
              : 'bg-red-900/30 border border-red-700',
          ]"
        >
          <CircleAlert
            v-if="komunikat.includes('✅')"
            class="text-green-400 flex-shrink-0 mt-0.5"
          />
          <CircleAlert v-else class="w-4 h-4 text-red-400" />
          <span
            :class="
              komunikat.includes('✅') ? 'text-green-200' : 'text-red-200'
            "
          >
            {{ komunikat }}
          </span>
        </div>

        <!-- Email -->
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
            <CircleAlert class="w-4 h-4" />

            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
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
              <Eye v-if="!showPassword" class="w-5 h-5" />
              <EyeClosed v-else class="w-5 h-5" />
            </button>
          </div>
          <p
            v-if="errors.password"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <CircleAlert class="w-4 h-4" />
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-white">
            Confirm Password
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <Lock class="w-5 h-5 text-[#888]" />
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
              <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
              <EyeClosed v-else class="w-5 h-5" />
            </button>
          </div>
          <p
            v-if="errors.confirmPassword"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <CircleAlert class="w-4 h-4" />
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Terms -->
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
              <a href="/about" class="text-[#633131] hover:underline font-bold"
                >Terms of Service</a
              >
              and
              <a href="/about" class="text-[#633131] hover:underline font-bold"
                >Privacy Policy</a
              >
            </span>
          </label>
          <p
            v-if="errors.agreeToTerms"
            class="text-red-400 text-sm mt-2 flex items-center gap-1 ml-7"
          >
            <CircleAlert class="w-4 h-4" />
            {{ errors.agreeToTerms }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-3 bg-[#633131] hover:bg-[#582c2c] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#633131]/30 flex items-center justify-center gap-2"
        >
          Create Account
        </button>

        <!-- Login -->
        <div class="mt-6 text-center">
          <p class="text-[#c1c1c1] text-sm">
            Already have an account?
            <NuxtLink
              to="/login"
              class="text-[#633131] hover:underline font-bold"
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
import { Mail, Lock, CircleAlert, Eye, EyeClosed } from "lucide-vue-next";

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
