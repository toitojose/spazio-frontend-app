<template>
  <section
    class="flex flex-wrap items-center justify-evenly bg-secondary pt-4 text-white lg:h-screen lg:flex-nowrap lg:px-12">
    <!-- Sección del carrusel -->
    <div class="w-full flex-col justify-evenly md:w-1/2 lg:flex">
      <Carousel
        :value="slides"
        :numVisible="1"
        :numScroll="1"
        circular
        :autoplayInterval="3500">
        <template #item="slotProps">
          <h1 class="font-logo text-4xl md:text-6xl">{{ slotProps.data.title }}</h1>
          <p class="mt-4">{{ slotProps.data.desc }}</p>
        </template>
      </Carousel>
      <!-- Botón y enlace -->
      <div class="mt-4 text-center">
        <PVButton
          :label="buttonText"
          icon="pi pi-user-plus"
          severity="Primary"
          @click="buttonAction" />
        <p
          v-if="link.show"
          class="mt-2">
          <a
            href="#"
            class="underline"
            @click.prevent="link.action"
            >{{ link.text }}</a
          >
        </p>
      </div>
    </div>

    <!-- Sección de imagen y mensaje -->
    <div class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg pt-4 md:w-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 542"
        class="absolute z-0 fill-white"
        height="auto">
        <path
          d="M 1.86 52.16 C 1.86 24.01 24.64 1.23 52.78 1.23 L 547.22 1.23 C 575.36 1.23 598.14 24.01 598.14 52.16 L 598.14 297.58 C 598.14 311.77 592.3 325.25 581.92 334.91 L 374.41 526.91 C 364.99 535.5 352.59 540.39 339.83 540.39 L 211.51 540.39 C 183.37 540.39 160.59 517.61 160.59 489.46 L 160.59 327.64 C 160.59 299.49 137.81 276.71 109.67 276.71 L 52.78 276.71 C 24.64 276.71 1.86 253.93 1.86 225.91 Z" />
      </svg>
      <img
        :src="`/src/assets/img/${image}`"
        alt="Imagen ilustrativa"
        class="relative z-10 w-3/4" />
      <div class="z-20 hidden w-10/12 rounded-lg bg-white p-4 text-center text-primary shadow-md md:block">
        <p class="text-sm leading-snug">
          <span class="block text-2xl font-bold">{{ userName }}</span>
          <span class="text-xl">{{ userMessage }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import SVGShape from '@/assets/models/SVGShape.vue';
import { Carousel, Button as PVButton } from 'primevue';

export default defineComponent({
  name: 'MainUser',
  components: { Carousel, PVButton, SVGShape },
  props: {
    slides: {
      type: Array as PropType<Array<{ title: string; desc: string }>>,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonAction: {
      type: Function as PropType<() => void>,
      required: true,
    },
    link: {
      type: Object as PropType<{ show: boolean; text: string; action: () => void }>,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: 'inquilino-feliz.png',
    },
    svg: {
      type: Object as PropType<{ shape: string; color: string }>,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userMessage: {
      type: String,
      required: true,
    },
  },
});
</script>
<style scoped>
/* Puedes agregar clases específicas si se requieren */
</style>
