<template>
  <div>
    <Sidebar />

    <div class="ml-20 flex flex-grow flex-col">
      <!-- Header -->
      <Header />

      <!-- Main Content -->
      <main class="flex-grow bg-gray-50 p-6">
        <slot></slot>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped></style>
