<template>
  <Auth
    :title="$t('register.title')"
    :subtitle="$t('register.subtitle')">
    <RegisterForm />
  </Auth>
</template>
<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import Auth from '@/layout/public/auth/Auth.vue';
</script>
<style scoped></style>
