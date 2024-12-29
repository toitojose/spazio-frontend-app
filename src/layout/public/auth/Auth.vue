<template>
  <headHtml>
    <slot name="seo"></slot>
  </headHtml>
  <div class="bg-cover bg-center bg-img">
    <div class="min-h-screen flex flex-col justify-center items-center bg-opacity-70">
      <div class="font-logo text-white text-5xl drop-shadow-lg mb-3">SPAZ10</div>
      <div class="w-full max-w-80 p-6 bg-white bg-opacity-40 shadow-md rounded-md backdrop-blur-md">
        <header class="text-center mb-6">
          <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
          <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer class="text-center mt-6 text-sm text-gray-500">
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
