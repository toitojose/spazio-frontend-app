<template>
  <div class="relative">
    <Sidebar
      :menu-items="groupedMenuItems"
      :is-visible="isSidebarVisible"
      @update:isVisible="handleSidebarVisibility" />
    <Header>
      <nav class="flex items-center space-x-0">
        <div
          v-for="item in secondaryItems"
          :key="item.label"
          class="relative">
          <Button
            type="button"
            :icon="item.icon"
            severity="help"
            text
            rounded
            :title="item.label"
            @click="item.items ? toggleMenu(item.label, $event) : item.command && item.command()" />
          <Menu
            v-if="item.items"
            :ref="setMenuRef(item.label)"
            :model="item.items"
            :popup="true" />
        </div>
      </nav>
    </Header>
    <main
      id="main"
      class="wrapper min-h-screen bg-gray-100 lg:ml-20">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrapper {
  flex: 1;
}
</style>
<style>
@import '@/assets/css/generic.css';
</style>
