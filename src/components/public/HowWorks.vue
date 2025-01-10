<template>
  <section class="bg-gray-900 py-8 text-center text-gray-200">
    <h2 class="mb-10 text-3xl font-bold">{{ title }}</h2>
    <div class="mx-auto flex lg:w-1/2">
      <Timeline
        :value="steps"
        align="alternate"
        class="how-works">
        <!-- Marcador (número del paso) -->
        <template #marker="slotProps">
          <span class="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-sm">
            {{ slotProps.index + 1 }}
          </span>
        </template>

        <!-- Contenido del paso -->
        <template #content="slotProps">
          <div class="content flex flex-col pb-10">
            <h3 class="text-lg font-semibold">{{ slotProps.item.title }}</h3>
            <p class="text-sm">{{ slotProps.item.description }}</p>
          </div>
        </template>
        <template #opposite="slotProps">
          <div class="content flex flex-col pb-10">
            <PButton
              v-if="slotProps.item.button"
              severity="secondary"
              size="small"
              class="my-4"
              @click="slotProps.item.button.action">
              {{ slotProps.item.button.text }}
            </PButton>
          </div>
        </template>
      </Timeline>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Timeline, Button as PButton } from 'primevue';
export default defineComponent({
  name: 'HowWorks',
  components: { Timeline, PButton },
  props: {
    steps: {
      type: Array as PropType<
        Array<{ title: string; description: string; button?: { text: string; action: () => void } }>
      >,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: '¿Cómo funciona?',
    },
  },
  setup() {},
});
</script>
<style scoped></style>
