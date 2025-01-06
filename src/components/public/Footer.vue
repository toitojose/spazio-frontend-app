<template>
  <footer id="footer" class="text-white flex items-left items-end relative border-t-gray-300/20 border-t">
    <div class="absolute inset-0 bg-fixed bg-center bg-cover bg-img-4"></div>
    <div class="w-full p-6 bg-gray-900/85 backdrop-blur-sm relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Ubicación -->
        <div class="text-center md:text-left pl-4 md:pl-8 flex justify-center md:justify-start">
          <div class="my-2 mr-4">
            <i class="pi pi-map-marker text-secondary" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-2">Nuestra Ubicación</h3>
            <p class="">
              Edificio Suyana,<br />
              Av. República de El Salvador N36-213 y,<br />
              Quito 170102, Ecuador
            </p>
          </div>
        </div>

        <!-- Teléfono -->
        <div
          class="text-center md:text-left border-l border-gray-300/20 pl-4 md:pl-8 flex justify-center md:justify-start">
          <div class="my-2 mr-4">
            <i class="pi pi-phone text-secondary" style="font-size: 1.5rem"></i>
          </div>
          <div class="">
            <h3 class="text-lg font-bold mb-2">Contáctanos</h3>
            <p class="">
              WhatsApp:
              <a href="https://wa.me/593998665209" class="text-secondary hover:underline">+593 99 866 5209</a>
            </p>
            <p class="">Llámanos de Lunes a Viernes: 9:00am - 6:00pm</p>
          </div>
        </div>

        <!-- Correo -->
        <div
          class="text-center md:text-left border-l border-gray-300/20 pl-4 md:pl-8 flex justify-center md:justify-start">
          <div class="my-2 mr-4">
            <i class="pi pi-envelope text-secondary" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-2">Correo Electrónico</h3>
            <p class="">
              <a href="mailto:info@spazio.com.ec" class="text-secondary hover:underline">info@spazio.com.ec</a>
            </p>
          </div>
        </div>
      </div>
      <!-- Separador -->
      <hr class="my-4 border-gray-300/20" />
      <!-- Créditos -->
      <div class="text-center">
        &copy; {{ new Date().getFullYear() }} <span class="sp-spazio-text-logo"></span> | Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped></style>
