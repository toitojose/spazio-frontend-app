<template>
  <div id="home">
    <!-- Sidebar -->
    <nav
      id="sidebar"
      class="hidden md:block">
      <div class="inner p-8">
        <span class="sp-spazio-logotipo text-[2.3rem] text-white"></span>
        <ul>
          <li
            v-for="item in sidebarItems"
            :key="item.id">
            <a
              class="cursor-pointer scroll-smooth uppercase"
              :class="{ active: currentHash === item.href }"
              @click.prevent="scrollToSection(item.href)">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="wrapper sm:ml-72">
      <!-- Welcome Section -->
      <section
        id="welcome"
        class="bg-img-1 items-left flex h-screen items-center bg-cover bg-center">
        <div class="w-auto p-12 pl-20 text-left text-black">
          <h1 class="mb-4 font-logo text-5xl font-bold">
            <span class="sp-spazio-iso"></span>
          </h1>
          <p class="text-shadow-white mb-4 text-xl">Llegamos para iluminar el camino<br />hacia tu nuevo hogar</p>
          <p class="mb-8 text-lg">
            <span ref="typedText"></span>
          </p>
          <div class="flex items-center">
            <a
              href="#connection"
              class="relative flex h-10 w-12 items-center justify-center overflow-hidden rounded-full leading-4"
              @click="scrollToSection('#connection')">
              <div class="scroll-indicator"></div>
              <div class="scroll-dot"></div>
            </a>
            <p class="">Has clic o scroll para ver mas información</p>
          </div>
        </div>
      </section>

      <!-- Conexión con el Público -->
      <section
        id="connection"
        class="relative flex items-end justify-center lg:h-screen">
        <div class="bg-img-abstract absolute inset-0 h-2/3 w-full bg-gradient-to-bl bg-cover bg-fixed md:block"></div>
        <div
          class="z-10 flex flex-col items-center justify-center bg-white/20 p-8 text-center backdrop-blur-2xl lg:h-screen lg:p-12">
          <!-- Título con texto adicional -->
          <p class="uppercase tracking-widest text-white">Te has preguntado...</p>
          <h2 class="mb-4 font-logo text-5xl font-bold text-white"
            >¿Por qué el arriendo tiene que ser sólo un gasto?</h2
          >
          <!-- Párrafo descriptivo -->
          <p class="mb-6">
            En <span class="font-logo text-2xl">SPAZ10</span> creemos que tus pagos de arriendo pueden ser mucho más que
            una simple transacción. Imagina ganar beneficios mientras aseguras tu hogar. No se trata solo de pagar, se
            trata de transformar la manera en que inquilinos y propietarios interactúan.<br />
            <strong>Bienvenido a un sistema que crea valor real para todos.</strong>
          </p>
          <!-- Bloques principales -->
          <div class="block-connection grid text-center lg:grid-cols-3">
            <!-- Primer bloque -->
            <div class="mx-4 mb-4 flex flex-col items-center border-b border-primary-800/20 pb-8 lg:space-x-5">
              <div class="icon">
                <i
                  class="pi pi-briefcase"
                  style="font-size: 2rem"></i>
              </div>
              <div>
                <h3 class="mb-2 text-xl font-semibold">¿Eres un agente inmobiliario?</h3>
                <p class=""
                  >Conéctate con una comunidad activa y comprometida. Únete como aliado estratégico para potenciar tu
                  negocio.</p
                >
                <PButton
                  label="Conoce más"
                  severity="contrast"
                  variant="outlined"
                  size="small"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  @click="navigateTo('/agent')" />
              </div>
            </div>
            <!-- Segundo bloque -->
            <div class="mx-4 mb-4 flex flex-col items-center border-b border-primary-800/20 pb-8 lg:space-x-5">
              <div class="icon">
                <i
                  class="pi pi-user"
                  style="font-size: 2rem"></i>
              </div>
              <div>
                <h3 class="mb-2 text-xl font-semibold">¿Eres inquilino?</h3>
                <p class="">
                  Disfruta de recompensas exclusivas por mantener tus pagos al día. Transformamos tu responsabilidad en
                  beneficios.
                </p>
                <PButton
                  label="Conoce más"
                  severity="contrast"
                  variant="outlined"
                  size="small"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  @click="navigateTo('/renter')" />
              </div>
            </div>
            <!-- Tercer bloque -->
            <div class="mx-4 mb-4 flex flex-col items-center border-b border-primary-800/20 pb-8 lg:space-x-5">
              <div class="icon">
                <i
                  class="pi pi-home"
                  style="font-size: 2rem"></i>
              </div>
              <div>
                <h3 class="mb-2 text-xl font-semibold">¿Eres propietario?</h3>
                <p class=""
                  >Simplifica la administración de tus propiedades y asegura pagos puntuales con nuestro sistema
                  avanzado.</p
                >
                <PButton
                  label="Conoce más"
                  severity="contrast"
                  variant="outlined"
                  size="small"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  @click="navigateTo('/property-owner')" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- El Poder de Transformar -->
      <section
        id="transform"
        class="relative bg-surface-50 lg:flex lg:h-screen">
        <div class="bg-parallax-image bg-img-2 hidden h-full bg-cover bg-fixed bg-center md:block lg:w-2/5"></div>
        <div class="relative flex w-full flex-col items-start justify-center p-8 text-left md:px-12 lg:w-3/5">
          <h2 class="mb-6 font-logo text-5xl font-bold text-secondary">Porque creemos en el poder de transformar</h2>
          <p class="text-md mb-4">
            Creemos que cada relación entre inquilinos y propietarios puede convertirse en una experiencia positiva,
            basada en la confianza y en la posibilidad de construir juntos un futuro mejor
          </p>

          <div class="flex items-start space-x-6 border-b py-6">
            <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
              <i
                class="pi pi-star"
                style="font-size: 1.5rem"></i>
            </div>
            <div>
              <h3 class="mb-2 text-xl font-semibold">Incentivamos lo mejor</h3>
              <p class="">Recompensamos la puntualidad para crear hábitos positivos y generar bienestar</p>
            </div>
          </div>
          <div class="flex items-start space-x-6 border-b py-6">
            <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
              <i
                class="pi pi-cog"
                style="font-size: 1.5rem"></i>
            </div>
            <div>
              <h3 class="mb-2 text-xl font-semibold">Simplificamos lo complejo</h3>
              <p class="">Automatizamos procesos para que puedas enfocarte en lo que realmente importa</p>
            </div>
          </div>
          <div class="flex items-start space-x-6 py-6">
            <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
              <i
                class="pi pi-share-alt"
                style="font-size: 1.5rem"></i>
            </div>
            <div>
              <h3 class="mb-2 text-xl font-semibold">Creamos conexiones</h3>
              <p class="">Fomentamos relaciones duraderas y de confianza entre todas las partes</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Beneficios -->
      <section
        id="benefits"
        class="items-left relative flex items-center bg-surface-500 lg:h-screen">
        <div class="absolute inset-0 h-screen w-full"></div>
        <div class="px-18 relative z-10 mx-auto max-w-6xl py-10 text-center text-white">
          <h2 class="mb-8 font-logo text-5xl font-bold">Beneficios, más que solo resultados</h2>
          <div class="grid gap-12 md:m-6 lg:grid-cols-3">
            <div class="border border-white/20 p-6 shadow-md backdrop-blur-sm">
              <i
                class="pi pi-shield"
                style="font-size: 2rem"></i>
              <h3 class="mb-2 text-xl font-semibold">Construimos confianza</h3>
              <p>Ayudamos a que inquilinos y propietarios vivan una experiencia transparente y sin fricciones.</p>
            </div>
            <div class="border border-white/20 p-6 shadow-md backdrop-blur-sm">
              <i
                class="pi pi-gift"
                style="font-size: 2rem"></i>
              <h3 class="mb-2 text-xl font-semibold">Recompensas que motivan</h3>
              <p>Creamos un sistema de recompensas que premia la puntualidad y genera valor real.</p>
            </div>
            <div class="border border-white/20 p-6 shadow-md backdrop-blur-sm">
              <i
                class="pi pi-clock"
                style="font-size: 2rem"></i>
              <h3 class="mb-2 text-xl font-semibold">Impulsamos tu tranquilidad</h3>
              <p>Automatizamos procesos para que tengas tiempo para lo importante: disfrutar tu hogar.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contacts -->
      <section
        id="contacts"
        class="items-left relative items-end text-white sm:flex">
        <div class="bg-img-4 absolute inset-0 bg-cover bg-fixed bg-center"></div>
        <FooterSpazio />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { Card, Button as PButton } from 'primevue';
import Typed from 'typed.js';
import router from '@/router';
import FooterSpazio from '@/components/public/footer/FooterSpazio.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    PButton,
    Card,
    FooterSpazio,
  },
  setup() {
    const route = useRoute();
    const typedText = ref<HTMLElement | null>(null);
    const currentHash = ref<string>(window.location.hash || '#welcome');
    const sidebarItems = [
      { id: 'welcome', href: '#welcome', label: 'Bienvenidos' },
      { id: 'connection', href: '#connection', label: 'Más que un gasto' },
      { id: 'transform', href: '#transform', label: 'Transformar' },
      { id: 'benefits', href: '#benefits', label: 'Beneficios' },
      { id: 'contacts', href: '#contacts', label: 'Contáctanos' },
    ];

    const checkHome = () => {
      if (route.path !== '/') {
        return;
      }
    };

    const scrollToSection = (id: string): void => {
      checkHome();
      const section = document.querySelector(id);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentHash.value = id;
        window.history.replaceState(null, '', id);
      }
    };

    const updateHashBasedOnScroll = () => {
      checkHome();
      const sections = sidebarItems.map((item) => document.querySelector(item.href));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          const bottom = top + section.clientHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            const newHash = sidebarItems[index].href;
            if (currentHash.value !== newHash) {
              currentHash.value = newHash; // Actualiza el hash actual
              window.history.replaceState(null, '', newHash);
            }
          }
        }
      });
    };

    const debounce = (func: () => void, wait: number) => {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      return () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    };

    const handleScrollAndResize = debounce(() => {
      updateHashBasedOnScroll();
    }, 100);

    onMounted(async () => {
      new Typed(typedText.value, {
        strings: ['Transformamos espacios en hogares.', 'Un espacio para ti.'],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true,
      });
      const initialHash = window.location.hash || sidebarItems[0].href;
      scrollToSection(initialHash);
      window.history.replaceState(null, '', initialHash);
      window.addEventListener('scroll', handleScrollAndResize);
      window.addEventListener('resize', handleScrollAndResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    });

    const navigateTo = (path: string) => {
      window.history.replaceState(null, '', path); // Limpia cualquier hash
      router.push(path).catch((err) => {
        console.error('Navigation error:', err);
      });
    };

    return {
      typedText,
      sidebarItems,
      scrollToSection,
      currentHash,
      navigateTo,
    };
  },
});
</script>

<style scoped>
@import '@/assets/css/home_old.css';
</style>
