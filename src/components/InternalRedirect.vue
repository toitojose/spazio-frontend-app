<template>
    <div>
        <div v-if="isAdmin">
            <Message
                severity="success"
                class="mb-4">
                ¡Hola, <span class="font-semibold">{{ firstName }}!</span> <br />
                Has iniciado sesión, ahora puedes seguir explorando.
            </Message>
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import { watch, ref, markRaw, defineAsyncComponent, computed } from 'vue';
  import { useUserStore } from '@/store/user.ts';
  import Message from 'primevue/message';
  
  const userStore = useUserStore();
  const isAdmin = computed(() => userStore.userRoles);
  const firstName = computed(() => userStore.userFirstName);
</script>
  
<style scoped></style>
  