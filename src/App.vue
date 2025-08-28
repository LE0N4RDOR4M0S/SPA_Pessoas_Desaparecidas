<script setup lang="ts">
import TheHeader from '@/components/domain/TheHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-neutral-100 font-sans text-neutral-800">
    <TheHeader />
    <RouterView />
  </div>
</template>
