<template>
  <div>
    <div class="my-2 mr-4">
      <i class="pi text-secondary" :class="icon" style="font-size: 1.5rem"></i>
    </div>
    <div>
      <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
      <p><slot></slot></p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BlockFooter',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
