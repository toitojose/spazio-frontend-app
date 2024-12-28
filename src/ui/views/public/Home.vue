<template>
  <div class="bg-cover bg-center bg-img">
    <div class="h-screen flex items-center">
      <div class="w-1/3 ml-20 text-center p-8 text-black">
        <h1 class="font-logo text-5xl font-bold mb-4">SPAZIO</h1>
        <p class="text-xl mb-4">Llegamos para iluminar el camino<br />hacia tu nuevo hogar</p>
        <p class="text-lg mb-8">
          <span ref="typedText"></span>
        </p>
        <Button label="Ingresar" icon="pi pi-lock" iconPos="right" severity="secondary" @click="goToLogin" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Typed from 'typed.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
  },
  setup() {
    const typedText = ref<HTMLElement | null>(null);
    const router = useRouter();

    const goToLogin = () => {
      router.push('/login');
    };

    onMounted(() => {
      new Typed(typedText.value, {
        strings: ['Transformamos espacios en hogares.', 'Un espacio para ti.'],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true,
      });
    });

    return {
      typedText,
      goToLogin,
    };
  },
});
</script>
<style scoped>
.bg-img {
  background-image: url('@/assets/img/luz.jpg');
}
</style>
