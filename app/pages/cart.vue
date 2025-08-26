<script setup>
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const checkout = async (product) => {
  const { id } = await $fetch("/api/checkout", {
    method: "POST",
    body: { product },
  });

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: id });
};
</script>

<template>
  <main
    class="bg-[#1D1616] w-screen min-h-screen text-white relative overflow-hidden flex items-center justify-center"
  >
    <button @click="checkout(product)">Pay with Stripe</button>
  </main>
</template>
