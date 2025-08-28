<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.back()
}
defineProps<{
  label?: string
}>()
</script>

<template>
  <button
    @click="goBack"
    class="flex items-center gap-1 px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 shadow transition"
    type="button"
    aria-label="Voltar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span v-if="label !== undefined">{{ label }}</span>
    <span v-else class="hidden md:inline">Voltar</span>
  </button>
</template>
