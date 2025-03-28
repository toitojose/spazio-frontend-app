<template>
  <div>
    <!-- Sección Principal -->
    <MainUser
      class="bg-accent"
      :slides="slides"
      :buttonText="$t('propertyOwner.mainUser.buttonText')"
      :buttonAction="createAccountAction"
      userType="propertyOwner"
      image="woman-happy.png"
      userName="Andrea Villalba"
      :userMessage="$t('propertyOwner.mainUser.userMessage')" />

    <!-- Sección Explicativa -->
    <section
      id="transform"
      class="relative flex h-screen bg-white">
      <div class="bg-parallax-image bg-img-inquilino-gana hidden h-full bg-cover bg-no-repeat md:block md:w-3/5"></div>
      <div class="relative flex w-full flex-col items-start justify-center px-8 text-left md:w-3/5 md:px-12">
        <h2 class="mb-6 font-logo text-5xl font-bold">{{ $t('propertyOwner.whySpazio.title') }}</h2>
        <p class="text-md mb-4">
          {{ $t('propertyOwner.whySpazio.content') }}
        </p>

        <div
          v-for="benefit in benefits"
          class="flex items-start space-x-6 border-b py-4">
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
    <HowWorks
      :title="$t('propertyOwner.howItWorks.title')"
      :steps="steps" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import Generic from '@/layout/Generic.vue';
import { Carousel, Checkbox, InputText, Timeline, Button as PVButton } from 'primevue';
import MainUser from '@/components/public/MainUser.vue';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/locales/i18n.ts';
import type { LocaleMessageInterface } from '@/interfaces/locale-message.interface.ts';
import HowWorks from '@/components/public/HowWorks.vue';

export default defineComponent({
  name: 'PropertyOwner',
  components: { HowWorks, Generic, Checkbox, InputText, PVButton, Carousel, Timeline, MainUser },
  setup() {
    const { t: $t, locale } = useI18n();
    const currentLocale = locale.value;
    const checked1 = ref(true);
    const carouselConfig = {
      autoplay: 4000,
      itemsToShow: 1,
      wrapAround: true,
      pauseAutoplayOnHover: true,
    };

    const openLoginDialog = inject<() => void>('openLoginDialog');
    const openLogin = () => {
      openLoginDialog?.();
    };
    const steps = ref([
      {
        title: $t('propertyOwner.howItWorks.steps.0.title'),
        description: $t('propertyOwner.howItWorks.steps.0.desc'),
        button: {
          text: $t('property.callToAction'),
          action: () => openLogin(),
        },
      },
      {
        title: $t('propertyOwner.howItWorks.steps.1.title'),
        description: $t('propertyOwner.howItWorks.steps.1.desc'),
      },
      {
        title: $t('propertyOwner.howItWorks.steps.2.title'),
        description: $t('propertyOwner.howItWorks.steps.2.desc'),
      },
      {
        title: $t('propertyOwner.howItWorks.steps.3.title'),
        description: $t('propertyOwner.howItWorks.steps.3.desc'),
      },
    ]);

    const createAccountAction = () => {
      console.log('Crear cuenta clicada');
    };

    const messages = i18n.global.getLocaleMessage(currentLocale) as LocaleMessageInterface;
    const slides = messages.propertyOwner?.mainUser?.slides || [];

    const benefits = [
      {
        title: $t('propertyOwner.whySpazio.benefits.0.title'),
        description: $t('propertyOwner.whySpazio.benefits.0.desc'),
        icon: 'pi-star',
      },
      {
        title: $t('propertyOwner.whySpazio.benefits.1.title'),
        description: $t('propertyOwner.whySpazio.benefits.1.desc'),
        icon: 'pi-cog',
      },
      {
        title: $t('propertyOwner.whySpazio.benefits.2.title'),
        description: $t('propertyOwner.whySpazio.benefits.2.desc'),
        icon: 'pi-share-alt',
      },
    ];

    return { benefits, checked1, carouselConfig, steps, slides, createAccountAction };
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
  background-color: var(--accent-color-500);
}
.carousel__pagination-button--active::after {
  background-color: var(--white-color);
}
.carousel__pagination-button:hover::after {
  background-color: var(--accent-color-700);
}
</style>
