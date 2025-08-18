<template>
  <div>
    <h1>Produkt: {{ name }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const name = route.params.name;
</script>
