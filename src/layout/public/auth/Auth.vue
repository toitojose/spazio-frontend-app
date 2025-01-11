<template>
  <div class="bg-img bg-cover bg-center">
    <div class="flex min-h-screen flex-col items-center justify-center bg-opacity-70">
      <div class="mb-3 font-logo text-5xl text-white drop-shadow-lg">SPAZ10</div>
      <div class="w-full max-w-2xl rounded-md bg-white bg-opacity-40 p-6 shadow-md backdrop-blur-md">
        <header class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
          <p
            v-if="subtitle"
            class="text-sm text-gray-500"
            >{{ subtitle }}</p
          >
        </header>
        <main>
          <slot></slot>
        </main>
        <footer class="mt-6 text-center text-sm text-gray-500">
          <small>&copy; {{ year }} Spazio. All rights reserved.</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Auth',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
  setup() {
    const currYear = new Date();
    const year = currYear.getFullYear();
    return { year };
  },
});
</script>

<style scoped>
.bg-img {
  background-image: url('@/assets/img/11.jpg');
}
</style>
