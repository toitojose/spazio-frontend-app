<template>
  <footer
    id="footer"
    class="items-left relative flex w-full items-end border-t border-t-gray-300/20 text-white lg:pl-20">
    <div class="relative z-10 w-full bg-gray-900/90 p-6 backdrop-blur-sm">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Ubicación -->
        <BlockFooter
          title="Nuestra Ubicación"
          icon="pi-map-marker">
          Edificio Suyana,<br />
          Av. República de El Salvador N36-213 y,<br />
          Quito 170102, Ecuador
        </BlockFooter>

        <!-- Teléfono -->
        <BlockFooter
          title="Contáctanos"
          icon="pi-phone">
          WhatsApp:
          <a
            href="https://wa.me/593998665209"
            target="_blank"
            class="text-accent hover:underline">
            +593 99 866 5209
          </a>
        </BlockFooter>

        <!-- Correo -->
        <BlockFooter
          title="Correo Electrónico"
          icon="pi-envelope">
          Escríbenos a:
          <a
            href="mailto:info@spazio.com.ec"
            class="text-accent hover:underline">
            info@spazio.com.ec
          </a>
        </BlockFooter>
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
import BlockFooter from '@/components/public/footer/BlockFooter.vue';

export default defineComponent({
  name: 'FooterSpazio',
  components: { BlockFooter },
});
</script>

<style scoped></style>
