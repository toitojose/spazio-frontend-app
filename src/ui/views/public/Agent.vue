<template>
  <Generic>
    <!-- Sección Principal -->
    <MainUser
      class="main-user"
      :slides="slides"
      :buttonText="$t('agent.mainUser.buttonText')"
      :buttonAction="createAccountAction"
      userType="agent"
      image="propietario-hand.png"
      userName="Felipe Narvaez"
      :userMessage="$t('agent.mainUser.userMessage')" />

    <!-- Sección Explicativa -->
    <section
      id="transform"
      class="relative bg-white lg:flex lg:h-screen">
      <div
        class="bg-parallax-image bg-img-inquilino-gana hidden h-96 w-full bg-cover bg-no-repeat lg:block lg:h-screen lg:w-3/5"></div>
      <div class="relative flex w-full flex-col items-start justify-center p-8 text-left lg:w-3/5 lg:px-12 lg:py-0">
        <h2 class="mb-6 font-logo text-5xl font-bold">{{ $t('agent.whySpazio.title') }}</h2>
        <p class="text-md mb-4">
          {{ $t('agent.whySpazio.content') }}
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
    <HowWorks
      :title="$t('agent.howItWorks.title')"
      :steps="steps" />

    <!-- Qué te ofrecemos? -->
    <section class="relative items-end justify-center">
      <div class="bg-img-abstract absolute inset-0 h-2/3 w-full bg-gradient-to-bl bg-cover bg-fixed md:block"></div>
      <div class="z-10 bg-white/20 px-14 py-20 text-center backdrop-blur-2xl">
        <h2 class="mb-6 font-logo text-5xl font-bold">{{ $t('agent.whatWeOffer.title') }}</h2>
        <p class="text-md mb-4"> {{ $t('agent.whatWeOffer.content') }}</p>
        <div class="mx-auto flex flex-wrap justify-evenly">
          <div class="grid gap-12 md:m-6 lg:grid-cols-4">
            <div
              v-for="offer in offers"
              class="border border-white/20 p-6 shadow-md backdrop-blur-sm">
              <i
                class="pi"
                :class="offer.icon"
                style="font-size: 2rem"></i>
              <h3 class="mb-2 text-xl font-semibold">{{ offer.title }}</h3>
              <p>{{ offer.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Generic>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import Generic from '@/layout/public/Generic.vue';
import { Timeline, Button as PVButton } from 'primevue';
import MainUser from '@/components/public/MainUser.vue';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/locales/i18n.ts';
import type { LocaleMessageInterface } from '@/interfaces/locale-message.interface.ts';
import HowWorks from '@/components/public/HowWorks.vue';

export default defineComponent({
  name: 'Agent',
  components: {
    HowWorks,
    Generic,
    PVButton,
    Timeline,
    MainUser,
  },
  setup() {
    const { t: $t, locale } = useI18n();
    const currentLocale = locale.value;
    const steps = ref([
      {
        title: $t('agent.howItWorks.steps.0.title'),
        description: $t('agent.howItWorks.steps.0.desc'),
        button: {
          text: $t('register.title'),
          action: () => openLogin,
        },
      },
      {
        title: $t('agent.howItWorks.steps.1.title'),
        description: $t('agent.howItWorks.steps.1.desc'),
      },
      {
        title: $t('agent.howItWorks.steps.2.title'),
        description: $t('agent.howItWorks.steps.2.desc'),
      },
      {
        title: $t('agent.howItWorks.steps.3.title'),
        description: $t('agent.howItWorks.steps.3.desc'),
      },
    ]);

    const createAccountAction = () => {
      console.log('Crear cuenta clicada');
    };

    const messages = i18n.global.getLocaleMessage(currentLocale) as LocaleMessageInterface;
    const slides = messages.agent?.mainUser?.slides || [];
    const offers = messages.agent?.whatWeOffer?.features || [];

    const benefits = [
      {
        title: $t('agent.whySpazio.benefits.0.title'),
        description: $t('agent.whySpazio.benefits.0.desc'),
        icon: 'pi-star',
      },
      {
        title: $t('agent.whySpazio.benefits.1.title'),
        description: $t('agent.whySpazio.benefits.1.desc'),
        icon: 'pi-cog',
      },
      {
        title: $t('agent.whySpazio.benefits.2.title'),
        description: $t('agent.whySpazio.benefits.2.desc'),
        icon: 'pi-share-alt',
      },
    ];

    const openLoginDialog = inject<() => void>('openLoginDialog');

    const openLogin = () => {
      openLoginDialog?.(); // Abre el diálogo global
    };

    return {
      steps,
      slides,
      benefits,
      createAccountAction,
      offers,
      openLogin,
    };
  },
});
</script>

<style scoped>
.bg-img-inquilino-gana {
  background-image: url('@/assets/img/agente-inmobiliario-3.jpg');
  background-position: 20% center;
}
.bg-img-abstract {
  background-image: url('@/assets/img/bg.png');
  background-position: right bottom;
}
.main-user {
  background: linear-gradient(to right, var(--accent-color), var(--secondary-color));
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
