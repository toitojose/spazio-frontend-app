<template>
  <div>
    <!-- Sidebar -->
    <nav id="sidebar" class="fixed left-0 top-0 h-screen w-72 pt-10 pr-10 pb-2 pl-10">
      <div class="inner p-5">
        <div class="mb-8 text-center">
          <span class="sp-spazio-logotipo text-white text-[1.75rem]"></span>
        </div>
        <ul>
          <li v-for="item in sidebarItems" :key="item.id">
            <a class="text-sm uppercase cursor-pointer scroll-smooth" :class="{ active: currentHash === item.href }" @click.prevent="scrollToSection(item.href)">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="wrapper ml-72">
      <!-- Welcome Section -->
      <section id="welcome" class="h-screen bg-center bg-cover bg-img-1 flex items-left items-center">
        <div class="w-auto text-left p-8 text-black">
          <h1 class="font-logo text-5xl font-bold mb-4"><span class="sp-spazio-logotipo"></span></h1>
          <p class="text-xl mb-4">Llegamos para iluminar el camino<br />hacia tu nuevo hogar</p>
          <p class="text-lg mb-8">
            <span ref="typedText"></span>
          </p>
          <div class="flex items-center">
            <a href="#connection" class="relative w-12 h-10 leading-4 rounded-full flex items-center justify-center overflow-hidden" @click="scrollToSection('#connection')">
              <div class="scroll-indicator"></div>
              <div class="scroll-dot"></div>
            </a>
            <p class="text-xs">Has clic o scroll para ver mas información</p>
          </div>
        </div>
      </section>

      <!-- Conexión con el Público -->
      <section id="connection" class="h-screen bg-gray-300 text-white relative">
        <div class="absolute inset-0 bg-fixed bg-center bg-cover bg-img-3"></div>
        <div class="h-screen bg-gray-800 bg-opacity-50 py-20 flex items-center justify-center relative z-10">
          <div class="max-w-6xl mx-auto px-20">
            <!-- Título con texto adicional -->
            <p class="text-xs uppercase tracking-widest">Te has preguntado...</p>
            <h2 class="text-4xl font-bold font-logo mb-4">¿Por qué el arriendo tiene que ser solo un gasto?</h2>
            <!-- Párrafo descriptivo -->
            <p class="mb-6 text-white/80">
              En <span class="font-logo">SPAZ10</span> creemos que tus pagos de arriendo pueden ser mucho más que una simple transacción. Imagina ganar beneficios mientras aseguras
              tu hogar. No se trata solo de pagar, se trata de transformar la manera en que inquilinos y propietarios interactúan.<br />
              <strong>Bienvenido a un sistema que crea valor real para todos.</strong>
            </p>
            <!-- Bloques principales -->
            <div class="grid md:grid-cols-2 block-connection my-10">
              <!-- Primer bloque -->
              <div class="flex items-start space-x-5 mx-4">
                <div class="flex items-center justify-center bg-white text-secondary rounded-full p-3 icon">
                  <i class="pi pi-check-circle" style="font-size: 2rem"></i>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">¿Pagas puntualmente?</h3>
                  <p class="text-sm text-white/75">Disfruta de recompensas exclusivas por mantener tus pagos al día. Transformamos tu responsabilidad en beneficios.</p>
                </div>
              </div>
              <!-- Segundo bloque -->
              <div class="flex items-start space-x-5 mx-4">
                <div class="flex items-center justify-center bg-white text-secondary rounded-full p-3 icon">
                  <i class="pi pi-home" style="font-size: 2rem"></i>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">¿Eres propietario?</h3>
                  <p class="text-sm text-white/75">Simplifica la administración de tus propiedades y asegura pagos puntuales con nuestro sistema avanzado.</p>
                </div>
              </div>
            </div>

            <!-- Complemento inferior -->
            <div class="mt-8">
              <h3 class="text-xl text-secondary mb-2"><i class="pi pi-user-plus"></i> ¿Eres un agente inmobiliario?</h3>
              <p class="text-white/80">Conéctate con una comunidad activa y comprometida. Únete como aliado estratégico para potenciar tu negocio.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- El Poder de Transformar -->
      <section id="transform" class="relative bg-white h-screen flex">
        <div class="hidden md:block bg-parallax-image bg-img-2 bg-cover bg-right bg-fixed md:w-3/5 h-full"></div>
        <div class="relative w-full md:w-3/5 flex flex-col justify-center items-start px-8 md:px-12 text-left">
          <h2 class="text-4xl font-logo font-bold mb-6">Porque creemos en el poder de transformar</h2>
          <p class="text-md mb-4">Imaginamos un mundo donde inquilinos y propietarios se relacionen desde la confianza, transformando juntos la visión del mercado inmobiliario.</p>

          <div class="py-8 flex items-start space-x-6">
            <div class="border border-primary-400 flex items-center justify-center text-secondary rounded-full p-3 icon">
              <i class="pi pi-star" style="font-size: 1.5rem"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Incentivamos lo mejor</h3>
              <p class="text-sm">Recompensamos la puntualidad para crear hábitos positivos y generar bienestar</p>
            </div>
          </div>
          <div class="py-8 flex items-start space-x-6">
            <div class="border border-primary-400 flex items-center justify-center text-secondary rounded-full p-3 icon">
              <i class="pi pi-cog" style="font-size: 1.5rem"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Simplificamos lo complejo</h3>
              <p class="text-sm">Automatizamos procesos para que puedas enfocarte en lo que realmente importa</p>
            </div>
          </div>
          <div class="pt-8 flex items-start space-x-6">
            <div class="border border-primary-400 flex items-center justify-center text-secondary rounded-full p-3 icon">
              <i class="pi pi-share-alt" style="font-size: 1.5rem"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Creamos conexiones</h3>
              <p class="text-sm">Fomentamos relaciones duraderas y de confianza entre todas las partes</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Beneficios -->
      <section id="benefits" class="h-screen flex items-left items-center relative">
        <div ref="vantaRef" class="w-full h-screen absolute inset-0"></div>
        <div class="max-w-6xl mx-auto py-10 px-20 text-center relative z-10 text-white">
          <h2 class="text-4xl font-logo font-bold mb-8">Beneficios: Más que solo resultados</h2>
          <div class="grid md:grid-cols-3 gap-10">
            <div class="border border-white/20 backdrop-blur-sm shadow-md p-6">
              <i class="pi pi-shield" style="font-size: 2rem"></i>
              <h3 class="text-xl font-semibold mb-2">Construimos confianza</h3>
              <p>Ayudamos a que inquilinos y propietarios vivan una experiencia transparente y sin fricciones.</p>
            </div>
            <div class="border border-white/20 backdrop-blur-sm shadow-md p-6">
              <i class="pi pi-star" style="font-size: 2rem"></i>
              <h3 class="text-xl font-semibold mb-2">Recompensas que motivan</h3>
              <p>Creamos un sistema de recompensas que premia la puntualidad y genera valor real.</p>
            </div>
            <div class="border border-white/20 backdrop-blur-sm shadow-md p-6">
              <i class="pi pi-clock" style="font-size: 2rem"></i>
              <h3 class="text-xl font-semibold mb-2">Impulsamos tu tranquilidad</h3>
              <p>Automatizamos procesos para que tengas tiempo para lo importante: disfrutar tu hogar.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section id="contacts" class="h-screen text-white flex items-left items-end relative">
        <div class="absolute inset-0 bg-fixed bg-center bg-cover bg-img-4"></div>
        <div class="mx-auto p-6 bg-gray-900/85 backdrop-blur-sm relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Ubicación -->
            <div class="text-center md:text-left pl-4 md:pl-8 flex justify-center md:justify-start">
              <div class="my-2 mr-4">
                <i class="pi pi-map-marker text-secondary" style="font-size: 1.5rem"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-2">Nuestra Ubicación</h3>
                <p class="text-sm">
                  Edificio Suyana,<br />
                  Av. República de El Salvador N36-213 y,<br />
                  Quito 170102, Ecuador
                </p>
              </div>
            </div>

            <!-- Teléfono -->
            <div class="text-center md:text-left border-l border-gray-300/20 pl-4 md:pl-8 flex justify-center md:justify-start">
              <div class="my-2 mr-4">
                <i class="pi pi-phone text-secondary" style="font-size: 1.5rem"></i>
              </div>
              <div class="">
                <h3 class="text-lg font-bold mb-2">Contáctanos</h3>
                <p class="text-sm">WhatsApp: <a href="https://wa.me/593998665209" class="text-secondary hover:underline">+593 99 866 5209</a></p>
                <p class="text-sm">Llámanos de Lunes a Viernes: 9:00am - 6:00pm</p>
              </div>
            </div>

            <!-- Correo -->
            <div class="text-center md:text-left border-l border-gray-300/20 pl-4 md:pl-8 flex justify-center md:justify-start">
              <div class="my-2 mr-4">
                <i class="pi pi-envelope text-secondary" style="font-size: 1.5rem"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-2">Correo Electrónico</h3>
                <p class="text-sm">
                  <a href="mailto:info@spazio.com.ec" class="text-secondary hover:underline">info@spazio.com.ec</a>
                </p>
              </div>
            </div>
          </div>
          <!-- Separador -->
          <hr class="my-8 border-gray-300/20" />
          <!-- Créditos -->
          <div class="text-center text-sm">&copy; {{ new Date().getFullYear() }} <span class="sp-spazio-text-logo"></span> | Todos los derechos reservados.</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Typed from 'typed.js';
import { destroyVanta, initializeVanta } from '@/assets/anime/vantaHelper.ts';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Card,
  },
  setup() {
    const typedText = ref<HTMLElement | null>(null);
    const vantaRef = ref<HTMLElement | null>(null);
    const currentHash = ref<string>(window.location.hash || '#welcome');
    const sidebarItems = [
      { id: 'welcome', href: '#welcome', label: 'Bienvenidos' },
      { id: 'connection', href: '#connection', label: 'Más que un gasto' },
      { id: 'transform', href: '#transform', label: 'Transformar' },
      { id: 'benefits', href: '#benefits', label: 'Beneficios' },
      { id: 'contacts', href: '#contacts', label: 'Contáctanos' },
    ];

    const scrollToSection = (id: string): void => {
      const section = document.querySelector(id);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentHash.value = id; // Actualiza el hash actual
      }
    };

    const updateHashBasedOnScroll = () => {
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

      initializeVanta(vantaRef.value);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
      destroyVanta();
    });

    return {
      typedText,
      sidebarItems,
      scrollToSection,
      currentHash,
      vantaRef,
    };
  },
});
</script>

<style scoped>
@import '@/assets/css/sidebar-home.css';
.bg-img-1 {
  background-image: url('@/assets/img/luz.jpg');
  background-position: right 30%;
}
.bg-img-3 {
  background-image: url('@/assets/img/3.jpg');
  background-position: left center;
}
.bg-img-2 {
  background-image: url('@/assets/img/2.jpg');
}
.bg-img-4 {
  background-image: url('@/assets/img/4.jpg');
  background-position: left bottom;
}
.bg-parallax-image {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

.block-connection .icon {
  /*color: #5e42a6;*/
  /*color: #b74e91;*/
  color: var(--primary-color);
  background-color: #fff;
}

@keyframes scroll-dot {
  0% {
    transform: translateY(-0.5rem);
    opacity: 1;
  }
  40% {
    transform: translateY(0.5rem);
    opacity: 0.8;
  }
  60% {
    transform: translateY(0.5rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

.scroll-indicator {
  width: 1rem;
  height: 2rem;
  border: 2px solid var(--secondary-color);
  border-radius: 9999px;
  position: absolute;
}

.scroll-dot {
  animation: scroll-dot 1.5s infinite;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--secondary-color);
  border-radius: 9999px;
  position: absolute;
}
</style>
