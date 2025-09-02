<script setup lang="ts">
import TheHeader from '@/components/domain/TheHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-neutral-100 font-sans text-neutral-800 flex flex-col">
    <TheHeader />
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
