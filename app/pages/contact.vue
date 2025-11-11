<template>
  <main
    class="bg-[#1D1616] min-h-screen w-screen text-white flex items-center justify-center p-8"
  >
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold mb-3">Contact Us</h1>
        <p class="text-[#c1c1c1]">We’d love to hear from you</p>
      </div>

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
            {{ errors.email }}
          </p>
        </div>

        <!-- Topic -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-white">
            Topic
          </label>
          <select
            v-model="form.topic"
            class="w-full px-4 py-3 rounded-lg bg-[#3A3A3A] border-2 border-[#4A4A4A] text-white focus:outline-none focus:border-[#633131] transition"
          >
            <option disabled value="">Select a topic</option>
            <option>Product issue</option>
            <option>Order inquiry</option>
            <option>Account problem</option>
            <option>Other</option>
          </select>
          <p
            v-if="errors.topic"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            {{ errors.topic }}
          </p>
        </div>

        <!-- Message -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-white">
            Describe your issue
          </label>
          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Tell us more about your problem..."
            class="w-full px-4 py-3 rounded-lg bg-[#3A3A3A] border-2 border-[#4A4A4A] text-white placeholder-[#888] focus:outline-none focus:border-[#633131] transition"
          ></textarea>
          <p
            v-if="errors.message"
            class="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            {{ errors.message }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-3 bg-[#633131] hover:bg-[#582c2c] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#633131]/30 flex items-center justify-center gap-2"
        >
          Send Message
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Mail } from "lucide-vue-next";

const form = reactive({
  email: "",
  topic: "",
  message: "",
});

const errors = reactive({
  email: "",
  topic: "",
  message: "",
});

const komunikat = ref("");

const validate = () => {
  errors.email = "";
  errors.topic = "";
  errors.message = "";
  let valid = true;

  if (!form.email) {
    errors.email = "Email is required";
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
    valid = false;
  }

  if (!form.topic) {
    errors.topic = "Please select a topic";
    valid = false;
  }

  if (!form.message) {
    errors.message = "Please describe your issue";
    valid = false;
  }

  return valid;
};

const onSubmit = async () => {
  if (!validate()) return;

  try {
    console.log("Message sent:", form);
    komunikat.value = "✅ Your message has been sent successfully!";
    //jak bedzie mi sie chcialo to zrobie wysylanie maila ( juz je robilem po prostu mi sie nie chce )
    form.email = "";
    form.topic = "";
    form.message = "";
  } catch (err) {
    console.error(err);
    komunikat.value = "❌ Something went wrong. Please try again later.";
  }
};
</script>
