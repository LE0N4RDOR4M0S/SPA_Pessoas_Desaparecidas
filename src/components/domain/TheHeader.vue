<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white shadow-sm border-b-2 border-primary-600">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/BRASAO_PJCMT.jpg"
          alt="Logo PJC-MT"
          class="h-10"
        />
        <div>
          <h1 class="text-lg font-bold text-neutral-800">PJC-MT</h1>
          <p class="text-xs text-neutral-500">Pessoas Desaparecidas</p>
        </div>
      </RouterLink>
      <div></div>
    </nav>
  </header>
</template>
