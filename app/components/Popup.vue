<script setup>
import { ref, onMounted, watch } from "vue";
import { Transition } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  duration: { type: Number, default: 3000 },
  show: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const progress = ref(100);
let intervalId;

watch(
  () => props.show,
  (newVal) => {
    if (newVal) startTimer();
    else stopTimer();
  }
);

function startTimer() {
  progress.value = 100;
  const step = 100 / (props.duration / 50);
  intervalId = setInterval(() => {
    progress.value -= step;
    if (progress.value <= 0) {
      clearInterval(intervalId);
      emit("close");
    }
  }, 50);
}

function stopTimer() {
  clearInterval(intervalId);
}
</script>

<template>
  <Transition name="popup-slide" @after-leave="stopTimer">
    <div
      v-if="show"
      class="fixed bottom-6 right-6 bg-[#633131] shadow-lg rounded-lg overflow-hidden text-white"
      style="z-index: 9999"
    >
      <p class="text-lg font-medium mb-2 px-5 pb-3 pt-5 text-white">
        {{ message }}
      </p>
      <div class="w-full h-1 bg-[#633131]">
        <div
          class="h-full bg-[#9b7474] transition-all duration-100 ease-linear"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.popup-slide-enter-active {
  animation: popupIn 0.5s cubic-bezier(0.25, 1.25, 0.5, 1);
}
.popup-slide-leave-active {
  animation: popupOut 0.4s ease-in forwards;
}

@keyframes popupIn {
  0% {
    transform: translateX(120%) scale(0.95);
    opacity: 0;
  }
  60% {
    transform: translateX(-10%) scale(1.02);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

@keyframes popupOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  20% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(120%);
    opacity: 0;
  }
}
</style>
