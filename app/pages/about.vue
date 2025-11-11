<template>
  <main
    class="bg-[#1D1616] min-h-screen w-screen text-white flex items-center justify-center p-8"
  >
    <div
      class="max-w-2xl bg-[#2A1F1F] p-10 rounded-xl shadow-lg border border-[#4A4A4A] text-center"
    >
      <h1 class="text-4xl font-bold mb-4">About This Project</h1>
      <p class="text-[#c1c1c1] text-lg leading-relaxed">
        <span class="font-bold">Spin’n Sound</span> is a
        <span class="font-semibold">portfolio project</span>
        created for demonstration purposes only.
        <br /><br />
        Any items you "purchase" on this site will not be shipped or processed -
        all checkout functionality is purely illustrative.
        <br /><br />
        The goal of this project is to showcase modern web development
        practices, including authentication, product filtering, sorting, and
        responsive design.
        <br /><br />
        <span class="font-bold text-white">Tech stack:</span><br />
        Vue.js, Nuxt.js, JavaScript, TypeScript, Tailwind, MongoDB, and more.
      </p>
      <NuxtLink
        to="/"
        class="inline-block mt-8 px-6 py-3 bg-[#633131] hover:bg-[#7a3b3b] rounded-lg text-white font-semibold transition"
      >
        Back to Home
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
// This is a static info page, no logic required.
</script>
