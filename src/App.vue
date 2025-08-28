<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/domain/TheHeader.vue'
import HomePage from './views/HomePage.vue'
</script>

<template>
  <div class="min-h-screen bg-neutral-100 font-sans text-neutral-800">
    <TheHeader />
    <HomePage />
    <RouterView />
  </div>
</template>
