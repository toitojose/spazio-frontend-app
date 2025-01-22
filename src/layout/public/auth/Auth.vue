<template>
  <div class="bg-img bg-cover bg-center">
    <div class="flex min-h-screen flex-col items-center justify-center bg-opacity-70">
      <div class="mb-3 font-logo text-5xl text-white drop-shadow-lg"><span class="sp-spazio-logotipo"></span> </div>
      <div class="w-full max-w-2xl rounded-md bg-white bg-opacity-40 p-6 shadow-md backdrop-blur-md">
        <header class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-black">{{ $t(title) }}</h1>
          <p
            v-if="subtitle"
            class="text-sm text-gray-500">
            {{ $t(subtitle) }}
          </p>
        </header>
        <main>
          <router-view />
        </main>
        <footer class="mt-6 text-center text-sm text-gray-500">
          <small>&copy; {{ year }} SPAZIO. All rights reserved.</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
});
const currYear = new Date();
const year = currYear.getFullYear();
</script>

<style scoped>
.bg-img {
  background-image: url('@/assets/img/11.jpg');
}
</style>
