import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      STRIPE_PUBLISHABLE_KEY: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  routeRules: {
    "/products": { redirect: "/products/all" },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      title: "Spin'n Sound",
      meta: [{ name: "description", content: "Spin'n Sound — music store" }],
    },
  },
});
