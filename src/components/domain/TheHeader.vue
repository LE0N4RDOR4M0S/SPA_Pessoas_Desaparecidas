<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)

</script>

<template>
  <header class="bg-white shadow-sm border-b-2 border-primary-600">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink
        to="/"
        class="flex items-center gap-3 w-auto"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/BRASAO_PJCMT.jpg"
          alt="Logo PJC-MT"
          class="h-10 w-auto"
        />
        <div class="text-left">
          <h1 class="text-base sm:text-lg font-bold text-neutral-800">
            Polícia Judiciária Civil-MT
          </h1>
          <p class="text-xs text-neutral-500">Pessoas Desaparecidas</p>
        </div>
      </RouterLink>
      <!-- Mobile menu button -->
      <button
        class="sm:hidden ml-auto text-primary-700"
        @click="menuOpen = !menuOpen"
        aria-label="Abrir menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <!-- Desktop menu -->
      <div class="hidden sm:flex items-center gap-4">
        <RouterLink to="/sobre" class="text-sm text-neutral-600 hover:text-primary-700 transition"
          >Sobre</RouterLink>
        <RouterLink to="/contato" class="text-sm text-neutral-600 hover:text-primary-700 transition"
          >Contato</RouterLink>
      </div>
    </nav>
    <!-- Mobile menu drawer -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-50 bg-black bg-opacity-40 sm:hidden"
        @click.self="menuOpen = false"
      >
        <aside class="absolute right-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col p-6 gap-6">
          <button
            class="self-end text-primary-700 mb-4"
            @click="menuOpen = false"
            aria-label="Fechar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <RouterLink to="/sobre" class="text-base text-neutral-700 hover:text-primary-700 transition" @click="menuOpen = false"
            >Sobre</RouterLink>
          <RouterLink to="/contato" class="text-base text-neutral-700 hover:text-primary-700 transition" @click="menuOpen = false"
            >Contato</RouterLink>
        </aside>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
