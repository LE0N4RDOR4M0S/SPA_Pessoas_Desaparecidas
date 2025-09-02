<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white shadow-sm border-b-2 border-primary-600">
    <nav
      class="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/BRASAO_PJCMT.jpg"
          alt="Logo PJC-MT"
          class="h-10 w-auto"
        />
        <div class="text-center sm:text-left">
          <h1 class="text-base sm:text-lg font-bold text-neutral-800">
            Polícia Judiciária Civil-MT
          </h1>
          <p class="text-xs text-neutral-500">Pessoas Desaparecidas</p>
        </div>
      </RouterLink>
      <div class="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
        <RouterLink to="/sobre" class="text-sm text-neutral-600 hover:text-primary-700 transition"
          >Sobre</RouterLink
        >
        <RouterLink to="/contato" class="text-sm text-neutral-600 hover:text-primary-700 transition"
          >Contato</RouterLink
        >
      </div>
    </nav>
  </header>
</template>
