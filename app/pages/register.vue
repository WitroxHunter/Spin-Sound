<template>
  <main
    class="bg-[#1D1616] min-h-screen w-screen text-white flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl mb-6">Register</h1>

    <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-lg"
    >
      <!-- Komunikat błędu -->
      <p v-if="komunikat" class="text-red-400 text-sm">{{ komunikat }}</p>

      <!-- Email -->
      <div>
        <label class="block mb-1">Email</label>
        <input
          v-model="form.email"
          type="text"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <p v-if="errors.email" class="text-red-400 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- Hasło -->
      <div>
        <label class="block mb-1">Hasło</label>
        <input
          v-model="form.password"
          type="password"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <p v-if="errors.password" class="text-red-400 text-sm mt-1">
          {{ errors.password }}
        </p>
      </div>

      <!-- Powtórz hasło -->
      <div>
        <label class="block mb-1">Potwierdź hasło</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <p v-if="errors.confirmPassword" class="text-red-400 text-sm mt-1">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <!-- Submit -->
      <input
        type="submit"
        value="Register"
        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded cursor-pointer"
      />
    </form>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const komunikat = ref("");

// ✅ Funkcja walidacji
const validate = () => {
  errors.email = "";
  errors.password = "";
  errors.confirmPassword = "";
  let valid = true;

  if (!form.email) {
    errors.email = "Pole wymagane";
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Niepoprawny email";
    valid = false;
  }

  if (!form.password) {
    errors.password = "Pole wymagane";
    valid = false;
  } else if (form.password.length < 6) {
    errors.password = "Hasło musi mieć co najmniej 6 znaków";
    valid = false;
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Hasła muszą się zgadzać";
    valid = false;
  }

  return valid;
};

// ✅ Submit
const onSubmit = () => {
  if (!validate()) return;

  // tu normalnie byłoby fetch("/api/auth/register", ...)
  // ale robimy sam frontend
  console.log("Dane rejestracji:", form);

  komunikat.value = "✅ Konto utworzone pomyślnie (mock)";
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};
</script>
