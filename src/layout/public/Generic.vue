<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header id="header-top" class="bg-sidebar text-white py-2 px-4 flex justify-between items-center">
      <a href="/" class="title text-xl font-bold"><span class="sp-spazio-logotipo text-2xl"></span> </a>
      Un espacio para ti...
    </header>

    <!-- Main Wrapper -->
    <main id="main" class="wrapper bg-gray-100">
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from '@/components/public/footer/Footer.vue';

export default defineComponent({
  name: 'Generic',
  components: { Footer },
});
</script>

<style scoped>
.wrapper {
  flex: 1;
}
</style>
