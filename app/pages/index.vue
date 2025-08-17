<template>
  <main
    class="bg-[#1D1616] w-screen min-h-screen text-white relative overflow-hidden flex items-center justify-center"
  >
    <!-- Treść strony (logo + tekst + przyciski) -->
    <div class="w-2/5 h-screen flex items-center justify-center float-left">
      <div
        class="relative text-center flex flex-col items-center justify-center"
      >
        <h1 class="text-7xl font-bold mb-4">Spin'n Sound</h1>
        <p class="text-xl mb-8">Your choice for the best vinyl & CD records.</p>

        <!-- Dwa przyciski obok siebie -->
        <div class="flex gap-4">
          <button
            class="p-4 bg-[#633131] rounded-lg hover:bg-[#633131] transition"
          >
            Shop now!
          </button>
          <button
            class="p-4 bg-[#ffffff2d] rounded-lg hover:bg-[#ffffff26] transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
    <!-- Vinyl player -->
    <div class="w-3/5 h-screen float-right relative">
      <img
        src="~/assets/images/vinyl-player.png?url"
        alt="Vinyl"
        class="absolute top-0 right-0 h-[100vh] w-auto pointer-events-none transform z-20"
      />

      <!-- Igła -->
      <img
        src="~/assets/images/vinyl-player-igla2.png?url"
        alt="Igła"
        class="absolute top-0 right-0 h-[100vh] w-auto pointer-events-none transform z-99"
      />

      <!-- Obracający się winyl -->
      <img
        src="~/assets/images/vinyl.png?url"
        alt="Vinyl"
        class="absolute top-0 right-0 h-[100vh] -translate-x-1/6 w-auto pointer-events-none spin-slow transform z-30"
      />
    </div>
  </main>
</template>
