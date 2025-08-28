<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
function goBack() {
  router.back()
}
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
          <h1 class="text-lg font-bold text-neutral-800">Polícia Judiciária Civil-MT</h1>
          <p class="text-xs text-neutral-500">Pessoas Desaparecidas</p>
        </div>
      </RouterLink>
      <div>
        <button
          v-if="route.path !== '/'"
          @click="goBack"
          class="flex items-center gap-2 px-3 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </button>
      </div>
    </nav>
  </header>
</template>
