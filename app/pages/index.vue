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
        <p class="text-xl mb-8 text-[#c1c1c1]">
          Your choice for the best vinyl & CD records.
        </p>

        <!-- Dwa przyciski obok siebie -->
        <div class="flex gap-4">
          <button
            class="cursor-pointer py-4 px-8 bg-[#633131] border-[#633131] hover:bg-[#582c2c] border-2 rounded-lg transition"
          >
            Shop now!
          </button>
          <button
            class="cursor-pointer p-4 border-2 border-[#ffffff2d] bg-[#ffffff0a] rounded-lg hover:bg-[#ffffff26] transition"
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
