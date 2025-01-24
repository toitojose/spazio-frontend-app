<template>
  <div
    class="feature-card"
    :class="variant">
    <div class="icon-wrapper">
      <i
        :class="icon"
        class="text-2xl"></i>
    </div>
    <div class="text-wrapper">
      <p class="title">{{ title }}</p>
      <p class="subtitle text-xs">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  subtitle: string;
  variant: 'info-primary' | 'info-secondary' | 'info-accent' | 'success' | 'warning' | 'error';
}

defineProps<Props>();
</script>

<style scoped>
.feature-card {
  @apply flex items-center rounded-lg border border-gray-200 p-3 shadow-sm;
}

.feature-card .icon-wrapper {
  @apply mr-3 items-center justify-center rounded-lg px-4 pb-2 pt-3;
}

.feature-card.info-accent {
  @apply bg-white;
}

.feature-card.info-accent .icon-wrapper {
  @apply bg-accent text-white;
}

.feature-card.info-accent .text-wrapper {
  @apply text-primary;
}
.feature-card.info-primary {
  @apply bg-white;
}

.feature-card.info-primary .icon-wrapper {
  @apply bg-primary text-white;
}

.feature-card.info-primary .text-wrapper {
  @apply text-primary;
}

.feature-card.info-secondary {
  @apply bg-white;
}

.feature-card.info-secondary .icon-wrapper {
  @apply bg-secondary text-white;
}

.feature-card.info-secondary .text-wrapper {
  @apply text-secondary;
}

.feature-card.success {
  @apply bg-green-50;
}

.feature-card.success .icon-wrapper {
  @apply bg-green-500 text-white;
}

.feature-card.success .text-wrapper {
  @apply text-green-500;
}

.feature-card.warning {
  @apply bg-yellow-50;
}

.feature-card.warning .icon-wrapper {
  @apply bg-yellow-500 text-white;
}

.feature-card.warning .text-wrapper {
  @apply text-yellow-500;
}

.feature-card.error {
  @apply bg-red-50;
}

.feature-card.error .icon-wrapper {
  @apply bg-red-500 text-white;
}

.feature-card.error .text-wrapper {
  @apply text-red-500;
}
</style>
