<script setup lang="ts">

import {useTheme} from "./composables/layout/useTheme.ts";
import AppConfigurator from "./AppConfigurator.vue";
const { toggleDarkMode } = useTheme();

useTheme();

const navigateToGithub = () => {
  window.open('https://github.com/stichingsd-vitrion/primevue-tailwind-branding', '_blank');
};
</script>

<template>

  <div class="bg-surface-100 dark:bg-surface-900 flex items-center justify-center min-h-screen p-10">
    <section class="bg-white dark:bg-gray-800 p-10 rounded-xl flex flex-col gap-8 max-w-3xl">
      <h1 class="text-4xl  font-bold text-center">Tailwind CSS + PrimeVue</h1>
      <Button @click="toggleDarkMode">Toggle dark mode</Button>
      <AppConfigurator />
      <Button  text class="font-bold" @click="navigateToGithub"  icon="pi pi-github" label="Github"/>
    </section>
  </div>
</template>