<template>
  <Generic>
    <!-- Sección Principal -->
    <MainUser
      :slides="slides"
      :buttonText="$t('renter.mainUser.buttonText')"
      :buttonAction="createAccountAction"
      :link="link"
      image="inquilino-feliz.png"
      :userName="userName"
      :userMessage="$t('renter.mainUser.userMessage')" />

    <!-- Sección Explicativa -->
    <section
      id="transform"
      class="relative bg-white lg:flex lg:h-screen">
      <div
        class="bg-parallax-image bg-img-inquilino-gana hidden h-96 w-full bg-cover bg-no-repeat lg:block lg:h-screen lg:w-3/5"></div>
      <div class="relative flex w-full flex-col items-start justify-center p-8 text-left lg:w-3/5 lg:px-12 lg:py-0">
        <h2 class="mb-6 font-logo text-5xl font-bold">{{ $t('renter.whySpazio.title') }}</h2>
        <p class="text-md mb-4">
          {{ $t('renter.whySpazio.content') }}
        </p>

        <div
          v-for="benefit in benefits"
          class="flex items-start space-x-6 border-b py-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi"
              :class="benefit.icon"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">{{ benefit.title }}</h3>
            <p class="text-gray-700">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ¿Cómo funciona? -->
    <section class="bg-gray-900 py-8 text-center text-gray-200">
      <h2 class="mb-10 text-3xl font-bold">¿Cómo funciona?</h2>
      <div class="mx-auto flex lg:w-1/2">
        <Timeline
          :value="steps"
          align="alternate"
          class="how-works">
          <!-- Marcador (número del paso) -->
          <template #marker="slotProps">
            <span
              class="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-sm">
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
              <PVButton
                v-if="slotProps.item.button"
                severity="secondary"
                size="small"
                class="my-4"
                @click="slotProps.item.button.action()">
                {{ slotProps.item.button.text }}
              </PVButton>
            </div>
          </template>
        </Timeline>
      </div>
    </section>
  </Generic>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SVGShape from '@/assets/models/SVGShape.vue';
import Generic from '@/layout/public/Generic.vue';
import { Checkbox, InputText, Timeline, Button as PVButton } from 'primevue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import MainUser from '@/components/public/MainUser.vue';
import '@/assets/css/carousel-buyer-persona.css';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/locales/i18n.ts';

export default defineComponent({
  name: 'renter',
  components: {
    Generic,
    SVGShape,
    Checkbox,
    InputText,
    PVButton,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Timeline,
    MainUser,
  },
  setup() {
    const { t: $t } = useI18n();
    const checked1 = ref(true);
    const steps = ref([
      {
        title: $t('renter.howItWorks.steps.0.title'),
        description: $t('renter.howItWorks.steps.0.desc'),
        button: {
          text: $t('register.title'),
          action: () => {
            console.log('Ver puntos / Iniciar sesión');
          },
        },
      },
      {
        title: $t('renter.howItWorks.steps.1.title'),
        description: $t('renter.howItWorks.steps.0.desc'),
        button: {
          text: $t('agent.contactAgent'),
          action: () => {
            console.log('Redirigiendo a la búsqueda de propiedades...');
          },
        },
      },
      {
        title: $t('renter.howItWorks.steps.2.title'),
        description: $t('renter.howItWorks.steps.2.desc'),
        button: {
          text: $t('paymentsMethods.callToAction'),
          action: () => {
            console.log('Mostrando opciones de métodos de pago...');
          },
        },
      },
      {
        title: $t('renter.howItWorks.steps.3.title'),
        description: $t('renter.howItWorks.steps.3.desc'),
      },
      {
        title: $t('renter.howItWorks.steps.4.title'),
        description: $t('renter.howItWorks.steps.4.desc'),
        button: {
          text: $t('catalog.callToAction'),
          action: () => {
            console.log('Ver catálogo');
          },
        },
      },
    ]);

    const createAccountAction = () => {
      console.log('Crear cuenta clicada');
    };

    const link = {
      show: true,
      text: $t('login.title'),
      action: () => {
        console.log('Inicia sesión clicado');
      },
    };

    const userName = 'José Luis García';
    const userMessage = '¡Recibe premios por su pago del arriendo mensual!';
    const currentLocale = i18n.global.locale.value;
    const slides = i18n.global.getLocaleMessage(currentLocale)?.renter?.mainUser?.slides || [];

    const benefits = [
      {
        title: $t('renter.whySpazio.benefits.0.title'),
        description: $t('renter.whySpazio.benefits.0.desc'),
        icon: 'pi-star',
      },
      {
        title: $t('renter.whySpazio.benefits.1.title'),
        description: $t('renter.whySpazio.benefits.1.desc'),
        icon: 'pi-cog',
      },
      {
        title: $t('renter.whySpazio.benefits.2.title'),
        description: $t('renter.whySpazio.benefits.2.desc'),
        icon: 'pi-share-alt',
      },
    ];

    return {
      checked1,
      steps,
      slides,
      benefits,
      createAccountAction,
      link,
      userName,
      userMessage,
    };
  },
});
</script>

<style scoped>
.bg-img-inquilino-gana {
  background-image: url('@/assets/img/inquilino-gana.jpg');
}
</style>
<style>
.how-works .p-timeline-event:nth-child(even) .p-timeline-event-content .content {
  align-items: flex-end;
}
.how-works .p-timeline-event:nth-child(odd) .p-timeline-event-content .content {
  align-items: flex-start;
}
.how-works .p-timeline-event:nth-child(even) {
  text-align: right;
}
.carousel__pagination-button::after {
  background-color: var(--light-surface-500);
}
.carousel__pagination-button--active::after {
  background-color: var(--white-color);
}
.carousel__pagination-button:hover::after {
  background-color: var(--light-surface-800);
}
</style>
