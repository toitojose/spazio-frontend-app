<template>
  <Auth
    :title="$t('register.title')"
    :subtitle="$t('register.subtitle')">
    <RegisterForm />
  </Auth>
</template>
<script setup lang="ts">
import RegisterForm from '@/components/public/auth/SignUpForm.vue';
import Auth from '@/layout/public/auth/Auth.vue';
</script>
<style scoped></style>
