<template>
  <div class="block-footer">
    <div class="my-2 mr-4">
      <i
        class="pi text-secondary"
        :class="icon"
        style="font-size: 1.5rem"></i>
    </div>
    <div>
      <h3 class="mb-2 text-lg font-bold">{{ title }}</h3>
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
<style scoped>
.block-footer {
  @apply flex flex-col items-center border-primary-400 px-4 pb-4 text-center;
}
.block-footer:not(:last-child) {
  @apply border-b;
}
@media screen and (min-width: 768px) {
  .block-footer {
    border-bottom: none;
  }

  .block-footer:not(:last-child) {
    @apply border-r border-primary-400;
  }
}
</style>
