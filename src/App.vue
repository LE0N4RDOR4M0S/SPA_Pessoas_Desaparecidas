
<script setup lang="ts">
import TheHeader from '@/components/domain/TheHeader.vue'
import BaseSupportButton from '@/components/base/BaseSupportButton.vue'

</script>

<template>
  <div :class="'flex flex-col min-h-screen '">
    <TheHeader />
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <BaseSupportButton />
  </div>
</template>
